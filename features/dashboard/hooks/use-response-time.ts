'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { ResponseTimeData, TransformedResponseTime } from '../types';

const RESPONSE_TIME_TITLES: Record<string, string> = {
  incidentResponseTime: 'Average Incident Response Time - Me',
  changeResponseTime: 'Average Change Response Time - Me'
};

export function useResponseTime() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: ResponseTimeData }>({
    queryKey: dashboardService.keys.responseTime,
    url: dashboardService.getResponseTime().url
  });

  const formatTimeForDisplay = (
    timeString: string
  ): { value: string; unit: string } => {
    const [hours, minutes] = timeString.split(':').map(Number);

    if (hours > 0) {
      return { value: timeString, unit: 'Hours' };
    } else if (minutes > 0) {
      return { value: timeString, unit: 'Minutes' };
    } else {
      return { value: timeString, unit: 'Seconds' };
    }
  };

  const convertTimeToMinutes = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  };

  const transformResponseTime = (
    rawData: ResponseTimeData | undefined
  ): TransformedResponseTime[] => {
    if (!rawData || error) {
      return [
        {
          id: 'incident-response-time',
          title: 'Average Incident Response Time - Me',
          value: '0',
          unit: 'Hours',
          change: {
            value: '0',
            label: 'response time this week',
            isPositive: true
          },
          chartData: []
        },
        {
          id: 'change-response-time',
          title: 'Average Change Response Time - Me',
          value: '0',
          unit: 'Hours',
          change: {
            value: '0',
            label: 'response time this week',
            isPositive: true
          },
          chartData: []
        }
      ];
    }

    return Object.entries(rawData).map(([key, metric]) => {
      const currentMinutes = convertTimeToMinutes(metric.currentValue);
      const previousMinutes = convertTimeToMinutes(metric.previousValue);

      const percentageChange =
        previousMinutes !== 0
          ? ((currentMinutes - previousMinutes) / previousMinutes) * 100
          : 0;

      const currentTime = formatTimeForDisplay(metric.currentValue);
      const title = RESPONSE_TIME_TITLES[key] || key;

      const formatPercentage = (value: number): string => {
        const rounded = Math.abs(value);
        return rounded % 1 === 0
          ? `${rounded.toFixed(0)}%`
          : `${rounded.toFixed(1)}%`;
      };

      return {
        id: metric.id || key,
        title,
        value: currentTime.value,
        unit: currentTime.unit,
        change: {
          value: formatPercentage(percentageChange),
          label: `response time this ${metric.comparisonRange || 'period'}`,
          isPositive: percentageChange < 0
        },
        chartData: metric.chartData || []
      };
    });
  };

  const responseTimeData = transformResponseTime(responseData?.data);

  return {
    responseTime: responseTimeData,
    isLoading,
    error
  };
}
