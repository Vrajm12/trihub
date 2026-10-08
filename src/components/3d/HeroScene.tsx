import * as THREE from 'three'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, RoundedBox } from '@react-three/drei'
import { Users, Boxes, Workflow, BarChart3, UserRound, Wallet, Package, type LucideIcon } from 'lucide-react'
import { heroModules } from '@/data/modules'
import { pointer } from '@/lib/pointer'
import { clamp, damp, lerp } from '@/lib/utils'
import { CoreMark, type CoreHandle } from './CoreMark'
import { Studio } from './Studio'
import { useMaterials } from './materials'
import { ModuleLabel } from './labelTexture'
import { smooth, type SceneProps } from './shared'

const ICONS: Record<string, LucideIcon> = {
  CRM: Users,
  ERP: Boxes,
  Automation: Workflow,
  Analytics: BarChart3,
  HR: UserRound,
  Finance: Wallet,
  Inventory: Package,
}
const TARGETS: Record<string, string> = {
  CRM: '#crm',
  ERP: '#erp',
  Automation: '#automation',
  Analytics: '#platform',
  HR: '#platform',
  Finance: '#platform',
  Inventory: '#erp',
}

const FOV = 30
const CURVE_SEGMENTS = 20
const TILT = 0.34 // ring tilt toward the camera (radians)

type Variant = 'hero' | 'cta'

interface Layout {
  radius: number
  cardW: number
  cardH: number
  core: number
  halfW: number
  halfH: number
}

function useLayout(variant: Variant, compact: boolean): Layout {
  return useMemo(() => {
    if (variant === 'cta') return { radius: 2.9, cardW: 1.12, cardH: 0.62, core: 1.25, halfW: 4.1, halfH: 3.1 }
    return compact
      ? { radius: 2.35, cardW: 1.2, cardH: 0.6, core: 1.25, halfW: 3.3, halfH: 2.4 }
      : { radius: 2.65, cardW: 1.18, cardH: 0.72, core: 1.3, halfW: 3.65, halfH: 2.8 }
  }, [variant, compact])
}

