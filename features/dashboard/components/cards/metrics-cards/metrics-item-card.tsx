'use client';

import { Card } from '@/components/ui';
import { cn } from '@/lib';
import { Area, AreaChart, Line, ResponsiveContainer } from 'recharts';

interface MetricsItemCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  chartData?: number[];
  className?: string;
}

export const MetricsItemCard = ({
  title,
  value,
  change,
  chartData = [],
  className
}: MetricsItemCardProps) => {
  // Convert data and create forecast line (offset)
  const chartDataFormatted = chartData.map((value, index) => ({
    index,
    value,
    forecast: chartData[index + 1] ?? chartData[index]
  }));

  return (
    <Card
      className={cn(
        'p-5 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)]',
        className
      )}
    >
      <div>
        <p className="text-sm font-normal mb-4">{title}</p>
        <div className="w-full">
          <div className="flex gap-2 items-center justify-between w-full">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </h3>
              {change && (
                <div className="flex items-center gap-1 mb-1">
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

            {chartData.length > 0 && (
              <div className="w-[8.44rem] h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartDataFormatted}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563eb"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563eb"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="value"
                      fill="url(#colorValue)"
                      stroke="none"
                    />

                    {/*  Main line */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={false}
                      style={{ zIndex: 10 }}
                      isAnimationActive={false}
                    />

                    {/*  Dashed forecast*/}
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="var(--primary)"
                      strokeDasharray="3 3"
                      dot={false}
                      style={{ zIndex: 11 }}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
