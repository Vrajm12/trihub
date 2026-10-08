import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { LogoMark } from '@/components/ui/Logo'
import { industries } from '@/data/industries'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'

const corners = [
  [24, 22],
  [76, 22],
  [24, 78],
  [76, 78],
] as const

export function Industries() {
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const ind = industries[index]

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = industries.length
    const next = ['ArrowDown', 'ArrowRight'].includes(e.key) ? (i + 1) % n : ['ArrowUp', 'ArrowLeft'].includes(e.key) ? (i - 1 + n) % n : null
    if (next === null) return
    e.preventDefault()
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="industries" aria-labelledby="industries-title" className="section-y relative bg-surface">
      <div className="container-x">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          title="Configured for how your industry works."
          lead="The same connected platform, arranged around the records and steps that matter in your business."
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <LayoutGroup>
              <div
                role="tablist"
                aria-label="Industries"
                aria-orientation="vertical"
                className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0"
              >
                {industries.map((it, i) => {
                  const active = i === index
                  const Icon = it.icon
                  return (
                    <button
                      key={it.id}
                      ref={(el) => void (tabs.current[i] = el)}
                      role="tab"
                      id={`ind-tab-${it.id}`}
                      aria-selected={active}
                      aria-controls="industry-panel"
                      tabIndex={active ? 0 : -1}
                      onClick={() => setIndex(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={cn(
                        'relative flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-left text-[0.9375rem] font-medium transition-colors lg:rounded-[14px] lg:py-3.5',
                        active ? 'text-ink' : 'text-ink-2 hover:text-ink',
                        !active && 'ring-1 ring-line lg:ring-0',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="industry-pill"
                          className="absolute inset-0 rounded-full bg-canvas ring-1 ring-line-strong lg:rounded-[14px]"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        />
                      )}
                      <Icon size={17} className="relative" />
                      <span className="relative whitespace-nowrap">{it.label}</span>
                      {active && <ArrowRight size={15} className="relative ml-auto hidden text-ink-2 lg:block" />}
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          </Reveal>

          <Reveal index={1} className="lg:col-span-8">
            <div
              id="industry-panel"
              role="tabpanel"
              aria-labelledby={`ind-tab-${ind.id}`}
              className="dot-grid relative overflow-hidden rounded-xl bg-canvas p-6 ring-1 ring-line sm:p-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.h3
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: ease.outExpo }}
                    className="max-w-lg text-h3 font-semibold"
                  >
                    {ind.headline}
                  </motion.h3>
                  <p className="mt-3 max-w-xl text-ink-2">{ind.description}</p>

                  {/* System diagram: hub + four modules */}
                  <div className="stage-3d relative mt-8 sm:h-[300px]">
                    <svg aria-hidden className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {corners.map(([x, y], i) => (
                        <motion.line
                          key={i}
                          x1={50}
                          y1={50}
                          x2={x}
                          y2={y}
                          stroke="var(--color-accent)"
                          strokeOpacity={0.35}
                          strokeWidth={1}
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: ease.outExpo }}
                        />
                      ))}
                    </svg>
                    <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
                      <div className="grid h-16 w-16 place-items-center rounded-[18px] bg-night shadow-float">
                        <LogoMark className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <ul className="grid gap-3 sm:block">
                      {ind.modules.map((m, i) => (
                        <motion.li
                          key={m.name}
                          initial={{ opacity: 0, rotateX: -50, z: -60 }}
                          animate={{ opacity: 1, rotateX: 0, z: 0 }}
                          transition={{ duration: 0.8, delay: 0.05 + i * 0.07, ease: ease.outExpo }}
                          className="sm:absolute sm:w-[36%] sm:-translate-x-1/2 sm:-translate-y-1/2"
                          style={{ left: `${corners[i][0]}%`, top: `${corners[i][1]}%` }}
                        >
                          <div className="card p-4 shadow-md">
                            <div className="flex items-center justify-between">
                              <p className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{m.name}</p>
                              <span className="num text-[0.6875rem] text-ink-3">0{i + 1}</span>
                            </div>
                            <p className="mt-1 text-[0.8125rem] text-ink-2">{m.detail}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Flow */}
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-2">Typical flow</p>
                    <ol className="mt-3 flex flex-wrap items-center gap-y-2">
                      {ind.flow.map((f, i) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: ease.outExpo }}
                          className="flex items-center"
                        >
                          <span
                            className={cn(
                              'rounded-full px-3 py-1.5 text-[0.8125rem] font-medium',
                              i === ind.flow.length - 1 ? 'bg-ink text-white' : 'bg-surface ring-1 ring-line',
                            )}
                          >
                            {f}
                          </span>
                          {i < ind.flow.length - 1 && <span className="mx-1.5 h-px w-4 bg-line-strong" />}
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
