import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ShoppingCart, Package, Cog, UserRound, FolderKanban, Wallet, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import { useIsDesktop } from '@/hooks/useMediaQuery'

interface Step {
  module: string
  icon: LucideIcon
  record: string
  title: string
  detail: string
  visual: 'rows' | 'stock' | 'progress' | 'people' | 'gantt' | 'ledger'
}

/** One purchase moving through the whole operation — top plate to bottom plate. */
const steps: Step[] = [
  {
    module: 'Procurement',
    icon: ShoppingCart,
    record: 'PO-1182',
    title: 'Purchase order approved',
    detail: '240 sheets of 2 mm stainless steel from Deccan Metals, ₹3.1L. Approved by the plant head in one tap.',
    visual: 'rows',
  },
  {
    module: 'Inventory',
    icon: Package,
    record: 'GRN-0921',
    title: 'Goods received at Pune warehouse',
    detail: 'Stock updates the moment the receipt is posted. Batch B-0921 is now available to production.',
    visual: 'stock',
  },
  {
    module: 'Operations',
    icon: Cog,
    record: 'WO-554',
    title: 'Work order released',
    detail: 'Material is reserved for three production runs. Planned completion moves forward by two days.',
    visual: 'progress',
  },
  {
    module: 'HR',
    icon: UserRound,
    record: 'Roster W46',
    title: 'Shift roster published',
    detail: '12 operators assigned across two shifts. Attendance flows back to payroll inputs automatically.',
    visual: 'people',
  },
  {
    module: 'Projects',
    icon: FolderKanban,
    record: 'Project Kestrel',
    title: 'Job costing updated',
    detail: 'Material and labour are posted to the project, so margin is visible before the invoice — not after.',
    visual: 'gantt',
  },
  {
    module: 'Finance',
    icon: Wallet,
    record: 'BILL-3307',
    title: 'Vendor bill matched and scheduled',
    detail: 'Three-way match against the PO and goods receipt. The payable is scheduled; nobody re-types a number.',
    visual: 'ledger',
  },
]

const PLATE_W = 340
const PLATE_H = 214

function PlateVisual({ kind, on }: { kind: Step['visual']; on: boolean }) {
  const bar = on ? 'bg-accent' : 'bg-white/20'
  switch (kind) {
    case 'rows':
      return (
        <div className="space-y-1.5">
          {[['PO-1182', '₹3.1L', 'Approved'], ['PO-1181', '₹0.8L', 'Sent'], ['PO-1179', '₹1.4L', 'Received']].map(([a, b, c], k) => (
            <div key={a} className="flex justify-between rounded-[6px] bg-white/[0.04] px-2.5 py-1.5 text-[11px]">
              <span className="text-night-ink">{a}</span>
              <span className="num text-night-ink-2">{b}</span>
              <span className={k === 0 && on ? 'text-[#A5B4FC]' : 'text-night-ink-2'}>{c}</span>
            </div>
          ))}
        </div>
      )
    case 'stock':
      return (
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: 12 }, (_, k) => (
            <span key={k} className={cn('h-6 rounded-[5px]', k < 4 ? bar : 'bg-white/[0.07]')} />
          ))}
        </div>
      )
    case 'progress':
      return (
        <div className="space-y-2.5">
          {[0.82, 0.46, 0.18].map((v, k) => (
            <div key={k} className="h-2 rounded-full bg-white/[0.07]">
              <div className={cn('h-2 rounded-full', k === 0 ? bar : 'bg-white/20')} style={{ width: `${v * 100}%` }} />
            </div>
          ))}
        </div>
      )
    case 'people':
      return (
        <div className="flex -space-x-1.5">
          {['AK', 'RS', 'MJ', 'PN', 'VD', 'SK', '+6'].map((i, k) => (
            <span
              key={i}
              className={cn(
                'grid h-7 w-7 place-items-center rounded-full text-[9px] font-semibold ring-2 ring-night-2',
                k === 0 && on ? 'bg-accent text-white' : 'bg-night-3 text-night-ink-2',
              )}
            >
              {i}
            </span>
          ))}
        </div>
      )
    case 'gantt':
      return (
        <div className="space-y-1.5">
          {[[0, 46], [28, 40], [52, 44]].map(([x, w], k) => (
            <div key={k} className="relative h-2.5">
              <span className={cn('absolute h-2.5 rounded-full', k === 1 ? bar : 'bg-white/20')} style={{ left: `${x}%`, width: `${w}%` }} />
            </div>
          ))}
        </div>
      )
    case 'ledger':
      return (
        <div className="flex items-end gap-1.5">
          {[30, 42, 36, 54, 48, 62, 58].map((h, k) => (
            <span key={k} className={cn('w-full rounded-t-[4px]', k === 6 ? bar : 'bg-white/[0.12]')} style={{ height: h * 0.55 }} />
          ))}
        </div>
      )
  }
}

