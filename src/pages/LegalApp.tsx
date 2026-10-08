import { MotionConfig } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { privacy, terms } from '@/data/legal'
import { legalNav } from '@/data/nav'
import { cn } from '@/lib/utils'

export type LegalPageId = 'privacy' | 'terms'

export default function LegalApp({ page }: { page: LegalPageId }) {
  const doc = page === 'privacy' ? privacy : terms
  const current = page === 'privacy' ? '/privacy/' : '/terms/'

  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <SkipLink />
        <Nav />
        <main id="main" className="pb-[var(--section-y)] pt-[calc(var(--nav-h)+4rem)] md:pt-[calc(var(--nav-h)+6rem)]">
          <div className="container-x">
            <header className="max-w-3xl">
              <nav aria-label="Legal documents" className="flex gap-2">
                {legalNav.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    aria-current={l.href === current ? 'page' : undefined}
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors',
                      l.href === current ? 'bg-ink text-white' : 'text-ink-2 ring-1 ring-line-strong hover:text-ink',
                    )}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <h1 className="mt-8 text-h2 font-semibold">{doc.title}</h1>
              <p className="mt-4 text-lead text-ink-2">{doc.summary}</p>
              <p className="mt-6 text-[0.875rem] text-ink-2">
                Effective <time>{doc.effective}</time>
              </p>
            </header>

            <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-10">
              <aside className="hidden lg:col-span-3 lg:block">
                <nav aria-label="On this page" className="sticky top-[calc(var(--nav-h)+2rem)]">
                  <p className="eyebrow">On this page</p>
                  <ol className="mt-4 space-y-2.5 text-[0.875rem]">
                    {doc.sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="text-ink-2 transition-colors hover:text-ink">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <article className="legal-prose lg:col-span-8 lg:col-start-5">
                {doc.sections.map((s, i) => (
                  <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                    <h2 id={`${s.id}-h`}>
                      <span className="num mr-3 text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </h2>
                    {s.body}
                  </section>
                ))}
              </article>
            </div>
          </div>
        </main>
        <Footer />
        <StructuredData page={page} />
      </DemoProvider>
    </MotionConfig>
  )
}
