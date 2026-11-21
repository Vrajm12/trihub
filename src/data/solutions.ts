import { sitePages } from '@/data/pages'

export type SolutionStatus = 'VERIFIED' | 'PARTIALLY_IMPLEMENTED' | 'CONFIGURABLE' | 'CUSTOM_IMPLEMENTATION' | 'PLANNED' | 'UNVERIFIED'
export type SolutionProductId = 'admissions-crm' | 'education-erp'
export type SolutionCategoryId = 'lead-management' | 'admissions-and-enrolment' | 'academic-operations' | 'finance-and-administration'

export interface SolutionProduct {
  id: SolutionProductId
  name: string
  shortName: string
  route: string
}

export interface SolutionCategory {
  id: SolutionCategoryId
  slug: string
  label: string
  title: string
  description: string
}

export interface SolutionEvidence {
  source: string
  supports: string
}

export interface BusinessSolution {
  id: string
  slug: string
  category: SolutionCategoryId
  problemTitle: string
  problemDescription: string
  businessImpact: string
  solutionTitle: string
  solutionDescription: string
  primaryProduct: SolutionProductId
  supportingProducts: SolutionProductId[]
  capabilities: string[]
  workflowSteps: string[]
  evidence: SolutionEvidence[]
  capabilityStatus: SolutionStatus
  statusNote?: string
  destinationRoute?: string
  displayPriority: number
}

export const solutionProducts: SolutionProduct[] = [
  { id: 'admissions-crm', name: 'Trihub Admissions CRM', shortName: 'Admissions CRM', route: '/crm/' },
  { id: 'education-erp', name: 'Trihub Education ERP', shortName: 'Education ERP', route: '/erp/' },
]

export const solutionCategories: SolutionCategory[] = [
  {
    id: 'lead-management',
    slug: 'lead-management',
    label: 'Lead management',
    title: 'Keep admissions enquiries moving.',
    description: 'Track lead ownership, stages, activities and follow-up dates in the admissions CRM.',
  },
  {
    id: 'admissions-and-enrolment',
    slug: 'admissions-and-enrolment',
    label: 'Admissions & enrolment',
    title: 'Make each admissions step easier to track.',
    description: 'Support application review, document checks and CAP counselling with education-specific workflows.',
  },
  {
    id: 'academic-operations',
    slug: 'academic-operations',
    label: 'Academic operations',
    title: 'Coordinate attendance and examinations.',
    description: 'Give staff structured workflows for lecture attendance, exam setup, mark entry and results.',
  },
  {
    id: 'finance-and-administration',
    slug: 'finance-and-administration',
    label: 'Finance & administration',
    title: 'Bring institutional records into clearer workflows.',
    description: 'Manage fee structures, demands, receipts and payroll preparation in the education ERP.',
  },
]

