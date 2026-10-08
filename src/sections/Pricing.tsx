import { Check, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { crmTiers, erpPlan, platformPlan } from '@/data/pricing'
import { cn } from '@/lib/utils'

function Features({ items, night = false }: { items: string[]; night?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((f) => (
        <li key={f} className={cn('flex items-start gap-3 text-[0.9375rem]', night ? 'text-night-ink' : 'text-ink')}>
          <Check size={16} className={cn('mt-[3px] shrink-0', night ? 'text-[#A5B4FC]' : 'text-ink-2')} />
          {f}
        </li>
      ))}
    </ul>
  )
}

export function Pricing() {
  const { open } = useDemo()
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          align="center"
          id="pricing-title"
          eyebrow="Pricing"
          title="Priced around your business, not a template."
          lead="Every plan starts with a demo configured to your workflow. Pricing depends on users, modules and implementation scope."
        />

        {/* CRM tiers — one surface, three columns */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="card overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
              <h3 className="text-[1rem] font-semibold">CRM</h3>
              <p className="text-[0.8125rem] text-ink-2">Three plans, one platform</p>
            </div>
            <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
              {crmTiers.map((t) => (
                <div key={t.name} className={cn('relative flex flex-col p-6 sm:p-8', t.highlight && 'bg-[linear-gradient(180deg,rgb(79_70_229/0.045),transparent_55%)]')}>
                  {t.highlight && <span className="absolute inset-x-0 top-0 h-[2px] bg-accent" aria-hidden />}
                  <div className="flex items-center justify-between">
                    <h4 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{t.name}</h4>
                    {t.highlight && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-medium text-accent-ink">Recommended</span>
                    )}
                  </div>
                  <p className="mt-1 text-ink-2">{t.audience}</p>
                  <p className="mt-6 text-[0.9375rem] font-medium">
                    {t.price ?? <span className="text-ink-2">Pricing on request</span>}
                  </p>
                  <Button
                    className="mt-5 w-full"
                    variant={t.highlight ? 'primary' : 'secondary'}
                    magnetic={false}
                    onClick={() => open('demo', 'CRM')}
                    aria-label={`Book a demo for CRM ${t.name}`}
                  >
                    Book a Demo
                  </Button>
                  <div className="mt-8">
                    <Features items={t.features} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal index={1}>
            <div className="card flex h-full flex-col p-6 shadow-sm sm:p-8">
              <p className="eyebrow">{erpPlan.name}</p>
              <h3 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em]">{erpPlan.tier}</h3>
              <p className="mt-1 text-ink-2">{erpPlan.audience}</p>
              <div className="mt-8 flex-1">
                <Features items={erpPlan.features} />
              </div>
              <div className="mt-10">
                <Button variant="secondary" magnetic={false} onClick={() => open('demo', 'ERP')}>
                  Book a Demo <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal index={2}>
            <div className="card-night flex h-full flex-col bg-night p-6 shadow-lg sm:p-8">
              <p className="eyebrow !text-night-ink-2">{platformPlan.name}</p>
              <h3 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-night-ink">{platformPlan.tier}</h3>
              <p className="mt-1 text-night-ink-2">{platformPlan.audience}</p>
              <div className="mt-8 flex-1">
                <Features items={platformPlan.features} night />
              </div>
              <div className="mt-10">
                <Button variant="light" magnetic={false} onClick={() => open('team', 'Custom platform')}>
                  Talk to Our Team <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-10 text-center text-[0.9375rem] text-ink-2">
          Not sure which fits?{' '}
          <button onClick={() => open('team')} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            Tell us how you work
          </button>{' '}
          and we will recommend a setup.
        </p>
      </div>
    </section>
  )
}
