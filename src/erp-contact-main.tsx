import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ErpContactApp from '@/pages/ErpContactApp'
import './styles/index.css'

const root = document.getElementById('root')

if (!root) throw new Error('ERP contact page root element was not found.')

const app = (
  <StrictMode>
    <ErpContactApp />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
