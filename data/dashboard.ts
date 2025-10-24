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
    chartData: [72, 85, 80, 95, 90, 98, 88, 100, 97, 105, 102, 110, 108]
  },
  totalClosedTickets: {
    id: 'total-closed-tickets',
    currentValue: 109291,
    previousValue: 94832,
    comparisonRange: 'week',
    chartData: [65, 72, 68, 81, 75, 87, 79, 92, 85, 88, 82, 78]
  },
  totalDueTickets: {
    id: 'total-due-tickets',
    currentValue: 34,
    previousValue: 47,
    comparisonRange: 'week',
    chartData: [15, 22, 18, 31, 25, 37, 29, 42, 35, 38, 32, 28]
  }
};
