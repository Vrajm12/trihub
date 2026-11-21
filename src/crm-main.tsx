import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import CrmLandingApp from '@/pages/CrmLandingApp'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('CRM page root element was not found.')
const app = <StrictMode><CrmLandingApp /></StrictMode>
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
