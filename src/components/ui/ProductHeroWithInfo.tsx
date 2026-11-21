import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProductHero } from '@/components/ui/ProductHero'

type Page = 1 | 2

interface ProductInfoPage {
  src: string
  alt: string
  closePosition: { left: string; top: string }
}

interface NavigationPositions {
  next: { left: string; top: string }
  back: { left: string; top: string }
}

interface ProductHeroWithInfoProps {
  product: string
  infoName?: string
  id: string
  level?: 'h1' | 'h2'
  caption?: string
  pages: [ProductInfoPage, ProductInfoPage]
  navigationPositions?: NavigationPositions
}

const defaultNavigationPositions = {
  next: { left: '76.5%', top: '81%' },
  back: { left: '76.5%', top: '87%' },
}

const pageFadeVariants = {
  enter: { opacity: 0, scale: 0.985 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.015 },
}

const navigationButtonClass =
  'absolute inline-flex h-12 w-[136px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-xl border border-white/80 bg-accent px-5 text-sm font-semibold text-white shadow-[0_0_12px_rgb(255_255_255/0.25)] transition-colors hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent'

export function ProductHeroWithInfo({
  product,
  infoName,
  id,
  level,
  caption,
  pages,
  navigationPositions = defaultNavigationPositions,
}: ProductHeroWithInfoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [page, setPage] = useState<Page>(1)
  const [isClosing, setIsClosing] = useState(false)
  const dialogName = infoName ?? product
  const titleId = `${id}-info-title`
  const descriptionId = `${id}-info-description`
  const currentPage = pages[page - 1]

  const openDialog = () => {
    if (dialogRef.current && !dialogRef.current.open) {
      setIsClosing(false)
      dialogRef.current.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
  }

  const closeDialog = () => {
    const dialog = dialogRef.current
    if (!dialog?.open || isClosing) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close()
      return
    }

    setIsClosing(true)
    window.setTimeout(() => dialog.close(), 320)
  }

  return (
    <>
      <ProductHero
        product={product}
        id={id}
        level={level}
        caption={caption}
        action={{ label: 'Know more', onClick: openDialog }}
      />
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-closing={isClosing || undefined}
        onClose={() => {
          document.documentElement.style.overflow = ''
          setIsClosing(false)
        }}
        onCancel={(event) => {
          event.preventDefault()
          closeDialog()
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog()
        }}
        className="product-info-dialog m-auto max-h-[calc(100dvh-24px)] w-[min(960px,calc(100vw-24px),calc(150dvh-36px))] overflow-hidden rounded-[24px] border-0 bg-transparent p-0 text-ink shadow-none backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:animate-[dialog-in_.32s_var(--ease-out-expo)]"
      >
        <h2 id={titleId} className="sr-only">Trihub {dialogName} information</h2>
        <p id={descriptionId} className="sr-only">
          Two pages introducing Trihub {dialogName} and its capabilities.
        </p>
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              variants={pageFadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img src={currentPage.src} alt={currentPage.alt} className="h-full w-full object-contain" />
              <button
                type="button"
                onClick={closeDialog}
                aria-label={`Close ${dialogName} information`}
                className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                style={currentPage.closePosition}
              />
              {page === 1 ? (
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  aria-label={`Next ${dialogName} information page`}
                  className={navigationButtonClass}
                  style={navigationPositions.next}
                >
                  Next <ArrowRight size={18} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  aria-label={`Back to ${dialogName} introduction`}
                  className={navigationButtonClass}
                  style={navigationPositions.back}
                >
                  <ArrowLeft size={18} aria-hidden="true" /> Back
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </dialog>
    </>
  )
}
