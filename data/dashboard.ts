import {
  DashboardMetric,
  ResolvedTicketAgent,
  PendingTicket,
  PendingApproval,
  TicketResolutionData,
  ChangeRequestStatusData
} from '@/features/dashboard/types';
import { Teams } from '@/types';

export const resolvedTicketsData: ResolvedTicketAgent[] = [
  {
    id: 'agent-1',
    name: 'Agent 1',
    ticketsResolved: 850
  },
  {
    id: 'agent-2',
    name: 'Agent 2',
    ticketsResolved: 520
  },
  {
    id: 'agent-3',
    name: 'Agent 3',
    ticketsResolved: 280
  },
  {
    id: 'agent-4',
    name: 'Agent 4',
    ticketsResolved: 620
  },
  {
    id: 'agent-5',
    name: 'Agent 5',
    ticketsResolved: 750
  },
  {
    id: 'agent-6',
    name: 'Agent 6',
    ticketsResolved: 580
  },
  {
    id: 'agent-7',
    name: 'Agent 7',
    ticketsResolved: 820
  },
  {
    id: 'agent-8',
    name: 'Agent 8',
    ticketsResolved: 820
  }
];

export const dashboardMetrics: DashboardMetric = {
  totalUserTickets: {
    id: 'total-user-tickets',
    currentValue: 109826,
    previousValue: 98765,
    comparisonRange: 'week',
    chartData: [97, 167, 100, 373, 301, 245, 309]
  },
  totalOpenTickets: {
    id: 'total-open-tickets',
    currentValue: 2910,
    previousValue: 2680,
    comparisonRange: 'week',
    chartData: [97, 167, 100, 373, 301, 245, 309]
  },
  totalClosedTickets: {
    id: 'total-closed-tickets',
    currentValue: 109291,
    previousValue: 123105,
    comparisonRange: 'week',
    chartData: [97, 167, 100, 373, 301, 245, 309]
  },
  totalDueTickets: {
    id: 'total-due-tickets',
    currentValue: 34,
    previousValue: 38,
    comparisonRange: 'week',
    chartData: [97, 167, 100, 373, 301, 245, 309]
  }
};

export const pendingTicketsData: PendingTicket = {
  id: 'pending-tickets',
  count: 13
};

export const pendingApprovalsData: PendingApproval = {
  id: 'pending-approvals',
  count: 2
};

export const categoryResults = {
  currency: 'USD',
  categories: [
    { id: 'category-1', name: 'Marketing', value: 45000 },
    { id: 'category-2', name: 'HR', value: 65000 },
    { id: 'category-3', name: 'Sales', value: 89991 },
    { id: 'category-4', name: 'Support', value: 40000 }
  ]
};

export const responseTimeData = {
  incidentResponseTime: {
    id: 'incident-response-time',
    currentValue: '4:00:01',
    previousValue: '4:30:00',
    comparisonRange: 'week',
    chartData: [
      { value: 15 },
      { value: 18 },
      { value: 14 },
      { value: 12 },
      { value: 16 },
      { value: 11 },
      { value: 12 }
    ]
  },
  changeResponseTime: {
    id: 'change-response-time',
    currentValue: '0:04:01',
    previousValue: '0:03:30',
    comparisonRange: 'week',
    chartData: [
      { value: 10 },
      { value: 12 },
      { value: 9 },
      { value: 8 },
      { value: 11 },
      { value: 7 },
      { value: 8 }
    ]
  }
};

