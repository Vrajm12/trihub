import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'night'
  className?: string
}

export function SectionHeading({ eyebrow, title, lead, id, align = 'left', tone = 'light', className }: Props) {
  const night = tone === 'night'
  return (
    <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      <Reveal>
        <p className={cn('eyebrow', night && '!text-night-ink-2')}>{eyebrow}</p>
      </Reveal>
      <Reveal index={1}>
        <h2 id={id} className={cn('mt-5 text-h2 font-semibold', night ? 'text-night-ink' : 'text-ink')}>
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal index={2}>
          <p className={cn('mt-6 text-lead', night ? 'text-night-ink-2' : 'text-ink-2', align === 'center' && 'mx-auto max-w-xl')}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
