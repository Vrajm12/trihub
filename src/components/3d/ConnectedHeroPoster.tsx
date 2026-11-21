import { BarChart3, Boxes, Package, Users, Wallet, Workflow, UserRound } from 'lucide-react'
import { LogoMark } from '@/components/ui/Logo'

const nodes = [
  { label: 'CRM', Icon: Users, className: 'left-[13%] top-[39%]' },
  { label: 'ERP', Icon: Boxes, className: 'left-[30%] top-[16%]' },
  { label: 'Automation', Icon: Workflow, className: 'left-[61%] top-[15%]' },
  { label: 'Analytics', Icon: BarChart3, className: 'left-[78%] top-[37%]' },
  { label: 'HR', Icon: UserRound, className: 'left-[75%] top-[66%]' },
  { label: 'Finance', Icon: Wallet, className: 'left-[49%] top-[80%]' },
  { label: 'Inventory', Icon: Package, className: 'left-[17%] top-[68%]' },
]

export function ConnectedHeroPoster() {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden" aria-hidden>
      <div className="relative aspect-square w-[min(92%,560px)]">
        <div className="absolute inset-[15%] rounded-full border border-accent/20 bg-gradient-to-br from-white/80 via-surface-2/70 to-surface-3/80 shadow-float [transform:rotateX(58deg)_rotateZ(-18deg)]" />
        <div className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
          <div className="absolute inset-[15%] grid place-items-center rounded-[24%] bg-ink shadow-[0_30px_34px_rgb(17_19_24/0.18)] [transform:rotateX(58deg)_rotateZ(45deg)]">
            <LogoMark className="h-[68%] w-[68%] drop-shadow-[0_8px_12px_rgb(79_70_229/0.25)]" />
          </div>
        </div>
        {nodes.map(({ label, Icon, className }) => (
          <div key={label} className={`absolute ${className} flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5`}>
            <div className="grid h-11 w-11 place-items-center rounded-[14px] border border-white bg-white text-ink-2 shadow-md ring-1 ring-line [transform:rotateX(16deg)_rotateZ(-6deg)]">
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <span className="rounded-full bg-canvas/90 px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-ink-2">
              {label.toUpperCase()}
            </span>
          </div>
        ))}
        <div className="absolute inset-[26%] rounded-full border border-accent/15 [transform:rotateX(58deg)]" />
      </div>
    </div>
  )
}
