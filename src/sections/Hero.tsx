import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { ease } from '@/lib/motion'

const enter = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: ease.outExpo, delay: 0.15 + i * 0.08 },
})

export function Hero() {
  const { open } = useDemo()
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative grid min-h-svh place-items-center overflow-hidden bg-canvas text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_78%,rgb(79_70_229/0.09),transparent_58%)]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 460"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] w-full"
      >
        <defs>
          <linearGradient id="hero-wave-fill" x1="0" x2="0.82" y1="0" y2="1">
            <stop offset="0" stopColor="#818cf8" stopOpacity=".03" />
            <stop offset=".42" stopColor="#6366f1" stopOpacity=".1" />
            <stop offset="1" stopColor="#4f46e5" stopOpacity=".16" />
          </linearGradient>
          <linearGradient id="hero-wave-edge" x1="0" x2="1" y1="0.1" y2="0.9">
            <stop offset="0" stopColor="#60a5fa" stopOpacity=".16" />
            <stop offset=".48" stopColor="#4f46e5" stopOpacity=".58" />
            <stop offset="1" stopColor="#60a5fa" stopOpacity=".2" />
          </linearGradient>
          <radialGradient id="hero-wave-glow">
            <stop stopColor="#818cf8" stopOpacity=".2" />
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M0 218C170 170 288 179 454 239s257 90 408 28 352-88 578-14v207H0Z"
          fill="url(#hero-wave-fill)"
        />
        <path
          d="M0 295c175-70 296-59 463-3s251 81 410 28 357-89 567-22v162H0Z"
          fill="url(#hero-wave-fill)"
          fillOpacity=".8"
        />
        <path
          d="M0 219c170-49 288-40 454 20s257 90 408 28 352-88 578-14"
          fill="none"
          stroke="url(#hero-wave-edge)"
          strokeWidth="2.5"
        />
        <path
          d="M0 298c175-70 296-59 463-3s251 81 410 28 357-89 567-22"
          fill="none"
          stroke="#6366f1"
          strokeOpacity=".22"
          strokeWidth="1.5"
        />
        <ellipse cx="728" cy="292" rx="540" ry="110" fill="url(#hero-wave-glow)" opacity=".45" />
        <g fill="#4f46e5">
          <circle cx="92" cy="174" r="2" opacity=".32" />
          <circle cx="166" cy="264" r="3" opacity=".24" />
          <circle cx="248" cy="214" r="1.6" opacity=".42" />
          <circle cx="322" cy="320" r="2.4" opacity=".3" />
          <circle cx="408" cy="198" r="2" opacity=".32" />
          <circle cx="506" cy="276" r="3.2" opacity=".2" />
          <circle cx="587" cy="342" r="1.8" opacity=".45" />
          <circle cx="674" cy="232" r="2.2" opacity=".3" />
          <circle cx="762" cy="311" r="3" opacity=".36" />
          <circle cx="844" cy="188" r="1.6" opacity=".42" />
          <circle cx="925" cy="272" r="2.4" opacity=".22" />
          <circle cx="1002" cy="344" r="2" opacity=".44" />
          <circle cx="1096" cy="214" r="3" opacity=".27" />
          <circle cx="1176" cy="297" r="1.8" opacity=".4" />
          <circle cx="1268" cy="185" r="2.5" opacity=".31" />
          <circle cx="1350" cy="324" r="2" opacity=".36" />
          <circle cx="216" cy="364" r="1.5" opacity=".33" />
          <circle cx="466" cy="385" r="2" opacity=".26" />
          <circle cx="700" cy="396" r="1.6" opacity=".4" />
          <circle cx="896" cy="376" r="2" opacity=".3" />
          <circle cx="1140" cy="392" r="1.5" opacity=".4" />
          <circle cx="1290" cy="250" r="1.6" opacity=".35" />
        </g>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-b from-transparent to-canvas sm:h-48"
      />

      <div className="container-x relative z-10 flex min-h-svh flex-col items-center justify-between pt-[calc(var(--nav-h)+2rem)] pb-12 text-center sm:pb-14">
        <div className="flex w-full flex-1 flex-col items-center justify-center pb-10">
          <motion.p
            {...enter(0)}
            className="mx-auto inline-flex items-center gap-2.5 text-[0.6875rem] font-medium tracking-[0.18em] text-ink-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            TRIHUB BUSINESS SYSTEMS
          </motion.p>

          <motion.h1
            {...enter(1)}
            id="hero-title"
            className="mx-auto mt-7 max-w-6xl font-semibold [font-size:clamp(2.75rem,6.2vw,5.5rem)] [font-variation-settings:'opsz'_96] [letter-spacing:-0.068em] [line-height:0.96]"
          >
            Your business.
            <br />
            <span className="text-accent">One connected system.</span>
          </motion.h1>

          <motion.p {...enter(2)} className="mx-auto mt-6 max-w-2xl text-lead text-ink-2">
            CRM, ERP, automation and custom business software — designed around the way your business actually works.
          </motion.p>

          <motion.div {...enter(3)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => open('demo')}>
              Book a Demo
              <ArrowRight size={17} />
            </Button>
            <Button size="lg" variant="secondary" href="/solutions/">
              Explore Solutions
            </Button>
          </motion.div>
        </div>

        <motion.div {...enter(4)} className="w-full pb-1">
          <p className="flex flex-wrap items-center justify-center text-[0.6875rem] font-medium tracking-[0.16em] text-ink-2">
            CRM <span className="mx-2 text-ink-3">•</span> ERP <span className="mx-2 text-ink-3">•</span> AUTOMATION
            <span className="mx-2 text-ink-3">•</span> ANALYTICS
          </p>
        </motion.div>
      </div>
    </section>
  )
}
