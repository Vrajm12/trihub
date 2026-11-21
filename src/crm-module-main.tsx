import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import CrmModuleApp from '@/pages/CrmModuleApp'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('CRM module page root element was not found.')
const moduleSlug =
  new URLSearchParams(window.location.search).get('module')
  ?? window.location.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1]
  ?? window.location.pathname.match(/^\/crm-site\/modules\/([^/]+)\/?$/)?.[1]
  ?? 'lead-management'
const app = <StrictMode><CrmModuleApp moduleSlug={moduleSlug} /></StrictMode>
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
