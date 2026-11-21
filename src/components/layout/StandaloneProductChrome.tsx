import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { standaloneProducts } from '@/data/standaloneProducts'
import { company, site } from '@/lib/config'
import { Logo, LogoMark } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { ProductFooter } from '@/components/layout/ProductFooter'

export function StandaloneProductHeader({ productKey }: { productKey: string }) {
  const { open } = useDemo()
  const [openMenu, setOpenMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const product = standaloneProducts.find((item) => item.key === productKey) ?? standaloneProducts[0]

  useEffect(() => {
    if (!openMenu) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpenMenu(false)
    }
    const closeEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpenMenu(false)
    document.addEventListener('pointerdown', closeOutside)
    window.addEventListener('keydown', closeEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      window.removeEventListener('keydown', closeEscape)
    }
  }, [openMenu])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-xl">
      <nav aria-label={`${product.label} site`} className="container-x flex h-[var(--nav-h)] items-center justify-between gap-4">
        <a href={import.meta.env.DEV ? `/${product.subdomain}-site/` : '/'} aria-label={`${product.label} home`} className="rounded-lg"><Logo /></a>
        <div className="hidden items-center gap-7 md:flex">
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
            onFocusCapture={() => setOpenMenu(true)}
            onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(false) }}
          >
            <a href={import.meta.env.DEV ? `/${product.subdomain}-site/products/` : '/products/'} aria-haspopup="true" aria-expanded={openMenu} className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:bg-ink/5 hover:text-ink ${openMenu ? 'bg-ink/5' : 'text-ink-2'}`}>
              Products <ChevronDown size={15} aria-hidden className={`transition-transform duration-200 ${openMenu ? 'rotate-180' : ''}`} />
            </a>
            <AnimatePresence>
              {openMenu && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }} className="absolute left-0 top-full z-50 w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.375rem] border border-line-strong bg-canvas/95 p-3 shadow-[0_24px_64px_-32px_rgb(17_19_24/0.38)] backdrop-blur-xl">
                  <div className="px-2 pb-3"><p className="text-sm font-semibold">Trihub products</p><p className="mt-1 text-xs text-ink-3">Choose a product workspace</p></div>
                  <ul className="grid gap-1">
                    {standaloneProducts.map((item) => (
                      <li key={item.key}>
                        <a href={import.meta.env.DEV ? `/${item.subdomain}-site/` : `https://${item.subdomain}.trihub.tech/`} onClick={() => setOpenMenu(false)} className="group flex min-h-10 items-center gap-2 rounded-xl px-2.5 py-2 text-[0.8125rem] font-medium text-ink-2 transition-all hover:-translate-y-px hover:bg-[#f0f1ff] hover:text-accent-ink">
                          <span className="flex-1">{item.label}</span><ArrowRight size={14} aria-hidden className="text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href={import.meta.env.DEV ? `/${product.subdomain}-site/blogs/` : 'https://trihub.tech/blogs/'} className="rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-2 hover:bg-ink/5 hover:text-ink">Blogs</a>
          <a href={import.meta.env.DEV ? `/${product.subdomain}-site/about/` : 'https://trihub.tech/about/'} className="rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-2 hover:bg-ink/5 hover:text-ink">About</a>
          <a href={import.meta.env.DEV ? `/${product.subdomain}-site/contact/` : 'https://trihub.tech/contact/'} className="rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-2 hover:bg-ink/5 hover:text-ink">Contact</a>
        </div>
        <Button size="sm" onClick={() => open('demo', product.label)}>Request a walkthrough <ArrowRight size={15} aria-hidden /></Button>
      </nav>
    </header>
  )
}

export function StandaloneProductFooter({ productKey }: { productKey: string }) {
  const product = standaloneProducts.find((item) => item.key === productKey) ?? standaloneProducts[0]
  return <ProductFooter productLabel={product.label.toUpperCase()} />
}
