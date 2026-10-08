import * as THREE from 'three'
import { useEffect, useMemo } from 'react'
import type { Quality } from '@/hooks/useCapabilities'

/**
 * 3D MATERIAL SYSTEM
 * Six materials, shared by every scene. Colors match the CSS tokens.
 *   ceramic   — module bodies, platforms (white, satin clearcoat)
 *   frosted   — translucent module cards
 *   graphite  — dark structural faces
 *   steel     — soft metallic faces
 *   accent    — the one indigo signal (core top face, active states)
 *   seam      — inner faces of the core, visible only through the Y seam
 */
export const palette = {
  canvas: '#F7F8FA',
  ceramic: '#FCFCFD',
  graphite: '#1C1F26',
  steel: '#3A404B',
  accent: '#4F46E5',
  ink: '#111318',
} as const

export function createMaterials(quality: Quality) {
  const hi = quality === 'high'
  const physical = (p: THREE.MeshPhysicalMaterialParameters) =>
    hi ? new THREE.MeshPhysicalMaterial(p) : new THREE.MeshStandardMaterial(p as THREE.MeshStandardMaterialParameters)

  return {
    ceramic: physical({ color: palette.ceramic, roughness: 0.42, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.3 }),
    frosted: physical({
      color: '#FFFFFF',
      roughness: 0.3,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.92,
      emissive: '#FFFFFF',
      emissiveIntensity: 0.14,
    }),
    graphite: physical({ color: palette.graphite, roughness: 0.38, metalness: 0.15, clearcoat: 0.8, clearcoatRoughness: 0.18 }),
    steel: physical({ color: palette.steel, roughness: 0.32, metalness: 0.35, clearcoat: 0.5, clearcoatRoughness: 0.2 }),
    accent: physical({ color: palette.accent, roughness: 0.3, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.12 }),
    seam: new THREE.MeshStandardMaterial({
      color: '#0E0F14',
      roughness: 0.6,
      emissive: palette.accent,
      emissiveIntensity: 0.35,
    }),
    line: new THREE.LineBasicMaterial({ color: palette.ink, transparent: true, opacity: 0.16, depthWrite: false }),
    lineAccent: new THREE.LineBasicMaterial({ color: palette.accent, transparent: true, opacity: 0.85, depthWrite: false }),
    packet: new THREE.MeshBasicMaterial({ color: palette.accent }),
  }
}

export type Materials = ReturnType<typeof createMaterials>

export function useMaterials(quality: Quality) {
  const mats = useMemo(() => createMaterials(quality), [quality])
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats])
  return mats
}
