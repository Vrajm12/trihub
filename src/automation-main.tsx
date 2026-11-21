import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import AutomationLandingApp from '@/pages/AutomationLandingApp'
import './styles/index.css'
const root = document.getElementById('root')
if (!root) throw new Error('Automation page root element was not found.')
const app = <StrictMode><AutomationLandingApp /></StrictMode>
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
