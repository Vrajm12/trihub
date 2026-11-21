import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Calculator, MessageCircle, Users, Workflow, type LucideIcon } from 'lucide-react'
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface Handoff {
  name: string
  icon: LucideIcon
  before: string
  after: string
  from: [number, number]
  to: [number, number]
  rotation: number
}

const handoffs: Handoff[] = [
  {
    name: 'CRM',
    icon: Users,
    before: 'Duplicate contact',
    after: 'One customer record',
    from: [19, 28],
    to: [14, 43],
    rotation: -7,
  },
  {
    name: 'Automation',
    icon: Workflow,
    before: 'Follow-up left to memory',
    after: 'Owner assigned automatically',
    from: [80, 24],
    to: [38, 43],
    rotation: 6,
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    before: 'Reply missing from CRM',
    after: 'Message on the timeline',
    from: [24, 76],
    to: [62, 43],
    rotation: 5,
  },
  {
    name: 'Finance',
    icon: Calculator,
    before: 'Invoice retyped by hand',
    after: 'Invoice from the won deal',
    from: [82, 72],
    to: [86, 43],
    rotation: -6,
  },
]

const compactTo: readonly [number, number][] = [
  [25, 36],
  [75, 36],
  [75, 69],
  [25, 69],
]
const compactFrom: readonly [number, number][] = [
  [24, 34],
  [76, 31],
  [24, 70],
  [76, 74],
]

function HandoffCard({
  handoff,
  progress,
  compact,
  index,
}: {
  handoff: Handoff
  progress: MotionValue<number>
  compact: boolean
  index: number
}) {
  const from = compact ? compactFrom[index] : handoff.from
  const to = compact ? compactTo[index] : handoff.to
  const left = useTransform(progress, [0.12, 0.7], [`${from[0]}%`, `${to[0]}%`])
  const top = useTransform(progress, [0.12, 0.7], [`${from[1]}%`, `${to[1]}%`])
  const rotate = useTransform(progress, [0.12, 0.7], [handoff.rotation, 0])
  const rotateX = useTransform(progress, [0.12, 0.7], [index % 2 ? -12 : 12, 0])
  const scale = useTransform(progress, [0.12, 0.7], [0.94, 1])
  const disconnected = useTransform(progress, [0.4, 0.66], [1, 0])
  const connected = useTransform(progress, [0.52, 0.78], [0, 1])
  const Icon = handoff.icon

  return (
    <motion.li className="absolute z-10" style={{ left, top }}>
      <motion.div
        style={{ rotate, rotateX, scale }}
        className={`card relative ${compact ? 'w-[min(40vw,220px)]' : 'w-[min(20vw,220px)]'} -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white/95 p-3 shadow-md sm:p-4 [transform-style:preserve-3d] will-change-transform`}
      >
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-surface-2 text-ink">
            <Icon size={16} strokeWidth={1.9} />
          </span>
          <span className="truncate text-[0.8125rem] font-semibold tracking-[-0.01em] sm:text-[0.9375rem]">{handoff.name}</span>
        </div>
        <div className="relative mt-3 h-8 overflow-hidden border-t border-line pt-2">
          <motion.span
            style={{ opacity: disconnected }}
            className="absolute inset-x-0 top-2 flex min-w-0 items-center gap-1.5 truncate text-[0.6875rem] text-caution sm:text-[0.75rem]"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-caution" />
            {handoff.before}
          </motion.span>
          <motion.span
            style={{ opacity: connected }}
            className="absolute inset-x-0 top-2 flex min-w-0 items-center gap-1.5 truncate text-[0.6875rem] font-medium text-positive sm:text-[0.75rem]"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-positive" />
            {handoff.after}
          </motion.span>
        </div>
      </motion.div>
    </motion.li>
  )
}

function Connection({
  index,
  progress,
  compact,
}: {
  index: number
  progress: MotionValue<number>
  compact: boolean
}) {
  const positions = compact ? compactTo : handoffs.map((handoff) => handoff.to)
  const from = positions[index]
  const to = positions[index + 1]
  const connected = useTransform(progress, [0.28 + index * 0.025, 0.7], [0, 1])

  return (
    <motion.line
      x1={`${from[0]}%`}
      y1={`${from[1]}%`}
      x2={`${to[0]}%`}
      y2={`${to[1]}%`}
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeDasharray="5 6"
      style={{ pathLength: connected, opacity: connected }}
    />
  )
}

