import type { Quality } from '@/hooks/useCapabilities'

export interface SceneProps {
  /** Section is on screen — render continuously. */
  active: boolean
  quality: Quality
  reduced: boolean
  /** Optional external progress source (0..1), read inside the frame loop. */
  getProgress?: () => number
}

export const smooth = (t: number) => t * t * (3 - 2 * t)
