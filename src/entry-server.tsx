import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import LegalApp from './pages/LegalApp'
import ErpLandingApp from './pages/ErpLandingApp'
import ErpModuleApp from './pages/ErpModuleApp'
import ErpAboutApp from './pages/ErpAboutApp'
import ErpBlogsApp from './pages/ErpBlogsApp'
import ErpContactApp from './pages/ErpContactApp'
import CrmLandingApp from './pages/CrmLandingApp'
import CrmModuleApp from './pages/CrmModuleApp'
import { crmModules } from './data/crmModules'
import { getCrmModulePage } from './data/crmModulePages'
import AutomationLandingApp from './pages/AutomationLandingApp'
import AutomationModuleApp from './pages/AutomationModuleApp'
import { automationModules } from './data/automationModules'
import { getAutomationModulePage } from './data/automationModulePages'
import StandaloneProductApp from './pages/StandaloneProductApp'
import { standaloneProducts } from './data/standaloneProducts'
import type { SitePageId } from './data/pages'
import { getErpModulePage } from './data/erpModulePages'
import { erpModules } from './data/erpModules'

/** Build-time renderer used by scripts/prerender.mjs. */
export function render(page: SitePageId | 'privacy' | 'terms' | 'not-found') {
  const app = page === 'privacy' || page === 'terms' ? <LegalApp page={page} /> : <App page={page} />
  return renderToString(<StrictMode>{app}</StrictMode>)
}

export function renderErpLanding() {
  return renderToString(
    <StrictMode>
      <ErpLandingApp />
    </StrictMode>,
  )
}

export function renderErpModule(moduleSlug: string) {
  if (!getErpModulePage(moduleSlug)) throw new Error(`Unknown ERP module slug: ${moduleSlug}`)
  return renderToString(
    <StrictMode>
      <ErpModuleApp moduleSlug={moduleSlug} />
    </StrictMode>,
  )
}

export { erpModules }

export function renderErpAbout() {
  return renderToString(
    <StrictMode>
      <ErpAboutApp />
    </StrictMode>,
  )
}

export function renderErpBlogs() {
  return renderToString(
    <StrictMode>
      <ErpBlogsApp />
    </StrictMode>,
  )
}

export function renderErpContact() {
  return renderToString(
    <StrictMode>
      <ErpContactApp />
    </StrictMode>,
  )
}

export function renderCrmLanding() {
  return renderToString(<StrictMode><CrmLandingApp /></StrictMode>)
}

export function renderCrmModule(moduleSlug: string) {
  if (!getCrmModulePage(moduleSlug)) throw new Error(`Unknown CRM module slug: ${moduleSlug}`)
  return renderToString(<StrictMode><CrmModuleApp moduleSlug={moduleSlug} /></StrictMode>)
}

export { crmModules }

export function renderAutomationLanding() {
  return renderToString(<StrictMode><AutomationLandingApp /></StrictMode>)
}

export function renderAutomationModule(moduleSlug: string) {
  if (!getAutomationModulePage(moduleSlug)) throw new Error(`Unknown automation module slug: ${moduleSlug}`)
  return renderToString(<StrictMode><AutomationModuleApp moduleSlug={moduleSlug} /></StrictMode>)
}

export { automationModules }

export function renderStandaloneProduct(productKey: string) {
  const product = standaloneProducts.find((item) => item.key === productKey)
  if (!product) throw new Error(`Unknown standalone product key: ${productKey}`)
  return renderToString(<StrictMode><StandaloneProductApp product={product} /></StrictMode>)
}

export { standaloneProducts }
