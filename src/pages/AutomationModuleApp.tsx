import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { AutomationFooter, AutomationHeader } from '@/components/layout/AutomationSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { getAutomationModulePage } from '@/data/automationModulePages'
import { AutomationModulePage } from '@/sections/AutomationModulePage'

export default function AutomationModuleApp({ moduleSlug }: { moduleSlug?: string }) {
  const module = getAutomationModulePage(moduleSlug)
  useEffect(bindPointer, [])
  useEffect(() => { if (module) document.title = `${module.label} | Trihub Automation` }, [module])
  return <MotionConfig reducedMotion="user"><DemoProvider><div className="flex min-h-svh flex-col"><a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-white focus:translate-y-0">Skip to content</a><AutomationHeader /><main id="main" className="flex-1">{module ? <AutomationModulePage module={module} /> : <section className="container-x py-24"><h1 className="text-h2 font-semibold">This automation area is unavailable.</h1></section>}</main><AutomationFooter /></div></DemoProvider></MotionConfig>
}
