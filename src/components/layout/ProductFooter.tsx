import { LogoMark } from '@/components/ui/Logo'
import { addressLine, company, site } from '@/lib/config'

type Props = {
  productLabel: string
  contactHref?: string
}

export function ProductFooter({ productLabel, contactHref = 'https://trihub.tech/contact/' }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-x py-10 md:py-12">
        <div className="flex flex-col gap-10 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
          <div className="text-[0.8125rem] text-ink-2">
            <a
              href={company.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 text-ink"
            >
              <LogoMark mono className="h-4 w-4" />
              <span className="font-medium tracking-[0.08em]">Built by TRIVERSE SOLUTIONS</span>
            </a>
            <p className="mt-3 max-w-md leading-relaxed">
              {company.legalName} · {addressLine} · CIN {company.cin}
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-ink-2">
            <li>© {year} {company.legalName}</li>
            <li><a href="https://trihub.tech/privacy/" className="hover:text-ink">Privacy Policy</a></li>
            <li><a href="https://trihub.tech/terms/" className="hover:text-ink">Terms of Use</a></li>
            <li><a href={contactHref} className="hover:text-ink">Contact</a></li>
          </ul>
        </div>
        <p className="mt-5 text-xs text-ink-3">
          Trihub {productLabel} · <a href={`mailto:${site.contactEmail}`} className="hover:text-ink">{site.contactEmail}</a>
        </p>
      </div>

      <div aria-label={`Trihub ${productLabel}`} className="footer-wordmark-band">
        <span
          className={`footer-wordmark ${
            productLabel.length > 14
              ? 'text-[clamp(2.8rem,13vw,10rem)]'
              : productLabel.length > 8
                ? 'text-[clamp(3.3rem,16vw,12rem)]'
                : 'text-[clamp(4.5rem,21vw,16rem)]'
          }`}
        >
          TRI<span className="text-accent">HUB {productLabel}</span>
        </span>
      </div>
    </footer>
  )
}
