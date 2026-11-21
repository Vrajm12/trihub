import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { industries, type Industry } from '@/data/industries'

const industryGroups = [
  {
    id: 'established-industries',
    eyebrow: '01 / ESTABLISHED INDUSTRIES',
    title: 'Systems for the work that keeps business moving.',
    description:
      'Bring complex, day-to-day operations into one clear flow, from the first enquiry through delivery.',
    image: '/industries-core.png',
    imageAlt: 'Education, real estate, manufacturing, and professional services',
    items: industries.slice(0, 4),
  },
  {
    id: 'growing-industries',
    eyebrow: '02 / GROWING BUSINESSES',
    title: 'More room to grow. Less work falling through.',
    description:
      'Keep service, sales and operations connected as your customers, team and business grow.',
    image: '/industries-growth.png',
    imageAlt: 'Healthcare, retail, startups, and small and medium-sized businesses',
    items: industries.slice(4),
  },
]

function IndustryGroup({
  group,
  reverse = false,
}: {
  group: (typeof industryGroups)[number]
  reverse?: boolean
}) {
  return (
    <article
      id={group.id}
      aria-labelledby={`${group.id}-title`}
      className="grid items-center gap-8 border-t border-line py-12 sm:gap-10 sm:py-16 md:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <figure className={`flex items-center justify-center ${reverse ? 'md:order-2' : ''}`}>
        <img
          src={group.image}
          alt={group.imageAlt}
          loading="lazy"
          className="h-auto w-full max-w-2xl object-contain"
        />
      </figure>

      <div className={reverse ? 'md:order-1' : ''}>
        <p className="eyebrow">{group.eyebrow}</p>
        <h2
          id={`${group.id}-title`}
          className="mt-4 max-w-xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.045em]"
        >
          {group.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-2">{group.description}</p>

        <ul className="mt-7 grid gap-x-6 sm:grid-cols-2">
          {group.items.map((industry: Industry) => {
            const Icon = industry.icon
            return (
              <li key={industry.id} className="border-t border-line py-5">
                <div className="flex items-center gap-2.5">
                  <Icon size={17} className="shrink-0 text-accent" aria-hidden="true" />
                  <h3 className="text-[0.9375rem] font-semibold">{industry.label}</h3>
                </div>
                <p className="mt-2 text-[0.9375rem] font-medium leading-snug">{industry.headline}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-2">{industry.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}

export function Industries({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel

  return (
    <>
      <header
        aria-labelledby="industries-title"
        className="relative grid min-h-[calc(100svh-var(--nav-h))] place-items-center overflow-hidden border-b border-line bg-canvas px-[var(--gutter)] py-20 text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-36 top-1/4 h-72 w-72 rounded-full border border-accent/10 sm:-left-44 sm:h-96 sm:w-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-[-5rem] h-72 w-72 rounded-full border border-accent/10 sm:-right-40 sm:h-96 sm:w-96"
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
          <p className="eyebrow">Connected business operations</p>
          <Heading
            id="industries-title"
            className="industries-hero-title mt-7 font-semibold"
          >
            <span className="text-ink">Industries We</span>{' '}
            <span className="text-accent">Serve.</span>
          </Heading>
          <p className="mt-7 max-w-2xl text-lead text-ink-2">
            Connected systems shaped around the way your industry works — from the first customer
 conversation to the work that happens behind it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href="#industry-groups"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent"
            >
              Explore industries <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-accent"
            >
              Talk to our team <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <section id="industries" aria-label="Industries served" className="bg-canvas">
        <div id="industry-groups" className="container-x">
          {industryGroups.map((group, index) => (
            <IndustryGroup key={group.id} group={group} reverse={index === 1} />
          ))}
        </div>
      </section>

      <footer className="border-t border-line bg-canvas px-[var(--gutter)] py-16 text-center sm:py-20">
        <p className="eyebrow">A better fit for your business</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-[-0.045em]">
          Start with the way your team works.
        </h2>
        <a
          href="/contact/"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ink"
        >
          Talk to our team <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </footer>
    </>
  )
}
