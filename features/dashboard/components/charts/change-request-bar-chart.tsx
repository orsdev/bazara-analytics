'use client';

import { Card, EmptyChartState } from '@/components/ui';
import { Maximize2Icon, CircleSlash } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  Tooltip
} from 'recharts';
import { useChangeRequestStatus } from '../../hooks';

const STATUS_COLORS: Record<string, string> = {
  Open: '#4077EB',
  'Work in Progress': '#FFD95D',
  Closed: '#4ACF7B'
};

export const ChangeRequestBarChart = () => {
  const { changeRequestStatus, isLoading, hasData } = useChangeRequestStatus();
  return (
    <Card className="p-4 pb-5.5 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] gap-0">
      <div className="flex gap-6 items-center justify-between">
        <div className="flex gap-2 items-center justify-between w-full">
          <div className="flex gap-2.5 items-center">
            <p className="text-sm font-bold">Change Request By Status</p>
          </div>
          <button
            className="cursor-pointer flex items-center opacity-50"
            type="button"
            aria-label="Expand button"
          >
            <Maximize2Icon size={16} />
          </button>
        </div>
      </div>
      <div className="mt-4 h-[300px]">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {!hasData && !isLoading && (
          <EmptyChartState
            icon={<CircleSlash size={20} />}
            title="No data available"
            description="No change request status data"
          />
        )}

        {hasData && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={changeRequestStatus}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 14, fontWeight: 500 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
                labelStyle={{
                  color: 'var(--foreground)',
                  fontSize: 12
                }}
                itemStyle={{
                  fontSize: 12,
                  fontWeight: 500
                }}
                labelFormatter={(value) => value.toLocaleString()}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={280}>
                {changeRequestStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] || '#ccc'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
