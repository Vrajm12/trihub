export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** Maps v from [a,b] into [0,1], clamped. */
export const progress = (v: number, a: number, b: number) => clamp((v - a) / (b - a))
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))
