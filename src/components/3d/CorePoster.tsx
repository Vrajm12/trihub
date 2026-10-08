import { LogoMark } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

/**
 * Static stand-in for the 3D system: shown while the scene loads, when WebGL
 * is unavailable, or if the GPU context fails. Same composition, no motion.
 */
export function CorePoster({ labels, className }: { labels: readonly string[]; className?: string }) {
  return (
    <div className={cn('absolute inset-0 grid place-items-center', className)} aria-hidden>
      <div className="relative aspect-square w-[min(78%,520px)]">
        <div className="absolute inset-[14%] rounded-full border border-line" />
        <div className="absolute inset-0 grid place-items-center">
          <LogoMark className="h-[24%] w-[24%] text-ink drop-shadow-[0_24px_30px_rgb(17_19_24/0.18)]" />
        </div>
        {labels.map((l, i) => {
          const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2
          return (
            <span
              key={l}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-surface px-3 py-2 text-[12px] font-semibold text-ink shadow-md ring-1 ring-line"
              style={{ left: `${50 + Math.cos(a) * 36}%`, top: `${50 + Math.sin(a) * 36}%` }}
            >
              {l}
            </span>
          )
        })}
      </div>
    </div>
  )
}
