import { automationModules } from '@/data/automationModules'

export type AutomationModulePageData = {
  slug: (typeof automationModules)[number]['slug']
  label: string
  headline: string
  description: string
  stats: { label: string; value: string; note: string }[]
  details: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const automationModulePages: AutomationModulePageData[] = [
  {
    slug: 'automated-workflows',
    label: 'Automated Workflows',
    headline: 'Move repetitive work forward automatically.',
    description: 'Set up repeatable triggers and actions so routine admissions, academic, finance, and administrative tasks receive the next step consistently.',
    stats: [{ label: 'Active workflows', value: '18', note: 'Configured automations' }, { label: 'Runs today', value: '246', note: 'Tasks processed' }, { label: 'Needs review', value: '3', note: 'Workflow checks' }],
    details: [
      { title: 'Define clear triggers', description: 'Start a workflow when a record changes, a form is submitted, or another scheduled event occurs.' },
      { title: 'Add conditions and approvals', description: 'Shape how the workflow behaves for different teams, records, or stages.' },
      { title: 'Complete the next action', description: 'Create tasks, update records, send notifications, or move work to the responsible team.' },
    ],
    faqs: [
      { question: 'What can be automated?', answer: 'The scope depends on your workflows. Common examples include reminders, record updates, approvals, notifications, and document tasks.' },
      { question: 'Can workflow steps require human approval?', answer: 'Approval and exception steps can be included where a person needs to review or decide before the workflow continues.' },
      { question: 'Can we run automations across departments?', answer: 'Cross-team workflows can be designed around the systems, roles, and permissions agreed during implementation.' },
    ],
  },
  {
    slug: 'whatsapp-automation',
    label: 'WhatsApp Automation',
    headline: 'Keep important campus messages moving.',
    description: 'Plan approved WhatsApp reminders, acknowledgements, and follow-up messages around student and staff workflows.',
    stats: [{ label: 'Messages sent', value: '1,280', note: 'Recent activity' }, { label: 'Templates', value: '16', note: 'Approved layouts' }, { label: 'Delivery alerts', value: '8', note: 'Need review' }],
    details: [
      { title: 'Use approved templates', description: 'Organize message layouts around the approved content and recipient context.' },
      { title: 'Connect messages to workflows', description: 'Trigger communication after a form, payment, application, or staff action.' },
      { title: 'Monitor delivery outcomes', description: 'Keep delivery and exception activity visible to authorized team members.' },
    ],
    faqs: [
      { question: 'Which WhatsApp features are supported?', answer: 'Supported capabilities depend on the provider and integration scope. Template, consent, and delivery requirements should be confirmed before implementation.' },
      { question: 'Can messages be triggered automatically?', answer: 'Notifications can be connected to configured workflow events, subject to the connected systems and provider setup.' },
      { question: 'Can staff review message logs?', answer: 'A reporting and review view can be included for authorized users, depending on the implementation scope.' },
    ],
  },
  {
    slug: 'scheduling-and-reminders',
    label: 'Scheduling and Reminders',
    headline: 'Make due dates and reminders predictable.',
    description: 'Schedule announcements, follow-ups, fee reminders, academic dates, and recurring tasks around the records they belong to.',
    stats: [{ label: 'Scheduled today', value: '42', note: 'Upcoming actions' }, { label: 'Due soon', value: '17', note: 'Next 7 days' }, { label: 'Completed', value: '86', note: 'This week' }],
    details: [
      { title: 'Create recurring schedules', description: 'Plan one-time or repeated tasks around institution-defined dates and intervals.' },
      { title: 'Send role-based reminders', description: 'Direct reminders to the people or team responsible for the next action.' },
      { title: 'Track completion', description: 'Keep scheduled activity visible until the task or follow-up is complete.' },
    ],
    faqs: [
      { question: 'Can reminders repeat?', answer: 'Recurring schedules can be configured around defined intervals and the rules of the selected workflow.' },
      { question: 'Can reminders be sent to teams?', answer: 'Recipients can be planned by role, department, record, or assigned owner.' },
      { question: 'Can dates change after scheduling?', answer: 'Updates and rescheduling depend on the workflow owner and the controls configured for the automation.' },
    ],
  },
  {
    slug: 'document-and-data-automation',
    label: 'Document and Data Automation',
    headline: 'Prepare documents and structured data with fewer manual steps.',
    description: 'Generate repeatable documents, validate records, synchronize fields, and route exceptions through one controlled workflow.',
    stats: [{ label: 'Documents generated', value: '318', note: 'This month' }, { label: 'Fields validated', value: '4.2k', note: 'Recent checks' }, { label: 'Exceptions', value: '12', note: 'Needs review' }],
    details: [
      { title: 'Generate from trusted records', description: 'Use approved fields from a workflow to prepare letters, notices, or reports.' },
      { title: 'Validate incoming data', description: 'Identify missing or inconsistent values before downstream processing.' },
      { title: 'Route exceptions for review', description: 'Send records that need attention to the responsible team instead of continuing silently.' },
    ],
    faqs: [
      { question: 'What types of documents can be automated?', answer: 'Document scope depends on the templates and data sources agreed during implementation.' },
      { question: 'Can records be checked before generating a document?', answer: 'Validation rules can be configured to flag missing values or mismatches.' },
      { question: 'Can generated files remain reviewable?', answer: 'A review and approval stage can be included before final distribution or storage.' },
    ],
  },
  {
    slug: 'tool-integrations',
    label: 'Tool Integrations',
    headline: 'Connect the tools already involved in your workflow.',
    description: 'Move agreed data between Trihub systems and external tools with clear mappings, error handling, and team visibility.',
    stats: [{ label: 'Connected tools', value: '6', note: 'In scope' }, { label: 'Sync runs', value: '92', note: 'Today' }, { label: 'Failed items', value: '4', note: 'Awaiting review' }],
    details: [
      { title: 'Map source and destination fields', description: 'Document how existing fields and identifiers relate across systems.' },
      { title: 'Run approved synchronization', description: 'Move data through scheduled or event-based integration processes.' },
      { title: 'Handle failures visibly', description: 'Keep rejected or incomplete items available for review instead of hiding them.' },
    ],
    faqs: [
      { question: 'Can Trihub connect to our existing tools?', answer: 'Integration scope depends on each tool’s API or export method and the data exchange requirements.' },
      { question: 'Is live synchronization always included?', answer: 'No. Live synchronization must be verified and scoped for each integration.' },
      { question: 'What happens when an integration fails?', answer: 'Failure handling should define alerts, retries, and a review path for rejected records.' },
    ],
  },
  {
    slug: 'real-time-logs-and-reports',
    label: 'Real-time Logs and Reports',
    headline: 'Understand what ran, what failed, and what needs attention.',
    description: 'Expose automation activity, execution status, and exception history in a reporting view built around operational review.',
    stats: [{ label: 'Execution events', value: '1.8k', note: 'Today' }, { label: 'Successful runs', value: '98%', note: 'Illustrative status' }, { label: 'Exceptions', value: '12', note: 'Needs review' }],
    details: [
      { title: 'Review execution history', description: 'See when an automation ran, what triggered it, and what result it produced.' },
      { title: 'Investigate exceptions', description: 'Open failed or incomplete events and route the affected records for review.' },
      { title: 'Use operational reports', description: 'Summarize volume, status, and recurring issues for the responsible team.' },
    ],
    faqs: [
      { question: 'Are the dashboard values live?', answer: 'Production reporting depends on the configured automation platform and data sources. Values shown on this page are illustrative.' },
      { question: 'Can staff view only relevant logs?', answer: 'Log access and filtering can be planned around team roles and the automation scope.' },
      { question: 'Are failed actions retried?', answer: 'Retry behavior should be defined per integration or workflow, together with escalation and review rules.' },
    ],
  },
]

export function getAutomationModulePage(slug: string | undefined) {
  return automationModulePages.find((module) => module.slug === slug)
}
