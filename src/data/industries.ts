import type { LucideIcon } from 'lucide-react'
import { GraduationCap, Building2, Factory, Briefcase, HeartPulse, Store, Rocket, Building } from 'lucide-react'

export interface Industry {
  id: string
  label: string
  icon: LucideIcon
  headline: string
  description: string
  modules: { name: string; detail: string }[]
  flow: string[]
}

export const industries: Industry[] = [
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    headline: 'Admissions to alumni, on one record.',
    description:
      'Track every enquiry from first call to enrolment, then manage students, fees and parent communication without switching tools.',
    modules: [
      { name: 'Admissions', detail: 'Enquiries, counselling, applications' },
      { name: 'Student Management', detail: 'Profiles, batches, attendance' },
      { name: 'Fee Collection', detail: 'Schedules, receipts, reminders' },
      { name: 'Parent Communication', detail: 'WhatsApp and email updates' },
    ],
    flow: ['Enquiry', 'Counselling', 'Application', 'Admission', 'Fee schedule'],
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    icon: Building2,
    headline: 'Every portal lead and site visit, followed up.',
    description:
      'Consolidate leads from property portals and ads, map them to inventory, schedule site visits and track bookings through payment.',
    modules: [
      { name: 'Leads', detail: 'Portals, ads, walk-ins, referrals' },
      { name: 'Properties', detail: 'Projects, towers, unit availability' },
      { name: 'Site Visits', detail: 'Scheduling and feedback' },
      { name: 'Bookings', detail: 'Payment plans and demands' },
    ],
    flow: ['Portal lead', 'Qualification', 'Site visit', 'Booking', 'Payment plan'],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    icon: Factory,
    headline: 'Sales order to dispatch, without the spreadsheets.',
    description:
      'Connect orders to bills of material, procurement and production so stock, cost and delivery dates stay accurate.',
    modules: [
      { name: 'Inventory', detail: 'Raw material and finished goods' },
      { name: 'Procurement', detail: 'Vendors, POs, goods receipt' },
      { name: 'Production', detail: 'Work orders and BOM' },
      { name: 'Dispatch', detail: 'Challans, invoices, delivery' },
    ],
    flow: ['Sales order', 'BOM check', 'Purchase order', 'Production', 'Dispatch'],
  },
  {
    id: 'services',
    label: 'Professional Services',
    icon: Briefcase,
    headline: 'Clients, projects and billable hours in sync.',
    description: 'Win engagements in CRM, run them as projects, log time against them and bill from the same record.',
    modules: [
      { name: 'Clients', detail: 'Accounts, contacts, proposals' },
      { name: 'Projects', detail: 'Milestones and ownership' },
      { name: 'Timesheets', detail: 'Billable and non-billable hours' },
      { name: 'Billing', detail: 'Retainers and milestone invoices' },
    ],
    flow: ['Proposal', 'Engagement', 'Project plan', 'Timesheets', 'Invoice'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: HeartPulse,
    headline: 'Front desk to billing, organised.',
    description: 'Manage patient enquiries, appointments, staff rosters and billing for clinics and diagnostic centres.',
    modules: [
      { name: 'Enquiries', detail: 'Calls, web forms, WhatsApp' },
      { name: 'Appointments', detail: 'Slots, reminders, reschedules' },
      { name: 'Staff Rosters', detail: 'Shifts and availability' },
      { name: 'Billing', detail: 'Invoices and payment status' },
    ],
    flow: ['Enquiry', 'Appointment', 'Reminder', 'Visit', 'Billing'],
  },
  {
    id: 'retail',
    label: 'Retail',
    icon: Store,
    headline: 'Stores, stock and customers in one view.',
    description: 'Keep inventory accurate across stores and warehouses, and turn one-time buyers into repeat customers.',
    modules: [
      { name: 'Inventory', detail: 'Store and warehouse stock' },
      { name: 'Orders', detail: 'In-store, online, B2B' },
      { name: 'Customers', detail: 'Purchase history, segments' },
      { name: 'Store Operations', detail: 'Transfers, audits, staff' },
    ],
    flow: ['Order', 'Stock check', 'Fulfilment', 'Invoice', 'Repeat campaign'],
  },
  {
    id: 'startups',
    label: 'Startups',
    icon: Rocket,
    headline: 'Start structured. Scale without migrating.',
    description:
      'A CRM and operating layer that fits your current process and extends as the team, products and markets grow.',
    modules: [
      { name: 'Sales Pipeline', detail: 'Leads, demos, deals' },
      { name: 'Customer Success', detail: 'Onboarding and renewals' },
      { name: 'Tasks', detail: 'Owners, due dates, handoffs' },
      { name: 'Dashboards', detail: 'Pipeline and revenue metrics' },
    ],
    flow: ['Lead', 'Demo', 'Proposal', 'Closed won', 'Onboarding'],
  },
  {
    id: 'smes',
    label: 'SMEs',
    icon: Building,
    headline: 'One system instead of six subscriptions.',
    description:
      'Sales, accounts, people and stock for growing businesses that have outgrown spreadsheets and disconnected apps.',
    modules: [
      { name: 'CRM', detail: 'Leads, customers, follow-ups' },
      { name: 'Accounts', detail: 'Invoices, receivables, expenses' },
      { name: 'HR', detail: 'Attendance, leave, payroll inputs' },
      { name: 'Inventory', detail: 'Stock, purchases, transfers' },
    ],
    flow: ['Lead', 'Quote', 'Order', 'Invoice', 'Payment'],
  },
]
