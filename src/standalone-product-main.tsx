import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import StandaloneProductApp from '@/pages/StandaloneProductApp'
import { standaloneProducts } from '@/data/standaloneProducts'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Standalone product page root element was not found.')
const key = window.location.hostname.split('.')[0] === 'finance' ? 'finance'
  : window.location.hostname.split('.')[0] === 'outreach' ? 'outreach'
  : window.location.hostname.split('.')[0] === 'leads' ? 'lead'
  : window.location.hostname.split('.')[0] === 'mfg' ? 'mfg'
  : new URLSearchParams(window.location.search).get('product') ?? 'mfg'
const product = standaloneProducts.find((item) => item.key === key) ?? standaloneProducts[0]
const app = <StrictMode><StandaloneProductApp product={product} /></StrictMode>
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
