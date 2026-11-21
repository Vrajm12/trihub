import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { Logo, LogoMark } from '@/components/ui/Logo'
import { erpModules } from '@/data/erpModules'
import { company, site } from '@/lib/config'
import { erpModuleHref, erpPath, erpProductsHref } from '@/lib/erpRoutes'
import { ProductFooter } from '@/components/layout/ProductFooter'

export function ErpHeader() {
  const { open } = useDemo()
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!productsOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !productsRef.current?.contains(event.target)) {
        setProductsOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProductsOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [productsOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-xl">
      <nav aria-label="ERP site" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-4">
        <a href={erpPath('/')} aria-label="Trihub Education ERP home" className="rounded-lg">
          <Logo />
        </a>
        <div className="hidden items-center gap-7 md:flex">
          <div
            className="relative"
            ref={productsRef}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onFocusCapture={() => setProductsOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setProductsOpen(false)
            }}
          >
            <a
              href={erpProductsHref()}
              aria-haspopup="true"
              aria-expanded={productsOpen}
              aria-controls="erp-products-menu"
              className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:bg-ink/5 focus-visible:bg-ink/5 hover:text-ink ${
                productsOpen ? 'bg-ink/5' : 'text-ink-2'
              }`}
            >
              <span className="transition-colors group-hover:text-[#4f46e5] group-focus-visible:text-[#4f46e5]">
                Products
              </span>
              <ChevronDown
                size={15}
                strokeWidth={2}
                aria-hidden
                className={`shrink-0 text-ink-3 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </a>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  id="erp-products-menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-0 top-full z-50 max-h-[calc(100svh-5rem)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.375rem] border border-line-strong bg-canvas/95 p-3 shadow-[0_24px_64px_-32px_rgb(17_19_24/0.38),0_4px_14px_rgb(17_19_24/0.06)] backdrop-blur-xl xl:w-[min(48rem,calc(100vw-2rem))]"
                >
                  <div className="min-w-0 p-1">
                    <div className="flex items-center justify-between gap-4 px-2 pb-3">
                      <div>
                        <p className="text-sm font-semibold">Education ERP modules</p>
                        <p className="mt-1 text-xs text-ink-3">Choose an area to explore</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[0.6875rem] font-medium text-ink-3">
                        {erpModules.length} modules
                      </span>
                    </div>
                    <ul aria-label="Education ERP products" className="grid gap-1 xl:grid-cols-2">
                      {erpModules.map((module) => (
                        <li key={module.slug} className="min-w-0">
                          <a
                            href={erpModuleHref(module.slug)}
                            onClick={() => setProductsOpen(false)}
                            className="group flex min-h-10 items-center gap-2 rounded-xl px-2.5 py-2 text-[0.8125rem] font-medium leading-5 text-ink-2 transition-all hover:-translate-y-px hover:bg-[#f0f1ff] hover:text-accent-ink focus-visible:bg-[#f0f1ff] focus-visible:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                          >
                            <span className="min-w-0 flex-1 transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                              {module.label}
                            </span>
                            <ArrowRight
                              size={14}
                              aria-hidden
                              className="shrink-0 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:opacity-100"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a
            href={erpPath('/blogs/')}
            className="inline-flex rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:bg-ink/5 focus-visible:bg-ink/5 hover:text-ink"
          >
            Blogs
          </a>
          <a
            className="inline-flex rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:bg-ink/5 focus-visible:bg-ink/5 hover:text-ink"
            href={erpPath('/about/')}
          >
            About
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            className="hidden rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:bg-ink/5 focus-visible:bg-ink/5 hover:text-ink md:inline-flex"
            href={erpPath('/contact/')}
          >
            Contact
          </a>
          <Button size="sm" onClick={() => open('demo', 'ERP')}>
            Request a walkthrough <ArrowRight size={15} aria-hidden />
          </Button>
        </div>
      </nav>
    </header>
  )
}

export function ErpFooter() {
  return <ProductFooter productLabel="ERP" contactHref={erpPath('/contact/')} />
}
