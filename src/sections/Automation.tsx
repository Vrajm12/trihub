import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  UserPlus,
  Filter,
  UserRound,
  MessageCircle,
  Timer,
  Trophy,
  Receipt,
  Check,
  RotateCcw,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'

interface Node {
  kind: 'Trigger' | 'Condition' | 'Action' | 'Wait' | 'Update'
  title: string
  config: string
  icon: LucideIcon
  log: { time: string; text: string }
}

const nodes: Node[] = [
  {
    kind: 'Trigger',
    title: 'New Lead',
    config: 'Website form submitted',
    icon: UserPlus,
    log: { time: '10:42:03', text: 'Lead created — Meera Textiles, Surat' },
  },
  {
    kind: 'Condition',
    title: 'Qualification',
    config: 'Budget ≥ ₹2L and in service region',
    icon: Filter,
    log: { time: '10:42:03', text: 'Qualified — budget ₹6.5L, West region' },
  },
  {
    kind: 'Action',
    title: 'Assign Sales Rep',
    config: 'Round-robin · West team',
    icon: UserRound,
    log: { time: '10:42:04', text: 'Assigned to Ananya K.' },
  },
  {
    kind: 'Action',
    title: 'WhatsApp Message',
    config: 'Template: intro_with_brochure',
    icon: MessageCircle,
    log: { time: '10:42:06', text: 'WhatsApp delivered and read' },
  },
  {
    kind: 'Wait',
    title: 'Follow-up',
    config: 'No reply in 2 days → call task',
    icon: Timer,
    log: { time: 'Day 3 · 11:00', text: 'Call task created and completed' },
  },
  {
    kind: 'Update',
    title: 'Conversion',
    config: 'Stage → Won when PO is attached',
    icon: Trophy,
    log: { time: 'Day 9 · 16:20', text: 'Deal won — ₹6.5L' },
  },
  {
    kind: 'Action',
    title: 'Invoice',
    config: 'Create GST invoice and email it',
    icon: Receipt,
    log: { time: 'Day 9 · 16:20', text: 'Invoice INV-2107 emailed to Meera Textiles' },
  },
]

const STEP_MS = 1100

function useRun(inView: boolean, reduced: boolean) {
  const [step, setStep] = useState(reduced ? nodes.length : -1)
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    if (reduced) {
      setStep(nodes.length)
      return
    }
    if (!inView) return
    let i = -1
    setStep(-1)
    let timer = window.setTimeout(function tick() {
      i += 1
      setStep(i)
      if (i < nodes.length) timer = window.setTimeout(tick, STEP_MS)
      else timer = window.setTimeout(() => setRunId((r) => r + 1), 3200) // loop
    }, 500)
    return () => window.clearTimeout(timer)
  }, [inView, reduced, runId])

  return { step, replay: () => setRunId((r) => r + 1) }
}

function Connector({ done, running }: { done: boolean; running: boolean }) {
  return (
    <div className="relative ml-[27px] h-7 w-px bg-line-strong" aria-hidden>
      <span
        className={cn(
          'absolute inset-x-0 top-0 origin-top bg-accent transition-transform ease-[var(--ease-in-out-quint)]',
          done ? 'h-full scale-y-100 duration-500' : 'h-full scale-y-0 duration-0',
        )}
      />
      {running && (
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 animate-[packet_0.9s_var(--ease-in-out-quint)_infinite] rounded-full bg-accent" />
      )}
    </div>
  )
}

