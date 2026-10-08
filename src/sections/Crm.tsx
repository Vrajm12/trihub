import { useState } from 'react'
import { Bell, Phone, Mail, MessageCircle, Kanban, Contact, CalendarClock, Layers, MessagesSquare, BarChart3, Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useTilt } from '@/hooks/useTilt'
import { useFitScale } from '@/hooks/useFitScale'
import { cn } from '@/lib/utils'

type Layer = 'board' | 'stages' | 'contact' | 'comms' | 'followup' | 'analytics'

const features: { key: Layer; label: string; detail: string; icon: typeof Kanban }[] = [
  { key: 'board', label: 'Lead pipeline', detail: 'Every lead from forms, ads, portals and WhatsApp in one board.', icon: Kanban },
  { key: 'contact', label: 'Contacts', detail: 'One record per person and company — no duplicates across tools.', icon: Contact },
  { key: 'followup', label: 'Follow-ups', detail: 'Reminders assigned to owners, with the context to act on them.', icon: CalendarClock },
  { key: 'stages', label: 'Sales stages', detail: 'Stages that match how you actually sell, with required fields per stage.', icon: Layers },
  { key: 'comms', label: 'Communication', detail: 'Calls, email and WhatsApp logged on the deal automatically.', icon: MessagesSquare },
  { key: 'analytics', label: 'Analytics', detail: 'Pipeline value, conversion and team activity, always current.', icon: BarChart3 },
]

const columns = [
  {
    stage: 'New Lead',
    deals: [
      { co: 'Acme Industries', v: '₹4.8L', meta: 'Follow-up tomorrow', who: 'RM', hot: true },
      { co: 'Sharma Logistics', v: '₹2.1L', meta: 'Website form', who: 'AK' },
      { co: 'Nova Dental Clinics', v: '₹1.2L', meta: 'IndiaMART', who: 'SP' },
    ],
  },
  {
    stage: 'Qualified',
    deals: [
      { co: 'Meera Textiles', v: '₹6.5L', meta: 'Demo Thu, 3:00 PM', who: 'AK' },
      { co: 'Kalyan Builders', v: '₹9.0L', meta: 'Site visit done', who: 'RM' },
    ],
  },
  {
    stage: 'Proposal',
    deals: [
      { co: 'Orbit Pharma', v: '₹3.4L', meta: 'Quote v2 sent', who: 'SP' },
      { co: 'Greenleaf Foods', v: '₹5.2L', meta: 'Awaiting PO', who: 'AK' },
    ],
  },
  { stage: 'Negotiation', deals: [{ co: 'Vertex Auto Parts', v: '₹7.9L', meta: 'Pricing call Fri', who: 'RM' }] },
  { stage: 'Won', deals: [{ co: 'Pinnacle Academy', v: '₹2.6L', meta: 'Invoice raised', who: 'SP', won: true }] },
]

const W = 800
const H = 560

function layerStyle(active: Layer | null, keys: Layer[], z: number) {
  return { transform: `translateZ(${z + (active && keys.includes(active) ? 40 : 0)}px)` }
}

/** Opaque wash over inactive layers — dims without letting lower layers show through. */
function Wash({ active, keys }: { active: Layer | null; keys: Layer[] }) {
  const dim = active !== null && !keys.includes(active)
  return (
    <span
      className={cn(
        'pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-canvas/70 transition-opacity duration-500',
        dim ? 'opacity-100' : 'opacity-0',
      )}
    />
  )
}

