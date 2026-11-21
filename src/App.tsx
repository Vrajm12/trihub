import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { SkipLink } from '@/components/layout/SkipLink'
import { StructuredData } from '@/components/seo/StructuredData'
import { Footer } from '@/components/layout/Footer'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { Hero } from '@/sections/Hero'
import { Problem } from '@/sections/Problem'
import { SystemSection } from '@/sections/SystemSection'
import { Crm } from '@/sections/Crm'
import { Erp } from '@/sections/Erp'
import { Automation } from '@/sections/Automation'
import { CustomSoftware } from '@/sections/CustomSoftware'
import { Industries } from '@/sections/Industries'
import { Pricing } from '@/sections/Pricing'
import { Trust } from '@/sections/Trust'
import { Contact } from '@/sections/Contact'
import { Faq } from '@/sections/Faq'
import { Solutions } from '@/sections/Solutions'
import { NotFound } from '@/sections/NotFound'
import { ProductHeroWithInfo } from '@/components/ui/ProductHeroWithInfo'
import type { SitePageId } from '@/data/pages'

function PageContent({ page }: { page: SitePageId | 'not-found' }) {
  switch (page) {
    case 'home':
      return (
        <>
          <Hero />
          <Problem />
          <Trust />
        </>
      )
    case 'solutions':
      return <Solutions />
    case 'products':
      return <SystemSection headingLevel="h1" />
    case 'crm':
      return <Crm headingLevel="h1" />
    case 'erp':
      return <Erp headingLevel="h1" />
    case 'automation':
      return <Automation headingLevel="h1" />
    case 'mfg-system':
      return (
        <ProductHeroWithInfo
          product="MFG-System"
          id="mfg-system-title"
          caption="PRODUCTION · INVENTORY · WORK ORDERS · PLANNING"
          pages={[
            { src: '/mfg-system-know-more.png', alt: 'Trihub MFG-System: A manufacturing management system that streamlines production, inventory, and operations—from planning to delivery.', closePosition: { left: '76%', top: '23.2%' } },
            { src: '/mfg-system-know-more-details.png', alt: 'MFG-System features: Production Planning, Inventory and Materials, Work Orders and Tracking, Operations and Resource Management, Dispatch and Delivery, and Reports and Analytics.', closePosition: { left: '78.7%', top: '19.7%' } },
          ]}
        />
      )
    case 'finance-system':
      return (
        <ProductHeroWithInfo
          product="Finance System"
          id="finance-system-title"
          caption="ACCOUNTS · PAYABLES · RECEIVABLES · REPORTING"
          pages={[
            { src: '/finance-system-know-more.png', alt: 'Trihub Finance System: A finance management system that centralizes fees, payments, budgeting, and accounting for complete financial control.', closePosition: { left: '76.3%', top: '19.7%' } },
            { src: '/finance-system-know-more-details.png', alt: 'Finance System features: Fee and Payment Management, Accounts and Reconciliation, Invoicing and Receipts, Financial Reports and Analytics, Budgeting and Expense Tracking, and Compliance and Audit Ready.', closePosition: { left: '76.7%', top: '18.5%' } },
          ]}
          navigationPositions={{ next: { left: '76.5%', top: '87%' }, back: { left: '76.5%', top: '87%' } }}
        />
      )
    case 'outreach-portal':
      return (
        <ProductHeroWithInfo
          product="Outreach Portal"
          infoName="Outreach System"
          id="outreach-portal-title"
          caption="CAMPAIGNS · CONTACTS · OUTREACH · FOLLOW-UPS"
          pages={[
            { src: '/outreach-system-know-more.png', alt: 'Trihub Outreach System: An outreach management system that streamlines engagements, events, campaigns, and relationships for stronger connections and greater impact.', closePosition: { left: '76.7%', top: '17.8%' } },
            { src: '/outreach-system-know-more-details.png', alt: 'Outreach System features: Campaign and Communication Management, Outreach Records and Follow-ups, Event and Engagement Management, Performance and Impact Reports, Stakeholder and Partner Management, Workflow and Task Automation.', closePosition: { left: '78%', top: '17.8%' } },
          ]}
          navigationPositions={{ next: { left: '76.5%', top: '87%' }, back: { left: '76.5%', top: '87%' } }}
        />
      )
    case 'lead-scraper':
      return (
        <ProductHeroWithInfo
          product="Lead Scraper"
          id="lead-scraper-title"
          caption="LEAD DISCOVERY · ENRICHMENT · QUALIFICATION · EXPORT"
          pages={[
            { src: '/lead-scraper-know-more.png', alt: 'Trihub Lead Scraper: A lead scraping system that discovers, gathers, and organizes high-quality leads from multiple online sources so you can build a stronger, ready-to-engage pipeline.', closePosition: { left: '76.8%', top: '17.7%' } },
            { src: '/lead-scraper-know-more-details.png', alt: 'Lead Scraper features: Multi-Source Lead Scraping, Duplicate Detection and Data Cleanup, Lead Enrichment and Data Extraction, Scraping Reports and Analytics, Lead Filtering and Qualification, Automated and Scheduled Scraping.', closePosition: { left: '78.7%', top: '17.8%' } },
          ]}
          navigationPositions={{ next: { left: '76.5%', top: '87%' }, back: { left: '76.5%', top: '87%' } }}
        />
      )
    case 'custom-software':
      return <CustomSoftware headingLevel="h1" />
    case 'industries':
      return <Industries headingLevel="h1" />
    case 'pricing':
      return <Pricing headingLevel="h1" />
    case 'faq':
      return <Faq headingLevel="h1" />
    case 'contact':
      return <Contact />
    case 'not-found':
      return <NotFound />
  }
}

export default function App({ page = 'home' }: { page?: SitePageId | 'not-found' }) {
  useEffect(bindPointer, [])

  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <SkipLink />
        <Nav />
        <main id="main" className={page === 'home' ? undefined : 'pt-[var(--nav-h)]'}>
          <PageContent page={page} />
        </main>
        <Footer />
        <StructuredData page={page} />
      </DemoProvider>
    </MotionConfig>
  )
}
