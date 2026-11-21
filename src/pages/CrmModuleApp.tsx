import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { CrmFooter, CrmHeader } from '@/components/layout/CrmSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { getCrmModulePage } from '@/data/crmModulePages'
import { CrmModulePage } from '@/sections/CrmModulePage'

export default function CrmModuleApp({ moduleSlug }: { moduleSlug?: string }) {
  const module = getCrmModulePage(moduleSlug)
  useEffect(bindPointer, [])
  useEffect(() => {
    if (module) document.title = `${module.label} | Trihub CRM`
  }, [module])
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <div className="flex min-h-svh flex-col">
          <a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-white focus:translate-y-0">Skip to content</a>
          <CrmHeader />
          <main id="main" className="flex-1">
            {module ? <CrmModulePage module={module} /> : <section className="container-x py-24"><h1 className="text-h2 font-semibold">This CRM module is unavailable.</h1></section>}
          </main>
          <CrmFooter />
        </div>
      </DemoProvider>
    </MotionConfig>
  )
}
