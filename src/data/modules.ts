import type { LucideIcon } from 'lucide-react'
import { BarChart3, Boxes, Users, Wallet, Package, Workflow, MessagesSquare, UserRound } from 'lucide-react'

export type ModuleId =
  | 'crm'
  | 'erp'
  | 'hrms'
  | 'finance'
  | 'inventory'
  | 'automation'
  | 'analytics'
  | 'communication'

export interface SystemModule {
  id: ModuleId
  label: string
  short: string
  icon: LucideIcon
  summary: string
  capabilities: string[]
  /** Modules this one exchanges data with — drawn as highlighted links in the 3D diagram. */
  connects: ModuleId[]
  /** One concrete example of data moving across the system. */
  example: string
}

export const systemModules: SystemModule[] = [
  {
    id: 'crm',
    label: 'CRM',
    short: 'Leads, deals, relationships',
    icon: Users,
    summary: 'Every lead, contact and conversation in one pipeline, with follow-ups that never depend on memory.',
    capabilities: ['Lead capture from forms, ads and WhatsApp', 'Custom sales stages', 'Follow-up reminders', 'Deal value forecasting'],
    connects: ['communication', 'automation', 'finance', 'analytics'],
    example: 'A won deal creates the customer record in Finance and raises the first invoice.',
  },
  {
    id: 'erp',
    label: 'ERP',
    short: 'Operations backbone',
    icon: Boxes,
    summary: 'Procurement, projects and operations on the same records your sales and finance teams use.',
    capabilities: ['Purchase orders and approvals', 'Project and job costing', 'Multi-branch operations', 'Role-based workflows'],
    connects: ['inventory', 'finance', 'hrms', 'analytics'],
    example: 'An approved purchase order updates expected stock and committed spend instantly.',
  },
  {
    id: 'hrms',
    label: 'HRMS',
    short: 'People and payroll inputs',
    icon: UserRound,
    summary: 'Employee records, attendance, leave and roles — connected to who can see and do what across the system.',
    capabilities: ['Employee directory', 'Attendance and leave', 'Payroll inputs', 'Roles and permissions'],
    connects: ['erp', 'finance', 'automation'],
    example: 'A new joiner gets system access, a sales territory and a payroll record in one step.',
  },
  {
    id: 'finance',
    label: 'Finance',
    short: 'Invoices, payments, GST',
    icon: Wallet,
    summary: 'Invoices, receivables and expenses generated from real operational events — not re-typed from spreadsheets.',
    capabilities: ['GST-ready invoicing', 'Receivables and reminders', 'Expense tracking', 'Accounting exports'],
    connects: ['crm', 'erp', 'inventory', 'analytics'],
    example: 'Payment received against an invoice closes the follow-up task in CRM.',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    short: 'Stock across locations',
    icon: Package,
    summary: 'Live stock across warehouses and stores, with reorder points tied to procurement.',
    capabilities: ['Multi-location stock', 'Batch and serial tracking', 'Reorder alerts', 'Stock transfers'],
    connects: ['erp', 'finance', 'analytics'],
    example: 'Stock below reorder level drafts a purchase order for approval.',
  },
  {
    id: 'automation',
    label: 'Automation',
    short: 'Rules that run themselves',
    icon: Workflow,
    summary: 'Triggers, conditions and actions across every module — assignment, reminders, approvals, messages.',
    capabilities: ['Visual workflow builder', 'Approval chains', 'Scheduled jobs', 'Webhooks and API actions'],
    connects: ['crm', 'communication', 'hrms', 'erp'],
    example: 'A new website lead is scored, assigned and messaged on WhatsApp within a minute.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    short: 'Dashboards from live data',
    icon: BarChart3,
    summary: 'Dashboards built on the same records your teams work in — no exports, no stale reports.',
    capabilities: ['Role-specific dashboards', 'Pipeline and revenue reports', 'Operational KPIs', 'Scheduled email reports'],
    connects: ['crm', 'finance', 'inventory', 'erp'],
    example: 'Sales, collections and stock levels on one screen, updated as work happens.',
  },
  {
    id: 'communication',
    label: 'Communication',
    short: 'WhatsApp, email, calls',
    icon: MessagesSquare,
    summary: 'WhatsApp, email and call logs attached to the right customer, deal or ticket automatically.',
    capabilities: ['WhatsApp Business integration', 'Email sync and templates', 'Call logging', 'Shared team inbox'],
    connects: ['crm', 'automation'],
    example: 'Every WhatsApp reply lands on the deal timeline, visible to the whole team.',
  },
]

/** The seven modules orbiting the hero core. */
export const heroModules = [
  { label: 'CRM', note: 'Pipeline, contacts, follow-ups' },
  { label: 'ERP', note: 'Procurement, projects, operations' },
  { label: 'Automation', note: 'Triggers, approvals, messages' },
  { label: 'Analytics', note: 'Live dashboards and reports' },
  { label: 'HR', note: 'People, attendance, roles' },
  { label: 'Finance', note: 'Invoices, payments, GST' },
  { label: 'Inventory', note: 'Stock across locations' },
] as const
