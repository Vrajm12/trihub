import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { StandaloneProductFooter, StandaloneProductHeader } from '@/components/layout/StandaloneProductChrome'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import type { StandaloneProduct } from '@/data/standaloneProducts'
import { StandaloneProductPage } from '@/sections/StandaloneProductPage'

export default function StandaloneProductApp({ product }: { product: StandaloneProduct }) {
  useEffect(bindPointer, [])
  useEffect(() => { document.title = `${product.label} | Trihub` }, [product])
  return <MotionConfig reducedMotion="user"><DemoProvider>  <div className="flex min-h-svh flex-col"><a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-white focus:translate-y-0">Skip to content</a><StandaloneProductHeader productKey={product.key} /><main id="main" className="flex-1"><StandaloneProductPage product={product} /></main><StandaloneProductFooter productKey={product.key} /></div></DemoProvider></MotionConfig>
}
