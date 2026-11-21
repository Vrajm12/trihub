import { ArrowUpRight } from 'lucide-react'
import { LogoMark } from '@/components/ui/Logo'
import { footerNav, legalNav } from '@/data/nav'
import { addressLine, company, site } from '@/lib/config'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="inline-flex items-center gap-2.5 text-ink">
              <LogoMark className="h-[26px] w-[26px]" />
              <span className="text-[1.3125rem] font-semibold leading-none tracking-[-0.04em]">Trihub</span>
            </div>
            <p className="mt-4 text-[0.9375rem] text-ink-2">Business systems built around the way you work.</p>
            <a href={`mailto:${site.contactEmail}`} className="footer-link mt-5 inline-block text-[0.9375rem] font-medium text-ink">
              <span className="footer-link-text">{site.contactEmail}</span>
            </a>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-14 gap-y-3">
                {footerNav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="footer-link text-[0.9375rem] text-ink-2">
                      <span className="footer-link-text">{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink-2">Company</p>
              <ul className="mt-3 space-y-3 text-[0.9375rem]">
                <li>
                  <a href={company.url} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-1 text-ink-2">
                    <span className="footer-link-text">Triverse Solutions</span> <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a href={company.sameAs[0]} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-1 text-ink-2">
                    <span className="footer-link-text">LinkedIn</span> <ArrowUpRight size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <div className="text-[0.8125rem] text-ink-2">
            <a href={company.url} target="_blank" rel="noopener" className="footer-link inline-flex items-center gap-2.5">
              <LogoMark mono className="h-4 w-4 text-ink-2" />
              <span>
                Built by{' '}
                <span className="footer-link-text font-medium tracking-[0.08em] text-ink">TRIVERSE SOLUTIONS</span>
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
                <a href={l.href} className="footer-link">
                  <span className="footer-link-text">{l.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="/contact/" className="footer-link">
                <span className="footer-link-text">Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div aria-hidden="true" className="footer-wordmark-band">
        <span className="footer-wordmark">
          TRI<span className="text-accent">HUB</span>
        </span>
      </div>
    </footer>
  )
}
