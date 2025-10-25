'use client';

import { Card, EmptyChartState } from '@/components/ui';
import { generateColors } from '@/utils';
import { CircleSlash, EllipsisVerticalIcon, ExpandIcon } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useTeamTicketsMetrics } from '../../hooks/use-team-tickets-metrics';

export const TeamTicketsBarChart = () => {
  const { agents, hasAgents, isLoading } = useTeamTicketsMetrics();

  if (isLoading) {
    return (
      <Card className="p-4 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)]">
        <div className="h-8 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="border w-full h-px my-4" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="p-4 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] gap-0">
      <div className="flex gap-6 items-center justify-between">
        <div className="flex gap-2 items-center justify-between w-full">
          <div className="flex gap-2.5 items-center">
            <button
              className="cursor-pointer flex items-center text-primary"
              type="button"
              aria-label="Expand"
            >
              <ExpandIcon size={16} />
            </button>
            <p className="text-sm font-bold">
              Tickets Resolved by Agent - Team
            </p>
          </div>
          <button
            className="cursor-pointer flex items-center border w-5 h-5 rounded-[5px]"
            type="button"
            aria-label="More options"
          >
            <EllipsisVerticalIcon size={20} />
          </button>
        </div>
      </div>

      <hr className="block w-full my-4" />

      {!hasAgents && (
        <EmptyChartState
          icon={<CircleSlash size={20} />}
          title="No data available"
          description="No tickets resolved by agent"
        />
      )}

      {hasAgents && (
        <div className="h-97.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={agents}>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={false}
                domain={[0, 'dataMax']}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--foreground)', opacity: 0.8 }}
                width={70}
              />
              <Tooltip
                formatter={(value) => [`${value}`, 'Tickets Resolved']}
                cursor={{
                  fill: 'transparent'
                }}
              />
              <ReferenceLine
                x={0}
                stroke="var(--foreground)"
                strokeDasharray="3 3"
                strokeWidth={0.2}
              />
              <Bar dataKey="ticketsResolved" radius={[0, 5, 5, 0]} barSize={12}>
                {agents.map((agent, index) => (
                  <Cell key={`cell-${index}`} fill={generateColors(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};
