import { lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MousePointer2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { SceneMount } from '@/components/3d/SceneMount'
import { CorePoster } from '@/components/3d/CorePoster'
import { heroModules } from '@/data/modules'
import { ease } from '@/lib/motion'

const HeroScene = lazy(() => import('@/components/3d/HeroScene'))

const enter = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: ease.outExpo, delay: 0.15 + i * 0.08 },
})

const labels = heroModules.map((m) => m.label)

export function Hero() {
  const { open } = useDemo()
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Floor grid — the plane the system sits on. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(17_19_24/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_68%_55%,#000_10%,transparent_75%)]"
      />

      <div className="container-x relative grid min-h-[100svh] grid-cols-1 items-center pt-[calc(var(--nav-h)+2.5rem)] pb-10 lg:grid-cols-12 lg:pt-[var(--nav-h)] lg:pb-0">
        <div className="relative z-10 lg:col-span-6">
          <motion.p {...enter(0)} className="eyebrow inline-flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Trihub Business Systems
          </motion.p>

          <motion.h1
            {...enter(1)}
            id="hero-title"
            className="mt-6 text-display font-semibold [font-variation-settings:'opsz'_96]"
          >
            Your business.
            <br />
            <span className="text-ink-2">One connected system.</span>
          </motion.h1>

          <motion.p {...enter(2)} className="mt-7 max-w-[30rem] text-lead text-ink-2">
            CRM, ERP, automation and custom business software — designed around the way your business actually works.
          </motion.p>

          <motion.div {...enter(3)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => open('demo')}>
              Book a Demo
              <ArrowRight size={17} />
            </Button>
            <Button size="lg" variant="secondary" href="#solutions">
              Explore Solutions
            </Button>
          </motion.div>

          <motion.p {...enter(4)} className="mt-12 text-[0.75rem] font-medium tracking-[0.16em] text-ink-2">
            CRM <span className="mx-2 text-ink-3">•</span> ERP <span className="mx-2 text-ink-3">•</span> AUTOMATION
            <span className="mx-2 text-ink-3">•</span> ANALYTICS
          </motion.p>
        </div>

        {/* 3D system: in-flow on mobile, bleeding off the right edge on desktop. */}
        <SceneMount
          rootMargin="0px"
          className="relative -mx-[var(--gutter)] mt-6 h-[min(440px,58svh)] lg:absolute lg:inset-y-0 lg:right-[-2vw] lg:mx-0 lg:mt-0 lg:h-auto lg:w-[56vw]"
          poster={<CorePoster labels={labels} />}
        >
          {(p) => <HeroScene {...p} />}
        </SceneMount>

        <p className="pointer-events-none absolute bottom-8 right-[var(--gutter)] hidden items-center gap-2 text-[0.75rem] text-ink-2 lg:inline-flex">
          <MousePointer2 size={13} />
          Hover a module to see what it does
        </p>
      </div>
    </section>
  )
}
