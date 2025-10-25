'use client';

import { useDashboardMetrics } from '@/features/dashboard/hooks';
import { MetricsItemCard } from './metrics-item-card';

export const MetricsCards = () => {
  const { metrics, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 bg-gray-100 rounded-[0.75rem] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => (
        <MetricsItemCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          chartData={metric.chartData}
        />
      ))}
    </div>
  );
};
