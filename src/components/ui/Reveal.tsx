import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { reveal } from '@/lib/motion'

type Tag = 'div' | 'section' | 'li' | 'p' | 'h2' | 'h3' | 'span' | 'ul'

/** Fades content up once when it enters the viewport. */
export function Reveal({
  children,
  index = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  index?: number
  className?: string
  as?: Tag
}) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      custom={index}
    >
      {children}
    </Comp>
  )
}