export const changeRequestData = [
  {
    date: '2024-01-01T09:00:00+01:00',
    emergency: 30,
    normal: 50,
    standard: 0
  },
  {
    date: '2024-02-01T09:00:00+01:00',
    emergency: 50,
    normal: 70,
    standard: 30
  },
  {
    date: '2024-03-01T09:00:00+01:00',
    emergency: 140,
    normal: 100,
    standard: 110
  },
  {
    date: '2024-05-01T09:00:00+01:00',
    emergency: 110,
    normal: 70,
    standard: 130
  },
  {
    date: '2024-08-01T09:00:00+01:00',
    emergency: 80,
    normal: 90,
    standard: 100
  },
  {
    date: '2024-10-01T09:00:00+01:00',
    emergency: 100,
    normal: 120,
    standard: 70
  },
  {
    date: '2024-12-01T09:00:00+01:00',
    emergency: 130,
    normal: 130,
    standard: 90
  },
  {
    date: '2025-01-01T09:00:00+00:00',
    emergency: 100,
    normal: 110,
    standard: 120
  },
  {
    date: '2025-04-01T09:00:00+00:00',
    emergency: 70,
    normal: 80,
    standard: 90
  },
  {
    date: '2025-07-01T09:00:00+00:00',
    emergency: 90,
    normal: 100,
    standard: 60
  },
  {
    date: '2025-08-01T09:00:00+00:00',
    emergency: 120,
    normal: 130,
    standard: 80
  },
  {
    date: '2025-10-01T09:00:00+00:00',
    emergency: 90,
    normal: 100,
    standard: 110
  }
];

