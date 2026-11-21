import { MotionConfig } from 'framer-motion'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { ErpFooter, ErpHeader } from '@/components/layout/ErpSiteChrome'
import { ErpLanding } from '@/sections/ErpLanding'
import { company, site } from '@/lib/config'
import { bindPointer } from '@/lib/pointer'
import { useEffect } from 'react'

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.erpUrl}#website`,
      url: site.erpUrl,
      name: 'Trihub Education ERP',
      publisher: { '@id': `${company.url}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.erpUrl}#software`,
      name: 'Trihub Education ERP',
      url: site.erpUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Education ERP workflows for admissions, CAP counselling, attendance, examinations, institutional fees, and payroll preparation.',
      featureList: [
        'Application review, documents, payments and enrolment',
        'CAP counselling rosters, seat matrices, merit lists and allotments',
        'Lecture attendance and examination workflows',
        'Institutional fee structures, demands, receipts and balances',
        'Payroll preview, run generation and status tracking',
      ],
      provider: { '@id': `${company.url}/#organization` },
    },
  ],
}

export default function ErpLandingApp() {
  useEffect(bindPointer, [])

  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ErpHeader />
        <main id="main">
          <ErpLanding />
        </main>
        <ErpFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      </DemoProvider>
    </MotionConfig>
  )
}
