import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate min-h-[calc(100svh-var(--nav-h))] overflow-hidden bg-[#f2f1ff]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden text-accent/[0.055]">
        <p className="absolute -left-[0.12em] -top-[0.2em] whitespace-nowrap text-[clamp(10rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.09em]">
          404&nbsp;404
        </p>
        <p className="absolute -right-[0.16em] top-[37%] whitespace-nowrap text-[clamp(10rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.09em]">
          404&nbsp;404
        </p>
        <p className="absolute -left-[0.12em] -bottom-[0.22em] whitespace-nowrap text-[clamp(10rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.09em]">
          404&nbsp;404
        </p>
      </div>

      <div className="container-x relative grid min-h-[calc(100svh-var(--nav-h))] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">404 · ROUTE NOT FOUND</p>
          <h1
            id="not-found-title"
            className="mt-5 max-w-[11ch] text-[clamp(3rem,6.4vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
          >
            This page took a wrong turn.
          </h1>
          <p className="mt-6 max-w-lg text-lead text-ink-2">
            The address may be outdated, or the page may have moved. Let’s get you back to something useful.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Back to home <ArrowRight size={17} aria-hidden />
            </Button>
            <Button href="/solutions/" size="lg" variant="secondary">
              Explore solutions
            </Button>
          </div>
        </div>

        <div aria-hidden className="relative mx-auto w-full max-w-[500px] [perspective:1200px]">
          <div className="absolute inset-x-8 top-7 bottom-2 rotate-[7deg] rounded-[28px] bg-[#d9d6ff]" />
          <div className="absolute inset-x-4 top-3 bottom-1 rotate-[3deg] rounded-[28px] bg-[#b8b3ff]" />
          <div className="relative -rotate-2 overflow-hidden rounded-[28px] bg-accent text-white shadow-[0_30px_70px_-30px_rgb(79_70_229/0.55)]">
            <div
              className="absolute right-0 top-0 h-20 w-20 bg-white/20 [clip-path:polygon(0_0,100%_100%,100%_0)]"
            />
            <div className="relative px-7 pb-7 pt-8 sm:px-10 sm:pt-10">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-white/65">TRIHUB / ROUTE 404</p>
              <p className="mt-12 text-[clamp(7.5rem,16vw,11rem)] font-semibold leading-[0.72] tracking-[-0.09em]">
                404
              </p>
              <div className="mt-9 flex items-center justify-between border-t border-white/25 pt-5">
                <span className="text-[0.6875rem] font-medium tracking-[0.14em] text-white/70">
                  PAGE NOT FOUND
                </span>
                <span className="h-2 w-2 rounded-full bg-white/80" />
              </div>
            </div>
            <div className="relative mx-5 mt-1 -rotate-1 bg-[#3f36bd] px-7 py-6 [clip-path:polygon(0_0,100%_0,95%_100%,5%_84%)] sm:mx-8">
              <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-white/65">CHECK THE ADDRESS</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/90">
                This route doesn’t lead anywhere just yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
