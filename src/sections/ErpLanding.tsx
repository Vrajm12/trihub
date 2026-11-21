import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { ease } from '@/lib/motion'

const workflows = [
  {
    number: '01',
    label: 'ADMISSIONS & ENROLMENT',
    title: 'Make each application easier to follow.',
    description:
      'Review applications, documents, payments, and enrolment steps in the admissions portal, with the information staff need close at hand.',
    image: '/education-erp-admissions.png',
    alt: 'Student using an admissions portal to review an application, documents, payments, and enrolment steps.',
  },
  {
    number: '02',
    label: 'CAP COUNSELLING',
    title: 'Coordinate counselling rounds with clear records.',
    description:
      'Import rosters, set seat matrices, generate merit lists, and manage allotments. Live synchronization with external DTE systems is not confirmed.',
    image: '/education-erp-cap-counselling.png',
    alt: 'Admissions staff coordinating CAP counselling rounds, seat allotments, and student records.',
  },
  {
    number: '03',
    label: 'FEES & FINANCE',
    title: 'Follow fees from demand to receipt.',
    description:
      'Manage fee structures, demands, invoices, receipts, and outstanding balances as part of institutional administration.',
    image: '/education-erp-fees.png',
    alt: 'Student using an education finance dashboard to review fee records, payments, and balances.',
  },
  {
    number: '04',
    label: 'PAYROLL PREPARATION',
    title: 'Keep payroll runs and their status visible.',
    description:
      'Review attendance, preview and generate payroll runs, and track their status. Bank-file generation and salary disbursement are not verified.',
    image: '/education-erp-payroll.png',
    alt: 'Education staff managing payroll records, attendance, payslips, and payroll run status.',
  },
]

const operationalAreas = [
  {
    number: '01',
    title: 'Admissions',
    detail: 'Application review, documents, payments, enrolment, and CAP counselling.',
  },
  {
    number: '02',
    title: 'Academic operations',
    detail: 'Section rosters, lecture attendance, exam eligibility, marks, and results.',
  },
  {
    number: '03',
    title: 'Fees & finance',
    detail: 'Fee structures, demands, invoices, receipts, and outstanding balances.',
  },
  {
    number: '04',
    title: 'Payroll preparation',
    detail: 'Attendance inputs, payroll previews, run generation, and status tracking.',
  },
]

const implementationSteps = [
  ['Map the process', 'Understand how admissions, academics, and administration work today.'],
  ['Configure the ERP', 'Set up roles and workflows around the institution’s operating needs.'],
  ['Prepare the transition', 'Plan data migration, staff training, and a practical rollout.'],
]

const enter = (index: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: ease.outExpo, delay: index * 0.07 },
})

