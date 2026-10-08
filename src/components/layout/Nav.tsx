import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useDemo } from '@/components/ui/DemoDialog'
import { primaryNav } from '@/data/nav'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'

export function Nav() {
  const { open } = useDemo()
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]'))
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      // Switch to the night palette while a dark section sits under the bar.
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
          <a href="/#top" aria-label="Trihub home" className="-m-1 rounded-lg p-1">
            <Logo tone={dark && !menu ? 'light' : 'ink'} className="transition-colors" />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-[0.9063rem] font-medium transition-colors',
                    dark ? 'text-night-ink-2 hover:text-white' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href="/#contact"
              className={cn(
                'hidden rounded-full px-3.5 py-2 text-[0.9063rem] font-medium transition-colors md:inline-flex',
                dark ? 'text-night-ink-2 hover:text-white' : 'text-ink-2 hover:text-ink',
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
              {[...primaryNav, { label: 'Contact', href: '/#contact' }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-[1.25rem] font-medium tracking-[-0.02em] last:border-0"
                  >
                    {item.label}
                    <ArrowRight size={18} className="text-ink-3" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
