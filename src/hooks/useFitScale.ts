import { useEffect, useRef, useState } from 'react'

/** Scales a fixed-size composition down to fit its container width (never up). */
export function useFitScale<T extends HTMLElement>(designWidth: number) {
  const ref = useRef<T>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / designWidth)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [designWidth])
  return { ref, scale }
}
