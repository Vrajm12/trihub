import { ProductHeroWithInfo } from '@/components/ui/ProductHeroWithInfo'

export function Automation({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <ProductHeroWithInfo
      product="Automation"
      id="automation-page-title"
      level={headingLevel}
      caption="TRIGGERS · CONDITIONS · ACTIONS"
      pages={[
        {
          src: '/automation-know-more.png',
          alt: 'Trihub Automation: Automate your institution’s repetitive tasks, communications, and workflows so your team can focus on what matters.',
          closePosition: { left: '76%', top: '24.7%' },
        },
        {
          src: '/automation-know-more-details.png',
          alt: 'Automation features for educational institutions: Automated Workflows, WhatsApp Automation, Scheduling and Reminders, Document and Data Automation, Tool Integrations, and Real-time Logs and Reports.',
          closePosition: { left: '77.4%', top: '19.7%' },
        },
      ]}
    />
  )
}
