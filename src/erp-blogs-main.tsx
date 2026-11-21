import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ErpBlogsApp from '@/pages/ErpBlogsApp'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) throw new Error('ERP blogs page root element was not found.')

const app = (
  <StrictMode>
    <ErpBlogsApp />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