function Plate({ step, level, spread, active }: { step: Step; level: number; spread: MotionValue<number>; active: boolean }) {
  const z = useTransform(spread, (s) => level * s)
  const Icon = step.icon
  return (
    <motion.div className="preserve-3d absolute left-0 top-0" style={{ z, width: PLATE_W, height: PLATE_H }}>
      <div
        className={cn(
          'h-full w-full rounded-[18px] border p-4 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[var(--ease-out-expo)]',
          active
            ? 'border-accent/70 bg-[#15182a] shadow-[0_0_0_1px_rgb(79_70_229/0.35),0_40px_80px_-30px_rgb(79_70_229/0.55)]'
            : 'border-night-line-strong bg-night-2/95 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]',
        )}
        style={{ transform: `translateZ(${active ? 22 : 0}px)` }}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-night-ink">
            <span className={cn('grid h-6 w-6 place-items-center rounded-[7px]', active ? 'bg-accent text-white' : 'bg-white/[0.06] text-night-ink-2')}>
              <Icon size={13} />
            </span>
            {step.module}
          </span>
          <span className={cn('text-[10.5px]', active ? 'text-[#A5B4FC]' : 'text-night-ink-2')}>{step.record}</span>
        </div>
        <div className="mt-4">
          <PlateVisual kind={step.visual} on={active} />
        </div>
      </div>
    </motion.div>
  )
}

function Pillar({ x, y, spread, top }: { x: number; y: number; spread: MotionValue<number>; top: number }) {
  const height = useTransform(spread, (s) => s * top)
  return (
    <motion.div
      aria-hidden
      className="absolute w-px origin-top bg-gradient-to-b from-accent/70 to-accent/10"
      style={{ left: x, top: y, height, transform: 'rotateX(90deg)' }}
    />
  )
}

function StepItem({ step, index, active, onActive }: { step: Step; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  // On small screens the sticky visual covers the top half, so the trigger band sits lower.
  const desktop = useIsDesktop()
  const inView = useInView(ref, { margin: desktop ? '-48% 0px -48% 0px' : '-66% 0px -30% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])
  const Icon = step.icon
  return (
    <li ref={ref} className="flex min-h-[44vh] items-center lg:min-h-[62vh]">
      <div className={cn('transition-opacity duration-500', active ? 'opacity-100' : 'opacity-35')}>
        <p className="flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.14em] text-night-ink-2">
          <span className="num text-night-ink">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-night-line-strong" />
          <Icon size={14} />
          {step.module.toUpperCase()}
        </p>
        <h3 className="mt-4 text-h3 font-semibold text-night-ink">{step.title}</h3>
        <p className="mt-3 max-w-md text-night-ink-2">{step.detail}</p>
        <span className="mt-5 inline-flex h-7 items-center rounded-full border border-night-line-strong px-3 font-mono text-[0.75rem] text-night-ink">
          {step.record}
        </span>
      </div>
    </li>
  )
}

export function Erp() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const spread = useTransform(scrollYProgress, [0.25, 1], reduced ? [58, 58] : [12, 58])
  const n = steps.length

  return (
    <section id="erp" ref={ref} data-nav="dark" aria-labelledby="erp-title" className="relative bg-night text-night-ink">
      <div className="dot-grid-night pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="container-x relative pt-[var(--section-y)]">
        <SectionHeading
          tone="night"
          id="erp-title"
          eyebrow="ERP"
          title="Run operations without the chaos."
          lead="Procurement, inventory, operations, people, projects and finance — six modules, one record. Follow a single purchase order as it moves through the business."
        />
      </div>

      <div className="container-x relative grid pb-[var(--section-y)] lg:grid-cols-2 lg:gap-12">
        {/* Visual — sticky while the steps scroll */}
        <div className="sticky top-[var(--nav-h)] z-10 -mx-[var(--gutter)] h-[340px] bg-night/90 backdrop-blur-sm sm:h-[400px] lg:order-2 lg:top-[12vh] lg:mx-0 lg:h-[76vh] lg:bg-transparent lg:backdrop-blur-none">
          <div className="absolute inset-0 grid place-items-center" style={{ perspective: 2600 }} aria-hidden>
            <div className="scale-[0.62] sm:scale-[0.78] lg:scale-[0.92] xl:scale-100">
              <div
                className="preserve-3d relative"
                style={{ width: PLATE_W, height: PLATE_H, transform: 'rotateX(57deg) rotateZ(-40deg) translateZ(-120px)' }}
              >
                <Pillar x={14} y={PLATE_H - 14} spread={spread} top={n - 1} />
                <Pillar x={PLATE_W - 14} y={14} spread={spread} top={n - 1} />
                {steps.map((s, i) => (
                  <Plate key={s.module} step={s} level={n - 1 - i} spread={spread} active={i === active} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ol className="relative lg:order-1">
          {steps.map((s, i) => (
            <StepItem key={s.module} step={s} index={i} active={i === active} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  )
}
