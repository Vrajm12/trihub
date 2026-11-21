import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ErpLandingApp from '@/pages/ErpLandingApp'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) throw new Error('ERP landing root element was not found.')

const app = (
  <StrictMode>
    <ErpLandingApp />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
