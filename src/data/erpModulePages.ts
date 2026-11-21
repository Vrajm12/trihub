import { erpModules } from '@/data/erpModules'

type DashboardData = {
  title: string
  nav: string[]
  stats: { label: string; value: string; note: string }[]
  panelTitle: string
  rows: { name: string; detail: string; status: string }[]
  asideTitle: string
  asideItems: { label: string; value: string }[]
}

type DetailData = {
  title: string
  description: string
}

export type ErpModulePageData = {
  slug: (typeof erpModules)[number]['slug']
  label: string
  category: string
  headline: string
  description: string
  dashboard: DashboardData
  detailsTitle: string
  detailsLead: string
  details: DetailData[]
  faqs: { question: string; answer: string }[]
}

export const erpModulePages: ErpModulePageData[] = [
  {
    slug: 'admission-crm',
    label: 'Admission CRM',
    category: 'ADMISSIONS & ENQUIRY MANAGEMENT',
    headline: 'Make every admission enquiry easier to follow.',
    description:
      'Bring enquiry records, follow-ups, applicant details, and admission stages into a shared view for your admissions team.',
    dashboard: {
      title: 'Admissions overview',
      nav: ['Overview', 'Enquiries', 'Applicants', 'Follow-ups'],
      stats: [
        { label: 'Open enquiries', value: '128', note: 'Across active campaigns' },
        { label: 'Follow-ups due', value: '24', note: 'Tasks for the team' },
        { label: 'Applications', value: '56', note: 'In progress' },
      ],
      panelTitle: 'Recent enquiries',
      rows: [
        { name: 'Aarav Kulkarni', detail: 'Computer Science · Today', status: 'New' },
        { name: 'Mira Shah', detail: 'Business Studies · Today', status: 'Follow-up' },
        { name: 'Kabir Joshi', detail: 'Engineering · Yesterday', status: 'In review' },
      ],
      asideTitle: 'Next follow-ups',
      asideItems: [
        { label: 'Calls to make', value: '08' },
        { label: 'Documents to check', value: '05' },
      ],
    },
    detailsTitle: 'A clear path from first enquiry to application.',
    detailsLead:
      'Give admissions teams a practical workspace for keeping conversations, applicant records, and next steps connected.',
    details: [
      { title: 'Keep enquiry records together', description: 'Capture prospective student details and keep their course interest and conversation history easy to find.' },
      { title: 'Make follow-ups visible', description: 'Organize callbacks, reminders, and team ownership so the next action is clear.' },
      { title: 'Track admission progress', description: 'See applications as they move through the stages your institution defines.' },
    ],
    faqs: [
      { question: 'What does an Admission CRM help a college manage?', answer: 'It provides a shared way to organize admission enquiries, applicant records, follow-ups, and admission stages. The exact stages depend on your institution’s process.' },
      { question: 'Can the admission stages be configured?', answer: 'The workflow can be mapped to your admission process. Confirm the required stages, roles, and approvals during implementation planning.' },
      { question: 'Can we import existing enquiry data?', answer: 'Data migration can be planned as part of implementation. The source format, data quality, and migration scope should be reviewed first.' },
    ],
  },
  {
    slug: 'campus-management-system',
    label: 'Campus Management System (CMS) Software',
    category: 'CAMPUS OPERATIONS',
    headline: 'Bring day-to-day campus work into view.',
    description:
      'Coordinate the records, requests, and recurring tasks that keep campus teams moving through the academic year.',
    dashboard: {
      title: 'Campus overview',
      nav: ['Overview', 'Requests', 'Departments', 'Calendar'],
      stats: [
        { label: 'Open requests', value: '18', note: 'Awaiting team action' },
        { label: 'Active departments', value: '12', note: 'Campus-wide view' },
        { label: 'Upcoming events', value: '07', note: 'Next 30 days' },
      ],
      panelTitle: 'Campus activity',
      rows: [
        { name: 'Room allocation', detail: 'Science block · Today', status: 'In review' },
        { name: 'Student service request', detail: 'Central office · Today', status: 'Assigned' },
        { name: 'Department schedule', detail: 'Arts faculty · Yesterday', status: 'Updated' },
      ],
      asideTitle: 'Campus checklist',
      asideItems: [
        { label: 'Items to review', value: '06' },
        { label: 'Teams involved', value: '04' },
      ],
    },
    detailsTitle: 'A shared view for the work between departments.',
    detailsLead:
      'Structure campus information and routine coordination around the way your teams already operate.',
    details: [
      { title: 'Coordinate requests', description: 'Route common campus requests to the right team and make ownership easier to see.' },
      { title: 'Keep schedules at hand', description: 'Bring key calendars, events, and operational dates into a more accessible view.' },
      { title: 'Connect department activity', description: 'Give teams a consistent place to review updates and pending work.' },
    ],
    faqs: [
      { question: 'Who is a Campus Management System for?', answer: 'It is intended for institutions coordinating work across multiple campus departments. The implementation scope is set around the processes and teams involved.' },
      { question: 'Can it reflect our campus structure?', answer: 'Departments, responsibilities, and workflows should be mapped during discovery so the configuration reflects your institution.' },
      { question: 'Does it replace every system on campus?', answer: 'Not necessarily. Scope and integrations depend on the systems you use and the workflows selected for implementation.' },
    ],
  },
  {
    slug: 'fee-management-system',
    label: 'Fee Management System',
    category: 'FEES & FINANCE',
    headline: 'Follow fee activity from demand to receipt.',
    description:
      'Give finance and administration teams a structured view of fee demands, receipts, balances, and student fee records.',
    dashboard: {
      title: 'Fee operations',
      nav: ['Overview', 'Fee heads', 'Demands', 'Receipts'],
      stats: [
        { label: 'Demands to review', value: '32', note: 'Current fee cycle' },
        { label: 'Receipts today', value: '46', note: 'Illustrative activity' },
        { label: 'Open balances', value: '21', note: 'Records to follow up' },
      ],
      panelTitle: 'Recent fee records',
      rows: [
        { name: 'Semester fee', detail: 'Aarav K. · First year', status: 'Part paid' },
        { name: 'Laboratory fee', detail: 'Mira S. · Second year', status: 'Received' },
        { name: 'Exam fee', detail: 'Kabir J. · Final year', status: 'Pending' },
      ],
      asideTitle: 'Fee cycle',
      asideItems: [
        { label: 'Fee heads', value: '09' },
        { label: 'Open items', value: '21' },
      ],
    },
    detailsTitle: 'Make fee records easier to review and reconcile.',
    detailsLead:
      'Keep the fee structures and transactions your team works with organized around institution-defined rules.',
    details: [
      { title: 'Organize fee structures', description: 'Set out fee heads and applicable charges for the courses or groups your institution defines.' },
      { title: 'Track demands and receipts', description: 'Review fee demands, payments received, and outstanding balances against student records.' },
      { title: 'Make exceptions visible', description: 'Keep concessions, adjustments, and pending items available for authorized review.' },
    ],
    faqs: [
      { question: 'Can fee structures vary by course or year?', answer: 'The applicable fee structure and its rules need to be mapped with your institution during configuration.' },
      { question: 'Can staff see outstanding balances?', answer: 'The module is designed around fee demands, receipts, and balances. Access and views depend on configured roles.' },
      { question: 'Are payment gateway integrations included?', answer: 'Payment gateway availability depends on the selected provider and implementation scope. Confirm the required integration during planning.' },
    ],
  },
  {
    slug: 'learning-management-system',
    label: 'Learning Management System (LMS)',
    category: 'LEARNING & COURSE DELIVERY',
    headline: 'Give course activity a place to come together.',
    description:
      'Organize course materials, learning activities, and learner progress in a workspace shaped around your teaching model.',
    dashboard: {
      title: 'Learning overview',
      nav: ['Overview', 'Courses', 'Materials', 'Activities'],
      stats: [
        { label: 'Active courses', value: '24', note: 'Across departments' },
        { label: 'Learning items', value: '86', note: 'Materials and activities' },
        { label: 'Reviews due', value: '11', note: 'For teaching staff' },
      ],
      panelTitle: 'Course activity',
      rows: [
        { name: 'Introduction to Computing', detail: 'Module 03 · Updated today', status: 'Published' },
        { name: 'Business Fundamentals', detail: 'Assignment · Due Friday', status: 'Open' },
        { name: 'Applied Mathematics', detail: 'Reading list · Updated yesterday', status: 'Draft' },
      ],
      asideTitle: 'Teaching checklist',
      asideItems: [
        { label: 'Materials to publish', value: '04' },
        { label: 'Activities to review', value: '07' },
      ],
    },
    detailsTitle: 'Keep course resources and learning activity organized.',
    detailsLead:
      'Support course delivery with a consistent way to arrange learning materials, activities, and progress reviews.',
    details: [
      { title: 'Structure course spaces', description: 'Arrange learning content around the subjects and modules used by your institution.' },
      { title: 'Share teaching materials', description: 'Make course resources available in a clear, organized sequence for learners.' },
      { title: 'Review learning activity', description: 'Give teaching teams a view of course activity and work that needs attention.' },
    ],
    faqs: [
      { question: 'Can courses be organized by semester or program?', answer: 'Course structure should be mapped to your academic calendar and program model during implementation.' },
      { question: 'Can teaching staff share materials with learners?', answer: 'The LMS is intended to organize and share learning materials. Supported formats and permissions should be confirmed for your setup.' },
      { question: 'Can it connect with an existing student system?', answer: 'Integration depends on the systems involved and the required data exchange. It should be scoped before implementation.' },
    ],
  },
  {
    slug: 'university-management-system',
    label: 'University Management System (UMS) Software',
    category: 'UNIVERSITY-WIDE OPERATIONS',
    headline: 'Bring university processes into a connected view.',
    description:
      'Coordinate student, academic, and administrative workflows across faculties and offices with institution-wide records.',
    dashboard: {
      title: 'University overview',
      nav: ['Overview', 'Faculties', 'Students', 'Operations'],
      stats: [
        { label: 'Faculties', value: '08', note: 'Institutional units' },
        { label: 'Active workflows', value: '34', note: 'Across departments' },
        { label: 'Reviews due', value: '16', note: 'Pending decisions' },
      ],
      panelTitle: 'University activity',
      rows: [
        { name: 'Program review', detail: 'Engineering faculty · Today', status: 'In review' },
        { name: 'Student record update', detail: 'Central registry · Today', status: 'Submitted' },
        { name: 'Academic calendar item', detail: 'Science faculty · Yesterday', status: 'Approved' },
      ],
      asideTitle: 'Office queue',
      asideItems: [
        { label: 'Items to review', value: '09' },
        { label: 'Faculties involved', value: '03' },
      ],
    },
    detailsTitle: 'A structured view across university offices.',
    detailsLead:
      'Map the university’s administrative and academic processes so teams can manage responsibilities with shared context.',
    details: [
      { title: 'Coordinate faculty workflows', description: 'Organize recurring processes across faculties, departments, and central offices.' },
      { title: 'Keep institutional records aligned', description: 'Make key student and academic information easier to locate and review.' },
      { title: 'Clarify reviews and approvals', description: 'Reflect the decision paths and role boundaries your institution defines.' },
    ],
    faqs: [
      { question: 'Is a UMS suitable for multiple faculties?', answer: 'The system can be planned around your university structure. The number of faculties, roles, and workflows should be established during discovery.' },
      { question: 'Can it replace separate departmental processes?', answer: 'Some processes may be brought into a shared workflow; others may remain in their current systems. The right scope depends on operational needs and integrations.' },
      { question: 'How does implementation begin?', answer: 'Implementation planning begins by mapping current processes, stakeholders, data, and the workflows in scope.' },
    ],
  },
  {
    slug: 'human-resource-management-system',
    label: 'Human Resource Management System (HRMS)',
    category: 'PEOPLE & HUMAN RESOURCES',
    headline: 'Keep staff records and people processes in view.',
    description:
      'Organize employee information and recurring HR workflows with clear ownership, access, and review stages.',
    dashboard: {
      title: 'People operations',
      nav: ['Overview', 'Employees', 'Leave', 'Requests'],
      stats: [
        { label: 'Staff records', value: '240', note: 'Across departments' },
        { label: 'Requests to review', value: '12', note: 'Pending action' },
        { label: 'Leave entries', value: '18', note: 'This month' },
      ],
      panelTitle: 'People requests',
      rows: [
        { name: 'Leave request', detail: 'Aarav K. · Science faculty', status: 'Awaiting review' },
        { name: 'Profile update', detail: 'Mira S. · Central office', status: 'Submitted' },
        { name: 'Joining checklist', detail: 'Kabir J. · Administration', status: 'In progress' },
      ],
      asideTitle: 'Team tasks',
      asideItems: [
        { label: 'Profiles to verify', value: '05' },
        { label: 'Requests pending', value: '12' },
      ],
    },
    detailsTitle: 'Make people processes more consistent.',
    detailsLead:
      'Give authorized staff a structured way to maintain records and move common HR requests through review.',
    details: [
      { title: 'Maintain employee records', description: 'Organize staff information in a consistent structure with access based on assigned roles.' },
      { title: 'Route routine requests', description: 'Represent leave, profile changes, and other selected requests with clear review steps.' },
      { title: 'Support staff lifecycle tasks', description: 'Keep onboarding and recurring people operations visible to the responsible teams.' },
    ],
    faqs: [
      { question: 'Can HR access be restricted by role?', answer: 'Access requirements should be defined during configuration so sensitive employee records are available only to appropriate roles.' },
      { question: 'Does the HRMS include payroll?', answer: 'Payroll scope depends on the specific modules and workflows selected. Review requirements with the implementation team.' },
      { question: 'Can existing employee data be migrated?', answer: 'Data migration can be assessed during planning based on source systems, data format, and the records in scope.' },
    ],
  },
  {
    slug: 'examination-management-system',
    label: 'Examination Management System (EMS) Software',
    category: 'EXAMINATIONS & RESULTS',
    headline: 'Keep examination stages and records on track.',
    description:
      'Coordinate exam schedules, eligibility checks, assessment records, and result workflows around your academic rules.',
    dashboard: {
      title: 'Examination overview',
      nav: ['Overview', 'Schedules', 'Eligibility', 'Results'],
      stats: [
        { label: 'Upcoming exams', value: '14', note: 'Next exam window' },
        { label: 'Eligibility reviews', value: '26', note: 'Awaiting verification' },
        { label: 'Results to process', value: '08', note: 'Current cycle' },
      ],
      panelTitle: 'Examination schedule',
      rows: [
        { name: 'Applied Mathematics', detail: 'Semester 02 · 18 Nov', status: 'Scheduled' },
        { name: 'Database Systems', detail: 'Semester 04 · 20 Nov', status: 'Room review' },
        { name: 'Business Law', detail: 'Semester 06 · 22 Nov', status: 'Confirmed' },
      ],
      asideTitle: 'Exam readiness',
      asideItems: [
        { label: 'Schedules to check', value: '03' },
        { label: 'Eligibility reviews', value: '26' },
      ],
    },
    detailsTitle: 'From exam planning to result review.',
    detailsLead:
      'Keep examination processes organized across the checks and approvals defined by your academic rules.',
    details: [
      { title: 'Plan exam schedules', description: 'Coordinate exam dates, course entries, and schedule reviews for each exam cycle.' },
      { title: 'Review eligibility', description: 'Bring relevant student records together for eligibility checks under institution-defined rules.' },
      { title: 'Manage assessment stages', description: 'Keep marks entry, verification, and result release steps visible to authorized staff.' },
    ],
    faqs: [
      { question: 'Can examination rules vary by program?', answer: 'Eligibility and assessment rules should be documented for each applicable program and cycle during configuration.' },
      { question: 'Can the module support result review and approval?', answer: 'Review steps can be planned around your institution’s result process, including role and approval requirements.' },
      { question: 'Does it publish results to a student portal?', answer: 'Student-facing result access depends on the selected setup and any required portal configuration.' },
    ],
  },
  {
    slug: 'alumni-management-system',
    label: 'Alumni Management System',
    category: 'ALUMNI & INSTITUTIONAL RELATIONS',
    headline: 'Keep alumni connections organized over time.',
    description:
      'Maintain alumni records and coordinate communications, events, and engagement activity from a shared workspace.',
    dashboard: {
      title: 'Alumni overview',
      nav: ['Overview', 'Directory', 'Events', 'Engagement'],
      stats: [
        { label: 'Alumni records', value: '860', note: 'Illustrative directory' },
        { label: 'Upcoming events', value: '03', note: 'In planning' },
        { label: 'Profile updates', value: '17', note: 'To review' },
      ],
      panelTitle: 'Recent engagement',
      rows: [
        { name: 'Annual alumni meet', detail: 'City chapter · 24 Nov', status: 'Planning' },
        { name: 'Profile update', detail: 'Graduated 2022 · Today', status: 'Received' },
        { name: 'Mentorship interest', detail: 'Engineering · Yesterday', status: 'Review' },
      ],
      asideTitle: 'Engagement queue',
      asideItems: [
        { label: 'Updates to verify', value: '17' },
        { label: 'Event tasks', value: '06' },
      ],
    },
    detailsTitle: 'Build a useful record of your alumni community.',
    detailsLead:
      'Help institutional teams keep alumni information current and plan ways to stay connected.',
    details: [
      { title: 'Maintain alumni profiles', description: 'Organize contact and education details in an institutional directory with review controls.' },
      { title: 'Coordinate events', description: 'Keep event planning, participation, and follow-up activity visible to the responsible team.' },
      { title: 'Support ongoing engagement', description: 'Track communication and engagement initiatives around your alumni relations approach.' },
    ],
    faqs: [
      { question: 'Can alumni update their own profiles?', answer: 'Self-service access depends on the selected portal setup and verification process.' },
      { question: 'Can we organize alumni by cohort or program?', answer: 'The directory structure should be planned around the groups and profile attributes your institution needs.' },
      { question: 'Can the module help manage alumni events?', answer: 'Event coordination can be included in the planned workflow. Registration and communication requirements should be confirmed during scoping.' },
    ],
  },
  {
    slug: 'academic-management-system',
    label: 'Academic Management System (AMS) Software',
    category: 'ACADEMIC PLANNING',
    headline: 'Coordinate the academic plan from one place.',
    description:
      'Organize courses, schedules, academic calendars, and teaching responsibilities around your institution’s academic structure.',
    dashboard: {
      title: 'Academic overview',
      nav: ['Overview', 'Courses', 'Timetable', 'Calendar'],
      stats: [
        { label: 'Courses this term', value: '42', note: 'Across programs' },
        { label: 'Schedule items', value: '126', note: 'Current term' },
        { label: 'Plan reviews', value: '09', note: 'Awaiting approval' },
      ],
      panelTitle: 'Academic plan',
      rows: [
        { name: 'Semester timetable', detail: 'Computer Science · Term 1', status: 'In review' },
        { name: 'Course allocation', detail: 'Business Studies · Term 1', status: 'Updated' },
        { name: 'Academic calendar', detail: 'Institution-wide · 2026–27', status: 'Draft' },
      ],
      asideTitle: 'Planning tasks',
      asideItems: [
        { label: 'Plans to approve', value: '04' },
        { label: 'Schedule conflicts', value: '02' },
      ],
    },
    detailsTitle: 'Give academic planning a dependable structure.',
    detailsLead:
      'Keep the plans, schedules, and academic dates that teams rely on organized by term and program.',
    details: [
      { title: 'Organize course plans', description: 'Structure courses and teaching plans around your program and term definitions.' },
      { title: 'Coordinate schedules', description: 'Review timetable information and related changes with the teams responsible for planning.' },
      { title: 'Maintain the academic calendar', description: 'Keep important academic dates visible to the departments that need them.' },
    ],
    faqs: [
      { question: 'Can academic schedules be organized by term?', answer: 'Academic periods and schedule structures should be set up according to your institution’s calendar.' },
      { question: 'Can timetable changes be reviewed?', answer: 'The review and approval path can be mapped to the roles involved in your scheduling process.' },
      { question: 'Can it manage course plans for multiple programs?', answer: 'Program structures and course planning requirements should be confirmed during configuration.' },
    ],
  },
  {
    slug: 'office-automation',
    label: 'Office Automation (ERP)',
    category: 'OFFICE WORKFLOWS & APPROVALS',
    headline: 'Move routine office work through clear steps.',
    description:
      'Structure internal requests, documents, approvals, and follow-up tasks so teams can see what is waiting and who owns it.',
    dashboard: {
      title: 'Office workflow overview',
      nav: ['Overview', 'Requests', 'Documents', 'Approvals'],
      stats: [
        { label: 'Requests in queue', value: '19', note: 'Across offices' },
        { label: 'Approvals due', value: '07', note: 'Need a decision' },
        { label: 'Documents filed', value: '38', note: 'This month' },
      ],
      panelTitle: 'Approval queue',
      rows: [
        { name: 'Purchase request', detail: 'Facilities · Today', status: 'Awaiting review' },
        { name: 'Document circulation', detail: 'Registrar office · Today', status: 'In progress' },
        { name: 'Travel request', detail: 'Academic office · Yesterday', status: 'Submitted' },
      ],
      asideTitle: 'Office checklist',
      asideItems: [
        { label: 'Pending approvals', value: '07' },
        { label: 'Overdue tasks', value: '03' },
      ],
    },
    detailsTitle: 'Make administrative handoffs easier to follow.',
    detailsLead:
      'Set up the routing, records, and review stages that support routine work across institutional offices.',
    details: [
      { title: 'Route internal requests', description: 'Move selected requests to the responsible office and make the next step visible.' },
      { title: 'Organize document workflows', description: 'Track circulation, review, and storage steps for documents in scope.' },
      { title: 'Keep approvals accountable', description: 'Clarify decision ownership and status for the approval processes you configure.' },
    ],
    faqs: [
      { question: 'Can office workflows be customized?', answer: 'Workflow stages and responsibility should be mapped from your current processes and configured for the agreed scope.' },
      { question: 'Can documents be routed for approval?', answer: 'Document review and approval flows can be planned. Document types, access rules, and retention needs should be confirmed.' },
      { question: 'Does Office Automation include every ERP module?', answer: 'The modules and integrations included depend on the implementation scope; they should be listed and agreed during planning.' },
    ],
  },
  {
    slug: 'student-information-system',
    label: 'Student Information System (SIS) Software',
    category: 'STUDENT RECORDS',
    headline: 'Give every student record a clearer home.',
    description:
      'Organize student profiles and academic records so authorized teams can find consistent information through the student lifecycle.',
    dashboard: {
      title: 'Student records',
      nav: ['Overview', 'Directory', 'Programs', 'Documents'],
      stats: [
        { label: 'Student records', value: '1,240', note: 'Across active programs' },
        { label: 'Updates to review', value: '15', note: 'Submitted by staff' },
        { label: 'Records complete', value: '92%', note: 'Illustrative status' },
      ],
      panelTitle: 'Recent record activity',
      rows: [
        { name: 'Aarav Kulkarni', detail: 'Computer Science · Year 2', status: 'Updated' },
        { name: 'Mira Shah', detail: 'Business Studies · Year 1', status: 'Review' },
        { name: 'Kabir Joshi', detail: 'Engineering · Year 3', status: 'Verified' },
      ],
      asideTitle: 'Records to check',
      asideItems: [
        { label: 'Profile updates', value: '09' },
        { label: 'Documents', value: '06' },
      ],
    },
    detailsTitle: 'Keep student information consistent and accessible.',
    detailsLead:
      'Bring the student details that teams need into a structured record, with access appropriate to each role.',
    details: [
      { title: 'Maintain student profiles', description: 'Organize identity, contact, program, and other institution-defined record fields.' },
      { title: 'Keep academic history connected', description: 'Make relevant enrollment and academic information easier for authorized staff to review.' },
      { title: 'Review record changes', description: 'Provide a clear process for verifying updates and supporting documents.' },
    ],
    faqs: [
      { question: 'Can the SIS store records across a student’s lifecycle?', answer: 'The record structure should be defined around the stages and information your institution needs to maintain.' },
      { question: 'Can access to student information be controlled?', answer: 'Role-based access requirements should be agreed during implementation, especially for sensitive information.' },
      { question: 'Can existing student data be imported?', answer: 'Migration depends on the source data, format, quality, and scope. These should be assessed before transition.' },
    ],
  },
  {
    slug: 'library-management-system',
    label: 'Library Management System',
    category: 'LIBRARY OPERATIONS',
    headline: 'Keep library resources and circulation organized.',
    description:
      'Give library teams a structured view of catalogue records, circulation activity, and the requests that need attention.',
    dashboard: {
      title: 'Library overview',
      nav: ['Overview', 'Catalogue', 'Circulation', 'Requests'],
      stats: [
        { label: 'Catalogue records', value: '3,840', note: 'Illustrative collection' },
        { label: 'Items on loan', value: '216', note: 'Current circulation' },
        { label: 'Due for return', value: '18', note: 'Next 7 days' },
      ],
      panelTitle: 'Circulation activity',
      rows: [
        { name: 'Introduction to Algorithms', detail: 'Loan · Aarav K.', status: 'Due soon' },
        { name: 'Research Methods', detail: 'Return · Mira S.', status: 'Received' },
        { name: 'Modern Campus Design', detail: 'Request · Kabir J.', status: 'On hold' },
      ],
      asideTitle: 'Library tasks',
      asideItems: [
        { label: 'Returns to process', value: '08' },
        { label: 'Requests to review', value: '05' },
      ],
    },
    detailsTitle: 'A practical workspace for library teams.',
    detailsLead:
      'Organize catalogue information and circulation workflows around the resources and lending rules your library uses.',
    details: [
      { title: 'Maintain catalogue records', description: 'Keep resource details organized so staff and readers can identify items.' },
      { title: 'Track circulation activity', description: 'Review loans, returns, renewals, and requests according to configured library rules.' },
      { title: 'Make library tasks visible', description: 'Give staff a view of due items, holds, and requests waiting for action.' },
    ],
    faqs: [
      { question: 'Can library lending rules be configured?', answer: 'Loan periods, renewal rules, and access conditions should be documented and configured for the library’s requirements.' },
      { question: 'Can an existing catalogue be migrated?', answer: 'Catalogue migration can be assessed based on the source system, export format, and record quality.' },
      { question: 'Can students search the catalogue?', answer: 'Reader-facing search depends on the selected setup and access requirements for your library.' },
    ],
  },
  {
    slug: 'outcome-based-education',
    label: 'Outcome Based Education (OBE) Software',
    category: 'OUTCOME-BASED EDUCATION',
    headline: 'Make learning outcomes easier to map and review.',
    description:
      'Organize course outcomes, program outcomes, assessment evidence, and attainment reviews around your academic framework.',
    dashboard: {
      title: 'OBE overview',
      nav: ['Overview', 'Outcomes', 'Mapping', 'Attainment'],
      stats: [
        { label: 'Course outcomes', value: '84', note: 'Across selected programs' },
        { label: 'Mappings to review', value: '12', note: 'Faculty review queue' },
        { label: 'Assessment records', value: '36', note: 'Current cycle' },
      ],
      panelTitle: 'Outcome mapping',
      rows: [
        { name: 'Data Structures · CO mapping', detail: 'Computer Science · Term 1', status: 'In review' },
        { name: 'Program outcome matrix', detail: 'Engineering · 2026–27', status: 'Updated' },
        { name: 'Assessment evidence', detail: 'Business Studies · Term 1', status: 'Submitted' },
      ],
      asideTitle: 'Review tasks',
      asideItems: [
        { label: 'Mappings to approve', value: '06' },
        { label: 'Evidence items', value: '11' },
      ],
    },
    detailsTitle: 'Connect outcomes, assessment, and review.',
    detailsLead:
      'Give academic teams a consistent way to document outcome relationships and examine supporting evidence.',
    details: [
      { title: 'Define outcome structures', description: 'Organize course and program outcomes in the format used by your academic framework.' },
      { title: 'Document outcome mappings', description: 'Record how courses and assessments relate to program-level outcomes.' },
      { title: 'Review evidence and attainment', description: 'Bring assessment evidence together for faculty review and continuous improvement discussions.' },
    ],
    faqs: [
      { question: 'Can OBE structures match our curriculum framework?', answer: 'The outcome hierarchy and mapping approach should be documented with academic stakeholders during configuration.' },
      { question: 'Can faculty review outcome mappings?', answer: 'Review roles and approval stages can be planned around your institution’s academic governance process.' },
      { question: 'Does the software calculate attainment?', answer: 'Calculation methods depend on the assessment model and rules agreed for implementation. Validate these requirements during scoping.' },
    ],
  },
]

export function getErpModulePage(slug: string | undefined) {
  return erpModulePages.find((module) => module.slug === slug)
}
