import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Users,
  Boxes,
  Wrench,
  AppWindow,
  LayoutDashboard,
  Plug,
  Workflow,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { useFitScale } from '@/hooks/useFitScale'
import { useTilt } from '@/hooks/useTilt'

const builds = [
  { icon: Users, label: 'Custom CRM', detail: 'Your stages, fields and approvals' },
  { icon: Boxes, label: 'Custom ERP', detail: 'Modules shaped to your operations' },
  { icon: Wrench, label: 'Internal Tools', detail: 'Replace the spreadsheets teams rely on' },
  { icon: AppWindow, label: 'Client Portals', detail: 'Self-serve status, documents, payments' },
  { icon: LayoutDashboard, label: 'Dashboards', detail: 'The numbers leadership actually asks for' },
  { icon: Plug, label: 'API Integrations', detail: 'Tally, WhatsApp, payment gateways, portals' },
  { icon: Workflow, label: 'Automation', detail: 'Rules that remove manual handoffs' },
]

const W = 600
const H = 520

function LayerLabel({ n, text }: { n: string; text: string }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-ink-2">
      <span className="num text-ink">{n}</span>
      <span className="h-px w-4 bg-line-strong" />
      {text.toUpperCase()}
    </p>
  )
}

function Blueprint() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const spread = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.15, 1])
  const tilt = useTilt<HTMLDivElement>({ max: 4, baseX: 12, baseY: -22 })
  const fit = useFitScale<HTMLDivElement>(W)
  // Hovering the blueprint pulls the layers further apart.
  const explode = useSpring(1, { stiffness: 120, damping: 20 })
  const z2 = useTransform(() => 90 * spread.get() * explode.get())
  const z3 = useTransform(() => 180 * spread.get() * explode.get())

  return (
    <div ref={ref} onMouseEnter={() => explode.set(1.35)} onMouseLeave={() => explode.set(1)} aria-hidden>
      <div ref={fit.ref} className="stage-3d relative w-full" style={{ height: H * fit.scale }}>
        <div className="absolute left-0 top-0" style={{ width: W, height: H, transform: `scale(${fit.scale})`, transformOrigin: 'top left' }}>
          <div ref={tilt} className="preserve-3d relative h-full w-full">
            {/* 01 Process */}
            <motion.div className="card absolute left-0 top-0 w-[460px] bg-surface/90 p-5 shadow-md">
              <LayerLabel n="01" text="Your process" />
              <div className="flex items-center gap-1">
                {['Enquiry', 'Site visit', 'Booking', 'Agreement', 'Handover'].map((s, i, a) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="whitespace-nowrap rounded-[8px] border border-dashed border-line-strong px-2 py-1.5 text-[11px] font-medium">{s}</span>
                    {i < a.length - 1 && <ChevronRight size={11} className="text-ink-3" />}
                  </span>
                ))}
              </div>
              <div className="mt-4 h-[96px] rounded-[10px] border border-dashed border-line-strong" />
            </motion.div>

            {/* 02 Data model */}
            <motion.div style={{ z: z2 }} className="card absolute left-[70px] top-[110px] w-[440px] p-5 shadow-lg">
              <LayerLabel n="02" text="Data model" />
              <div className="relative grid grid-cols-3 gap-3">
                {[
                  ['Customer', ['name', 'phone', 'source']],
                  ['Booking', ['unit_id', 'amount', 'status']],
                  ['Payment', ['booking_id', 'due_date', 'paid']],
                ].map(([t, f]) => (
                  <div key={t as string} className="rounded-[10px] bg-surface-2 p-2.5">
                    <p className="text-[12px] font-semibold">{t as string}</p>
                    {(f as string[]).map((x) => (
                      <p key={x} className="mt-1 font-mono text-[10.5px] text-ink-2">
                        {x}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 03 Interface */}
            <motion.div style={{ z: z3 }} className="card absolute left-[150px] top-[225px] w-[440px] p-5 shadow-float">
              <LayerLabel n="03" text="Interface — client portal" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[15px] font-semibold tracking-[-0.01em]">Unit B-1204 · Tower B</p>
                  <p className="text-[12px] text-ink-2">Booked 12 Mar · 3 BHK</p>
                </div>
                <span className="rounded-full bg-positive-soft px-2.5 py-1 text-[11px] font-medium text-positive">On schedule</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[11.5px]">
                  <span className="text-ink-2">Payment schedule</span>
                  <span className="num font-medium">4 of 9 paid</span>
                </div>
                <div className="mt-1.5 flex gap-1">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} className={'h-1.5 flex-1 rounded-full ' + (i < 4 ? 'bg-ink' : i === 4 ? 'bg-accent' : 'bg-surface-3')} />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-[10px] bg-surface-2 px-3 py-2.5">
                  <span className="text-[12px]">
                    Next instalment <span className="num font-semibold">₹6.2L</span> · due 15 Dec
                  </span>
                  <span className="inline-flex h-6 items-center rounded-full bg-ink px-2.5 text-[11px] font-medium text-white">Pay</span>
                </div>
                <div className="mt-2 flex gap-2">
                  {['Agreement.pdf', 'Allotment letter.pdf'].map((d) => (
                    <span key={d} className="flex items-center gap-1.5 rounded-[8px] px-2 py-1.5 text-[11px] text-ink-2 ring-1 ring-line">
                      <FileText size={12} /> {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CustomSoftware() {
  const { open } = useDemo()
  return (
    <section id="custom" aria-labelledby="custom-title" className="section-y relative border-t border-line">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="custom-title"
            eyebrow="Custom software"
            title="If your workflow is different, your software should be too."
            lead="We design and build custom business platforms around your processes — not the other way around."
          />
          <ul className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {builds.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal as="li" key={b.label} index={i} className="flex gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0 text-ink-2" />
                  <div>
                    <p className="text-[0.9375rem] font-medium">{b.label}</p>
                    <p className="text-[0.8125rem] text-ink-2">{b.detail}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
          <Reveal index={3} className="mt-10">
            <Button size="lg" onClick={() => open('team', 'Custom platform')}>
              Build Your System <ArrowRight size={17} />
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Blueprint />
          <p className="mt-6 text-center text-[0.8125rem] text-ink-2 lg:text-left">
            Process first, then data, then interface — every custom build follows the same order.
          </p>
        </div>
      </div>
    </section>
  )
}
