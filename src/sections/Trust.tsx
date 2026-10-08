import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { company } from '@/lib/config'
import { LogoMark } from '@/components/ui/Logo'

const steps = [
  ['Map', 'We document how work actually moves through your business today — people, records, approvals, handoffs.'],
  ['Configure', 'Trihub is set up around your stages, roles and approvals. Custom modules are built where needed.'],
  ['Migrate and train', 'Existing data is brought across, and each team is trained on its own workflows.'],
  ['Support and extend', 'The team that built your system supports it, and extends it as the business changes.'],
]

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[0.75rem] font-medium tracking-[0.16em] text-ink-2">
            <LogoMark mono className="h-4 w-4 text-ink" />
            BUILT BY TRIVERSE SOLUTIONS
          </p>
        </Reveal>
        <Reveal index={1}>
          <h2 id="trust-title" className="mt-6 max-w-3xl text-h2 font-semibold">
            Designed for businesses that have outgrown disconnected tools.
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="mt-6 max-w-xl text-lead text-ink-2">
            Trihub is designed, built and supported by {company.legalName}, a software and ERP company in{' '}
            {company.address.locality}, {company.address.region}.
          </p>
          <a
            href={company.url}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            About Triverse Solutions <ArrowUpRight size={15} />
          </a>
        </Reveal>

        <ol className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} index={i}>
              <p className="num text-[0.8125rem] font-medium text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.01em]">{t}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-2">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
