import { ProductHeroWithInfo } from '@/components/ui/ProductHeroWithInfo'

export function Erp({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <section id="erp" aria-labelledby="erp-title" className="relative overflow-hidden bg-white text-ink">
      <ProductHeroWithInfo
        product="ERP"
        id="erp-title"
        level={headingLevel}
        caption="PROCUREMENT · INVENTORY · OPERATIONS · FINANCE"
        pages={[
          {
            src: '/erp-know-more.png',
            alt: 'Trihub ERP: A unified platform to manage your institution’s key operations—from admissions to finance.',
            closePosition: { left: '74.1%', top: '32.2%' },
          },
          {
            src: '/erp-know-more-details.png',
            alt: 'Trihub ERP modules: Admissions and Academics, Finance and Accounts, Student and Staff Management, Attendance and Payroll, Inventory and Procurement, Reports and Analytics.',
            closePosition: { left: '76.4%', top: '21.5%' },
          },
        ]}
      />
    </section>
  )
}
