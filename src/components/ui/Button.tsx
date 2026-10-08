import { useRef, type ReactNode, type MouseEventHandler } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useFinePointer } from '@/hooks/useMediaQuery'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-white shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_1px_2px_rgb(17_19_24/0.2),0_8px_20px_-8px_rgb(17_19_24/0.45)] hover:bg-[#1c1f26]',
  secondary: 'bg-surface text-ink ring-1 ring-line-strong shadow-xs hover:ring-ink/25',
  ghost: 'text-ink-2 hover:text-ink hover:bg-ink/[0.04]',
  light: 'bg-white text-ink shadow-[0_1px_2px_rgb(0_0_0/0.3)] hover:bg-[#f1f2f5]',
  'outline-light': 'text-night-ink ring-1 ring-night-line-strong hover:ring-white/30 hover:bg-white/[0.04]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.875rem] gap-1.5',
  md: 'h-11 px-5 text-[0.9375rem] gap-2',
  lg: 'h-[52px] px-6 text-[1rem] gap-2',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  magnetic?: boolean
  type?: 'button' | 'submit'
  'aria-label'?: string
  disabled?: boolean
}

/**
 * Magnetic button: on fine pointers the button drifts a few pixels toward the
 * cursor and its label follows slightly further, which reads as depth.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  magnetic = true,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const active = magnetic && fine && !reduced

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 })
  const lx = useTransform(x, (v) => v * 0.45)
  const ly = useTransform(y, (v) => v * 0.45)

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const classes = cn(
    'relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.01em]',
    'transition-[background-color,box-shadow,color] duration-200 ease-[var(--ease-standard)]',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  const inner = (
    <motion.span className="inline-flex items-center gap-[inherit]" style={active ? { x: lx, y: ly } : undefined}>
      {children}
    </motion.span>
  )

  const common = {
    className: classes,
    style: active ? { x, y } : undefined,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    whileTap: { scale: 0.975 },
    onClick,
    ...rest,
  }

  if (href) {
    return (
      <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...common}>
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type={type} disabled={disabled} {...common}>
      {inner}
    </motion.button>
  )
}
