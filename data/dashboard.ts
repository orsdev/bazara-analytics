import {
  DashboardMetric,
  ResolvedTicketAgent,
  PendingTicket,
  PendingApproval
} from '@/features/dashboard/types';

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