export const businessSolutions: BusinessSolution[] = [
  {
    id: 'admissions-lead-ownership',
    slug: 'admissions-lead-ownership',
    category: 'lead-management',
    problemTitle: 'Enquiries lose context as they move between counsellors.',
    problemDescription: 'When an enquiry, its admission stage and its next action are tracked separately, staff can struggle to see who owns the next step.',
    businessImpact: 'Follow-ups can be delayed, duplicated or made without the latest interaction context.',
    solutionTitle: 'Keep the enquiry and its activity together.',
    solutionDescription: 'The admissions CRM stores lead stage, priority, counselor assignment, activity and follow-up details with the lead. Assignment can be made from the lead workflow.',
    primaryProduct: 'admissions-crm',
    supportingProducts: [],
    capabilities: ['Lead records with source and status', 'Counsellor assignment', 'Stage and priority updates', 'Call, email, WhatsApp and note activity records', 'Follow-up date tracking'],
    workflowSteps: ['Create or import a lead', 'Assign a counsellor', 'Update the admission stage', 'Log activity and the next follow-up date'],
    evidence: [
      { source: 'Trihub-CRM/backend/src/routes/leads.ts', supports: 'Lead create, update, filter, stage/priority and assignment routes.' },
      { source: 'Trihub-CRM/backend/src/services/lead.service.ts', supports: 'Duplicate checks and counselor assignment logic.' },
      { source: 'Trihub-CRM/backend/src/routes/activities.ts', supports: 'Activity creation with a required next-follow-up date.' },
      { source: 'Trihub-CRM/backend/prisma/schema.prisma', supports: 'Lead fields for stage, source, counselor and follow-up.' },
    ],
    capabilityStatus: 'VERIFIED',
    statusNote: 'Follow-up dates and lists are present; automatic reminders or follow-up completion actions are not confirmed.',
    destinationRoute: '/crm/',
    displayPriority: 1,
  },
  {
    id: 'admissions-bulk-import',
    slug: 'admissions-bulk-import',
    category: 'lead-management',
    problemTitle: 'Moving enquiry lists into the CRM row by row takes avoidable effort.',
    problemDescription: 'Admissions teams may receive lead data in spreadsheets and need a repeatable way to add and review those records.',
    businessImpact: 'Manual re-entry takes staff time and can introduce duplicate or incomplete records.',
    solutionTitle: 'Import and review leads in batches.',
    solutionDescription: 'The CRM supports CSV import and batch processing, validates records, handles duplicates, and reports row-level outcomes. CSV and XLS exports are also available.',
    primaryProduct: 'admissions-crm',
    supportingProducts: [],
    capabilities: ['CSV import', 'Batch lead creation', 'Duplicate handling', 'Per-row import outcomes', 'CSV and XLS export'],
    workflowSteps: ['Select a CSV file', 'Validate and process the batch', 'Review accepted and rejected rows', 'Export lead records when needed'],
    evidence: [
      { source: 'Trihub-CRM/backend/src/routes/leads.ts', supports: 'Bulk import validation and duplicate handling.' },
      { source: 'Trihub-CRM/crm-frontend/app/bulk-actions/page.tsx', supports: 'CSV parsing, batch submission, outcome review and exports.' },
    ],
    capabilityStatus: 'VERIFIED',
    destinationRoute: '/crm/',
    displayPriority: 2,
  },
  {
    id: 'admissions-sms-followup',
    slug: 'admissions-sms-followup',
    category: 'lead-management',
    problemTitle: 'Sending SMS updates one at a time slows down admissions outreach.',
    problemDescription: 'Teams that need SMS for a lead or a group of leads require a configured messaging provider.',
    businessImpact: 'Without a configured sender and delivery-status handling, teams cannot rely on messages being sent or tracked.',
    solutionTitle: 'Send SMS through a configured Twilio connection.',
    solutionDescription: 'The CRM includes single and bulk SMS routes and a Twilio status callback. Delivery depends on valid Twilio account and sender configuration.',
    primaryProduct: 'admissions-crm',
    supportingProducts: [],
    capabilities: ['Single-lead SMS', 'Bulk SMS', 'Message status callback'],
    workflowSteps: ['Configure Twilio credentials and sender', 'Compose an SMS', 'Send to selected leads', 'Receive provider status updates'],
    evidence: [
      { source: 'Trihub-CRM/backend/src/services/twilio.ts', supports: 'Twilio client and message sending implementation.' },
      { source: 'Trihub-CRM/backend/src/routes/messaging.ts', supports: 'Single, bulk and message-status callback routes.' },
      { source: 'Trihub-CRM/backend/src/config.ts', supports: 'Provider credentials and sender configuration.' },
    ],
    capabilityStatus: 'CONFIGURABLE',
    statusNote: 'Requires a configured Twilio account, credentials and sender; availability in a particular deployment is not verified.',
    destinationRoute: '/crm/',
    displayPriority: 3,
  },
  {
    id: 'application-review-and-enrolment',
    slug: 'application-review-and-enrolment',
    category: 'admissions-and-enrolment',
    problemTitle: 'Application review, documents and enrolment need a clear handoff.',
    problemDescription: 'Admissions staff handle applicant submissions, supporting documents, payment checks and enrolment as connected steps.',
    businessImpact: 'A missed review step can delay a decision or leave applicant records incomplete.',
    solutionTitle: 'Process applications through the admissions portal.',
    solutionDescription: 'Applicants can submit applications and documents and check status. Staff can review documents and payments, record offline payments, set installments and enrol applicants.',
    primaryProduct: 'education-erp',
    supportingProducts: [],
    capabilities: ['Public application submission', 'Document and payment review', 'Installment requests and plans', 'Offline payment recording', 'Applicant enrolment and roll lists'],
    workflowSteps: ['Applicant submits an application', 'Staff review documents and payment', 'Set or review installments', 'Enrol the applicant and manage roll lists'],
    evidence: [
      { source: 'state-engg-development/src/modules/admissions/controllers/admissions-public.controller.ts', supports: 'Public application submission and applicant-facing routes.' },
      { source: 'state-engg-development/src/modules/admissions/controllers/admission-portal.controller.ts', supports: 'Application, document, payment and enrolment workflows.' },
      { source: 'state-engg-development/src/modules/admissions/services/admission-portal.service.ts', supports: 'Admissions portal processing logic.' },
      { source: 'state-engg-development/prisma/schema.prisma', supports: 'AdmissionApplication data model.' },
    ],
    capabilityStatus: 'VERIFIED',
    destinationRoute: '/erp/',
    displayPriority: 4,
  },
  {
    id: 'cap-counselling-coordination',
    slug: 'cap-counselling-coordination',
    category: 'admissions-and-enrolment',
    problemTitle: 'CAP counselling involves multiple rounds, seat matrices and allotments.',
    problemDescription: 'Staff need to coordinate applicant rosters, counselling rounds, merit lists and seat-allotment decisions.',
    businessImpact: 'Keeping these steps in separate records makes it harder to review progress and complete the process consistently.',
    solutionTitle: 'Coordinate CAP processing in the admissions workspace.',
    solutionDescription: 'The ERP includes roster import and workflows for counselling rounds, seat matrices, merit-list generation and seat allotment.',
    primaryProduct: 'education-erp',
    supportingProducts: [],
    capabilities: ['CAP roster import', 'Counselling-round management', 'Seat-matrix setup', 'Merit-list generation', 'Seat allotment'],
    workflowSteps: ['Import the CAP roster', 'Configure rounds and the seat matrix', 'Generate a merit list', 'Run seat allotment'],
    evidence: [
      { source: 'state-engg-development/src/modules/admissions/controllers/admission-portal.controller.ts', supports: 'CAP roster import and allotment-letter routes.' },
      { source: 'state-engg-development/src/modules/admissions/services/cap-allotment.service.ts', supports: 'CAP allotment processing.' },
      { source: 'state-engg-development/src/modules/admissions/controllers/admissions.controller.ts', supports: 'Counselling rounds, merit-list and seat-allotment routes.' },
      { source: 'state-engg-development/frontend/src/app/(admin)/admin/admissions/advanced/page.tsx', supports: 'Staff workflows for merit generation and allotment.' },
    ],
    capabilityStatus: 'VERIFIED',
    statusNote: 'CAP roster import is a staff workflow; no live DTE synchronization was verified.',
    destinationRoute: '/erp/',
    displayPriority: 5,
  },
  {
    id: 'lecture-attendance-records',
    slug: 'lecture-attendance-records',
    category: 'academic-operations',
    problemTitle: 'Lecture attendance needs consistent recording against the right class roster.',
    problemDescription: 'Faculty or staff need to select a section, mark attendance and retrieve the resulting records.',
    businessImpact: 'Unstructured attendance records make it harder to review class-level attendance history.',
    solutionTitle: 'Record attendance from section rosters.',
    solutionDescription: 'The ERP provides section roster and attendance-marking workflows, with attendance history and rollups.',
    primaryProduct: 'education-erp',
    supportingProducts: [],
    capabilities: ['Section roster retrieval', 'Lecture attendance marking', 'Attendance history', 'Daily and monthly rollups'],
    workflowSteps: ['Select a section', 'Load its roster', 'Mark attendance', 'Review attendance history and rollups'],
    evidence: [
      { source: 'state-engg-development/src/modules/attendance/controllers/attendance-marking.controller.ts', supports: 'Roster retrieval and attendance submission routes.' },
      { source: 'state-engg-development/src/modules/attendance/services/attendance-marking.service.ts', supports: 'Attendance marking service.' },
      { source: 'state-engg-development/prisma/schema.prisma', supports: 'Attendance and attendance-record models.' },
      { source: 'state-engg-development/frontend/src/app/attendance/marking.tsx', supports: 'Attendance-marking interface.' },
    ],
    capabilityStatus: 'VERIFIED',
    destinationRoute: '/erp/',
    displayPriority: 6,
  },
  {
    id: 'exam-administration',
    slug: 'exam-administration',
    category: 'academic-operations',
    problemTitle: 'Exam administration spans eligibility, scheduling, marks and results.',
    problemDescription: 'Examination teams coordinate candidate eligibility, timetable publication, mark entry, verification and result release.',
    businessImpact: 'When stages are tracked separately, it becomes harder to see which exam tasks are ready or still need review.',
    solutionTitle: 'Manage exam stages in one examination workflow.',
    solutionDescription: 'The ERP includes eligibility previews and overrides, candidate freeze/reopen, timetable validation/publication, mark entry/verification/locking and result routes.',
    primaryProduct: 'education-erp',
    supportingProducts: [],
    capabilities: ['Eligibility policy and preview', 'Candidate management', 'Timetable validation and publication', 'Mark entry and verification', 'Result workflows'],
    workflowSteps: ['Review candidate eligibility', 'Validate and publish the timetable', 'Enter and verify marks', 'Lock marks and process results'],
    evidence: [
      { source: 'state-engg-development/src/modules/exams/controllers/exams.controller.ts', supports: 'Eligibility, candidates, timetables, mark entry and result endpoints.' },
      { source: 'state-engg-development/prisma/schema.prisma', supports: 'Examination, eligibility, timetable and mark-entry models.' },
      { source: 'state-engg-development/frontend/src/app/exams/page.tsx', supports: 'Examination administration interface.' },
    ],
    capabilityStatus: 'VERIFIED',
    destinationRoute: '/erp/',
    displayPriority: 7,
  },
  {
    id: 'institution-fee-tracking',
    slug: 'institution-fee-tracking',
    category: 'finance-and-administration',
    problemTitle: 'Fee structures, demands, receipts and outstanding balances need to stay aligned.',
    problemDescription: 'Institution finance teams manage fee policies, student demands, invoices, receipts and outstanding summaries.',
    businessImpact: 'Disconnected fee records can make it harder to confirm a student’s current payment position.',
    solutionTitle: 'Manage institutional fees and payment records in the ERP.',
    solutionDescription: 'The finance module includes fee policy and structure workflows, invoices, demands, receipts, outstanding summaries and reconciliation-related routes.',
    primaryProduct: 'education-erp',
    supportingProducts: [],
    capabilities: ['Fee policy and structure setup', 'Invoices and fee demands', 'Receipt recording', 'Outstanding summaries', 'Payment reconciliation workflows'],
    workflowSteps: ['Configure fee policies and structures', 'Create fee demands or invoices', 'Record or reconcile receipts', 'Review outstanding balances'],
    evidence: [
      { source: 'state-engg-development/src/modules/finance/controllers/finance.controller.ts', supports: 'Fee policies, structures, invoices, demands and reporting routes.' },
      { source: 'state-engg-development/prisma/schema.prisma', supports: 'Fee, invoice, demand, receipt and ledger models.' },
      { source: 'state-engg-development/frontend/src/app/finance/invoices/page.tsx', supports: 'Finance invoice interface.' },
    ],
    capabilityStatus: 'VERIFIED',
    statusNote: 'This is institutional fee and finance workflow evidence; it does not establish general-purpose accounting or tax-filing coverage.',
    destinationRoute: '/erp/',
    displayPriority: 8,
  },
  {
    id: 'payroll-run-preparation',
    slug: 'payroll-run-preparation',
    category: 'finance-and-administration',
    problemTitle: 'Payroll preparation depends on gathering employee and attendance inputs.',
    problemDescription: 'Staff need to review payroll inputs, generate a run and track its processing status.',
    businessImpact: 'Without a visible run workflow, preparation and review status can be difficult to coordinate.',
    solutionTitle: 'Prepare and track payroll runs in the ERP.',
    solutionDescription: 'The ERP provides attendance registers, payroll previews, run generation and payroll-run status updates.',
    primaryProduct: 'education-erp',
    supportingProducts: [],
    capabilities: ['Employee directory and payroll inputs', 'Attendance registers', 'Payroll preview', 'Payroll-run generation', 'Run status updates'],
    workflowSteps: ['Review employee and attendance inputs', 'Preview the payroll run', 'Generate the run', 'Track its status'],
    evidence: [
      { source: 'state-engg-development/src/modules/employees/controllers/payroll-workbench.controller.ts', supports: 'Payroll register, preview, generation and run-status endpoints.' },
      { source: 'state-engg-development/src/modules/employees/services/payroll-generation.service.ts', supports: 'Payroll generation implementation.' },
      { source: 'state-engg-development/prisma/schema.prisma', supports: 'Employee, payroll and attendance models.' },
    ],
    capabilityStatus: 'VERIFIED',
    statusNote: 'Evidence covers payroll-run preparation and status tracking, not bank-file generation or salary disbursement.',
    destinationRoute: '/erp/',
    displayPriority: 9,
  },
]

