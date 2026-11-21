import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { ErpFooter, ErpHeader } from '@/components/layout/ErpSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { ErpAbout } from '@/sections/ErpAbout'

export default function ErpAboutApp() {
  useEffect(bindPointer, [])

  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <div className="flex min-h-svh flex-col">
          <a
            href="#main"
            className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <ErpHeader />
          <main id="main" className="flex-1">
            <ErpAbout />
          </main>
          <ErpFooter />
        </div>
      </DemoProvider>
    </MotionConfig>
  )
}
