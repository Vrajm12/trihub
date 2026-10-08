import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { pointer } from '@/lib/pointer'
import { damp } from '@/lib/utils'

/**
 * Applies a damped rotateX/rotateY to an element based on the shared pointer.
 * Runs its own rAF only while the element is on screen.
 */
export function useTilt<T extends HTMLElement>(
  { max = 6, baseX = 0, baseY = 0 }: { max?: number; baseX?: number; baseY?: number } = {},
) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.style.transform = `rotateX(${baseX}deg) rotateY(${baseY}deg)`
      return
    }
    let raf = 0
    let last = performance.now()
    let rx = baseX
    let ry = baseY
    let visible = false

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      rx = damp(rx, baseX + pointer.y * max, 4, dt)
      ry = damp(ry, baseY + pointer.x * max, 4, dt)
      el.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`
      if (visible) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [max, baseX, baseY, reduced])

  return ref
}
