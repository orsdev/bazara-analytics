import { DashboardMetric } from '@/features/dashboard/types';

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