/** Moves the camera so the whole system fits the canvas. */
function useFit(layout: Layout) {
  const { size, camera } = useThree()
  const t = Math.tan((FOV * Math.PI) / 360)
  const aspect = size.width / Math.max(1, size.height)
  const dist = Math.max(layout.halfW / (t * aspect), layout.halfH / t, 9)

  useLayoutEffect(() => {
    camera.position.set(0, dist * 0.06, dist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, dist])
}

function System({ reduced, quality, getProgress, variant }: SceneProps & { variant: Variant }) {
  const { size, camera, gl, invalidate } = useThree()
  const compact = size.width < 560
  const layout = useLayout(variant, compact)
  useFit(layout)
  const mats = useMaterials(quality)
  const n = heroModules.length

  const rig = useRef<THREE.Group>(null)
  const core = useRef<CoreHandle>(null)
  const cards = useRef<(THREE.Group | null)[]>([])
  const cardMats = useMemo(() => heroModules.map(() => mats.frosted.clone()), [mats])
  const [hovered, setHovered] = useState<number | null>(null)
  const hoverRef = useRef<number | null>(null)
  hoverRef.current = hovered

  // Labels are textures on the card faces (see labelTexture.ts).
  const labels = useMemo(
    () =>
      heroModules.map(
        (m) =>
          new ModuleLabel(
            { width: layout.cardW, height: layout.cardH, title: m.label, note: variant === 'hero' && !compact ? m.note : undefined, icon: ICONS[m.label], layout: 'card' },
            invalidate,
            gl.capabilities.getMaxAnisotropy(),
          ),
      ),
    [layout, variant, compact, invalidate, gl],
  )
  const labelMats = useMemo(
    () => labels.map((l) => new THREE.MeshBasicMaterial({ map: l.texture, transparent: true, depthWrite: false, toneMapped: false })),
    [labels],
  )
  useEffect(
    () => () => {
      labels.forEach((l) => l.dispose())
      labelMats.forEach((m) => m.dispose())
      cardMats.forEach((m) => m.dispose())
    },
    [labels, labelMats, cardMats],
  )
  useEffect(() => labels.forEach((l, i) => l.setState(hovered === i ? 'hover' : 'idle')), [labels, hovered])

  // Per-module animation state, kept outside React.
  const sim = useRef({
    t: 0,
    speed: 1,
    lift: new Float32Array(n),
    // Scattered starting points for the CTA "assembly" story.
    scatter: heroModules.map((_, i) => {
      const a = (i / n) * Math.PI * 2 + 0.7
      return new THREE.Vector3(Math.cos(a) * 6.5, Math.sin(a * 1.7) * 3.2, -2 - (i % 3) * 1.6)
    }),
    rx: 0,
    ry: 0,
  })

  // Connection curves: one LineSegments for all links, one for the highlighted link.
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * CURVE_SEGMENTS * 6), 3))
    return g
  }, [n])
  const hiGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CURVE_SEGMENTS * 6), 3))
    return g
  }, [])
  const lineMat = useMemo(() => mats.line.clone(), [mats])
  const packets = useRef<THREE.InstancedMesh>(null)

  const orbitTrack = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      const z = Math.sin(a) * layout.radius
      pts.push(new THREE.Vector3(Math.cos(a) * layout.radius, -z * Math.sin(TILT), z * Math.cos(TILT)))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [layout.radius])

  const tmp = useMemo(
    () => ({
      ctrl: new THREE.Vector3(),
      anchor: new THREE.Vector3(),
      prev: new THREE.Vector3(),
      next: new THREE.Vector3(),
      at: new THREE.Vector3(),
      scale: new THREE.Vector3(),
      inv: new THREE.Quaternion(),
      ident: new THREE.Quaternion(),
      yaw: new THREE.Quaternion(),
      roll: new THREE.Quaternion(),
      m: new THREE.Matrix4(),
      up: new THREE.Vector3(0, 1, 0),
      fwd: new THREE.Vector3(0, 0, 1),
      positions: heroModules.map(() => new THREE.Vector3()),
    }),
    [],
  )

  /** Quadratic bezier with the control point lifted above the midpoint (soft arc). */
  const bezier = (from: THREE.Vector3, to: THREE.Vector3, u: number, out: THREE.Vector3) => {
    const c = tmp.ctrl.copy(from).add(to).multiplyScalar(0.5)
    c.y += 0.55
    const k = 1 - u
    return out.set(
      k * k * from.x + 2 * k * u * c.x + u * u * to.x,
      k * k * from.y + 2 * k * u * c.y + u * u * to.y,
      k * k * from.z + 2 * k * u * c.z + u * u * to.z,
    )
  }

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20)
    const s = sim.current
    const hov = hoverRef.current

    // Progress: hero → scroll-out (0..1), cta → assembly (0..1)
    let scrollOut = 0
    let assembly = 1
    if (variant === 'hero') {
      scrollOut = clamp(window.scrollY / (window.innerHeight * 0.9))
    } else if (getProgress) {
      assembly = smooth(clamp(getProgress()))
    }

    // Orbit slows when a module is hovered so it can be read.
    s.speed = damp(s.speed, hov === null ? 1 : 0.12, 4, dt)
    if (!reduced) s.t += dt * s.speed

    // Cursor-aware parallax on the whole rig.
    if (rig.current) {
      const px = reduced ? 0 : pointer.x
      const py = reduced ? 0 : pointer.y
      s.ry = damp(s.ry, px * 0.28 + scrollOut * 0.55, 3, dt)
      s.rx = damp(s.rx, -py * 0.14 + scrollOut * 0.18, 3, dt)
      rig.current.rotation.set(s.rx, s.ry, 0)
      rig.current.position.y = scrollOut * 0.6
      rig.current.updateMatrixWorld()
      rig.current.getWorldQuaternion(tmp.inv).invert()
    }

    // Core: breathes slightly; opens on scroll-out; closes as the CTA assembles.
    const breath = reduced ? 0 : Math.sin(s.t * 0.9) * 0.012
    const explode = variant === 'hero' ? 0.05 + breath + scrollOut * 0.32 : lerp(0.55, 0.035, assembly) + breath
    core.current?.setExplode(explode)

    const radius = layout.radius * (1 + scrollOut * 0.22)
    const pos = lineGeo.attributes.position as THREE.BufferAttribute
    const lineArr = pos.array as Float32Array

    for (let i = 0; i < n; i++) {
      const g = cards.current[i]
      if (!g) continue
      const theta = (i / n) * Math.PI * 2 + s.t * 0.11 + Math.PI / 2
      const bob = reduced ? 0 : Math.sin(s.t * 0.7 + i * 1.3) * 0.06

      // Ring position (tilted toward the camera); the CTA uses an upright halo.
      const p = tmp.positions[i]
      if (variant === 'hero') {
        const z = Math.sin(theta) * radius
        p.set(Math.cos(theta) * radius, -z * Math.sin(TILT) + bob, z * Math.cos(TILT))
      } else {
        p.set(Math.cos(theta) * radius, Math.sin(theta) * radius * 0.74 + bob, Math.sin(theta * 2) * 0.35)
        p.lerpVectors(s.scatter[i], p, assembly)
      }

      // Hover: lift toward the camera and scale up.
      const target = hov === i ? 1 : 0
      s.lift[i] = reduced ? target : damp(s.lift[i], target, 6, dt)
      const lift = s.lift[i]
      g.position.copy(p)
      g.position.z += lift * 0.45
      g.scale.setScalar(1 + lift * 0.08)

      // Billboard toward the camera with a slight yaw that follows the orbit.
      g.quaternion.copy(tmp.inv).multiply(camera.quaternion)
      tmp.yaw.setFromAxisAngle(tmp.up, -(p.x / radius) * 0.22 * (1 - lift))
      g.quaternion.multiply(tmp.yaw)
      if (variant === 'cta') {
        tmp.roll.setFromAxisAngle(tmp.fwd, (1 - assembly) * (i % 2 ? 0.5 : -0.4))
        g.quaternion.multiply(tmp.roll)
      }

      // Depth cue: modules behind the core recede.
      const depth = clamp((p.z + radius * 0.75) / (radius * 1.2))
      const vis = variant === 'cta' ? lerp(0.3, 1, assembly) : 1
      const op = lerp(0.35, 1, Math.max(depth, lift)) * vis
      cardMats[i].opacity = 0.92 * op
      labelMats[i].opacity = op

      // Link curve: core surface → module.
      tmp.anchor.copy(p).setLength(layout.core * 0.55)
      bezier(tmp.anchor, p, 0, tmp.prev)
      for (let k = 1; k <= CURVE_SEGMENTS; k++) {
        bezier(tmp.anchor, p, k / CURVE_SEGMENTS, tmp.next)
        const o = (i * CURVE_SEGMENTS + (k - 1)) * 6
        lineArr[o] = tmp.prev.x
        lineArr[o + 1] = tmp.prev.y
        lineArr[o + 2] = tmp.prev.z
        lineArr[o + 3] = tmp.next.x
        lineArr[o + 4] = tmp.next.y
        lineArr[o + 5] = tmp.next.z
        tmp.prev.copy(tmp.next)
      }

      // Data packet travelling module → core along the same curve.
      if (packets.current) {
        const speed = hov === i ? 0.55 : 0.22
        const u = reduced ? 0.5 : (s.t * speed + i / n) % 1
        bezier(p, tmp.anchor, u, tmp.at)
        const fade = Math.sin(u * Math.PI) * (variant === 'cta' ? assembly : 1)
        tmp.m.compose(tmp.at, tmp.ident, tmp.scale.setScalar(0.055 * fade + 1e-4))
        packets.current.setMatrixAt(i, tmp.m)
      }
    }
    pos.needsUpdate = true
    lineMat.opacity = variant === 'cta' ? 0.2 * assembly : 0.16 * (1 - scrollOut * 0.5)
    if (packets.current) packets.current.instanceMatrix.needsUpdate = true

    // Highlighted link for the hovered module.
    if (hov !== null) {
      const hp = hiGeo.attributes.position as THREE.BufferAttribute
      ;(hp.array as Float32Array).set(lineArr.subarray(hov * CURVE_SEGMENTS * 6, (hov + 1) * CURVE_SEGMENTS * 6))
      hp.needsUpdate = true
    }
  })

  const onOver = (i: number) => (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setHovered(i)
    document.body.style.cursor = 'pointer'
  }
  const onOut = () => {
    setHovered(null)
    document.body.style.cursor = ''
  }

  return (
    <>
      <group ref={rig}>
        <CoreMark ref={core} size={layout.core} materials={mats} />
        {variant === 'hero' && (
          <lineLoop geometry={orbitTrack}>
            <lineBasicMaterial color="#111318" transparent opacity={0.07} depthWrite={false} />
          </lineLoop>
        )}
        <lineSegments geometry={lineGeo} material={lineMat} frustumCulled={false} />
        <lineSegments geometry={hiGeo} material={mats.lineAccent} visible={hovered !== null} frustumCulled={false} />
        <instancedMesh ref={packets} args={[undefined, mats.packet, n]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
        </instancedMesh>

        {heroModules.map((m, i) => {
          return (
            <group key={m.label} ref={(el) => void (cards.current[i] = el)}>
              <RoundedBox
                args={[layout.cardW, layout.cardH, 0.09]}
                radius={0.075}
                smoothness={3}
                material={cardMats[i]}
                onPointerOver={onOver(i)}
                onPointerOut={onOut}
                onClick={() => document.querySelector(TARGETS[m.label])?.scrollIntoView({ behavior: 'smooth' })}
              />
              <mesh position={[0, 0, 0.046]} material={labelMats[i]}>
                <planeGeometry args={[layout.cardW, layout.cardH]} />
              </mesh>
            </group>
          )
        })}
      </group>

      {quality === 'high' && (
        <ContactShadows
          position={[0, -layout.halfH * 0.95, 0]}
          scale={14}
          blur={2.8}
          far={6}
          opacity={0.28}
          resolution={512}
          color="#1b1f3a"
          frames={reduced ? 1 : Infinity}
        />
      )}
    </>
  )
}

export default function HeroScene(props: SceneProps & { variant?: Variant }) {
  const { active, reduced, quality, variant = 'hero' } = props
  return (
    <Canvas
      frameloop={active && !reduced ? 'always' : 'demand'}
      dpr={quality === 'high' ? [1, 2] : [1, 1.5]}
      camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 0.6, 12] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping
        gl.toneMappingExposure = 1
      }}
      aria-hidden
      tabIndex={-1}
    >
      <Studio />
      <System {...props} variant={variant} />
    </Canvas>
  )
}
