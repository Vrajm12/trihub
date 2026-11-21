import * as THREE from 'three'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Html, RoundedBox } from '@react-three/drei'
import { heroModules, systemModules } from '@/data/modules'
import { pointer } from '@/lib/pointer'
import { damp } from '@/lib/utils'
import { CoreMark } from './CoreMark'
import { useMaterials } from './materials'
import { Studio } from './Studio'
import type { SceneProps } from './shared'

const FOV = 30
const NODE_POSITIONS: readonly [number, number][] = [
  [-2.45, -1.25],
  [-1.25, -2.45],
  [1.1, -2.5],
  [2.55, -1.1],
  [2.45, 1.3],
  [0.55, 2.65],
  [-2.2, 1.75],
]
const TARGETS: Record<string, string> = {
  CRM: '/crm/',
  ERP: '/erp/',
  Automation: '/automation/',
  Analytics: '/products/',
  HR: '/erp/',
  Finance: '/erp/',
  Inventory: '/erp/',
}

function CampusNode({
  label,
  position,
  index,
  hovered,
  reduced,
  onHover,
}: {
  label: string
  position: [number, number, number]
  index: number
  hovered: boolean
  reduced: boolean
  onHover: (label: string | null) => void
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    if (!group.current) return
    const scale = hovered ? 1.1 : 1
    const t = reduced ? 1 : 1 - Math.exp(-7 * dt)
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, scale, t))
    if (!reduced) {
      const hoverLift = hovered ? 0.18 : 0
      group.current.position.y = damp(
        group.current.position.y,
        position[1] + hoverLift + Math.sin(performance.now() * 0.0012 + index) * 0.035,
        4,
        dt,
      )
    }
  })

  const handlePointerOver = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    onHover(label)
    document.body.style.cursor = 'pointer'
  }
  const handlePointerOut = () => {
    onHover(null)
    document.body.style.cursor = ''
  }
  const handleClick = () => {
    window.location.assign(TARGETS[label])
  }
  const moduleLabel = label === 'HR' ? 'HRMS' : label
  const details = systemModules.find((module) => module.label === moduleLabel)
  const ModuleIcon = details?.icon

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <RoundedBox args={[1.04, 0.18, 0.82]} radius={0.09} smoothness={3} position={[0, 0.08, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.3} metalness={0.04} clearcoat={0.8} />
      </RoundedBox>
      <mesh position={[0, 0.175, 0]}>
        <boxGeometry args={[0.73, 0.015, 0.54]} />
        <meshBasicMaterial color={hovered ? '#4F46E5' : '#D9DCEF'} />
      </mesh>

      <group position={[0, 0.2, 0]}>
        {label === 'CRM' && (
          <>
            {[-0.22, 0, 0.22].map((x, i) => (
              <group key={x} position={[x, 0, i === 1 ? 0.04 : -0.02]}>
                <mesh position={[0, 0.38, 0]}>
                  <sphereGeometry args={[0.12, 20, 20]} />
                  <meshStandardMaterial color={i === 1 ? '#4F46E5' : '#757B89'} roughness={0.34} metalness={0.1} />
                </mesh>
                <RoundedBox args={[0.23, 0.28, 0.18]} radius={0.08} smoothness={3} position={[0, 0.17, 0]}>
                  <meshStandardMaterial color={i === 1 ? '#6A63ED' : '#C9CCD5'} roughness={0.38} />
                </RoundedBox>
              </group>
            ))}
          </>
        )}

        {label === 'ERP' && (
          <>
            <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.04} smoothness={2} position={[-0.17, 0.2, 0]}>
              <meshStandardMaterial color="#AEB3C0" roughness={0.38} />
            </RoundedBox>
            <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.04} smoothness={2} position={[0.17, 0.2, 0]}>
              <meshStandardMaterial color="#767C8B" roughness={0.38} />
            </RoundedBox>
            <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.04} smoothness={2} position={[0, 0.48, 0]}>
              <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.12} />
            </RoundedBox>
          </>
        )}

        {label === 'Automation' && (
          <>
            {[-0.25, 0, 0.25].map((x, i) => (
              <mesh key={x} position={[x, 0.28 + (i === 1 ? 0.2 : 0), 0]}>
                <sphereGeometry args={[0.105, 18, 18]} />
                <meshStandardMaterial color={i === 1 ? '#4F46E5' : '#9DA2AF'} roughness={0.28} metalness={0.08} />
              </mesh>
            ))}
            <mesh position={[0, 0.22, 0]}>
              <boxGeometry args={[0.48, 0.035, 0.035]} />
              <meshBasicMaterial color="#8F8AE9" />
            </mesh>
          </>
        )}

        {label === 'Analytics' && (
          <>
            {[0.25, 0.44, 0.62, 0.78].map((height, i) => (
              <RoundedBox
                key={height}
                args={[0.12, height, 0.2]}
                radius={0.035}
                smoothness={2}
                position={[(i - 1.5) * 0.16, height / 2, 0]}
              >
                <meshStandardMaterial color={i === 3 ? '#4F46E5' : '#A8ADBA'} roughness={0.34} metalness={0.08} />
              </RoundedBox>
            ))}
          </>
        )}

        {label === 'HR' && (
          <>
            {[-0.17, 0.17].map((x, i) => (
              <group key={x} position={[x, 0, i === 0 ? 0.03 : -0.02]}>
                <mesh position={[0, 0.4, 0]}>
                  <sphereGeometry args={[0.12, 18, 18]} />
                  <meshStandardMaterial color={i === 0 ? '#4F46E5' : '#8E94A2'} roughness={0.34} />
                </mesh>
                <RoundedBox args={[0.25, 0.32, 0.2]} radius={0.09} smoothness={3} position={[0, 0.16, 0]}>
                  <meshStandardMaterial color={i === 0 ? '#7069EA' : '#C4C8D1'} roughness={0.4} />
                </RoundedBox>
              </group>
            ))}
          </>
        )}

        {label === 'Finance' && (
          <>
            {[0.12, 0.31, 0.5].map((y, i) => (
              <mesh key={y} position={[0, y, 0]} castShadow>
                <cylinderGeometry args={[0.24, 0.24, 0.12, 36]} />
                <meshStandardMaterial color={i === 2 ? '#4F46E5' : '#AEB3C0'} roughness={0.3} metalness={0.38} />
              </mesh>
            ))}
          </>
        )}

        {label === 'Inventory' && (
          <>
            <RoundedBox args={[0.35, 0.32, 0.33]} radius={0.035} smoothness={2} position={[-0.15, 0.19, 0.02]}>
              <meshStandardMaterial color="#AEB3C0" roughness={0.38} />
            </RoundedBox>
            <RoundedBox args={[0.34, 0.36, 0.33]} radius={0.035} smoothness={2} position={[0.16, 0.21, -0.04]}>
              <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.1} />
            </RoundedBox>
          </>
        )}
      </group>

      <Html position={[0, hovered ? 1.2 : 0.96, 0]} center distanceFactor={10} zIndexRange={[8, 0]} style={{ pointerEvents: 'none' }}>
        {hovered ? (
          <div className="w-52 rounded-xl border border-white/80 bg-white/95 p-3 text-left shadow-[0_12px_36px_rgb(17_19_24/0.18)] ring-1 ring-ink/5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                {ModuleIcon && <ModuleIcon size={15} strokeWidth={2} />}
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] font-semibold tracking-[0.14em] text-accent">TRIHUB MODULE</span>
                <span className="block text-xs font-semibold leading-tight text-ink">{details?.short ?? label}</span>
              </span>
            </div>
            <p className="mt-2 text-[10px] leading-[1.45] text-ink-2">
              {details?.summary ?? heroModules.find((module) => module.label === label)?.note}
            </p>
            <span className="mt-2 block text-[9px] font-semibold text-accent">Click to explore this solution</span>
          </div>
        ) : (
          <span className="whitespace-nowrap rounded-full border border-line bg-white/90 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-ink shadow-sm">
            {label.toUpperCase()}
          </span>
        )}
      </Html>
    </group>
  )
}

