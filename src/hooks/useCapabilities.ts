import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useMediaQuery } from './useMediaQuery'

let webglCache: boolean | null = null
function detectWebGL() {
  if (webglCache !== null) return webglCache
  try {
    const c = document.createElement('canvas')
    webglCache = !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    webglCache = false
  }
  return webglCache
}

export type Quality = 'high' | 'low'

/**
 * Decides how much 3D a device gets.
 * high  → desktop with a fine pointer: transmission glass, shadows, parallax.
 * low   → touch / small screens / few cores: opaque materials, capped DPR.
 */
export function useCapabilities() {
  const reducedMotion = !!useReducedMotion()
  const small = useMediaQuery('(max-width: 767px)')
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')

  return useMemo(() => {
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4
    const webgl = typeof window !== 'undefined' && detectWebGL()
    const quality: Quality = !small && fine && cores > 4 ? 'high' : 'low'
    return { webgl, quality, reducedMotion, small, fine }
  }, [reducedMotion, small, fine])
}
