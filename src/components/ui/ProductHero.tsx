import { cn } from '@/lib/utils'

interface ProductHeroProps {
  product: string
  id: string
  level?: 'h1' | 'h2'
  description?: string
  caption?: string
  action?: { label: string; href: string } | { label: string; onClick: () => void }
}

export function ProductHero({
  product,
  id,
  level: Heading = 'h1',
  description,
  caption,
  action,
}: ProductHeroProps) {
  const compact = product.length > 7
  return (
    <header className="relative grid min-h-[calc(100svh-var(--nav-h))] place-items-center overflow-hidden border-b border-line bg-[#f8f7f4] px-[var(--gutter)] py-24 text-center text-ink">
      <img
        aria-hidden
        alt=""
        src="/erp-hero-pattern.svg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <p className="eyebrow">Connected business operations</p>
        <Heading
          id={id}
          className={cn(
            'mt-7 whitespace-nowrap font-semibold leading-[0.9] tracking-[-0.075em]',
            compact
              ? 'text-[clamp(1.5rem,8vw,7rem)]'
              : 'text-[clamp(3.25rem,14vw,12rem)]',
          )}
        >
          <span className="text-ink">Trihub</span>{' '}
          <span className="text-accent">
            {product.split(/(-)/g).map((part, index) =>
              part === '-' ? (
                <span key={index} className="mx-[0.08em]">{part}</span>
              ) : (
                <span key={index}>{part}</span>
              ),
            )}
          </span>
        </Heading>
        {action ? (
          'href' in action ? (
            <a
              href={action.href}
              className="mt-8 inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full border border-white/80 bg-accent px-7 text-base font-semibold tracking-[-0.01em] text-white shadow-[0_0_12px_rgb(255_255_255/0.25)] transition-colors duration-200 hover:border-accent hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 max-md:h-11 max-md:px-5 max-md:text-[0.9375rem]"
            >
              {action.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-8 inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full border border-white/80 bg-accent px-7 text-base font-semibold tracking-[-0.01em] text-white shadow-[0_0_12px_rgb(255_255_255/0.25)] transition-colors duration-200 hover:border-accent hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 max-md:h-11 max-md:px-5 max-md:text-[0.9375rem]"
            >
              {action.label}
            </button>
          )
        ) : (
          <span aria-hidden className="mt-8 h-px w-12 bg-accent/60" />
        )}
        {description && <p className="mt-6 max-w-2xl text-lead text-ink-2">{description}</p>}
        {caption && (
          <p className="mt-10 font-mono text-[0.6875rem] tracking-[0.18em] text-ink-3">
            {caption}
          </p>
        )}
      </div>
    </header>
  )
}