export function ErpLanding() {
  const { open } = useDemo()

  return (
    <>
      <section aria-labelledby="erp-landing-title" className="container-x relative grid min-h-[min(780px,calc(100svh-64px))] items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <motion.p {...enter(0)} className="eyebrow inline-flex items-center gap-2">
            <GraduationCap size={15} className="text-accent" aria-hidden />
            Education ERP · For colleges and institutions
          </motion.p>
          <motion.h1
            {...enter(1)}
            id="erp-landing-title"
            className="mt-6 max-w-[13ch] text-[clamp(3rem,6.3vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.065em]"
          >
            Admissions to administration, in clearer view.
          </motion.h1>
          <motion.p {...enter(2)} className="mt-6 max-w-xl text-lead text-ink-2">
            Give staff structured workflows for application review, CAP counselling, attendance, examinations, fees, and
            payroll preparation.
          </motion.p>
          <motion.div {...enter(3)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => open('demo', 'ERP')}>
              Request an ERP walkthrough
              <ArrowRight size={17} aria-hidden />
            </Button>
            <a
              href="#workflows"
              className="inline-flex h-[52px] items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-2 transition-colors hover:text-accent-ink"
            >
              Explore workflows <ArrowDown size={15} aria-hidden />
            </a>
          </motion.div>
          <motion.ul {...enter(4)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 text-sm font-medium text-ink-2">
            {['Admissions', 'Academic operations', 'Fees & administration'].map((area) => (
              <li key={area} className="inline-flex items-center gap-2">
                <Check size={14} className="text-accent" aria-hidden />
                {area}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...enter(2)} className="relative mx-auto w-full max-w-[620px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[8%] bg-[radial-gradient(ellipse_at_52%_50%,rgb(79_70_229/0.1),transparent_67%)]"
          />
          <img
            src="/education-erp-admissions.png"
            alt="A student reviewing applications, documents, payments, and enrolment steps in an education portal."
            width={1152}
            height={768}
            fetchPriority="high"
            className="relative w-full mix-blend-multiply"
          />
          <div className="absolute bottom-[9%] left-[5%] inline-flex items-center gap-2 rounded-full border border-line bg-canvas/90 px-3 py-2 text-xs font-medium text-ink-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            Application review
          </div>
        </motion.div>
      </section>

      <section aria-label="ERP workflow areas" className="border-y border-line bg-surface/55">
        <div className="container-x grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {operationalAreas.map((area) => (
            <div key={area.number} className="border-line py-6 sm:px-5 sm:py-7 lg:border-l lg:first:border-l-0">
              <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-accent">{area.number}</p>
              <h2 className="mt-2 text-sm font-semibold">{area.title}</h2>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-ink-2">{area.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflows" aria-labelledby="workflows-title" className="container-x scroll-mt-24 py-[var(--section-y)]">
        <motion.div {...enter(0)} className="max-w-2xl">
          <p className="eyebrow">What the ERP supports</p>
          <h2 id="workflows-title" className="mt-4 text-h2 font-semibold">
            Follow the work—not just the module list.
          </h2>
          <p className="mt-4 max-w-xl text-lead text-ink-2">
            A closer look at the campus workflows available in Trihub Education ERP.
          </p>
        </motion.div>

        <div className="mt-14">
          {workflows.map((workflow, index) => (
            <article
              key={workflow.number}
              className="grid items-center gap-5 border-t border-line py-8 md:grid-cols-2 md:gap-12 md:py-10 lg:gap-20"
            >
              <motion.div {...enter(index)} className={index % 2 === 1 ? 'md:order-2' : undefined}>
                <div className="relative mx-auto max-w-[560px]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[10%] bg-[radial-gradient(ellipse_at_50%_55%,rgb(79_70_229/0.07),transparent_70%)]"
                  />
                  <img
                    src={workflow.image}
                    alt={workflow.alt}
                    width={1152}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="relative w-full mix-blend-multiply"
                  />
                </div>
              </motion.div>
              <motion.div {...enter(index + 1)} className={`max-w-xl ${index % 2 === 1 ? 'md:order-1 md:justify-self-end' : ''}`}>
                <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-accent">
                  {workflow.number} / {workflow.label}
                </p>
                <h3 className="mt-3 text-h2 font-semibold">{workflow.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-ink-2">{workflow.description}</p>
              </motion.div>
            </article>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <section id="capabilities" aria-labelledby="capabilities-title" className="bg-[#f0f1ff] py-[var(--section-y)]">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Institutional operations</p>
            <h2 id="capabilities-title" className="mt-4 max-w-md text-h2 font-semibold">
              The connected detail behind a campus day.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2">
              Give each team a clearer place to manage its part of the student and institutional journey.
            </p>
          </div>
          <div className="divide-y divide-[rgb(17_19_24/0.12)] border-y border-[rgb(17_19_24/0.12)]">
            {operationalAreas.map((area) => (
              <div key={area.number} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <h3 className="font-semibold">{area.title}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{area.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="implementation" aria-labelledby="implementation-title" className="container-x scroll-mt-24 py-[var(--section-y)]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">A practical rollout</p>
            <h2 id="implementation-title" className="mt-4 max-w-md text-h2 font-semibold">
              Start with how your institution works.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2">
              Review your workflows with the team before deciding what to configure, migrate, or connect.
            </p>
          </div>
          <ol className="border-t border-line">
            {implementationSteps.map(([title, detail], index) => (
              <li key={title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
                <span className="text-sm font-medium text-accent">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" aria-labelledby="erp-contact-title" className="container-x scroll-mt-24 pb-[var(--section-y)]">
        <div className="relative overflow-hidden rounded-[24px] bg-ink px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_15%,rgb(79_70_229/0.42),transparent_45%)]"
          />
          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-white/60">NEXT STEP</p>
              <h2 id="erp-contact-title" className="mt-3 text-h2 font-semibold">
                Walk us through a day on your campus.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-white/70">
                We’ll discuss the workflows you need, what is in scope, and where configuration or integration needs a closer look.
              </p>
            </div>
            <Button size="lg" variant="light" onClick={() => open('demo', 'ERP')} className="shrink-0">
              Request a walkthrough
              <ArrowRight size={17} aria-hidden />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
