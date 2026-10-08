import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import LegalApp from './pages/LegalApp'

/** Build-time renderer used by scripts/prerender.mjs. */
export function render(page: 'home' | 'privacy' | 'terms') {
  return renderToString(<StrictMode>{page === 'home' ? <App /> : <LegalApp page={page} />}</StrictMode>)
}