const categoryIds = new Set<string>(solutionCategories.map((category) => category.id))
const productIds = new Set<string>(solutionProducts.map((product) => product.id))
const publishedStatuses = new Set<SolutionStatus>(['VERIFIED', 'PARTIALLY_IMPLEMENTED', 'CONFIGURABLE', 'CUSTOM_IMPLEMENTATION'])

export function validateBusinessSolutions(solutions: BusinessSolution[] = businessSolutions) {
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  for (const solution of solutions) {
    if (seenIds.has(solution.id) || seenSlugs.has(solution.slug)) {
      throw new Error(`Duplicate solution id or slug: ${solution.id}`)
    }
    seenIds.add(solution.id)
    seenSlugs.add(solution.slug)

    if (!categoryIds.has(solution.category)) throw new Error(`Unknown category for solution: ${solution.id}`)
    if (!publishedStatuses.has(solution.capabilityStatus)) throw new Error(`Unsupported solution status: ${solution.id}`)
    if (solution.evidence.length === 0) throw new Error(`Published solution requires evidence: ${solution.id}`)
    if (solution.capabilityStatus === 'CONFIGURABLE' && !solution.statusNote?.trim()) {
      throw new Error(`Configurable solution requires a configuration note: ${solution.id}`)
    }
    if (!productIds.has(solution.primaryProduct) || solution.supportingProducts.some((id) => !productIds.has(id))) {
      throw new Error(`Unknown product for solution: ${solution.id}`)
    }
    if (
      solution.destinationRoute
      && !sitePages.some((page) => page.path === solution.destinationRoute)
    ) {
      throw new Error(`Unknown destination route for solution: ${solution.id}`)
    }
    if (!solution.problemTitle.trim() || !solution.solutionTitle.trim() || solution.workflowSteps.length < 2) {
      throw new Error(`Incomplete solution content: ${solution.id}`)
    }
  }
}

validateBusinessSolutions()
