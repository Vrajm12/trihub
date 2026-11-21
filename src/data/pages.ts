export const sitePages = [
  { id: 'home', path: '/', name: 'Home' },
  { id: 'solutions', path: '/solutions/', name: 'Our Solutions' },
  { id: 'products', path: '/products/', name: 'Our Products' },
  { id: 'crm', path: '/crm/', name: 'CRM' },
  { id: 'erp', path: '/erp/', name: 'ERP' },
  { id: 'automation', path: '/automation/', name: 'Automation' },
  { id: 'mfg-system', path: '/mfg-system/', name: 'Trihub MFG-System' },
  { id: 'finance-system', path: '/finance-system/', name: 'Trihub Finance System' },
  { id: 'outreach-portal', path: '/outreach-portal/', name: 'Trihub Outreach Portal' },
  { id: 'lead-scraper', path: '/lead-scraper/', name: 'Trihub Lead Scraper' },
  { id: 'custom-software', path: '/custom-software/', name: 'Custom Software' },
  { id: 'industries', path: '/industries/', name: 'Industries Served' },
  { id: 'pricing', path: '/pricing/', name: 'Pricing' },
  { id: 'faq', path: '/faq/', name: 'FAQ' },
  { id: 'contact', path: '/contact/', name: 'Contact' },
] as const

export type SitePageId = (typeof sitePages)[number]['id']

export type ResolvedPageId = SitePageId | 'privacy' | 'terms' | 'not-found'

export function resolvePage(pathname: string): ResolvedPageId {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  return sitePages.find((page) => page.path === path)?.id
    ?? (path === '/privacy/' ? 'privacy' : path === '/terms/' ? 'terms' : 'not-found')
}
