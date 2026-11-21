export type StandaloneProduct = {
  key: 'mfg' | 'finance' | 'outreach' | 'lead'
  label: string
  subdomain: string
  headline: string
  description: string
  category: string
  stats: { label: string; value: string; note: string }[]
  features: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const standaloneProducts: StandaloneProduct[] = [
  {
    key: 'mfg',
    label: 'MFG-System',
    subdomain: 'mfg',
    headline: 'Keep production, inventory, and work orders connected.',
    description: 'Organize manufacturing plans, materials, production activity, dispatch, and operational reporting from one workflow view.',
    category: 'MANUFACTURING OPERATIONS',
    stats: [
      { label: 'Active work orders', value: '42', note: 'Illustrative activity' },
      { label: 'Materials monitored', value: '186', note: 'Across work areas' },
      { label: 'Dispatches today', value: '14', note: 'Operational view' },
    ],
    features: [
      { title: 'Plan production', description: 'Structure production plans around orders, quantities, dates, and responsible teams.' },
      { title: 'Track materials and work orders', description: 'Keep inventory availability and manufacturing status visible to the operations team.' },
      { title: 'Follow work to dispatch', description: 'Coordinate the steps from planning and execution through delivery and reporting.' },
    ],
    faqs: [
      { question: 'What work does MFG-System cover?', answer: 'The system is intended for production planning, inventory and materials, work orders, operations, dispatch, and manufacturing reports. The exact scope depends on implementation.' },
      { question: 'Can it reflect our manufacturing stages?', answer: 'Production stages and responsibilities should be mapped during planning and configured around the agreed workflow.' },
      { question: 'Does it include live shop-floor equipment integration?', answer: 'Machine and shop-floor integration is not assumed. Supported connections require an integration scope and verified provider access.' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance System',
    subdomain: 'finance',
    headline: 'Make institutional finance easier to review and reconcile.',
    description: 'Bring fee and payment activity, receivables, payables, accounts, and financial reporting into a structured operating view.',
    category: 'ACCOUNTS & FINANCIAL OPERATIONS',
    stats: [
      { label: 'Open receivables', value: '₹8.2L', note: 'Illustrative balance' },
      { label: 'Payments today', value: '46', note: 'Recorded activity' },
      { label: 'Reconciliation items', value: '12', note: 'Need review' },
    ],
    features: [
      { title: 'Organize fees and payments', description: 'Keep institutional fee structures, receipts, payments, and outstanding balances structured for review.' },
      { title: 'Track payables and receivables', description: 'Give finance teams a clearer view of amounts due, balances, and follow-up work.' },
      { title: 'Prepare financial reports', description: 'Present agreed accounting and reporting views based on the institution’s finance configuration.' },
    ],
    faqs: [
      { question: 'What finance activity can the system cover?', answer: 'The scope can include fee and payment management, accounting records, receivables, payables, and reporting. Final modules are agreed during implementation.' },
      { question: 'Can fee structures vary by student or program?', answer: 'Fee rules and applicability should be mapped during configuration to reflect the institution’s structure.' },
      { question: 'Does it generate statutory reports or connect to banks?', answer: 'These capabilities require separate scope confirmation. Bank and statutory integrations should not be assumed without verification.' },
    ],
  },
  {
    key: 'outreach',
    label: 'Outreach Portal',
    subdomain: 'outreach',
    headline: 'Coordinate campaigns, relationships, and follow-ups.',
    description: 'Organize stakeholder records, outreach campaigns, events, communications, and impact activity in one relationship workspace.',
    category: 'CAMPAIGNS & COMMUNITY ENGAGEMENT',
    stats: [
      { label: 'Active campaigns', value: '8', note: 'Illustrative campaigns' },
      { label: 'Outreach records', value: '320', note: 'Across initiatives' },
      { label: 'Follow-ups due', value: '24', note: 'Needs action' },
    ],
    features: [
      { title: 'Plan campaigns', description: 'Structure outreach campaigns, audience segments, communication activity, and responsible teams.' },
      { title: 'Maintain relationship records', description: 'Keep stakeholder details, interactions, events, and follow-up history organized.' },
      { title: 'Review engagement activity', description: 'Measure progress and operational tasks using the fields configured for your outreach model.' },
    ],
    faqs: [
      { question: 'What can Outreach Portal manage?', answer: 'It can organize campaigns, stakeholder records, events, communications, follow-ups, and reporting based on agreed scope.' },
      { question: 'Can it integrate with email or messaging tools?', answer: 'External communication integrations depend on provider access and implementation requirements.' },
      { question: 'Can multiple teams use the portal?', answer: 'Team and role access can be planned around the departments and responsibilities participating in outreach.' },
    ],
  },
  {
    key: 'lead',
    label: 'Lead Scraper',
    subdomain: 'leads',
    headline: 'Build a structured lead pipeline from verified sources.',
    description: 'Discover, collect, clean, qualify, and export business lead information with controls around source quality and data review.',
    category: 'LEAD DISCOVERY & ENRICHMENT',
    stats: [
      { label: 'Sources monitored', value: '12', note: 'Configured discovery' },
      { label: 'Leads collected', value: '1.4k', note: 'Illustrative volume' },
      { label: 'Ready to review', value: '186', note: 'Qualified records' },
    ],
    features: [
      { title: 'Discover leads across sources', description: 'Collect lead records from approved sources using the discovery rules in scope.' },
      { title: 'Clean and qualify records', description: 'Remove duplicates and organize fields before records enter your outreach workflow.' },
      { title: 'Export and hand over', description: 'Prepare a reviewable lead list for authorized teams and connected systems.' },
    ],
    faqs: [
      { question: 'Where can leads be discovered?', answer: 'The source scope depends on approved and accessible data sources. The implementation should define and verify what is permitted.' },
      { question: 'Does it automatically qualify every lead?', answer: 'Qualification rules can be configured, but source quality and required verification should be reviewed by the responsible team.' },
      { question: 'Can lead data be exported?', answer: 'Export formats and destinations depend on implementation scope and the receiving CRM or outreach tool.' },
    ],
  },
]
