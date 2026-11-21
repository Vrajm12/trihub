import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { ErpFooter, ErpHeader } from '@/components/layout/ErpSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'

export default function ErpBlogsApp() {
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
          <main id="main" className="container-x flex flex-1 items-center py-20">
            <section aria-labelledby="erp-blogs-title" className="max-w-2xl">
              <p className="eyebrow">Trihub Education ERP</p>
              <h1 id="erp-blogs-title" className="mt-4 text-h1 font-semibold">
                Blogs
              </h1>
              <p className="mt-4 text-lead text-ink-2">
                Articles and updates for education teams will be published here.
              </p>
            </section>
          </main>
          <ErpFooter />
        </div>
      </DemoProvider>
    </MotionConfig>
  )
}
