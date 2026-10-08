import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  FileSpreadsheet,
  MessageCircle,
  Mail,
  Users,
  Calculator,
  UserRound,
  Package,
  ChartLine,
  type LucideIcon,
} from 'lucide-react'
import { LogoMark } from '@/components/ui/Logo'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface Tool {
  name: string
  icon: LucideIcon
  issue: string
  synced: string
  /** scattered position (% of stage), rotation (deg) and depth scale */
  from: [number, number, number, number]
}

const tools: Tool[] = [
  { name: 'Spreadsheet', icon: FileSpreadsheet, issue: 'Leads_final_v3.xlsx', synced: 'Leads in pipeline', from: [12, 22, -9, 0.92] },
  { name: 'WhatsApp', icon: MessageCircle, issue: '38 unread · not logged', synced: 'On deal timeline', from: [84, 16, 7, 1] },
  { name: 'Email', icon: Mail, issue: 'Re: Fwd: Revised quote', synced: 'Threaded to account', from: [64, 82, -6, 0.95] },
  { name: 'CRM', icon: Users, issue: '212 duplicate contacts', synced: 'One customer record', from: [30, 70, 10, 0.88] },
  { name: 'Accounting', icon: Calculator, issue: 'Invoice not linked to deal', synced: 'Raised from won deal', from: [90, 58, -11, 0.9] },
  { name: 'HR', icon: UserRound, issue: 'Leave tracker (shared sheet)', synced: 'Roles and access', from: [8, 56, 5, 0.97] },
  { name: 'Inventory', icon: Package, issue: 'Stock count mismatch', synced: 'Live across locations', from: [44, 30, 4, 0.9] },
  { name: 'Analytics', icon: ChartLine, issue: 'Report updated 9 days ago', synced: 'Live dashboard', from: [70, 38, -4, 0.86] },
]

