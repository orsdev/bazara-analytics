'use client';

import { ResponseTimeItem } from './response-time-item';
import { useResponseTime } from '../../hooks/use-response-time';

export const ResponseTime = () => {
  const { responseTime, isLoading } = useResponseTime();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] animate-pulse">
          <div className="h-8 bg-gray-100 rounded mb-4" />
          <div className="h-16 bg-gray-100 rounded" />
        </div>
        <div className="p-4 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] animate-pulse">
          <div className="h-8 bg-gray-100 rounded mb-4" />
          <div className="h-16 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {responseTime.map((item) => (
        <ResponseTimeItem
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
