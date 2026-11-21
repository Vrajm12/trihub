import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, Check, CircleHelp, Info } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { solutionCategories, solutionProducts, businessSolutions, type SolutionCategoryId, type SolutionProductId } from '@/data/solutions'
import { cn } from '@/lib/utils'

const productById = Object.fromEntries(solutionProducts.map((product) => [product.id, product])) as Record<SolutionProductId, (typeof solutionProducts)[number]>

const workflowIllustrations: Record<string, { src: string; alt: string; label: string; title: string; description: string; backgroundMatched?: boolean }> = {
  'admissions-lead-ownership': {
    src: '/admissions-crm-workflow.png',
    alt: 'Admissions CRM view showing enquiry ownership, application stages, and follow-up dates.',
    label: '01 / Lead ownership',
    title: 'Give every enquiry a clear owner.',
    description: 'See counsellor assignment, application stage, activity, and next follow-up together.',
  },
  'admissions-bulk-import': {
    src: '/admissions-crm-bulk-import.png',
    alt: 'CRM lead import view with processed, duplicate, and invalid spreadsheet rows.',
    label: '02 / Batch import',
    title: 'Move lead lists into the CRM in batches.',
    description: 'Import CSV data, handle duplicates, and review row-level validation results.',
  },
  'admissions-sms-followup': {
    src: '/admissions-crm-followups.png',
    alt: 'Admissions CRM follow-up view with scheduled calls, WhatsApp, email, notes, and next actions.',
    label: '03 / Follow-up',
    title: 'Keep the next follow-up visible.',
    description: 'Log calls, WhatsApp, email, and notes against leads. Follow-up dates are tracked; automatic reminders are not confirmed.',
  },
  'application-review-and-enrolment': {
    src: '/education-erp-admissions.png',
    alt: 'Student using an admissions portal to review an application, documents, payments, and enrolment steps.',
    label: '04 / Application review',
    title: 'Make each admissions step easy to track.',
    description: 'Review applications, documents, payments, and enrolment through the admissions portal.',
  },
  'cap-counselling-coordination': {
    src: '/education-erp-cap-counselling.png',
    alt: 'Admissions staff coordinating CAP counselling rounds, seat allotments, and student records.',
    label: '05 / CAP counselling',
    title: 'Coordinate each CAP round.',
    description: 'Import rosters, set seat matrices, generate merit lists, and manage allotments. Live DTE synchronization was not verified.',
  },
  'lecture-attendance-records': {
    src: '/education-erp-attendance.png',
    alt: 'Teacher recording lecture attendance against a section roster in an education ERP.',
    label: '06 / Lecture attendance',
    title: 'Record attendance from section rosters.',
    description: 'The ERP provides section roster and attendance-marking workflows, with attendance history and rollups.',
    backgroundMatched: true,
  },
  'exam-administration': {
    src: '/education-erp-examinations.png',
    alt: 'Examination staff reviewing eligibility, timetables, marks, and results in an education ERP.',
    label: '07 / Examination workflows',
    title: 'Manage exam stages in one examination workflow.',
    description: 'The ERP supports eligibility review, timetable publication, mark entry, verification, and result processing.',
    backgroundMatched: true,
  },
  'institution-fee-tracking': {
    src: '/education-erp-fees.png',
    alt: 'Student using an education finance dashboard to review fee records, payments, and balances.',
    label: '08 / Fees and finance',
    title: 'Track institutional fees from demand to receipt.',
    description: 'Manage fee structures, invoices, receipts, and outstanding balances in the ERP. This does not imply general-purpose accounting or tax-filing coverage.',
  },
  'payroll-run-preparation': {
    src: '/education-erp-payroll.png',
    alt: 'Education staff managing payroll records, attendance, payslips, and payroll run status.',
    label: '09 / Payroll preparation',
    title: 'Track payroll from employee inputs to run status.',
    description: 'Review attendance, preview and generate payroll runs, and track their status. Bank-file generation and salary disbursement are not verified.',
  },
}

function categoryFromHash() {
  const slug = window.location.hash.slice(1).replace(/^problem-/, '')
  return solutionCategories.find((category) => category.slug === slug)?.id
}

function ProductLink({ id }: { id: SolutionProductId }) {
  const product = productById[id]
  return (
    <a
      href={product.route}
      className="inline-flex items-center gap-1 text-xs font-medium text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {product.shortName}
      <ArrowRight size={12} aria-hidden />
    </a>
  )
}

