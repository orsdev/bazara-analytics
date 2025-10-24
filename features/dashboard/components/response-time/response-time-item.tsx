'use client';

import { Card } from '@/components/ui';
import { cn } from '@/lib';
import { Maximize2Icon } from 'lucide-react';
import { Area, AreaChart, Line, ResponsiveContainer } from 'recharts';

interface ResponseTimeItemProps {
  title: string;
  value: string | number;
  unit: string;
  change?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  chartData: { value: number }[];
}

export const ResponseTimeItem = ({
  title,
  value,
  unit,
  change,
  chartData
}: ResponseTimeItemProps) => {
  return (
    <Card className="p-4 pb-5.5 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] gap-0">
      <div className="flex gap-6 items-center justify-between">
        <div className="flex gap-2 items-center justify-between w-full">
          <p className="text-sm font-bold">{title}</p>
          <button
            className="cursor-pointer flex items-center opacity-50"
            type="button"
            aria-label="Expand button"
          >
            <Maximize2Icon size={16} />
          </button>
        </div>
      </div>

      <hr className="w-full block my-3" />
      <div className="w-full">
        <div className="flex gap-2 items-center justify-between w-full">
          <div className="flex-1">
            <h2 className="text-[1.2rem] md:text-[1.75rem] font-bold text-black mb-3">
              {value} <span className="opacity-50">{unit}</span>
            </h2>
            {change && (
              <div className="flex md:items-center flex-col md:flex-row gap-1 mb-1">
                <span
                  className={cn(
                    'text-sm font-medium',
                    change.isPositive !== false
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {change.isPositive !== false ? '↑' : '↓'} {change.value}
                </span>
                <span className="text-xs text-gray-500">{change.label}</span>
              </div>
            )}
          </div>
          {chartData?.length > 0 && (
            <div className="w-[8.44rem] h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#2563eb"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Area
                    type="monotone"
                    dataKey="value"
                    fill="url(#colorValue)"
                    stroke="none"
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                    style={{ zIndex: 10 }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export const ResponseTimeCardSkeleton = () => (
  <div className="p-4 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] animate-pulse">
    <div className="h-8 bg-gray-100 rounded mb-4" />
    <div className="h-16 bg-gray-100 rounded" />
  </div>
);
