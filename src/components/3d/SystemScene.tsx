import * as THREE from 'three'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, RoundedBox } from '@react-three/drei'
import { systemModules, type ModuleId } from '@/data/modules'
import { pointer } from '@/lib/pointer'
import { damp } from '@/lib/utils'
import { CoreMark } from './CoreMark'
import { Studio } from './Studio'
import { useMaterials } from './materials'
import { ModuleLabel } from './labelTexture'
import type { SceneProps } from './shared'

const FOV = 28
const ELEV = 0.72 // camera elevation (radians)
const RING = 3.25
const TILE: [number, number, number] = [1.56, 0.2, 0.98]
const ARC_SEGMENTS = 28
const MAX_LINKS = 4

const angleOf = (i: number) => (i / systemModules.length) * Math.PI * 2
const tilePos = (i: number, out = new THREE.Vector3()) => out.set(Math.sin(angleOf(i)) * RING, 0, Math.cos(angleOf(i)) * RING)

function arc(from: THREE.Vector3, to: THREE.Vector3, lift: number, segments: number) {
  const mid = from.clone().add(to).multiplyScalar(0.5)
  mid.y += lift
  return new THREE.QuadraticBezierCurve3(from, mid, to).getPoints(segments)
}

function segmentsFrom(points: THREE.Vector3[][]) {
  const arr: number[] = []
  for (const pts of points) for (let k = 1; k < pts.length; k++) arr.push(...pts[k - 1].toArray(), ...pts[k].toArray())
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
  return g
}

interface Props extends SceneProps {
  selected: ModuleId
  onSelect: (id: ModuleId) => void
}

