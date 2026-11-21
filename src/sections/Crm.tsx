import { ProductHeroWithInfo } from '@/components/ui/ProductHeroWithInfo'

export function Crm({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <section id="crm" aria-labelledby="crm-page-title" className="relative overflow-hidden bg-white text-ink">
      <ProductHeroWithInfo
        product="CRM"
        id="crm-page-title"
        level={headingLevel}
        caption="LEADS · CONTACTS · FOLLOW-UPS"
        pages={[
          {
            src: '/crm-know-more.png',
            alt: 'Trihub CRM: A centralized platform to manage leads, interactions, and admissions—from inquiry to enrollment.',
            closePosition: { left: '74.2%', top: '30.6%' },
          },
          {
            src: '/crm-know-more-details.png',
            alt: 'Trihub CRM features: Lead Management, Communication Tracking, Follow-ups and Reminders, Conversion and Analytics, Admission Pipeline, and Applicant and Enquiry Records.',
            closePosition: { left: '76.3%', top: '20.8%' },
          },
        ]}
      />
    </section>
  )
}
