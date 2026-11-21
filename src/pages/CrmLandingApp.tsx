import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { CrmFooter, CrmHeader } from '@/components/layout/CrmSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { CrmModulePage } from '@/sections/CrmModulePage'
import { crmModulePages } from '@/data/crmModulePages'

export default function CrmLandingApp() {
  useEffect(bindPointer, [])
  const module = crmModulePages[0]
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <div className="flex min-h-svh flex-col">
          <a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-white focus:translate-y-0">Skip to content</a>
          <CrmHeader />
          <main id="main" className="flex-1"><CrmModulePage module={module} /></main>
          <CrmFooter />
        </div>
      </DemoProvider>
    </MotionConfig>
  )
}
