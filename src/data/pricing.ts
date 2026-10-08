/**
 * Pricing content. Prices are intentionally not published — every plan routes
 * to a demo. When public prices are decided, set `price` on a tier and the
 * pricing section renders it automatically.
 */
export interface Tier {
  name: string
  audience: string
  price?: string
  features: string[]
  highlight?: boolean
}

export const crmTiers: Tier[] = [
  {
    name: 'Starter',
    audience: 'For small teams',
    features: [
      'Lead and contact management',
      'Pipeline with custom stages',
      'Follow-up reminders',
      'Email and WhatsApp activity log',
      'Standard reports',
    ],
  },
  {
    name: 'Growth',
    audience: 'For growing businesses',
    highlight: true,
    features: [
      'Everything in Starter',
      'Workflow automation',
      'Custom fields and forms',
      'Role-based access',
      'Dashboards and integrations',
    ],
  },
  {
    name: 'Enterprise',
    audience: 'For complex organizations',
    features: [
      'Everything in Growth',
      'Multi-branch and multi-team setup',
      'Advanced permissions and audit trail',
      'Custom modules',
      'Dedicated implementation lead',
    ],
  },
]

export const erpPlan = {
  name: 'ERP',
  tier: 'Custom',
  audience: 'Built around your operations',
  features: [
    'Finance, inventory, procurement, HR, projects',
    'Configured to your approval chains',
    'Data migration from current tools',
    'Training for every team',
  ],
}

export const platformPlan = {
  name: 'Custom Platform',
  tier: 'Talk to us',
  audience: 'When no off-the-shelf system fits',
  features: [
    'Process mapping and architecture',
    'Custom CRM, ERP, portals or internal tools',
    'Integrations with your existing systems',
    'Ongoing development and support',
  ],
}
