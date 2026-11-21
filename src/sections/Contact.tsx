import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { addressLine, company, site } from '@/lib/config'
import { ease } from '@/lib/motion'

const enter = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: ease.outExpo, delay: 0.12 + i * 0.08 },
})

function ContactIllustration() {
  return (
    <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[420px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-8 bg-[radial-gradient(ellipse_at_50%_50%,rgb(79_70_229/0.08),transparent_68%)]"
      />
      <img
        src="/contact-conversation.png"
        alt="A team member talking through a question over the phone while working at a laptop."
        width={1152}
        height={864}
        className="relative w-full max-w-[600px] mix-blend-multiply"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}

export function Contact() {
  const { open } = useDemo()

  return (
    <section aria-labelledby="contact-title" className="container-x pb-[var(--section-y)] pt-8 sm:pt-12">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
        <motion.div {...enter(0)}>
          <ContactIllustration />
        </motion.div>

        <div className="flex flex-col items-start justify-center py-8 md:py-12">
          <motion.p {...enter(1)} className="eyebrow">
            CONTACT · TRIHUB
          </motion.p>
          <motion.h1
            {...enter(2)}
            id="contact-title"
            className="mt-5 max-w-xl text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.06em]"
          >
            Tell us where work gets stuck.
          </motion.h1>
          <motion.p {...enter(3)} className="mt-5 max-w-lg text-base leading-relaxed text-ink-2 sm:text-[1.0625rem]">
            Maybe information lives in too many places, or a handoff keeps slowing the team down. Tell us how it works today;
            we’ll help map a practical next step.
          </motion.p>
          <motion.div {...enter(4)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => open('team')}>
              Talk through your workflow
              <ArrowRight size={17} />
            </Button>
            <a
              href={`mailto:${site.contactEmail}`}
              className="inline-flex h-[52px] items-center gap-1.5 rounded-full px-4 text-sm font-medium text-ink-2 transition-colors hover:text-accent-ink"
            >
              Or email us <ArrowUpRight size={15} aria-hidden />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-line pt-7 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
        <div>
          <div className="flex items-center gap-2 text-ink-2">
            <Mail size={15} aria-hidden />
            <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.14em]">Email</h2>
          </div>
          <a className="mt-3 inline-flex items-center gap-1 font-medium text-ink hover:text-accent-ink" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <p className="mt-1 text-sm text-ink-2">For product questions and enquiries.</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-ink-2">
            <Phone size={15} aria-hidden />
            <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.14em]">Phone</h2>
          </div>
          <a
            className="mt-3 inline-flex items-center gap-1 font-medium text-ink hover:text-accent-ink"
            href={`tel:${company.phone.replaceAll(' ', '')}`}
          >
            {company.phone}
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <p className="mt-1 text-sm text-ink-2">Speak with the Triverse Solutions team.</p>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-ink-2">
            <MapPin size={15} aria-hidden />
            <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.14em]">Office</h2>
          </div>
          <p className="mt-3 font-medium text-ink">{addressLine}</p>
          <p className="mt-1 text-sm text-ink-2">Maharashtra, India</p>
        </div>
      </div>
    </section>
  )
}
