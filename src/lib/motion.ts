import type { Variants } from 'framer-motion'

/** Motion tokens — mirror the CSS --ease-* and --dur-* variables. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuint: [0.65, 0, 0.35, 1] as const,
  standard: [0.2, 0, 0, 1] as const,
}

export const dur = { fast: 0.15, base: 0.24, slow: 0.42, slower: 0.7, slowest: 1 }

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: dur.slower, ease: ease.outExpo, delay: i * 0.07 },
  }),
}
