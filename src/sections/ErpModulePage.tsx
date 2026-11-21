import { ArrowRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { ErpModuleDashboard } from '@/components/erp/ErpModuleDashboard'
import type { ErpModulePageData } from '@/data/erpModulePages'

export function ErpModulePage({ module }: { module: ErpModulePageData }) {
  const { open } = useDemo()

  return (
    <>
      <section
        aria-labelledby="erp-module-title"
        className="container-x grid items-center gap-9 py-12 sm:py-16 lg:min-h-[min(760px,calc(100svh-64px))] lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-12"
      >
        <div className="max-w-xl">
          <p className="eyebrow">{module.category}</p>
          <h1 id="erp-module-title" className="mt-5 text-[clamp(2.5rem,5.2vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
            {module.headline}
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-2">{module.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => open('demo', 'ERP')}>
              Request a walkthrough <ArrowRight size={17} aria-hidden />
            </Button>
            <a
              href="#details"
              className="inline-flex h-[52px] items-center rounded-full px-4 text-sm font-medium text-ink-2 transition-colors hover:text-accent-ink"
            >
              Explore details
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <ErpModuleDashboard module={module} />
        </div>
      </section>

      <section id="details" aria-labelledby="erp-module-details-title" className="scroll-mt-24 border-y border-line bg-surface/55">
        <div className="container-x py-[var(--section-y)]">
          <div className="max-w-3xl">
            <p className="eyebrow">HOW IT SUPPORTS YOUR TEAM</p>
            <h2 id="erp-module-details-title" className="mt-4 text-h2 font-semibold">{module.detailsTitle}</h2>
            <p className="mt-4 max-w-2xl text-lead text-ink-2">{module.detailsLead}</p>
          </div>
          <div className="mt-10 grid gap-0 border-y border-line sm:grid-cols-2 lg:grid-cols-3">
            {module.details.map((detail, index) => (
              <article key={detail.title} className="border-b border-line py-6 sm:px-5 lg:border-b-0 lg:border-l lg:first:border-l-0">
                <p className="text-xs font-medium tracking-[0.12em] text-accent">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{detail.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{detail.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#f0f1ff] px-5 py-4 sm:px-6">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
              Every institution has its own process. Plan roles, data, configuration, and integrations around the workflows in scope.
            </p>
            <button
              type="button"
              onClick={() => open('demo', 'ERP')}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-ink"
            >
              Discuss your requirements <ArrowRight size={15} aria-hidden />
            </button>
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="erp-module-faq-title" className="container-x py-[var(--section-y)]">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">FAQ · {module.label}</p>
            <h2 id="erp-module-faq-title" className="mt-4 text-h2 font-semibold">Questions, answered.</h2>
            <p className="mt-4 text-lead text-ink-2">
              A few things to consider when planning this workflow for your institution.
            </p>
          </div>
          <div className="border-t border-line">
            {module.faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-line" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold tracking-tight">{faq.question}</h3>
                  <Plus size={18} aria-hidden className="mt-0.5 shrink-0 text-ink-2 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="-mt-1 max-w-2xl pb-6 text-sm leading-relaxed text-ink-2">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
