import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { AutomationFooter, AutomationHeader } from '@/components/layout/AutomationSiteChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { automationModulePages } from '@/data/automationModulePages'
import { AutomationModulePage } from '@/sections/AutomationModulePage'

export default function AutomationLandingApp() {
  useEffect(bindPointer, [])
  return <MotionConfig reducedMotion="user"><DemoProvider><div className="flex min-h-svh flex-col"><a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-white focus:translate-y-0">Skip to content</a><AutomationHeader /><main id="main" className="flex-1"><AutomationModulePage module={automationModulePages[0]} /></main><AutomationFooter /></div></DemoProvider></MotionConfig>
}
