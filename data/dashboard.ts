import {
  DashboardMetric,
  ResolvedTicketAgent
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
