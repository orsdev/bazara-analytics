'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { DashboardMetric, TransformedMetric } from '../types';

const METRIC_TITLES: Record<string, string> = {
  totalUserTickets: 'Total Number of Users Tickets',
  totalOpenTickets: 'Total Open Tickets',
  totalClosedTickets: 'Total Closed Tickets',
  totalDueTickets: 'Total Due Tickets'
};

export function useDashboardMetrics() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: DashboardMetric }>({
    queryKey: dashboardService.keys.metrics,
    url: dashboardService.getMetrics().url
  });

  const transformMetrics = (
    rawMetrics: DashboardMetric | undefined
  ): TransformedMetric[] => {
    if (!rawMetrics || error) {
      return [
        {
          id: 'total-user-tickets',
          title: 'Total Number of Users Tickets',
          value: 0,
          change: { value: '0%', label: 'this week', isPositive: true },
          chartData: []
        },
        {
          id: 'total-open-tickets',
          title: 'Total Open Tickets',
          value: 0,
          change: { value: '0%', label: 'this week', isPositive: true },
          chartData: []
        },
        {
          id: 'total-closed-tickets',
          title: 'Total Closed Tickets',
          value: 0,
          change: { value: '0%', label: 'this week', isPositive: true },
          chartData: []
        },
        {
          id: 'total-due-tickets',
          title: 'Total Due Tickets',
          value: 0,
          change: { value: '0%', label: 'this week', isPositive: true },
          chartData: []
        }
      ];
    }
    return Object.entries(rawMetrics).map(([key, metric]) => {
      const diff = metric.currentValue - metric.previousValue;
      const changePercent =
        metric.previousValue !== 0
          ? ((Math.abs(diff) / metric.previousValue) * 100).toFixed(1)
          : '0';

      return {
        id: metric.id || key,
        title: METRIC_TITLES[key] || key,
        value: metric.currentValue || 0,
        change: {
          value: `${changePercent}%`,
          label: `this ${metric.comparisonRange || 'period'}`,
          isPositive: diff >= 0
        },
        chartData: metric.chartData || []
      };
    });
  };

  const metricData = transformMetrics(responseData?.data);

  return {
    metrics: metricData,
    isLoading,
    error
  };
}
