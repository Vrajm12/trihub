import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ErpAboutApp from '@/pages/ErpAboutApp'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) throw new Error('ERP about page root element was not found.')

const app = (
  <StrictMode>
    <ErpAboutApp />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
