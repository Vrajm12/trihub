import { lazy, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { SceneMount } from '@/components/3d/SceneMount'
import { CorePoster } from '@/components/3d/CorePoster'
import { systemModules, type ModuleId } from '@/data/modules'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'

const SystemScene = lazy(() => import('@/components/3d/SystemScene'))

export function SystemSection() {
  const [selected, setSelected] = useState<ModuleId>('crm')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const mod = systemModules.find((m) => m.id === selected)!
  const byId = Object.fromEntries(systemModules.map((m) => [m.id, m]))

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = systemModules.length
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % n : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + n) % n : null
    if (next === null) return
    e.preventDefault()
    setSelected(systemModules[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <section id="platform" aria-labelledby="platform-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          id="platform-title"
          eyebrow="The Trihub system"
          title={
            <>
              Everything your business needs.
              <br className="hidden sm:block" /> <span className="text-ink-2">Connected.</span>
            </>
          }
          lead="Eight modules on one data model. Select a module to see what it handles — and which parts of the business it exchanges data with."
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="card relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,var(--color-canvas)_100%)]">
              <SceneMount
                className="h-[340px] sm:h-[440px] lg:h-[600px]"
                poster={<CorePoster labels={systemModules.map((m) => m.label)} />}
              >
                {(p) => <SystemScene {...p} selected={selected} onSelect={setSelected} />}
              </SceneMount>
              <p className="pointer-events-none absolute bottom-4 left-5 text-[0.75rem] text-ink-2">
                Selected: <span className="font-medium text-ink">{mod.label}</span>
                <span className="mx-2 text-ink-3">·</span>
                Highlighted links show live data exchange
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal index={1}>
              <div
                role="tablist"
                aria-label="Trihub modules"
                className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0"
              >
                {systemModules.map((m, i) => {
                  const active = m.id === selected
                  const Icon = m.icon
                  return (
                    <button
                      key={m.id}
                      ref={(el) => void (tabs.current[i] = el)}
                      role="tab"
                      id={`tab-${m.id}`}
                      aria-selected={active}
                      aria-controls="module-panel"
                      tabIndex={active ? 0 : -1}
                      onClick={() => setSelected(m.id)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={cn(
                        'flex shrink-0 flex-col items-start gap-2 rounded-[14px] p-3 text-left text-[0.8125rem] font-medium transition-all duration-300',
                        active
                          ? 'bg-ink text-white shadow-md'
                          : 'bg-surface text-ink ring-1 ring-line hover:ring-line-strong',
                      )}
                    >
                      <Icon size={16} strokeWidth={1.9} className={active ? 'text-white' : 'text-ink-2'} />
                      {m.label}
                    </button>
                  )
                })}
              </div>
            </Reveal>

            <div
              id="module-panel"
              role="tabpanel"
              aria-labelledby={`tab-${selected}`}
              className="card relative mt-4 min-h-[400px] overflow-hidden p-6 sm:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: ease.outExpo }}
                >
                  <p className="eyebrow">{mod.short}</p>
                  <h3 className="mt-3 text-h3 font-semibold">{mod.label}</h3>
                  <p className="mt-3 text-ink-2">{mod.summary}</p>

                  <ul className="mt-6 grid gap-2.5">
                    {mod.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-[0.9375rem]">
                        <Check size={16} className="mt-[3px] shrink-0 text-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 border-t border-line pt-6">
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-2">Exchanges data with</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mod.connects.map((id) => (
                        <button
                          key={id}
                          onClick={() => setSelected(id)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-accent-soft px-3 text-[0.8125rem] font-medium text-accent-ink transition-colors hover:bg-accent/15"
                        >
                          {byId[id].label}
                          <ArrowRight size={13} />
                        </button>
                      ))}
                    </div>
                    <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-2">
                      <span className="font-medium text-ink">In practice: </span>
                      {mod.example}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
