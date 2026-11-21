import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import AutomationModuleApp from '@/pages/AutomationModuleApp'
import './styles/index.css'
const root = document.getElementById('root')
if (!root) throw new Error('Automation module page root element was not found.')
const moduleSlug = new URLSearchParams(window.location.search).get('module') ?? window.location.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1] ?? window.location.pathname.match(/^\/automation-site\/modules\/([^/]+)\/?$/)?.[1] ?? 'automated-workflows'
const app = <StrictMode><AutomationModuleApp moduleSlug={moduleSlug} /></StrictMode>
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
