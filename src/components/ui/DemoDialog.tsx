import { createContext, useCallback, useContext, useRef, useState, type ReactNode, type FormEvent } from 'react'
import { X, Check, ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { LogoMark } from './Logo'
import { site } from '@/lib/config'

type Intent = 'demo' | 'team'
interface DemoCtx {
  open: (intent?: Intent, interest?: string) => void
}
const Ctx = createContext<DemoCtx>({ open: () => {} })
export const useDemo = () => useContext(Ctx)

const interests = ['CRM', 'ERP', 'Automation', 'Custom platform', 'Not sure yet']

export function DemoProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [intent, setIntent] = useState<Intent>('demo')
  const [interest, setInterest] = useState('CRM')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const open = useCallback((i: Intent = 'demo', topic?: string) => {
    setIntent(i)
    if (topic) setInterest(topic)
    setState('idle')
    ref.current?.showModal()
    document.documentElement.style.overflow = 'hidden'
  }, [])

  const close = () => ref.current?.close()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setState('sending')
    try {
      if (site.demoEndpoint) {
        const res = await fetch(site.demoEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, intent }),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        const subject = intent === 'demo' ? `Demo request — ${data.interest}` : `Enquiry — ${data.interest}`
        const body = [`Name: ${data.name}`, `Company: ${data.company}`, `Email: ${data.email}`, `Phone: ${data.phone || '—'}`, `Interested in: ${data.interest}`, '', data.message || ''].join('\n')
        window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }
      setState('sent')
    } catch {
      setState('error')
    }
  }

  const field =
    'mt-1.5 block w-full rounded-[12px] bg-surface px-3.5 h-11 text-[0.9375rem] text-ink ring-1 ring-line-strong placeholder:text-ink-3 transition-shadow focus:outline-none focus:ring-2 focus:ring-accent'

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="demo-title"
        onClose={() => (document.documentElement.style.overflow = '')}
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[min(560px,calc(100vw-24px))] max-h-[calc(100dvh-24px)] overflow-y-auto rounded-xl bg-canvas p-0 text-ink shadow-float backdrop:bg-ink/30 backdrop:backdrop-blur-sm open:animate-[dialog-in_.42s_var(--ease-out-expo)]"
      >
        <div className="relative p-6 sm:p-8">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-2 hover:bg-ink/5 hover:text-ink"
          >
            <X size={18} />
          </button>

          {state === 'sent' ? (
            <div className="py-10 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-positive-soft text-positive">
                <Check size={22} />
              </span>
              <h2 className="mt-5 text-h3 font-semibold">Request ready</h2>
              <p className="mx-auto mt-2 max-w-sm text-ink-2">
                {site.demoEndpoint
                  ? 'Thanks — our team will get back to you shortly.'
                  : 'Your email app has opened with the details filled in. Send it and our team will take it from there.'}
              </p>
              <Button className="mt-8" variant="secondary" onClick={close}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <LogoMark className="h-7 w-7 text-ink" />
              <h2 id="demo-title" className="mt-5 text-[1.625rem] font-semibold tracking-[-0.025em]">
                {intent === 'demo' ? 'Book a demo' : 'Talk to our team'}
              </h2>
              <p className="mt-2 text-ink-2">
                {intent === 'demo'
                  ? 'Tell us how your business runs today. We will walk you through Trihub configured for a workflow like yours.'
                  : 'Share what you are trying to fix. A product specialist — not a sales script — will get back to you.'}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="text-[0.8125rem] font-medium text-ink-2">
                  Full name
                  <input required name="name" autoComplete="name" className={field} />
                </label>
                <label className="text-[0.8125rem] font-medium text-ink-2">
                  Company
                  <input required name="company" autoComplete="organization" className={field} />
                </label>
                <label className="text-[0.8125rem] font-medium text-ink-2">
                  Work email
                  <input required type="email" name="email" autoComplete="email" className={field} />
                </label>
                <label className="text-[0.8125rem] font-medium text-ink-2">
                  Phone <span className="font-normal text-ink-3">(optional)</span>
                  <input type="tel" name="phone" autoComplete="tel" className={field} />
                </label>
              </div>

              <fieldset className="mt-5">
                <legend className="text-[0.8125rem] font-medium text-ink-2">Interested in</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {interests.map((i) => (
                    <label key={i} className="cursor-pointer">
                      <input
                        type="radio"
                        name="interest"
                        value={i}
                        checked={interest === i}
                        onChange={() => setInterest(i)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex h-9 items-center rounded-full px-3.5 text-[0.875rem] ring-1 ring-line-strong transition-colors peer-checked:bg-ink peer-checked:text-white peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                        {i}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="mt-5 block text-[0.8125rem] font-medium text-ink-2">
                What should the system handle? <span className="font-normal text-ink-3">(optional)</span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="e.g. 3 branches, leads from IndiaMART and our website, invoicing in Tally"
                  className={field + ' h-auto py-3 leading-relaxed'}
                />
              </label>

              {state === 'error' && (
                <p role="alert" className="mt-4 text-[0.875rem] text-caution">
                  Something went wrong sending the request. Please email {site.contactEmail}.
                </p>
              )}

              <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.8125rem] text-ink-2">Your details are used only to respond to this request.</p>
                <Button type="submit" size="md" magnetic={false} disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : intent === 'demo' ? 'Request demo' : 'Send message'}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </Ctx.Provider>
  )
}
