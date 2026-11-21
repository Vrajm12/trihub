import { Bell, Search } from 'lucide-react'
import type { CrmModulePageData } from '@/data/crmModulePages'

export function CrmDashboard({ module }: { module: CrmModulePageData }) {
  return (
    <div
      role="img"
      aria-label={`Illustrative ${module.label} dashboard`}
      className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-[18px] border border-[#d9e0ed] bg-[#f3f6fb] text-left shadow-[0_30px_90px_-38px_rgb(19_37_84/0.35)]"
    >
      <div className="flex min-h-[390px] sm:min-h-[450px]">
        <aside className="hidden w-[138px] shrink-0 flex-col bg-[#101c4b] p-3 text-white sm:flex">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white p-1.5">
              <img src="/outreach/trihub-cube.png" alt="" width={20} height={20} className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.58rem] font-semibold">Trihub CRM</span>
              <span className="block truncate text-[0.5rem] text-white/60">Sales console</span>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1.5 text-[0.52rem] text-white/70">
            <Search size={10} aria-hidden /> Jump to...
          </div>
          <p className="mt-4 px-1 text-[0.48rem] font-medium uppercase tracking-[0.12em] text-white/45">CRM workspace</p>
          <nav aria-hidden className="mt-1 grid gap-1">
            {['Overview', 'Leads', 'Applicants', 'Follow-ups'].map((item, index) => (
              <span key={item} className={`truncate rounded-md px-2 py-1.5 text-[0.55rem] ${index === 0 ? 'bg-white font-semibold text-[#14204e]' : 'text-white/75'}`}>
                {item}
              </span>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex h-10 items-center justify-between border-b border-[#e1e6ef] bg-white px-3 sm:px-4">
            <span className="truncate text-[0.62rem] font-semibold text-[#19213a] sm:text-xs">{module.label}</span>
            <div className="flex items-center gap-2 text-[#63708b]">
              <span className="hidden items-center gap-1 rounded-md border border-[#e1e6ef] px-2 py-1 text-[0.5rem] sm:flex">
                <Search size={9} aria-hidden /> Search
              </span>
              <Bell size={12} aria-hidden />
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white p-0.5">
                <img src="/outreach/trihub-cube.png" alt="" width={16} height={16} className="h-full w-full object-contain" />
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <p className="text-[0.92rem] font-semibold tracking-tight text-[#17213d] sm:text-lg">{module.label} overview</p>
            <p className="mt-0.5 text-[0.52rem] text-[#64718b] sm:text-[0.62rem]">Your team’s current activity and next actions.</p>
            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
              {module.stats.map((stat, index) => (
                <div key={stat.label} className="min-w-0 rounded-lg border border-[#dfe5ef] bg-white p-2 sm:p-3">
                  <p className="truncate text-[0.48rem] text-[#64718b] sm:text-[0.58rem]">{stat.label}</p>
                  <p className={`mt-1 truncate text-sm font-bold tracking-tight sm:text-xl ${index === 1 ? 'text-[#087c62]' : 'text-[#17213d]'}`}>{stat.value}</p>
                  <p className="mt-0.5 hidden truncate text-[0.48rem] text-[#75819a] sm:block">{stat.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-[1.65fr_.8fr]">
              <section className="rounded-lg border border-[#dfe5ef] bg-white p-3">
                <p className="text-[0.58rem] font-semibold text-[#1d2945] sm:text-[0.68rem]">Active records</p>
                {['Website enquiry', 'Admission application', 'Campaign follow-up'].map((row, index) => (
                  <div key={row} className="mt-2 flex items-center justify-between border-t border-[#edf0f5] pt-2">
                    <div>
                      <p className="text-[0.52rem] font-medium text-[#26324d] sm:text-[0.61rem]">{row}</p>
                      <p className="mt-0.5 text-[0.46rem] text-[#75819a] sm:text-[0.52rem]">Updated {index + 1}h ago</p>
                    </div>
                    <span className="rounded-full bg-[#eef2fa] px-2 py-1 text-[0.44rem] text-[#53617d] sm:text-[0.5rem]">{index === 0 ? 'New' : index === 1 ? 'In review' : 'Follow-up'}</span>
                  </div>
                ))}
              </section>
              <section className="rounded-lg border border-[#dfe5ef] bg-white p-3">
                <p className="text-[0.58rem] font-semibold text-[#1d2945] sm:text-[0.68rem]">Quick actions</p>
                <div className="mt-3 grid gap-1.5">
                  <span className="rounded-md bg-[#172b70] px-2 py-1.5 text-center text-[0.48rem] font-medium text-white">Add lead</span>
                  <span className="rounded-md border border-[#dfe5ef] px-2 py-1.5 text-center text-[0.48rem] font-medium text-[#53617d]">Review follow-ups</span>
                </div>
              </section>
            </div>
            <p className="mt-2 text-right text-[0.45rem] text-[#8993a6]">Illustrative interface · sample values</p>
          </div>
        </div>
      </div>
    </div>
  )
}
