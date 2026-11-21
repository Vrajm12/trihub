import { crmModules } from '@/data/crmModules'

export type CrmModulePageData = {
  slug: (typeof crmModules)[number]['slug']
  label: string
  headline: string
  description: string
  stats: { label: string; value: string; note: string }[]
  details: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const crmModulePages: CrmModulePageData[] = [
  {
    slug: 'lead-management',
    label: 'Lead Management',
    headline: 'Make every lead easier to understand and follow.',
    description: 'Capture lead information, organize sources and ownership, and give the admissions or sales team a clearer view of next actions.',
    stats: [{ label: 'Active leads', value: '248', note: 'Across campaigns' }, { label: 'New today', value: '32', note: 'Leads captured' }, { label: 'Needs review', value: '18', note: 'Records to assign' }],
    details: [
      { title: 'Capture complete lead records', description: 'Keep contact details and the source of each enquiry together.' },
      { title: 'Assign ownership clearly', description: 'Route leads to the right team member or queue for the next step.' },
      { title: 'Review lead sources', description: 'See which campaign or channel brings in the activity your team tracks.' },
    ],
    faqs: [
      { question: 'What can Trihub CRM track for leads?', answer: 'Trihub CRM can organize lead details, source information, ownership, status, and next actions. The exact fields depend on the configured workflow.' },
      { question: 'Can leads come from multiple channels?', answer: 'Lead sources can be recorded separately, subject to integrations and the capture method used during implementation.' },
      { question: 'Can responsibility be assigned to a team member?', answer: 'Lead ownership and team routing can be planned around the roles and workflow your institution uses.' },
    ],
  },
  {
    slug: 'communication-tracking',
    label: 'Communication Tracking',
    headline: 'Keep conversations with prospects in context.',
    description: 'Organize calls, messages, and communication history with the people and opportunities your team is following.',
    stats: [{ label: 'Communications', value: '186', note: 'Recent activity' }, { label: 'Replies', value: '64', note: 'Follow-up responses' }, { label: 'Channels', value: '4', note: 'Configured channels' }],
    details: [
      { title: 'Keep history in one place', description: 'View relevant communication activity alongside the lead or applicant record.' },
      { title: 'Record the latest outcome', description: 'Capture the result of calls and messages so the next step is clear.' },
      { title: 'Support consistent follow-up', description: 'Give teams a shared context without replacing outside communication tools.' },
    ],
    faqs: [
      { question: 'Does communication tracking include email and calls?', answer: 'Supported communication types depend on the integrations and fields included in the CRM setup.' },
      { question: 'Can teams see the communication history?', answer: 'Authorized team members can review records according to the configured roles and access rules.' },
      { question: 'Can it connect with WhatsApp?', answer: 'WhatsApp integration availability depends on the selected provider and implementation scope.' },
    ],
  },
  {
    slug: 'follow-ups-and-reminders',
    label: 'Follow-ups and Reminders',
    headline: 'Make the next action visible before it is missed.',
    description: 'Schedule follow-ups, reminders, and responsible owners around the stages in your admissions or outreach process.',
    stats: [{ label: 'Due today', value: '24', note: 'Follow-ups' }, { label: 'Overdue', value: '6', note: 'Needs attention' }, { label: 'Completed', value: '41', note: 'This week' }],
    details: [
      { title: 'Schedule the next step', description: 'Set a clear due date and owner for the action associated with a lead or applicant.' },
      { title: 'Prioritize overdue work', description: 'Keep delayed follow-ups visible so team managers can review them.' },
      { title: 'Record outcomes', description: 'Close follow-ups with the latest status and context for the next conversation.' },
    ],
    faqs: [
      { question: 'Can staff receive reminders?', answer: 'Reminder behavior depends on the configured notifications and the implementation scope.' },
      { question: 'Can overdue follow-ups be identified?', answer: 'The CRM can keep due and overdue tasks visible when follow-up dates are maintained.' },
      { question: 'Can managers review team follow-ups?', answer: 'Manager-level views can be planned around assigned roles and reporting access.' },
    ],
  },
  {
    slug: 'conversion-and-analytics',
    label: 'Conversion and Analytics',
    headline: 'Understand which stages need attention.',
    description: 'Review pipeline movement, conversion activity, and team progress using data from the configured CRM workflow.',
    stats: [{ label: 'Conversion', value: '38%', note: 'Illustrative rate' }, { label: 'Stage movement', value: '92', note: 'Recent updates' }, { label: 'Active campaigns', value: '7', note: 'In review' }],
    details: [
      { title: 'Review pipeline movement', description: 'Compare records across the stages defined for your lead or admissions process.' },
      { title: 'Monitor campaign activity', description: 'Bring source and campaign information into a clearer performance view.' },
      { title: 'Spot bottlenecks', description: 'Use stage counts and overdue activity to identify where follow-up is slowing.' },
    ],
    faqs: [
      { question: 'What CRM reports are available?', answer: 'Reporting scope depends on the fields and stages configured for the implementation.' },
      { question: 'Can conversion rates be customized?', answer: 'Conversion definitions and stage boundaries should be agreed during workflow planning.' },
      { question: 'Are dashboard numbers live?', answer: 'Production dashboards depend on the configured CRM data and reporting setup. This website uses illustrative values.' },
    ],
  },
  {
    slug: 'admission-pipeline',
    label: 'Admission Pipeline',
    headline: 'See the admission journey from enquiry to enrolment.',
    description: 'Represent application stages, ownership, and next decisions in a pipeline shaped around the institution’s admissions process.',
    stats: [{ label: 'Inquiries', value: '128', note: 'Active pipeline' }, { label: 'Applications', value: '56', note: 'In progress' }, { label: 'Enrolments', value: '31', note: 'Completed stage' }],
    details: [
      { title: 'Structure admission stages', description: 'Define enquiry, application, review, offer, and enrolment stages for your process.' },
      { title: 'Assign each applicant a status', description: 'Keep stage and responsible team visible beside applicant records.' },
      { title: 'Find the next decision', description: 'Surface pending review, documents, and follow-up actions in the pipeline.' },
    ],
    faqs: [
      { question: 'Can the admission pipeline match our process?', answer: 'Yes. Stages, fields, roles, and approval points should be mapped during configuration planning.' },
      { question: 'Can documents be connected to applications?', answer: 'Document requirements depend on the storage and application workflow included in implementation.' },
      { question: 'Does it confirm final admission decisions?', answer: 'The CRM should support the process, but final policy and enrolment decisions remain with the institution.' },
    ],
  },
  {
    slug: 'applicant-and-enquiry-records',
    label: 'Applicant and Enquiry Records',
    headline: 'Keep applicant information consistent and accessible.',
    description: 'Organize enquiry, applicant, document, payment, and communication information with role-based team access.',
    stats: [{ label: 'Applicant records', value: '480', note: 'In the pipeline' }, { label: 'Profile updates', value: '17', note: 'Need review' }, { label: 'Complete records', value: '92%', note: 'Illustrative status' }],
    details: [
      { title: 'Maintain applicant profiles', description: 'Keep contact, course interest, and process information in one structured record.' },
      { title: 'Review supporting records', description: 'Make document or application status easier to find for authorized staff.' },
      { title: 'Control team access', description: 'Plan role-based access around sensitive applicant and enquiry information.' },
    ],
    faqs: [
      { question: 'What fields can applicant records contain?', answer: 'Fields depend on the admissions process and should be agreed during implementation discovery.' },
      { question: 'Can data be imported from existing forms?', answer: 'Migration and import options depend on the source format and data quality.' },
      { question: 'How is applicant access protected?', answer: 'Access controls and role permissions should be configured for the staff and applicant experiences in scope.' },
    ],
  },
]

export function getCrmModulePage(slug: string | undefined) {
  return crmModulePages.find((module) => module.slug === slug)
}