function SolutionCard({ solution }: { solution: (typeof businessSolutions)[number] }) {
  const productIds = [solution.primaryProduct, ...solution.supportingProducts]
  const isConfigurable = solution.capabilityStatus === 'CONFIGURABLE'
  const illustration = workflowIllustrations[solution.slug]
  const isIllustrated = Boolean(illustration)
  return (
    <article id={`solution-${solution.slug}`} className="border-t border-line py-4 last:border-b">
      {!isIllustrated && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line pb-3">
          <div className="flex items-center gap-3">
            <span className="num text-sm font-medium text-accent" aria-label={`Workflow ${String(solution.displayPriority).padStart(2, '0')}`}>
              {String(solution.displayPriority).padStart(2, '0')}
            </span>
            <span className={cn('inline-flex items-center gap-1 text-xs font-medium', isConfigurable ? 'text-caution' : 'text-positive')}>
              {isConfigurable ? <Info size={13} aria-hidden /> : <Check size={13} aria-hidden />}
              {isConfigurable ? 'Configuration required' : 'Verified in product code'}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {productIds.map((id) => <ProductLink key={id} id={id} />)}
          </div>
        </div>
      )}

      {illustration ? (
        <div className="grid items-center gap-3 md:grid-cols-2 md:gap-6">
          <div className={cn('flex justify-center md:justify-start', solution.displayPriority % 2 === 0 && 'md:order-2 md:justify-end')}>
            <img
              src={illustration.src}
              alt={illustration.alt}
              className={cn(
                'block max-h-96 w-full max-w-2xl object-contain',
                !illustration.backgroundMatched && 'mix-blend-multiply',
              )}
              width={1152}
              height={768}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={cn('max-w-lg', solution.displayPriority % 2 === 0 && 'md:order-1')}>
            <p className="eyebrow">{illustration.label}</p>
            <h3 className="mt-3 text-h3 font-semibold">{illustration.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{illustration.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className={cn('inline-flex items-center gap-1 text-xs font-medium', isConfigurable ? 'text-caution' : 'text-positive')}>
                {isConfigurable ? <Info size={13} aria-hidden /> : <Check size={13} aria-hidden />}
                {isConfigurable ? 'Provider setup required' : 'Verified in product code'}
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {productIds.map((id) => <ProductLink key={id} id={id} />)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-3">Challenge</p>
              <h3 className="mt-1 text-base font-semibold leading-snug tracking-[-0.02em]">{solution.problemTitle}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{solution.problemDescription}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Impact</span> · {solution.businessImpact}
              </p>
            </div>
            <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pt-0 md:pl-8">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-3">Solution</p>
              <h4 className="mt-1 text-sm font-semibold leading-snug">{solution.solutionTitle}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{solution.solutionDescription}</p>
              {solution.statusNote && <p className="mt-1.5 text-xs leading-relaxed text-ink-3">{solution.statusNote}</p>}
            </div>
          </div>

          <div className="mt-4 grid gap-3 border-t border-line pt-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed">
              <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-3">Capabilities</span>
              {solution.capabilities.map((capability, index) => (
                <span key={capability} className="text-ink-2">
                  {index > 0 && <span className="mr-2 text-ink-3" aria-hidden>·</span>}
                  {capability}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-line pt-3 text-xs leading-relaxed sm:border-l sm:border-t-0 sm:pt-0 sm:pl-4">
              <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-3">Workflow</span>
              {solution.workflowSteps.map((step, index) => (
                <span key={step} className="text-ink-2">
                  <span className="num mr-1 text-[0.625rem] text-ink-3">{String(index + 1).padStart(2, '0')}</span>
                  {step}
                  {index < solution.workflowSteps.length - 1 && <span className="mx-1.5 text-ink-3" aria-hidden>→</span>}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </article>
  )
}

export function Solutions() {
  const { open } = useDemo()
  const [active, setActive] = useState<SolutionCategoryId>('lead-management')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const syncFromHash = () => {
      const categoryId = categoryFromHash()
      if (categoryId) setActive(categoryId)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('popstate', syncFromHash)
    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('popstate', syncFromHash)
    }
  }, [])

  const selectCategory = (categoryId: SolutionCategoryId) => {
    const category = solutionCategories.find((item) => item.id === categoryId)!
    setActive(categoryId)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#problem-${category.slug}`)
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % solutionCategories.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + solutionCategories.length) % solutionCategories.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = solutionCategories.length - 1
    else return
    event.preventDefault()
    const category = solutionCategories[next]
    selectCategory(category.id)
    tabs.current[next]?.focus()
  }

  return (
    <>
      <section aria-labelledby="solutions-title" className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(17_19_24/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_65%_70%_at_70%_45%,#000_5%,transparent_78%)]"
        />
        <div className="container-x relative grid items-center gap-8 pt-20 pb-[var(--section-y)] sm:pt-24 lg:grid-cols-12 lg:gap-4 lg:pt-28">
          <div className="lg:col-span-5">
            <p className="eyebrow">Problem-led solutions</p>
            <h1 id="solutions-title" className="mt-5 max-w-3xl text-display font-semibold">
              From first enquiry to a more connected campus.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-ink-2">
              Explore workflows evidenced in Trihub’s admissions CRM and education ERP: lead management, application processing, academic operations and institutional administration.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#solution-categories" variant="secondary" magnetic={false}>Explore problems</Button>
              <Button onClick={() => open('demo')} magnetic={false}>Discuss your requirements <ArrowRight size={16} /></Button>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-7 lg:justify-end">
            <img
              src="/solutions-hero.png"
              alt="Student and counsellor reviewing an application at a campus admissions desk."
              className="block max-h-80 w-full max-w-none object-contain mix-blend-multiply sm:max-h-96 lg:max-h-[40rem] lg:origin-right lg:scale-125"
              width={1201}
              height={768}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section id="solution-categories" aria-labelledby="problem-discovery-title" className="section-y">
        <div className="container-x">
          <p className="eyebrow">Find your challenge</p>
          <h2 id="problem-discovery-title" className="mt-4 max-w-3xl text-h2 font-semibold">What part of the student journey needs attention?</h2>
          <p className="mt-4 max-w-2xl text-lead text-ink-2">Choose a problem area to see the relevant workflow and the product evidence behind it.</p>

          <div className="mt-10 border-b border-line">
            <div role="tablist" aria-label="Business problem categories" aria-orientation="horizontal" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-3 [scrollbar-width:none]">
              {solutionCategories.map((category, index) => {
                const isActive = category.id === active
                const count = businessSolutions.filter((solution) => solution.category === category.id).length
                return (
                  <button
                    key={category.id}
                    ref={(element) => { tabs.current[index] = element }}
                    id={`tab-${category.slug}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${category.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectCategory(category.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.875rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                      isActive ? 'bg-ink text-white' : 'bg-surface text-ink-2 ring-1 ring-line hover:text-ink',
                    )}
                  >
                    {category.label}
                    <span className={cn('num text-[0.6875rem]', isActive ? 'text-white/70' : 'text-ink-3')}>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-6">
            {solutionCategories.map((category) => {
              const isActive = category.id === active
              const solutions = businessSolutions
                .filter((solution) => solution.category === category.id)
                .sort((a, b) => a.displayPriority - b.displayPriority)
              return (
                <div
                  key={category.id}
                  id={`panel-${category.slug}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${category.slug}`}
                  tabIndex={isActive ? 0 : -1}
                  hidden={!isActive}
                  className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-h3 font-semibold">{category.title}</h3>
                      <p className="mt-2 max-w-2xl text-[0.9375rem] text-ink-2">{category.description}</p>
                    </div>
                    <p className="text-[0.75rem] text-ink-3">{solutions.length} evidence-backed workflows</p>
                  </div>
                  <div>
                    {solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="connected-scope-title" className="border-y border-line bg-surface py-[var(--section-y)]">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">Connected, with clear boundaries</p>
            <h2 id="connected-scope-title" className="mt-4 text-h2 font-semibold">Know what is connected—and what still needs confirming.</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[1rem] leading-relaxed text-ink-2">
              The supplied CRM and education ERP repositories contain separate applications. Their workflows are evidenced individually; automatic CRM-to-ERP synchronization was not confirmed in this review. Integration scope should be checked for the specific deployment.
            </p>
              <div className="mt-6 flex items-start gap-3 border-l-2 border-accent pl-4">
                <CircleHelp size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h3 className="font-semibold">Need a process outside these workflows?</h3>
                <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">
                  Custom development or additional integrations need a separate scope; they are not represented here as standard, verified product features.
                </p>
                <a href="/custom-software/" className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
                  Discuss custom requirements <ArrowRight size={14} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="solutions-cta-title" className="container-x py-[var(--section-y)] text-center">
        <p className="eyebrow">Next step</p>
        <h2 id="solutions-cta-title" className="mx-auto mt-4 max-w-3xl text-h2 font-semibold">Your institution’s process deserves a closer look.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lead text-ink-2">Talk with the team about the workflow you need, the product scope, and any configuration or integration requirements.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => open('team')} magnetic={false}>Discuss your requirements <ArrowRight size={16} /></Button>
          <Button href="/products/" variant="secondary" magnetic={false}>Explore the platform</Button>
        </div>
      </section>
    </>
  )
}
