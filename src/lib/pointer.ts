/**
 * One shared, allocation-free pointer store. A single passive listener writes
 * normalized coordinates (-1..1); 3D scenes and tilt effects read it inside
 * their own animation loops, so pointer movement never triggers React renders.
 */
export const pointer = { x: 0, y: 0, active: false }

let bound = false
export function bindPointer() {
  if (bound || typeof window === 'undefined') return
  bound = true
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      pointer.active = true
    },
    { passive: true },
  )
  document.addEventListener('mouseleave', () => {
    pointer.x = 0
    pointer.y = 0
  })
}
