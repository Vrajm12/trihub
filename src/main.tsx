import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { resolvePage } from './data/pages'
import './styles/index.css'

/**
 * Pages are prerendered at build time (scripts/prerender.mjs), so the client
 * hydrates existing markup; in dev the root is empty and we render from scratch.
 */
const root = document.getElementById('root')!
const page = resolvePage(window.location.pathname)

async function boot() {
  let app: ReactNode
  if (page === 'privacy' || page === 'terms') {
    const { default: LegalApp } = await import('./pages/LegalApp')
    app = <LegalApp page={page} />
  } else {
    const { default: App } = await import('./App')
    app = <App page={page} />
  }
  const tree = <StrictMode>{app}</StrictMode>
  if (root.firstElementChild) hydrateRoot(root, tree)
  else createRoot(root).render(tree)
}

boot()