export function Automation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px' })
  const reduced = !!useReducedMotion()
  const { step, replay } = useRun(inView, reduced)
  const finished = step >= nodes.length

  return (
    <section id="automation" aria-labelledby="automation-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          id="automation-title"
          eyebrow="Automation"
          title="Let workflows run themselves."
          lead="Triggers, conditions and actions across CRM, communication and finance. This is a real workflow, running — from a website enquiry to a sent invoice."
        />

        <Reveal index={1} className="mt-14 lg:mt-20">
          <div ref={ref} className="card overflow-hidden shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="text-[0.875rem] font-semibold">Website lead → Invoice</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-positive-soft px-2.5 py-0.5 text-[0.75rem] font-medium text-positive">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive" /> Active
                </span>
              </div>
              <button
                onClick={replay}
                className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] font-medium text-ink-2 ring-1 ring-line-strong transition-colors hover:text-ink"
              >
                <RotateCcw size={13} /> Replay run
              </button>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px]">
              {/* Canvas */}
              <div className="dot-grid relative px-4 py-8 sm:px-10 sm:py-10">
                <ol aria-label="Workflow steps" className="relative mx-auto max-w-[520px] xl:ml-[6%] xl:mr-auto xl:max-w-[460px]">
                  {nodes.map((n, i) => {
                    const state = step > i ? 'done' : step === i ? 'running' : 'idle'
                    const Icon = n.icon
                    return (
                      <li key={n.title}>
                        {i > 0 && <Connector done={step >= i} running={state === 'running'} />}
                        <div className="relative flex items-center gap-3">
                          <div
                            className={cn(
                              'flex min-w-0 flex-1 items-center gap-3.5 rounded-[14px] bg-surface p-2.5 pr-4 ring-1 transition-[box-shadow,transform] duration-500',
                              state === 'running'
                                ? 'shadow-[0_0_0_4px_rgb(79_70_229/0.1),var(--shadow-md)] ring-accent/60 sm:-translate-y-0.5'
                                : 'shadow-xs ring-line',
                            )}
                          >
                            <span
                              className={cn(
                                'grid h-9 w-9 shrink-0 place-items-center rounded-[10px] transition-colors duration-500',
                                state === 'idle' ? 'bg-surface-2 text-ink-2' : 'bg-accent text-white',
                              )}
                            >
                              <Icon size={16} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-ink-2">{n.kind}</p>
                              <p className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em]">{n.title}</p>
                            </div>
                            <p className="hidden max-w-[44%] truncate text-right text-[0.8125rem] text-ink-2 sm:block">{n.config}</p>
                            <span className="grid h-5 w-5 shrink-0 place-items-center">
                              {state === 'done' && <Check size={15} className="text-positive" />}
                              {state === 'running' && <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />}
                            </span>
                          </div>

                          {/* "No" branch from the condition — shown, not taken */}
                          {i === 1 && (
                            <div className="absolute left-full top-1/2 hidden -translate-y-1/2 items-center xl:flex">
                              <span className="h-px w-8 border-t border-dashed border-line-strong" />
                              <div className="ml-0 flex w-[170px] items-center gap-2.5 rounded-[12px] bg-surface/70 p-2 pr-3 opacity-70 ring-1 ring-line">
                                <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-surface-2 text-ink-2">
                                  <Mail size={13} />
                                </span>
                                <div>
                                  <p className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-ink-2">If no</p>
                                  <p className="text-[0.8125rem] font-medium">Nurture sequence</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Run log */}
              <div className="border-t border-line bg-canvas/60 lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between px-5 py-3.5">
                  <p className="text-[0.8125rem] font-semibold">Run log</p>
                  <p className="text-[0.75rem] text-ink-2" aria-live="polite">
                    {finished ? 'Completed · 7 of 7 steps' : step < 0 ? 'Waiting for trigger' : `Running · step ${step + 1} of 7`}
                  </p>
                </div>
                <ol className="space-y-px px-3 pb-4 font-mono text-[0.75rem] lg:min-h-[420px]">
                  <AnimatePresence initial={false}>
                    {nodes.slice(0, Math.max(0, Math.min(step + 1, nodes.length))).map((n) => (
                      <motion.li
                        key={n.title}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: ease.outExpo }}
                        className="flex gap-3 rounded-[8px] px-2 py-2"
                      >
                        <span className="w-[92px] shrink-0 text-ink-2">{n.log.time}</span>
                        <span className="text-ink">{n.log.text}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ol>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            ['Built visually', 'Operations teams can read and adjust workflows without writing code.'],
            ['Runs across modules', 'One workflow can touch CRM, WhatsApp, finance and HR records.'],
            ['Every run is logged', 'See exactly what happened, when, and to which record.'],
          ].map(([t, d], i) => (
            <Reveal key={t} index={i}>
              <h3 className="text-[1rem] font-semibold">{t}</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
