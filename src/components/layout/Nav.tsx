import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { primaryNav, productNav } from '@/data/nav'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'

export function Nav() {
  const { open } = useDemo()
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [menu, setMenu] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]'))
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setDark(
        darkSections.some((el) => {
          const r = el.getBoundingClientRect()
          return r.top <= 32 && r.bottom >= 32
        }),
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  useEffect(() => {
    if (!productsOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !productsRef.current?.contains(e.target)) setProductsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setProductsOpen(false)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [productsOpen])

  const productLinks = (mobile = false, night = false) => (
    <ul className={cn('grid gap-1', mobile ? 'px-4 pb-3' : 'min-w-[288px] p-2')} aria-label="Trihub products">
      {productNav.map((product) => (
        <li key={product.label}>
          <a
            href={product.href}
            onClick={() => {
              setProductsOpen(false)
              if (mobile) setMenu(false)
            }}
            className={cn(
              'group flex items-center justify-between rounded-lg text-[0.875rem] font-medium transition-colors',
              mobile
                ? 'px-3 py-3 text-ink-2 hover:bg-ink/5 hover:text-ink'
                : night
                  ? 'px-3 py-2.5 text-night-ink-2 hover:bg-white/10 hover:text-white'
                  : 'px-3 py-2.5 text-ink-2 hover:bg-ink/5 hover:text-ink',
            )}
          >
            <span>
              <span className="transition-colors">{product.label.split(' ')[0]}</span>{' '}
              <span className="transition-colors group-hover:text-[#4f46e5] group-focus-visible:text-[#4f46e5]">
                {product.label.split(' ').slice(1).join(' ')}
              </span>
            </span>
            {mobile && <ArrowRight size={15} className="text-ink-3" />}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,box-shadow,backdrop-filter] duration-300',
          dark && !menu
            ? 'bg-night/70 shadow-[0_1px_0_var(--color-night-line)] backdrop-blur-xl backdrop-saturate-150'
            : scrolled || menu
              ? 'bg-canvas/75 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150'
              : 'bg-transparent',
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a href="/" aria-label="Trihub home" className="-m-1 rounded-lg p-1">
            <Logo tone={dark && !menu ? 'light' : 'ink'} className="transition-colors" />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10 xl:gap-12">
            {primaryNav.map((item) => {
              const parts = item.label.split(' ')
              const isProducts = item.label === 'Our Products'
              return (
                <li
                  key={item.href}
                  ref={isProducts ? productsRef : undefined}
                  className="relative"
                  onMouseEnter={isProducts ? () => setProductsOpen(true) : undefined}
                  onMouseLeave={isProducts ? () => setProductsOpen(false) : undefined}
                  onFocusCapture={isProducts ? () => setProductsOpen(true) : undefined}
                  onBlurCapture={
                    isProducts
                      ? (event) => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setProductsOpen(false)
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center">
                    <a
                      href={item.href}
                      className={cn(
                        'group inline-flex rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors',
                        dark
                          ? 'text-night-ink-2 hover:bg-white/10 focus-visible:bg-white/10 hover:text-white'
                          : 'text-ink-2 hover:bg-ink/5 focus-visible:bg-ink/5 hover:text-ink',
                        isProducts && productsOpen && (dark ? 'bg-white/10' : 'bg-ink/5'),
                      )}
                    >
                      {parts.map((part, i) => (
                        <span
                          key={i}
                          className={cn(
                            'transition-colors',
                            item.label === 'Industries Served' && i === 1 && 'ml-0.5',
                            part === item.accent
                              ? dark
                                ? 'group-hover:text-[#818cf8] group-focus-visible:text-[#818cf8]'
                                : 'group-hover:text-[#4f46e5] group-focus-visible:text-[#4f46e5]'
                              : '',
                          )}
                        >
                          {part}
                          {i < parts.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </a>
                  </div>
                  {isProducts && (
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          id="desktop-product-menu"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.16 }}
                          className={cn(
                            'absolute left-0 top-full z-50 rounded-xl border p-1 shadow-lg',
                            dark ? 'border-night-line bg-night' : 'border-line bg-canvas',
                          )}
                        >
                          {productLinks(false, dark)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="/contact/"
              className={cn(
                'hidden rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors md:inline-flex',
                dark
                  ? 'text-night-ink-2 hover:bg-white/10 focus-visible:bg-white/10 hover:text-white'
                  : 'text-ink-2 hover:bg-ink/5 focus-visible:bg-ink/5 hover:text-ink',
              )}
            >
              Contact
            </a>
            <Button size="sm" variant={dark && !menu ? 'light' : 'primary'} onClick={() => open('demo')}>
              Book a Demo
            </Button>
            <button
              className={cn('grid h-9 w-9 place-items-center rounded-full md:hidden', dark && !menu ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/5')}
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        <motion.div
          aria-hidden
          className="h-px origin-left bg-accent/70"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: ease.outExpo }}
            className="border-b border-line bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-x flex flex-col py-3">
              {[...primaryNav, { label: 'Contact', href: '/contact/' }].map((item) => {
                const isProducts = item.label === 'Our Products'
                return (
                  <li key={item.href}>
                    <div className="flex items-center border-b border-line">
                      <a
                        href={item.href}
                        onClick={() => setMenu(false)}
                        className="flex flex-1 items-center justify-between rounded-lg px-3 py-4 text-[1.25rem] font-medium tracking-[-0.02em] transition-colors hover:bg-ink/5 focus-visible:bg-ink/5"
                      >
                        {item.label}
                        {!isProducts && <ArrowRight size={18} className="text-ink-3" />}
                      </a>
                    </div>
                    {isProducts && <div id="mobile-product-menu">{productLinks(true)}</div>}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