function ToolCard({ tool, i, progress, compact }: { tool: Tool; i: number; progress: MotionValue<number>; compact: boolean }) {
  const n = tools.length
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2
  const rx = compact ? 29 : 34
  const ry = compact ? 36 : 33
  const to = [50 + Math.cos(angle) * rx, 52 + Math.sin(angle) * ry]
  const [fx, fy, frot, fscale] = tool.from

  const a = 0.14 + i * 0.012
  const b = 0.56 + i * 0.012
  const left = useTransform(progress, [a, b], [`${fx}%`, `${to[0]}%`])
  const top = useTransform(progress, [a, b], [`${fy}%`, `${to[1]}%`])
  const rotate = useTransform(progress, [a, b], [frot, 0])
  const rotateX = useTransform(progress, [a, b], [i % 2 ? 18 : -14, 0])
  const scale = useTransform(progress, [a, b], [fscale, 1])
  const issue = useTransform(progress, [0.6, 0.72], [1, 0])
  const ok = useTransform(progress, [0.66, 0.78], [0, 1])

  const Icon = tool.icon
  return (
    <motion.div className="absolute" style={{ left, top }}>
      <motion.div
        style={{ rotate, rotateX, scale }}
        className="card -translate-x-1/2 -translate-y-1/2 shadow-md [transform-style:preserve-3d]"
      >
        <div className={compact ? 'flex w-[128px] items-center gap-2 p-2.5' : 'w-[214px] p-3.5'}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-surface-2 text-ink">
              <Icon size={15} strokeWidth={1.9} />
            </span>
            <span className="text-[0.8125rem] font-semibold tracking-[-0.01em]">{tool.name}</span>
          </div>
          {compact && (
            <span className="relative ml-auto h-1.5 w-1.5 shrink-0">
              <motion.span style={{ opacity: issue }} className="absolute inset-0 rounded-full bg-caution" />
              <motion.span style={{ opacity: ok }} className="absolute inset-0 rounded-full bg-positive" />
            </span>
          )}
          {!compact && (
            <div className="relative mt-3 h-[22px]">
              <motion.span
                style={{ opacity: issue }}
                className="absolute inset-0 flex items-center gap-1.5 truncate text-[0.75rem] text-caution"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-caution" />
                {tool.issue}
              </motion.span>
              <motion.span
                style={{ opacity: ok }}
                className="absolute inset-0 flex items-center gap-1.5 truncate text-[0.75rem] text-positive"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-positive" />
                {tool.synced}
              </motion.span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Link({ i, progress, compact }: { i: number; progress: MotionValue<number>; compact: boolean }) {
  const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2
  const rx = compact ? 29 : 34
  const ry = compact ? 36 : 33
  const pathLength = useTransform(progress, [0.58 + i * 0.01, 0.74 + i * 0.01], [0, 1])
  return (
    <motion.line
      x1="50%"
      y1="52%"
      x2={`${50 + Math.cos(angle) * rx}%`}
      y2={`${52 + Math.sin(angle) * ry}%`}
      stroke="currentColor"
      strokeWidth={1}
      style={{ pathLength }}
    />
  )
}

export function Problem() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const settled = useMotionValue(1)
  const p = reduced ? settled : scrollYProgress

  const headA = useTransform(p, [0.32, 0.46], [1, 0])
  const headAy = useTransform(p, [0.32, 0.46], [0, -24])
  const headB = useTransform(p, [0.62, 0.76], [0, 1])
  const headBy = useTransform(p, [0.62, 0.76], [24, 0])
  const coreScale = useTransform(p, [0.42, 0.62], [0.4, 1])
  const coreOpacity = useTransform(p, [0.42, 0.56], [0, 1])
  const pulse = useTransform(p, [0.74, 0.9], [0, 1])
  const pulseScale = useTransform(pulse, [0, 1], [0.8, 1.35])

  return (
    <section
      ref={ref}
      id="problem"
      aria-labelledby="problem-title"
      className={reduced ? 'relative' : 'relative h-[280vh]'}
    >
      <div className={reduced ? 'relative h-[100svh] min-h-[640px]' : 'sticky top-0 h-[100svh] min-h-[640px] overflow-hidden'}>
        {/* Headline — swaps from the problem to the resolution */}
        <div className="container-x relative z-20 pt-[calc(var(--nav-h)+3rem)] text-center">
          <p className="eyebrow">The problem</p>
          <div className="relative mx-auto mt-5 max-w-3xl">
            <motion.h2
              id="problem-title"
              style={{ opacity: headA, y: headAy }}
              className="text-h2 font-semibold"
            >
              Your business shouldn’t run across ten different tools.
            </motion.h2>
            <motion.div style={{ opacity: headB, y: headBy }} className="absolute inset-x-0 top-0">
              <p className="text-h2 font-semibold tracking-[-0.032em] text-ink">Bring the workflow together.</p>
              <p className="mx-auto mt-4 max-w-md text-lead text-ink-2">
                One record for every customer, order and invoice — shared by every team.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stage */}
        <div className="stage-3d absolute inset-x-0 bottom-0 top-[calc(var(--nav-h)+11rem)] md:top-[calc(var(--nav-h)+9rem)]">
          <div className="container-x relative h-full">
            <svg aria-hidden className="absolute inset-0 h-full w-full text-accent/40">
              {tools.map((_, i) => (
                <Link key={i} i={i} progress={p} compact={compact} />
              ))}
            </svg>

            <motion.div
              aria-hidden
              style={{ scale: coreScale, opacity: coreOpacity }}
              className="absolute left-1/2 top-[52%] z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.span
                style={{ opacity: pulse, scale: pulseScale }}
                className="absolute inset-0 rounded-[24px] ring-1 ring-accent/25"
              />
              <div className="relative grid h-[92px] w-[92px] place-items-center rounded-[24px] bg-night shadow-float md:h-[112px] md:w-[112px]">
                <LogoMark className="h-11 w-11 text-white md:h-14 md:w-14" />
              </div>
              <p className="mt-3 text-center text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-2">TRIHUB</p>
            </motion.div>

            <ul aria-label="Tools Trihub replaces or connects" className="absolute inset-0">
              {tools.map((t, i) => (
                <li key={t.name}>
                  <ToolCard tool={t} i={i} progress={p} compact={compact} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
