import { ArrowUpRight } from 'lucide-react'
import { Logo, LogoMark } from '@/components/ui/Logo'
import { footerNav, legalNav } from '@/data/nav'
import { addressLine, company, site } from '@/lib/config'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[0.9375rem] text-ink-2">Business systems built around the way you work.</p>
            <a href={`mailto:${site.contactEmail}`} className="mt-5 inline-block text-[0.9375rem] font-medium text-ink hover:underline">
              {site.contactEmail}
            </a>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-14 gap-y-3">
                {footerNav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-2">Company</p>
              <ul className="mt-3 space-y-3 text-[0.9375rem]">
                <li>
                  <a href={company.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
                    Triverse Solutions <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a href={company.sameAs[0]} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <div className="text-[0.8125rem] text-ink-2">
            <a href={company.url} target="_blank" rel="noopener" className="group inline-flex items-center gap-2.5">
              <LogoMark mono className="h-4 w-4 text-ink-2" />
              <span>
                Built by{' '}
                <span className="font-medium tracking-[0.08em] text-ink group-hover:underline">TRIVERSE SOLUTIONS</span>
              </span>
            </a>
            <p className="mt-3 max-w-md leading-relaxed">
              {company.legalName} · {addressLine} · CIN {company.cin}
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-ink-2">
            <li>
              © {year} {company.legalName}
            </li>
            {legalNav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/#contact" className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