export function Problem() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const compact = useMediaQuery('(max-width: 1023px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const settled = useMotionValue(1)
  const easedScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.45,
    restDelta: 0.001,
  })
  const progress = reduced ? settled : easedScrollProgress

  const problemOpacity = useTransform(progress, [0.3, 0.56], [1, 0])
  const problemY = useTransform(progress, [0.3, 0.56], [0, -14])
  const solutionOpacity = useTransform(progress, [0.46, 0.7], [0, 1])
  const solutionY = useTransform(progress, [0.46, 0.7], [14, 0])
  const packetLeft = useTransform(progress, [0.5, 0.64, 0.78, 0.91], compact ? ['25%', '75%', '75%', '25%'] : ['14%', '38%', '62%', '86%'])
  const packetTop = useTransform(progress, [0.5, 0.64, 0.78, 0.91], compact ? ['36%', '36%', '69%', '69%'] : ['43%', '43%', '43%', '43%'])
  const packetOpacity = useTransform(progress, [0.46, 0.54, 0.88, 0.94], [0, 1, 1, 0])
  const messyStatus = useTransform(progress, [0.32, 0.55], [1, 0])
  const connectedStatus = useTransform(progress, [0.48, 0.72], [0, 1])
  const connections = handoffs.length - 1

  return (
    <section
      ref={ref}
      id="problem"
      aria-labelledby="problem-title"
      className={reduced ? 'relative py-20 md:py-28' : 'relative h-[260vh]'}
    >
      <div className={reduced ? 'relative min-h-[760px] sm:min-h-[680px]' : 'sticky top-0 h-[100svh] min-h-[640px] overflow-hidden'}>
        <div className="container-x relative z-20 pt-[calc(var(--nav-h)+2.5rem)] text-center">
          <p className="eyebrow">The problem</p>
          <div className="relative mx-auto mt-5 min-h-[7.5rem] max-w-3xl sm:min-h-[8rem]">
            <motion.div style={{ opacity: problemOpacity, y: problemY }} className="absolute inset-x-0 top-0">
              <h2 id="problem-title" className="text-h2 font-semibold">
                One new lead. Four disconnected handoffs.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] text-ink-2 sm:text-lead">
                Follow Meera Textiles as the enquiry moves from sales to a sent invoice.
              </p>
            </motion.div>
            <motion.div style={{ opacity: solutionOpacity, y: solutionY }} className="absolute inset-x-0 top-0">
              <h2 className="text-h2 font-semibold">One enquiry. One connected workflow.</h2>
              <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] text-ink-2 sm:text-lead">
                A single customer record carries its context from first reply to finance.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="stage-3d absolute inset-x-0 bottom-0 top-[calc(var(--nav-h)+13rem)] sm:top-[calc(var(--nav-h)+12rem)]">
          <div className="container-x relative h-full">
            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              {Array.from({ length: connections }, (_, index) => (
                <Connection key={index} index={index} progress={progress} compact={compact} />
              ))}
            </svg>

            <motion.div
              aria-hidden
              style={{ left: packetLeft, top: packetTop, opacity: packetOpacity }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_0_5px_rgb(79_70_229/0.14),0_0_22px_rgb(79_70_229/0.38)]" />
            </motion.div>

            <motion.div
              aria-hidden
              style={{ opacity: connectedStatus }}
              className="absolute left-1/2 top-[16%] z-20 -translate-x-1/2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-positive/15 bg-white/90 px-3 py-1.5 text-[0.6875rem] font-medium text-positive shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                One live customer record
              </span>
            </motion.div>

            <motion.div
              aria-hidden
              style={{ opacity: messyStatus }}
              className="absolute left-1/2 top-[16%] z-20 -translate-x-1/2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-caution/15 bg-white/90 px-3 py-1.5 text-[0.6875rem] font-medium text-ink-2 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-caution" />
                Context lost at every handoff
              </span>
            </motion.div>

            <ul aria-label="One enquiry passing through four connected business stages" className="absolute inset-0">
              {handoffs.map((handoff, index) => (
                <HandoffCard
                  key={handoff.name}
                  handoff={handoff}
                  index={index}
                  progress={progress}
                  compact={compact}
                />
              ))}
            </ul>

            <p className="absolute inset-x-0 bottom-3 px-4 text-center text-[0.6875rem] text-ink-2 sm:bottom-5 sm:text-[0.75rem]">
              Separate records and manual handoffs become one shared customer journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
