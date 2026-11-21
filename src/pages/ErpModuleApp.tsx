import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { ErpFooter, ErpHeader } from '@/components/layout/ErpSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { getErpModulePage } from '@/data/erpModulePages'
import { ErpModulePage } from '@/sections/ErpModulePage'

export default function ErpModuleApp({ moduleSlug }: { moduleSlug?: string }) {
  const module = getErpModulePage(moduleSlug)

  useEffect(bindPointer, [])
  useEffect(() => {
    if (module) document.title = `${module.label} | Trihub Education ERP`
  }, [module])

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
            {module ? (
              <ErpModulePage module={module} />
            ) : (
              <section className="container-x py-24" aria-labelledby="erp-module-missing-title">
                <h1 id="erp-module-missing-title" className="text-h2 font-semibold">This ERP module is unavailable.</h1>
                <p className="mt-3 text-ink-2">Choose a module from the Products menu to continue.</p>
                <a href="/" className="mt-6 inline-flex text-sm font-semibold text-accent-ink">Return to the ERP home</a>
              </section>
            )}
          </main>
          <ErpFooter />
        </div>
      </DemoProvider>
    </MotionConfig>
  )
}
