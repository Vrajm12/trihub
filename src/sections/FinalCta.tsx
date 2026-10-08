import { lazy, useRef } from 'react'
import { useScroll } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useDemo } from '@/components/ui/DemoDialog'
import { SceneMount } from '@/components/3d/SceneMount'
import { CorePoster } from '@/components/3d/CorePoster'
import { heroModules } from '@/data/modules'

const HeroScene = lazy(() => import('@/components/3d/HeroScene'))

export function FinalCta() {
  const { open } = useDemo()
  const ref = useRef<HTMLElement>(null)
  // Modules assemble into the connected system as the section scrolls into view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })

  return (
    <section ref={ref} id="contact" aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(17_19_24/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_70%,#000_10%,transparent_75%)]"
      />
      <div className="container-x relative pt-[var(--section-y)] text-center">
        <Reveal>
          <h2 id="cta-title" className="mx-auto max-w-3xl text-h2 font-semibold">
            Ready to connect your business?
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="mx-auto mt-5 max-w-md text-lead text-ink-2">Let’s build the system your business actually needs.</p>
        </Reveal>
        <Reveal index={2} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => open('demo')}>
            Book a Demo <ArrowRight size={17} />
          </Button>
          <Button size="lg" variant="secondary" onClick={() => open('team')}>
            Talk to Our Team
          </Button>
        </Reveal>
      </div>

      <SceneMount
        className="relative mx-auto h-[380px] max-w-[1100px] sm:h-[480px] lg:h-[560px]"
        poster={<CorePoster labels={heroModules.map((m) => m.label)} />}
      >
        {(p) => <HeroScene {...p} variant="cta" getProgress={() => scrollYProgress.get()} />}
      </SceneMount>
    </section>
  )
}
