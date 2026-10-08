import * as THREE from 'three'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import type { Materials } from './materials'

/**
 * TRIHUB CORE — the logo mark as a solid.
 *
 * A cube is split into three congruent square pyramids, one per axis, meeting
 * along the main diagonal. Viewed down that diagonal, the seams form exactly
 * the Y of the Trihub mark. Pulling the pieces apart ("explode") opens the
 * seam and reveals the lit interior — the visual metaphor for "separate parts,
 * one system". Scenes animate `explode` to tell assemble / disassemble stories.
 */

type Vec = [number, number, number]

function pyramid(h: number, perm: (p: Vec) => Vec) {
  // Piece owning the +Y face: base = top face, apex = back-bottom corner.
  const A: Vec = [-h, h, -h]
  const B: Vec = [h, h, -h]
  const C: Vec = [h, h, h]
  const D: Vec = [-h, h, h]
  const P: Vec = [-h, -h, -h]
  const outer = [A, D, C, A, C, B, A, B, P, D, A, P]
  const inner = [B, C, P, C, D, P]
  const verts = [...outer, ...inner].map(perm).flat()
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  g.computeVertexNormals()
  g.addGroup(0, outer.length, 0)
  g.addGroup(outer.length, inner.length, 1)
  return g
}

// Cyclic permutations keep winding order (outward normals) intact.
const toY = (p: Vec): Vec => p
const toX = ([x, y, z]: Vec): Vec => [y, z, x]
const toZ = ([x, y, z]: Vec): Vec => [z, x, y]

/** Rotation that points the cube's (1,1,1) diagonal at +Z (toward a front camera). */
export const CORE_FACING = new THREE.Euler(Math.atan(1 / Math.SQRT2), -Math.PI / 4, 0, 'XYZ')

export interface CoreHandle {
  setExplode: (e: number) => void
  group: THREE.Group | null
}

export const CoreMark = forwardRef<CoreHandle, { size?: number; materials: Materials; explode?: number }>(
  function CoreMark({ size = 1.5, materials, explode = 0.05 }, ref) {
    const h = size / 2
    const geos = useMemo(() => ({ y: pyramid(h, toY), x: pyramid(h, toX), z: pyramid(h, toZ) }), [h])
    const group = useRef<THREE.Group>(null)
    const top = useRef<THREE.Mesh>(null)
    const right = useRef<THREE.Mesh>(null)
    const left = useRef<THREE.Mesh>(null)

    useImperativeHandle(ref, () => ({
      group: group.current,
      setExplode: (e: number) => {
        top.current?.position.set(0, e, 0)
        right.current?.position.set(e, 0, 0)
        left.current?.position.set(0, 0, e)
      },
    }))

    return (
      <group ref={group} rotation={CORE_FACING}>
        <mesh ref={top} geometry={geos.y} material={[materials.accent, materials.seam]} position={[0, explode, 0]} />
        <mesh ref={right} geometry={geos.x} material={[materials.steel, materials.seam]} position={[explode, 0, 0]} />
        <mesh ref={left} geometry={geos.z} material={[materials.graphite, materials.seam]} position={[0, 0, explode]} />
        {/* Light source at the heart of the core, visible only through the seams */}
        <mesh scale={h * 0.32}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#6D66F0" />
        </mesh>
      </group>
    )
  },
)
