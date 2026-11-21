import { ArrowDownRight, Bell, Search } from 'lucide-react'
import type { ErpModulePageData } from '@/data/erpModulePages'

export function ErpModuleDashboard({ module }: { module: ErpModulePageData }) {
  const { dashboard } = module

  return (
    <div
      role="img"
      aria-label={`Illustrative ${dashboard.title} dashboard for ${module.label}`}
      className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-[18px] border border-[#d9e0ed] bg-[#f3f6fb] text-left shadow-[0_30px_90px_-38px_rgb(19_37_84/0.35)]"
    >
      <div className="flex min-h-[390px] sm:min-h-[450px]">
        <aside className="hidden w-[138px] shrink-0 flex-col bg-[#101c4b] p-3 text-white sm:flex">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white p-1.5">
              <img
                src="/outreach/trihub-cube.png"
                alt=""
                width={20}
                height={20}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.58rem] font-semibold">Trihub ERP</span>
              <span className="block truncate text-[0.5rem] text-white/60">Admin console</span>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1.5 text-[0.52rem] text-white/70">
            <Search size={10} aria-hidden /> Jump to...
          </div>
          <p className="mt-4 px-1 text-[0.48rem] font-medium uppercase tracking-[0.12em] text-white/45">Workspace</p>
          <nav aria-hidden className="mt-1 grid gap-1">
            {dashboard.nav.map((item, index) => (
              <span
                key={item}
                className={`truncate rounded-md px-2 py-1.5 text-[0.55rem] ${index === 0 ? 'bg-white font-semibold text-[#14204e]' : 'text-white/75'}`}
              >
                {item}
              </span>
            ))}
          </nav>
          <span className="mt-auto border-t border-white/10 pt-2 text-[0.5rem] text-white/55">Illustrative view</span>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex h-10 items-center justify-between border-b border-[#e1e6ef] bg-white px-3 sm:px-4">
            <span className="truncate text-[0.62rem] font-semibold text-[#19213a] sm:text-xs">{dashboard.title}</span>
            <div className="flex items-center gap-2 text-[#63708b]">
              <span className="hidden items-center gap-1 rounded-md border border-[#e1e6ef] px-2 py-1 text-[0.5rem] sm:flex">
                <Search size={9} aria-hidden /> Search
              </span>
              <Bell size={12} aria-hidden />
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white p-0.5">
                <img
                  src="/outreach/trihub-cube.png"
                  alt=""
                  width={16}
                  height={16}
                  className="h-full w-full object-contain"
                />
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[0.92rem] font-semibold tracking-tight text-[#17213d] sm:text-lg">{dashboard.title}</p>
                <p className="mt-0.5 text-[0.52rem] text-[#64718b] sm:text-[0.62rem]">Your team’s current activity and next actions.</p>
              </div>
              <span className="hidden rounded-md border border-[#dae1eb] bg-white px-2 py-1 text-[0.5rem] font-medium text-[#57647d] sm:block">Current term</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
              {dashboard.stats.map((stat, index) => (
                <div key={stat.label} className="min-w-0 rounded-lg border border-[#dfe5ef] bg-white p-2 sm:p-3">
                  <p className="truncate text-[0.48rem] text-[#64718b] sm:text-[0.58rem]">{stat.label}</p>
                  <p className={`mt-1 truncate text-sm font-bold tracking-tight sm:text-xl ${index === 1 ? 'text-[#087c62]' : 'text-[#17213d]'}`}>
                    {stat.value}
                  </p>
                  <p className="mt-0.5 hidden truncate text-[0.48rem] text-[#75819a] sm:block">{stat.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2 sm:grid-cols-[1.65fr_.8fr]">
              <section className="min-w-0 overflow-hidden rounded-lg border border-[#dfe5ef] bg-white">
                <div className="border-b border-[#e5e9f0] px-2.5 py-2 sm:px-3">
                  <p className="text-[0.58rem] font-semibold text-[#1d2945] sm:text-[0.68rem]">{dashboard.panelTitle}</p>
                  <p className="mt-0.5 text-[0.48rem] text-[#75819a]">Recent updates from your workspace</p>
                </div>
                <div className="divide-y divide-[#edf0f5]">
                  {dashboard.rows.map((row) => (
                    <div key={row.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1.5 px-2.5 py-2 sm:px-3">
                      <div className="min-w-0">
                        <p className="truncate text-[0.52rem] font-medium text-[#26324d] sm:text-[0.61rem]">{row.name}</p>
                        <p className="mt-0.5 truncate text-[0.46rem] text-[#75819a] sm:text-[0.52rem]">{row.detail}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eef2fa] px-1.5 py-1 text-[0.44rem] font-medium text-[#53617d] sm:px-2 sm:text-[0.5rem]">
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-2">
                <section className="rounded-lg border border-[#dfe5ef] bg-white p-2.5 sm:p-3">
                  <p className="text-[0.58rem] font-semibold text-[#1d2945] sm:text-[0.68rem]">{dashboard.asideTitle}</p>
                  <div className="mt-2 divide-y divide-[#edf0f5]">
                    {dashboard.asideItems.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-1 py-1.5 first:pt-0 last:pb-0">
                        <span className="truncate text-[0.48rem] text-[#75819a] sm:text-[0.52rem]">{item.label}</span>
                        <span className="text-[0.58rem] font-semibold text-[#26324d] sm:text-[0.65rem]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-lg border border-[#dfe5ef] bg-white p-2.5 sm:p-3">
                  <p className="text-[0.58rem] font-semibold text-[#1d2945] sm:text-[0.68rem]">Quick actions</p>
                  <div className="mt-2 grid gap-1.5">
                    <span className="rounded-md bg-[#172b70] px-2 py-1.5 text-center text-[0.48rem] font-medium text-white sm:text-[0.53rem]">Open workspace</span>
                    <span className="flex items-center justify-center gap-1 rounded-md border border-[#dfe5ef] px-2 py-1.5 text-[0.48rem] font-medium text-[#53617d] sm:text-[0.53rem]">
                      View activity <ArrowDownRight size={9} aria-hidden />
                    </span>
                  </div>
                </section>
              </div>
            </div>
            <p className="mt-2 text-right text-[0.45rem] text-[#8993a6]">Illustrative interface · sample values</p>
          </div>
        </div>
      </div>
    </div>
  )
}
