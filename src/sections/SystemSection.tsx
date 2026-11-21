import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  MessagesSquare,
  Package,
  Search,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { systemModules } from '@/data/modules'

interface ProductLink {
  name: string
  summary: string
  href: string
  icon: LucideIcon
}

const relationshipProducts: ProductLink[] = [
  { name: 'CRM', summary: 'Lead pipeline and follow-ups', href: '/crm/', icon: Users },
  { name: 'Outreach Portal', summary: 'Campaigns and stakeholder engagement', href: '/outreach-portal/', icon: MessagesSquare },
  { name: 'Lead Scraper', summary: 'Lead discovery and data enrichment', href: '/lead-scraper/', icon: Search },
]

const operationsProducts: ProductLink[] = [
  { name: 'ERP', summary: 'Connected operations and resources', href: '/erp/', icon: Boxes },
  { name: 'MFG-System', summary: 'Production and work-order planning', href: '/mfg-system/', icon: Package },
  { name: 'Finance System', summary: 'Payments, accounts and reporting', href: '/finance-system/', icon: Wallet },
  { name: 'Automation', summary: 'Workflows that run across teams', href: '/automation/', icon: Workflow },
]

function ConnectedSystemArtwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="product-catalog-artwork--system absolute inset-0" />
      <div className="absolute -right-3 top-8 h-28 w-28 rounded-full border border-white/70 sm:right-4 sm:top-10 sm:h-36 sm:w-36" />
      <div className="absolute bottom-8 left-4 h-20 w-20 rounded-full bg-accent-line sm:bottom-10 sm:left-8 sm:h-28 sm:w-28" />
      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-[20px] border border-white/80 bg-white/95 p-4 sm:inset-x-10 sm:rounded-[24px] sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-ink-2">TRIHUB SYSTEM</p>
            <p className="mt-1 text-[0.9375rem] font-semibold">One connected workspace</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-positive-soft px-2.5 py-1 text-[0.6875rem] font-medium text-positive">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            Connected
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
          {systemModules.map((module) => {
            const Icon = module.icon
            return (
              <div key={module.id} className="flex min-w-0 items-center gap-2 rounded-[10px] bg-surface-2 px-2.5 py-2.5 sm:gap-2.5 sm:px-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-accent-soft text-accent-ink">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="truncate text-[0.75rem] font-medium sm:text-[0.8125rem]">{module.label}</span>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-[0.6875rem] text-ink-2">8 connected modules · one shared data layer</p>
      </div>
    </div>
  )
}

function ProductStack({ items, tone }: { items: ProductLink[]; tone: 'accent' | 'neutral' }) {
  const artworkClass = tone === 'accent' ? 'product-catalog-artwork--accent' : 'product-catalog-artwork--neutral'

  return (
    <div
      aria-hidden="true"
      className={`product-catalog-artwork ${artworkClass} relative flex min-h-[350px] items-center justify-center overflow-hidden p-5 sm:min-h-[430px] sm:p-8`}
    >
      <div className="absolute -bottom-16 -right-12 h-52 w-52 rounded-full border border-white/60 sm:-bottom-20 sm:-right-16 sm:h-64 sm:w-64" />
      <div className="absolute -left-10 top-1/3 h-32 w-32 rounded-full bg-white/20" />
      <div className="relative w-full max-w-md rounded-[18px] border border-white/80 bg-white/95 p-4 sm:rounded-[22px] sm:p-5">
        <div className="flex items-center justify-between border-b border-line pb-3.5">
          <div>
            <p className="text-[0.625rem] font-semibold tracking-[0.15em] text-ink-2">PRODUCT WORKSPACE</p>
            <p className="mt-1 text-[0.9375rem] font-semibold">Connected tools</p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
        <ul className="mt-2">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name} className="flex items-center gap-3 border-b border-line py-3 last:border-0 last:pb-1">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent-soft text-accent-ink">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.8125rem] font-semibold">{item.name}</span>
                  <span className="mt-0.5 block truncate text-[0.6875rem] text-ink-2">{item.summary}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function ProductLinks({ items }: { items: ProductLink[] }) {
  return (
    <ul className="mt-7 border-y border-line">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.name} className="border-b border-line last:border-0">
            <a
              href={item.href}
              className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-accent"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon size={17} className="shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-semibold">{item.name}</span>
                  <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-2">{item.summary}</span>
                </span>
              </span>
              <ArrowUpRight size={17} className="shrink-0 text-ink-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function SystemSection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel

  return (
    <section id="platform" aria-labelledby="platform-title" className="product-catalog relative overflow-hidden py-6 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full border border-accent/10 sm:-left-40 sm:h-96 sm:w-96" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-[45%] h-64 w-64 rounded-full border border-accent/10 sm:-right-32 sm:h-80 sm:w-80" />
      <div className="container-x relative">
        <div className="mx-auto max-w-6xl overflow-hidden">
          <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-10 sm:py-5 lg:px-14">
            <a href="/" className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ink">
              TRIHUB <span className="text-ink-3">/</span> PRODUCTS
            </a>
            <a href="/contact/" className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold tracking-[0.08em] text-ink transition-colors hover:text-accent">
              CONTACT US <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </header>

          <div className="grid items-center gap-10 px-5 py-10 sm:px-10 sm:py-14 md:grid-cols-[0.92fr_1.08fr] md:gap-10 md:px-12 md:py-16 lg:gap-12 lg:px-16">
            <div className="max-w-lg">
              <p className="eyebrow">Connected business operations</p>
              <Heading id="platform-title" className="mt-5 text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                One system.
                <br />
                <span className="text-accent">Better work.</span>
              </Heading>
              <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ink-2 sm:text-[1.0625rem]">
                Explore seven products for customer relationships, operations and growth — connected through one shared data layer.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#product-lines" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.875rem] font-semibold text-white transition-colors hover:bg-accent">
                  Explore products <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a href="/contact/" className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink transition-colors hover:text-accent">
                  Talk to our team <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
            <ConnectedSystemArtwork />
          </div>

          <div id="product-lines" className="space-y-16 px-5 pb-10 sm:space-y-24 sm:px-10 sm:pb-14 lg:space-y-28 lg:px-16 lg:pb-20">
            <article aria-labelledby="relationships-title" className="grid items-center gap-8 border-t border-line pt-10 sm:pt-14 md:grid-cols-2 md:gap-10 lg:gap-16">
              <ProductStack items={relationshipProducts} tone="accent" />
              <div className="max-w-lg md:pl-2">
                <p className="eyebrow">01 <span className="mx-2 text-ink-3">/</span> CUSTOMER RELATIONSHIPS</p>
                <h2 id="relationships-title" className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
                  Every relationship has a next step.
                </h2>
                <p className="mt-4 leading-relaxed text-ink-2">
                  Find the right prospects, keep every conversation in context, and make outreach easier to coordinate.
                </p>
                <ProductLinks items={relationshipProducts} />
              </div>
            </article>

            <article aria-labelledby="operations-title" className="grid items-center gap-8 border-t border-line pt-10 sm:pt-14 md:grid-cols-2 md:gap-10 lg:gap-16">
              <div className="order-2 max-w-lg md:order-1">
                <p className="eyebrow">02 <span className="mx-2 text-ink-3">/</span> OPERATIONS &amp; DELIVERY</p>
                <h2 id="operations-title" className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
                  Keep the work behind every promise in sync.
                </h2>
                <p className="mt-4 leading-relaxed text-ink-2">
                  Coordinate production, resources and finance while automating the repeatable work that slows teams down.
                </p>
                <ProductLinks items={operationsProducts} />
              </div>
              <div className="order-1 md:order-2">
                <ProductStack items={operationsProducts} tone="neutral" />
              </div>
            </article>
          </div>

          <footer className="mx-5 mb-5 rounded-[22px] bg-accent-soft px-5 py-8 text-center sm:mx-10 sm:mb-10 sm:py-10 lg:mx-16">
            <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-ink-2">PRODUCTS THAT WORK BETTER TOGETHER</p>
            <p className="mt-3 text-[1.125rem] font-semibold tracking-[-0.02em] sm:text-[1.375rem]">Start with the workflow that matters most.</p>
            <a href="/contact/" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-white px-5 text-[0.875rem] font-semibold transition-colors hover:border-accent hover:text-accent">
              Talk to our team <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </footer>
        </div>
      </div>
    </section>
  )
}