function Platform({ selected, onSelect, quality, reduced }: Props) {
  const { size, camera, gl, invalidate } = useThree()
  const mats = useMaterials(quality)
  const n = systemModules.length
  const selIndex = systemModules.findIndex((m) => m.id === selected)
  const sel = systemModules[selIndex]
  const [hovered, setHovered] = useState<number | null>(null)
  const related = useMemo(() => new Set(sel.connects), [sel])

  // Labels are textures lying on each tile's top face.
  const labels = useMemo(
    () =>
      systemModules.map(
        (m) =>
          new ModuleLabel({ width: TILE[0], height: TILE[2], title: m.label, icon: m.icon, layout: 'tile' }, invalidate, gl.capabilities.getMaxAnisotropy()),
      ),
    [invalidate, gl],
  )
  const labelMats = useMemo(
    () => labels.map((l) => new THREE.MeshBasicMaterial({ map: l.texture, transparent: true, depthWrite: false, toneMapped: false })),
    [labels],
  )
  useEffect(
    () => () => {
      labels.forEach((l) => l.dispose())
      labelMats.forEach((m) => m.dispose())
    },
    [labels, labelMats],
  )
  useEffect(() => {
    labels.forEach((l, i) => l.setState(i === selIndex ? 'selected' : 'idle'))
    labelMats.forEach((m, i) => (m.opacity = i === selIndex || related.has(systemModules[i].id) || hovered === i ? 1 : 0.5))
    invalidate()
  }, [labels, labelMats, selIndex, related, hovered, invalidate])

  // Fit the platform into the canvas.
  const t = Math.tan((FOV * Math.PI) / 360)
  const aspect = size.width / Math.max(1, size.height)
  const dist = Math.max(5.4 / (t * aspect), 3.6 / t)
  useLayoutEffect(() => {
    camera.position.set(0, Math.sin(ELEV) * dist, Math.cos(ELEV) * dist)
    camera.lookAt(0, -0.2, 0)
    camera.updateProjectionMatrix()
  }, [camera, dist])

  const spin = useRef<THREE.Group>(null)
  const rig = useRef<THREE.Group>(null)
  const tiles = useRef<(THREE.Group | null)[]>([])
  const packets = useRef<THREE.InstancedMesh>(null)
  const sim = useRef({ rot: -angleOf(selIndex), lift: new Float32Array(n), t: 0, rx: 0, ry: 0 })
  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: new THREE.Vector3(), v: new THREE.Vector3() }), [])

  // Static hairlines: core → every module, plus the ring track.
  const baseLines = useMemo(() => {
    const core = new THREE.Vector3(0, 0.02, 0)
    return segmentsFrom(systemModules.map((_, i) => [core, tilePos(i).setY(0.02)]))
  }, [])
  const ringTrack = useMemo(() => {
    const pts = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2
      return new THREE.Vector3(Math.sin(a) * RING, 0.01, Math.cos(a) * RING)
    })
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  // Highlighted arcs: selected module → each module it exchanges data with.
  const linkCurves = useMemo(() => {
    const from = tilePos(selIndex).setY(0.2)
    return sel.connects.slice(0, MAX_LINKS).map((id) => {
      const j = systemModules.findIndex((m) => m.id === id)
      const to = tilePos(j).setY(0.2)
      return arc(from, to, 1.1 + from.distanceTo(to) * 0.12, ARC_SEGMENTS)
    })
  }, [sel, selIndex])
  const linkGeo = useMemo(() => segmentsFrom(linkCurves), [linkCurves])
  const coreLink = useMemo(() => segmentsFrom([[new THREE.Vector3(0, 0.03, 0), tilePos(selIndex).setY(0.03)]]), [selIndex])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20)
    const s = sim.current
    if (!reduced) s.t += dt

    // Turn the platform so the selected module faces the viewer (shortest path).
    let target = -angleOf(selIndex)
    while (target - s.rot > Math.PI) target -= Math.PI * 2
    while (target - s.rot < -Math.PI) target += Math.PI * 2
    s.rot = reduced ? target : damp(s.rot, target, 3.2, dt)
    if (spin.current) spin.current.rotation.y = s.rot

    if (rig.current) {
      s.ry = damp(s.ry, reduced ? 0 : pointer.x * 0.12, 3, dt)
      s.rx = damp(s.rx, reduced ? 0 : -pointer.y * 0.05, 3, dt)
      rig.current.rotation.set(s.rx, s.ry, 0)
    }

    for (let i = 0; i < n; i++) {
      const g = tiles.current[i]
      if (!g) continue
      const goal = i === selIndex ? 1 : hovered === i ? 0.35 : 0
      s.lift[i] = reduced ? goal : damp(s.lift[i], goal, 6, dt)
      g.position.y = TILE[1] / 2 + s.lift[i] * 0.34
      // Tiles keep facing the viewer while the platform turns, so labels stay upright.
      g.rotation.y = -(s.rot + angleOf(i))
    }

    if (packets.current) {
      for (let k = 0; k < MAX_LINKS; k++) {
        const pts = linkCurves[k]
        if (!pts) {
          tmp.m.makeScale(0, 0, 0)
        } else {
          const u = reduced ? 0.5 : (s.t * 0.35 + k * 0.27) % 1
          const f = u * (pts.length - 1)
          const a = Math.floor(f)
          tmp.v.lerpVectors(pts[a], pts[Math.min(a + 1, pts.length - 1)], f - a)
          tmp.m.compose(tmp.v, tmp.q, tmp.s.setScalar(0.08 * Math.sin(u * Math.PI) + 1e-4))
        }
        packets.current.setMatrixAt(k, tmp.m)
      }
      packets.current.instanceMatrix.needsUpdate = true
    }
  })


  return (
    <group ref={rig} position={[0, -0.35, 0]}>
      {/* Core floats above the platform, always facing the viewer. */}
      <group position={[0, 1.15, 0]} rotation={[-ELEV * 0.85, 0, 0]}>
        <CoreMark size={0.95} materials={mats} explode={0.035} />
      </group>

      <group ref={spin}>
        <mesh position={[0, -0.08, 0]} material={mats.ceramic}>
          <cylinderGeometry args={[4.65, 4.65, 0.16, 96]} />
        </mesh>
        <lineLoop geometry={ringTrack}>
          <lineBasicMaterial color="#111318" transparent opacity={0.08} />
        </lineLoop>
        <lineSegments geometry={baseLines} material={mats.line} />
        <lineSegments geometry={coreLink} material={mats.lineAccent} />
        <lineSegments geometry={linkGeo} material={mats.lineAccent} />
        <instancedMesh ref={packets} args={[undefined, mats.packet, MAX_LINKS]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
        </instancedMesh>

        {systemModules.map((m, i) => {
          const isSel = i === selIndex
          return (
            <group key={m.id} position={tilePos(i)} rotation={[0, angleOf(i), 0]}>
              <group ref={(el) => void (tiles.current[i] = el)}>
                <RoundedBox
                  args={TILE}
                  radius={0.07}
                  smoothness={3}
                  material={isSel ? mats.ceramic : mats.frosted}
                  onPointerOver={(e) => {
                    e.stopPropagation()
                    setHovered(i)
                    document.body.style.cursor = 'pointer'
                  }}
                  onPointerOut={() => {
                    setHovered(null)
                    document.body.style.cursor = ''
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(m.id)
                  }}
                />
                {isSel && (
                  <mesh position={[0, -TILE[1] / 2 + 0.01, TILE[2] / 2 - 0.02]} material={mats.accent}>
                    <boxGeometry args={[TILE[0] * 0.86, 0.02, 0.025]} />
                  </mesh>
                )}
                <mesh position={[0, TILE[1] / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} material={labelMats[i]}>
                  <planeGeometry args={[TILE[0], TILE[2]]} />
                </mesh>
              </group>
            </group>
          )
        })}
      </group>

      {quality === 'high' && (
        <ContactShadows position={[0, -0.17, 0]} scale={13} blur={2.4} far={2} opacity={0.32} resolution={512} frames={1} color="#1b1f3a" />
      )}
    </group>
  )
}

export default function SystemScene(props: Props) {
  const { active, reduced, quality } = props
  return (
    <Canvas
      frameloop={active && !reduced ? 'always' : 'demand'}
      dpr={quality === 'high' ? [1, 2] : [1, 1.5]}
      camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 8, 9] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping
        gl.toneMappingExposure = 1
      }}
      aria-hidden
      tabIndex={-1}
    >
      <Studio />
      <Platform {...props} />
    </Canvas>
  )
}
