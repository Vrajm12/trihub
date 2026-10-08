import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { faqs } from '@/data/faq'

/**
 * Native <details> keeps every answer in the HTML (readable by crawlers and
 * answer engines) while staying keyboard- and screen-reader-friendly.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered." lead="What Trihub is, who it is for, and how working with us runs." />
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faqs.map((f, i) => (
              <Reveal key={f.q} index={i % 4}>
                <details className="group border-b border-line" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.012em]">{f.q}</h3>
                    <Plus
                      size={18}
                      aria-hidden
                      className="mt-1 shrink-0 text-ink-2 transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="-mt-1 max-w-2xl pb-7 text-ink-2">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
