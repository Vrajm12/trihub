import { useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * The Trihub mark: three faces of one cube, separated by the Y-shaped seam
 * from the brand logo. The 3D core in the hero is built from the same geometry.
 */
export function LogoMark({ className, mono = false }: { className?: string; mono?: boolean }) {
  const id = useId()
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <mask id={id}>
          <rect width="32" height="32" fill="#fff" />
          <path d="M16 17 4 10M16 17l12-7M16 17v14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask={`url(#${id})`} strokeLinejoin="round" strokeWidth="1.2">
        <path d="M16 4l11.26 6.5L16 17 4.74 10.5z" className={mono ? 'fill-current stroke-current opacity-60' : 'fill-accent stroke-accent'} />
        <path d="M4.74 10.5 16 17v13L4.74 23.5z" className="fill-current stroke-current" />
        <path d="M16 17l11.26-6.5v13L16 30z" className="fill-current stroke-current opacity-75" />
      </g>
    </svg>
  )
}

export function Logo({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', tone === 'light' ? 'text-night-ink' : 'text-ink', className)}>
      <LogoMark className="h-[26px] w-[26px]" />
      <span className="text-[1.3125rem] font-semibold tracking-[-0.04em] leading-none">trihub</span>
    </span>
  )
}
