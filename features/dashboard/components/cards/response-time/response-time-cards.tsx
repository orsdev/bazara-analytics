'use client';

import { useResponseTime } from '@/features/dashboard/hooks';
import {
  ResponseTimeItemCard,
  ResponseTimeItemCardSkeleton
} from './response-time-item-card';

export const ResponseTimeCards = () => {
  const { responseTime, isLoading } = useResponseTime();

  if (isLoading) {
    return <ResponseTimeItemCardSkeleton />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {responseTime.map((item) => (
        <ResponseTimeItemCard
          key={item.id}
          title={item.title}
          value={item.value}
          unit={item.unit}
          change={item.change}
          chartData={item.chartData}
        />
      ))}
    </div>
  );
};