function Campus({ quality, reduced }: Pick<SceneProps, 'quality' | 'reduced'>) {
  const { size, camera } = useThree()
  const materials = useMaterials(quality)
  const t = Math.tan((FOV * Math.PI) / 360)
  const aspect = size.width / Math.max(1, size.height)
  const dist = Math.max(4.1 / (t * aspect), 3.05 / t, 12)

  useLayoutEffect(() => {
    camera.position.set(0, dist * 0.5, dist)
    camera.lookAt(0, 0.45, 0)
    camera.updateProjectionMatrix()
  }, [camera, dist])

  const rig = useRef<THREE.Group>(null)
  const mark = useRef<THREE.Group>(null)
  const packets = useRef<THREE.InstancedMesh>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const positions = useMemo(
    () => NODE_POSITIONS.map(([x, z]) => new THREE.Vector3(x, 0.12, z)),
    [],
  )
  const links = useMemo(() => {
    const points = positions.flatMap((p) => [0, 0.24, 0, p.x, 0.24, p.z])
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geometry
  }, [positions])
  const activeLink = useMemo(() => {
    if (!hovered) return null
    const index = heroModules.findIndex((module) => module.label === hovered)
    if (index < 0) return null
    const geometry = new THREE.BufferGeometry()
    geometry.setFromPoints([new THREE.Vector3(0, 0.3, 0), positions[index].clone().setY(0.3)])
    return geometry
  }, [hovered, positions])
  const packetMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#4F46E5' }), [])
  const elapsed = useRef(0)
  const temp = useMemo(
    () => ({
      matrix: new THREE.Matrix4(),
      position: new THREE.Vector3(),
      origin: new THREE.Vector3(0, 0.34, 0),
      identity: new THREE.Quaternion(),
      scale: new THREE.Vector3(),
    }),
    [],
  )

  useEffect(() => () => {
    links.dispose()
    packetMaterial.dispose()
  }, [links, packetMaterial])
  useEffect(() => () => activeLink?.dispose(), [activeLink])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20)
    if (!reduced) elapsed.current += dt

    if (rig.current) {
      const targetX = reduced ? 0 : -pointer.y * 0.055
      const targetY = reduced ? 0 : pointer.x * 0.09
      rig.current.rotation.x = damp(rig.current.rotation.x, targetX, 3, dt)
      rig.current.rotation.y = damp(rig.current.rotation.y, targetY, 3, dt)
    }

    if (mark.current && !reduced) {
      mark.current.position.y = 1.47 + Math.sin(elapsed.current * 0.85) * 0.045
      mark.current.rotation.y = Math.sin(elapsed.current * 0.34) * 0.025
    }

    if (packets.current) {
      for (let i = 0; i < positions.length; i++) {
        const u = reduced ? 0.5 : (elapsed.current * 0.16 + i / positions.length) % 1
        temp.position.lerpVectors(temp.origin, positions[i], u)
        temp.matrix.compose(temp.position, temp.identity, temp.scale.setScalar(0.04 + Math.sin(u * Math.PI) * 0.025))
        packets.current.setMatrixAt(i, temp.matrix)
      }
      packets.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <>
      <group ref={rig}>
        <mesh position={[0, -0.02, 0]} receiveShadow>
          <cylinderGeometry args={[3.72, 3.72, 0.16, 96]} />
          <meshPhysicalMaterial color="#F1F2F6" roughness={0.48} clearcoat={0.3} />
        </mesh>
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[3.5, 3.62, 0.06, 96]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.03} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.105, 0]}>
          <torusGeometry args={[3.34, 0.012, 8, 112]} />
          <meshBasicMaterial color="#4F46E5" transparent opacity={0.22} />
        </mesh>

        <lineSegments geometry={links} position={[0, 0, 0]}>
          <lineBasicMaterial color="#4F46E5" transparent opacity={hovered ? 0.24 : 0.12} depthWrite={false} />
        </lineSegments>
        {activeLink && (
          <lineSegments geometry={activeLink}>
            <lineBasicMaterial color="#4F46E5" transparent opacity={0.9} depthWrite={false} />
          </lineSegments>
        )}
        <instancedMesh ref={packets} args={[undefined, packetMaterial, positions.length]} frustumCulled={false}>
          <sphereGeometry args={[1, 10, 10]} />
        </instancedMesh>

        {heroModules.map((module, index) => (
          <CampusNode
            key={module.label}
            label={module.label}
            position={[positions[index].x, positions[index].y, positions[index].z]}
            index={index}
            hovered={hovered === module.label}
            reduced={reduced}
            onHover={setHovered}
          />
        ))}

        <group position={[0, 0.16, 0]}>
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.28, 1.36, 0.25, 64]} />
            <meshPhysicalMaterial color="#D9DCE5" roughness={0.32} metalness={0.12} clearcoat={0.8} />
          </mesh>
          <RoundedBox args={[1.6, 0.34, 1.42]} radius={0.12} smoothness={4} position={[0, 0.39, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial color="#20232D" roughness={0.3} metalness={0.2} clearcoat={0.85} />
          </RoundedBox>
          <group ref={mark} position={[0, 1.47, 0]}>
            <CoreMark size={1.16} materials={materials} explode={0.018} />
          </group>
        </group>
      </group>

      {quality === 'high' && (
        <ContactShadows
          position={[0, -0.12, 0]}
          scale={10}
          blur={2.2}
          far={5}
          opacity={0.22}
          resolution={512}
          color="#252641"
          frames={reduced ? 1 : Infinity}
        />
      )}
    </>
  )
}

export default function ConnectedHeroScene(props: SceneProps) {
  const { active, quality, reduced } = props
  return (
    <Canvas
      frameloop={active && !reduced ? 'always' : 'demand'}
      dpr={quality === 'high' ? [1, 2] : [1, 1.5]}
      camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 7, 14] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping
        gl.toneMappingExposure = 1
      }}
      aria-hidden
      tabIndex={-1}
    >
      <Studio intensity={quality === 'high' ? 1 : 0.8} />
      <Campus quality={quality} reduced={reduced} />
    </Canvas>
  )
}
