import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ErpModuleApp from '@/pages/ErpModuleApp'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) throw new Error('ERP module page root element was not found.')

const moduleSlug =
  new URLSearchParams(window.location.search).get('module')
  ?? window.location.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1]
  ?? window.location.pathname.match(/^\/erp-site\/modules\/([^/]+)\/?$/)?.[1]
  ?? 'campus-management-system'

const app = (
  <StrictMode>
    <ErpModuleApp moduleSlug={moduleSlug} />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