function Composition({ active }: { active: Layer | null }) {
  const tilt = useTilt<HTMLDivElement>({ max: 4, baseX: 9, baseY: -12 })
  const { ref, scale } = useFitScale<HTMLDivElement>(W)

  return (
    <div ref={ref} className="stage-3d relative w-full" style={{ height: H * scale }} aria-hidden>
      {/* Fixed design size, scaled to fit; absolutely positioned so it never widens the layout. */}
      <div className="absolute left-0 top-0" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <div ref={tilt} className="preserve-3d relative h-full w-full">
          {/* Pipeline board */}
          <div
            className="card absolute left-0 top-[52px] w-[650px] overflow-hidden shadow-lg transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
            style={layerStyle(active, ['board', 'stages'], 0)}
          >
            <Wash active={active} keys={['board', 'stages']} />
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-semibold">Sales pipeline</span>
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-ink-2">Q3 · All owners</span>
              </div>
              <span className="num text-[12px] text-ink-2">
                Open value <span className="font-semibold text-ink">₹40.1L</span>
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 bg-canvas/60 p-3">
              {columns.map((c) => (
                <div key={c.stage}>
                  <div
                    className={cn(
                      'mb-2 flex items-center justify-between rounded-[8px] px-2 py-1.5 transition-colors duration-500',
                      active === 'stages' && 'bg-accent-soft',
                    )}
                  >
                    <span className={cn('text-[11px] font-semibold', active === 'stages' ? 'text-accent-ink' : 'text-ink-2')}>
                      {c.stage}
                    </span>
                    <span className="num text-[10px] text-ink-3">{c.deals.length}</span>
                  </div>
                  <div className="space-y-2">
                    {c.deals.map((d) => (
                      <div
                        key={d.co}
                        className={cn(
                          'rounded-[10px] bg-surface p-2.5 shadow-xs ring-1',
                          'hot' in d && d.hot ? 'ring-accent/40' : 'ring-line',
                        )}
                      >
                        <p className="truncate text-[11.5px] font-semibold tracking-[-0.01em]">{d.co}</p>
                        <p className="num mt-0.5 text-[12px] font-semibold">{d.v}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={cn(
                              'truncate text-[10px]',
                              'won' in d && d.won ? 'text-positive' : 'hot' in d && d.hot ? 'text-accent' : 'text-ink-2',
                            )}
                          >
                            {d.meta}
                          </span>
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-surface-3 text-[7px] font-semibold text-ink-2">
                            {d.who}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            className="card absolute right-0 top-0 w-[290px] p-4 shadow-float transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
            style={layerStyle(active, ['contact', 'comms'], 80)}
          >
            <Wash active={active} keys={['contact', 'comms']} />
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-night text-[13px] font-semibold text-white">PN</span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold">Priya Nair</p>
                <p className="truncate text-[11.5px] text-ink-2">Procurement Head · Acme Industries</p>
              </div>
            </div>
            <div className="mt-3.5 flex gap-1.5">
              {[Phone, Mail, MessageCircle].map((I, k) => (
                <span key={k} className="grid h-7 flex-1 place-items-center rounded-[8px] bg-surface-2 text-ink-2">
                  <I size={13} />
                </span>
              ))}
            </div>
            <div
              className={cn(
                'mt-3.5 space-y-2.5 rounded-[10px] p-2 transition-colors duration-500',
                active === 'comms' && 'bg-accent-soft',
              )}
            >
              <div className="flex gap-2.5">
                <MessageCircle size={13} className="mt-0.5 shrink-0 text-positive" />
                <div>
                  <p className="text-[11.5px]">“Can you share the revised quote?”</p>
                  <p className="text-[10.5px] text-ink-2">WhatsApp · 2h ago</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Phone size={13} className="mt-0.5 shrink-0 text-ink-2" />
                <div>
                  <p className="text-[11.5px]">Discussed volumes for Q4 — 12 min</p>
                  <p className="text-[10.5px] text-ink-2">Call · Yesterday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow-up */}
          <div
            className="card absolute bottom-0 left-[36px] w-[300px] p-4 shadow-float transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
            style={layerStyle(active, ['followup'], 110)}
          >
            <Wash active={active} keys={['followup']} />
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              <Bell size={13} /> Follow-up tomorrow, 11:00
            </div>
            <p className="mt-2 text-[14px] font-semibold tracking-[-0.01em]">Send revised quote to Acme Industries</p>
            <p className="mt-1 text-[12px] text-ink-2">New Lead · ₹4.8L opportunity</p>
            <div className="mt-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[11.5px] text-ink-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-surface-3 text-[8px] font-semibold">RM</span>
                Rohan M.
              </span>
              <span className="inline-flex h-7 items-center gap-1 rounded-full bg-ink px-3 text-[11px] font-medium text-white">
                <Check size={12} /> Mark done
              </span>
            </div>
          </div>

          {/* Analytics */}
          <div
            className="card absolute bottom-[18px] right-[24px] w-[250px] p-4 shadow-lg transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
            style={layerStyle(active, ['analytics'], 56)}
          >
            <Wash active={active} keys={['analytics']} />
            <p className="text-[11px] font-medium text-ink-2">Lead → Won conversion</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="num text-[26px] font-semibold tracking-[-0.03em]">24%</span>
              <span className="text-[11px] text-ink-2">last 6 months</span>
            </div>
            <svg viewBox="0 0 210 56" className="mt-2 w-full">
              {[18, 21, 19, 26, 23, 31].map((v, i) => (
                <rect
                  key={i}
                  x={i * 36}
                  y={56 - v * 1.6}
                  width={24}
                  height={v * 1.6}
                  rx={4}
                  className={i === 5 ? 'fill-accent' : 'fill-ink/10'}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Crm() {
  const [active, setActive] = useState<Layer | null>(null)
  return (
    <section id="crm" aria-labelledby="crm-title" className="section-y relative">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            id="crm-title"
            eyebrow="CRM"
            title="Turn leads into relationships."
            lead="A pipeline your sales team will keep up to date — because it does the remembering for them."
          />
          <ul className="mt-10 border-t border-line" onMouseLeave={() => setActive(null)}>
            {features.map((f, i) => {
              const Icon = f.icon
              const on = active === f.key
              return (
                <Reveal as="li" key={f.key} index={i} className="border-b border-line">
                  <button
                    onMouseEnter={() => setActive(f.key)}
                    onFocus={() => setActive(f.key)}
                    onBlur={() => setActive(null)}
                    className="group flex w-full items-start gap-4 py-4 text-left"
                    aria-describedby={`crm-f-${f.key}`}
                  >
                    <Icon size={18} className={cn('mt-0.5 shrink-0 transition-colors', on ? 'text-accent' : 'text-ink-2')} />
                    <span>
                      <span className="block text-[0.9688rem] font-medium">{f.label}</span>
                      <span
                        id={`crm-f-${f.key}`}
                        className={cn(
                          'block text-[0.875rem] text-ink-2 transition-all duration-300 lg:max-h-0 lg:overflow-hidden lg:opacity-0',
                          on && 'lg:mt-1 lg:max-h-16 lg:opacity-100',
                        )}
                      >
                        {f.detail}
                      </span>
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal index={1} className="lg:col-span-8 lg:pl-6 lg:pt-16">
          <Composition active={active} />
        </Reveal>
      </div>
    </section>
  )
}