export const requestsData = [
  {
    title: 'Request for Application Upgrade to Change Management',
    module: 'Change Management',
    id: 'CHG-76251',
    category: 'IT Support',
    priority: 'Severity 1',
    createdBy: 'Cynthia Njoku',
    createdAt: '2025-10-24T21:41:00+01:00',
    dueDate: '2025-10-24T21:41:00+01:00',
    status: 'Pending',
    assignedTo: 'Chike Adebayo',
    team: Teams.AGILE_ACHIEVERS
  },
  {
    title: 'Two-Factor Authentication Setup Re: Service Request',
    module: 'Service Request',
    id: 'SRT-56719',
    category: 'Security',
    priority: 'Severity 2',
    createdBy: 'Bayo Adebayo',
    createdAt: '2025-11-24T21:41:00+01:00',
    dueDate: '2025-11-24T21:41:00+01:00',
    status: 'Approved',
    assignedTo: 'Ngozi Eze',
    team: Teams.INNOVATION_PIONEERS
  },
  {
    title: 'Login Failure - Credentials Not Work',
    module: 'Incident Management',
    id: 'INC-28238',
    category: 'IT Support',
    priority: 'Severity 1',
    createdBy: 'Chioma Nwosu',
    createdAt: '2025-12-24T21:41:00+01:00',
    dueDate: '2025-12-24T21:41:00+01:00',
    status: 'Declined',
    assignedTo: 'Emeka Nnamdi',
    team: Teams.CREATIVE_CATALYSTS
  },
  {
    title: 'Locked Out of System - Need Passw',
    module: 'Incident Management',
    id: 'INC-28239',
    category: 'Security',
    priority: 'Low',
    createdBy: 'Chukwuemeka Eze',
    createdAt: '2026-01-24T21:41:00+01:00',
    dueDate: '2026-01-24T21:41:00+01:00',
    status: 'Pending',
    assignedTo: 'Adaeze Chukwu',
    team: Teams.PRECISION_TASKFORCE
  },
  {
    title: 'System Upgrade Request',
    module: 'Change Management',
    id: 'CHG-76252',
    category: 'IT Infrastructure',
    priority: 'Medium',
    createdBy: 'Folake Adeyemi',
    createdAt: '2026-02-24T21:41:00+01:00',
    dueDate: '2026-02-24T21:41:00+01:00',
    status: 'Approved',
    assignedTo: 'Lanre Olayinka',
    team: Teams.UNITY_ENGINEERS
  },
  {
    title: 'Password Reset Request',
    module: 'Service Request',
    id: 'SRT-56720',
    category: 'Security',
    priority: 'Severity 2',
    createdBy: 'Gbenga Ogunleye',
    createdAt: '2026-03-24T21:41:00+01:00',
    dueDate: '2026-03-24T21:41:00+01:00',
    status: 'Declined',
    assignedTo: 'Halima Ibrahim',
    team: Teams.TECH_TRAILBLAZERS
  },
  {
    title: 'Network Issue Report',
    module: 'Incident Management',
    id: 'INC-28240',
    category: 'IT Support',
    priority: 'Severity 1',
    createdBy: 'Halima Ibrahim',
    createdAt: '2026-04-24T21:41:00+01:00',
    dueDate: '2026-04-24T21:41:00+01:00',
    status: 'Pending',
    assignedTo: 'Ibrahim Musa',
    team: Teams.TECH_TRAILBLAZERS
  },
  {
    title: 'Security Audit Request',
    module: 'Change Management',
    id: 'CHG-76253',
    category: 'Security',
    priority: 'Severity 2',
    createdBy: 'Ibrahim Musa',
    createdAt: '2026-05-24T21:41:00+01:00',
    dueDate: '2026-05-24T21:41:00+01:00',
    status: 'Approved',
    assignedTo: 'Kemi Adebayo',
    team: Teams.PRECISION_TASKFORCE
  },
  {
    title: 'Access Request',
    module: 'Service Request',
    id: 'SRT-56721',
    category: 'HR',
    priority: 'Severity 2',
    createdBy: 'Kemi Adebayo',
    createdAt: '2026-06-24T21:41:00+01:00',
    dueDate: '2026-06-24T21:41:00+01:00',
    status: 'Declined',
    assignedTo: 'Funmi Adeolu',
    team: Teams.UNITY_ENGINEERS
  },
  {
    title: 'Server Downtime Report',
    module: 'Incident Management',
    id: 'INC-28241',
    category: 'IT Infrastructure',
    priority: 'Severity 1',
    createdBy: 'Lanre Olayinka',
    createdAt: '2026-07-24T21:41:00+01:00',
    dueDate: '2026-07-24T21:41:00+01:00',
    status: 'Pending',
    assignedTo: 'Gbadebo Okafor',
    team: Teams.DYNAMIC_DEVELOPERS
  },
  {
    title: 'Software Patch Request',
    module: 'Change Management',
    id: 'CHG-76254',
    category: 'IT Support',
    priority: 'Severity 2',
    createdBy: 'Ngozi Eze',
    createdAt: '2026-08-24T21:41:00+01:00',
    dueDate: '2026-08-24T21:41:00+01:00',
    status: 'Approved',
    assignedTo: 'Hauwa Suleiman',
    team: Teams.PRECISION_TASKFORCE
  },
  {
    title: 'Database Maintenance Request',
    module: 'Change Management',
    id: 'CHG-76255',
    category: 'IT Infrastructure',
    priority: 'Severity 2',
    createdBy: 'Adaeze Chukwu',
    createdAt: '2026-10-24T21:41:00+01:00',
    dueDate: '2026-10-24T21:41:00+01:00',
    status: 'Pending',
    assignedTo: 'Babafemi Ojo',
    team: Teams.CREATIVE_CATALYSTS
  },
  {
    title: 'Firewall Configuration Update',
    module: 'Incident Management',
    id: 'INC-28243',
    category: 'Security',
    priority: 'Severity 2',
    createdBy: 'Emeka Nnamdi',
    createdAt: '2026-11-24T21:41:00+01:00',
    dueDate: '2026-11-24T21:41:00+01:00',
    status: 'Approved',
    assignedTo: 'Rhodha Samson',
    team: Teams.SYNERGY_SQUAD
  },
  {
    title: 'Email Server Outage',
    module: 'Incident Management',
    id: 'INC-28244',
    category: 'IT Support',
    priority: 'Severity 2',
    createdBy: 'Funmi Adeolu',
    createdAt: '2026-12-24T21:41:00+01:00',
    dueDate: '2026-12-24T21:41:00+01:00',
    status: 'Declined',
    assignedTo: 'Odion James',
    team: Teams.UNITY_ENGINEERS
  },
  {
    title: 'VPN Access Request',
    module: 'Service Request',
    id: 'SRT-56722',
    category: 'Security',
    priority: 'Severity 2',
    createdBy: 'Gbadebo Okafor',
    createdAt: '2027-01-24T21:41:00+01:00',
    dueDate: '2027-01-24T21:41:00+01:00',
    status: 'Pending',
    assignedTo: 'Olaoluwa Olaoluwa',
    team: Teams.VISIONARY_VANGUARD
  },
  {
    title: 'Backup System Failure',
    module: 'Incident Management',
    id: 'INC-28245',
    category: 'IT Infrastructure',
    priority: 'Severity 2',
    createdBy: 'Hauwa Suleiman',
    createdAt: '2027-02-24T21:41:00+01:00',
    dueDate: '2027-02-24T21:41:00+01:00',
    status: 'Approved',
    assignedTo: 'James Olaoluwa',
    team: Teams.PRECISION_TASKFORCE
  },
  {
    title: 'System Crash – Unable to Access',
    module: 'Incident Management',
    id: 'INC-79724',
    category: 'System and Application',
    priority: 'Severity 1',
    createdBy: 'Cynthia Njoku',
    createdAt: '2025-10-25T00:13:00+01:00',
    dueDate: '2025-10-25T00:13:00+01:00',
    status: 'Pending',
    assignedTo: 'Odion James',
    team: Teams.STRATEGIC_SPARKS
  },
  {
    title: 'Onboarding process taking more time',
    module: 'Incident Management',
    id: 'INC-84625',
    category: 'Onboarding',
    priority: 'Severity 1',
    createdBy: 'Cynthia Njoku',
    createdAt: '2025-11-25T00:13:00+01:00',
    dueDate: '2025-11-25T00:13:00+01:00',
    status: 'Pending',
    assignedTo: 'Babafemi Ojo',
    team: Teams.STRATEGIC_SPARKS
  },
  {
    title: 'Login Failure – Credentials Not Work',
    module: 'Incident Management',
    id: 'INC-65142',
    category: 'System and Application',
    priority: 'Severity 1',
    createdBy: 'Cynthia Njoku',
    createdAt: '2025-12-25T00:13:00+01:00',
    dueDate: '2025-12-25T00:13:00+01:00',
    status: 'Pending',
    assignedTo: 'Rhodha Samson',
    team: Teams.STRATEGIC_SPARKS
  },
  {
    title: 'Locked Out of System – Need Passw',
    module: 'Incident Management',
    id: 'INC-65142',
    category: 'Security & Access Issues',
    priority: 'Severity 1',
    createdBy: 'Cynthia Njoku',
    createdAt: '2026-01-25T00:13:00+01:00',
    dueDate: '2026-01-25T00:13:00+01:00',
    status: 'Pending',
    assignedTo: 'Rhodha Samson',
    team: Teams.STRATEGIC_SPARKS
  }
];

export const ticketResolutionData: TicketResolutionData = [
  { month: '2024-01-01', closed: 650, open: 850 },
  { month: '2024-02-01', closed: 520, open: 1050 },
  { month: '2024-03-01', closed: 480, open: 400 },
  { month: '2024-04-01', closed: 530, open: 750 },
  { month: '2024-05-01', closed: 280, open: 600 },
  { month: '2024-06-01', closed: 650, open: 550 },
  { month: '2024-07-01', closed: 650, open: 800 },
  { month: '2024-08-01', closed: 550, open: 950 },
  { month: '2024-09-01', closed: 570, open: 850 },
  { month: '2024-10-01', closed: 650, open: 500 },
  { month: '2024-11-01', closed: 450, open: 720 },
  { month: '2024-12-01', closed: 450, open: 750 }
];

export const changeRequestStatusData: ChangeRequestStatusData = [
  { name: 'Open', value: 280 },
  { name: 'Work in Progress', value: 380 },
  { name: 'Closed', value: 240 }
];
