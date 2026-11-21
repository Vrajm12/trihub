import { ArrowRight, Bot, Braces, GraduationCap, Landmark, UsersRound, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LogoMark } from '@/components/ui/Logo'
import { useDemo } from '@/components/ui/DemoDialog'
import { erpPath } from '@/lib/erpRoutes'

const products = [
  {
    name: 'CRM',
    detail: 'Follow enquiries, conversations, and admissions next steps.',
    icon: UsersRound,
  },
  {
    name: 'ERP',
    detail: 'Manage institutional work across teams and departments.',
    icon: Landmark,
  },
  {
    name: 'Automation',
    detail: 'Reduce repetitive tasks, communications, and handoffs.',
    icon: Bot,
  },
  {
    name: 'Custom software',
    detail: 'Build a platform around a workflow that needs a tailored fit.',
    icon: Braces,
  },
]

const approach = [
  ['Map', 'Document how work moves today: people, records, approvals, and handoffs.'],
  ['Configure', 'Set up stages, roles, and approvals around the process.'],
  ['Migrate and train', 'Bring existing data across and train each team on its workflows.'],
  ['Support and extend', 'Support the system and extend it as the business changes.'],
]

export function ErpAbout() {
  const { open } = useDemo()

  return (
    <>
      <section
        aria-labelledby="trihub-about-title"
        className="container-x grid min-h-[min(700px,calc(100svh-64px))] items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
      >
        <div className="min-w-0 max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2">
            <LogoMark className="h-4 w-4" />
            ABOUT TRIHUB
          </p>
          <h1
            id="trihub-about-title"
            className="mt-6 max-w-[12ch] text-[clamp(3rem,6.1vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.06em]"
          >
            Software for the way work moves.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-ink-2">
            Trihub is a portfolio of CRM, ERP, automation, and custom software for businesses whose work spans teams,
            records, approvals, and handoffs. Each product starts with the workflow it needs to support.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-3">
            Designed, built, and supported by Triverse Solutions Private Limited.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => open('demo', 'ERP')}>
              Talk through your workflow <ArrowRight size={17} aria-hidden />
            </Button>
            <a
              href={erpPath('/#workflows')}
              className="inline-flex h-[52px] items-center rounded-full px-4 text-sm font-medium text-ink-2 transition-colors hover:text-accent-ink"
            >
              Explore Education ERP
            </a>
          </div>
        </div>

        <div className="relative mx-auto min-w-0 w-full max-w-[560px] p-1 sm:p-3">
          <div className="relative flex items-center gap-3 border-b border-line pb-5">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas">
              <LogoMark className="h-8 w-8" />
            </span>
            <div>
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-3">THE TRIHUB PORTFOLIO</p>
              <p className="mt-1 font-semibold">Systems for work across teams</p>
            </div>
          </div>
          <ul aria-label="Trihub products" className="relative mt-5 grid gap-3 sm:grid-cols-2">
            {products.map(({ name, detail, icon: Icon }) => (
              <li key={name} className="min-h-[126px] rounded-2xl border border-line bg-canvas p-4">
                <Icon size={18} className="text-accent" aria-hidden />
                <h2 className="mt-3 text-sm font-semibold">{name}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{detail}</p>
              </li>
            ))}
          </ul>
          <div className="relative mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-3">
            <Workflow size={15} className="text-accent" aria-hidden />
            The starting point is the work—not a fixed template.
          </div>
        </div>
      </section>

      <section aria-labelledby="trihub-approach-title" className="border-y border-line bg-surface/55">
        <div className="container-x grid gap-8 py-[var(--section-y)] lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow">How Trihub takes shape</p>
            <h2 id="trihub-approach-title" className="mt-4 max-w-md text-h2 font-semibold">
              Start with the process. Build around it.
            </h2>
            <p className="mt-4 max-w-md text-lead text-ink-2">
              The work is understood before the system is configured, so the people, records, and approvals stay in view.
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {approach.map(([title, detail], index) => (
              <li key={title} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
                <span className="text-sm font-medium text-accent">0{index + 1}</span>
                <div>
                  <h3 className="text-h3 font-semibold">{title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-2">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="trihub-education-title" className="bg-[#f0f1ff] py-[var(--section-y)]">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[560px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[9%] bg-[radial-gradient(ellipse_at_52%_50%,rgb(79_70_229/0.1),transparent_67%)]"
            />
            <img
              src="/education-erp-cap-counselling.png"
              alt="A student and staff member reviewing counselling rounds and student records in an education portal."
              width={1152}
              height={768}
              loading="lazy"
              className="relative w-full mix-blend-multiply"
            />
          </div>
          <div className="max-w-xl">
            <p className="eyebrow inline-flex items-center gap-2">
              <GraduationCap size={15} className="text-accent" aria-hidden />
              ONE PART OF TRIHUB
            </p>
            <h2 id="trihub-education-title" className="mt-4 text-h2 font-semibold">
              Trihub Education ERP brings that approach to campus operations.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              For colleges and institutions, it supports workflows across admissions and CAP counselling, academic
              operations, fees, and payroll preparation.
            </p>
            <a
              href={erpPath('/#workflows')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-ink"
            >
              See the Education ERP workflows <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="container-x pb-[var(--section-y)] pt-8">
        <div className="relative overflow-hidden rounded-[24px] bg-ink px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_15%,rgb(79_70_229/0.42),transparent_45%)]"
          />
          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-white/60">NEXT STEP</p>
              <h2 className="mt-3 text-h2 font-semibold">Tell us how work happens at your institution.</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-white/70">
                Talk with the Trihub team about the campus workflows you need the Education ERP to support.
              </p>
            </div>
            <Button size="lg" variant="light" onClick={() => open('demo', 'ERP')} className="shrink-0">
              Request a walkthrough <ArrowRight size={17} aria-hidden />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
