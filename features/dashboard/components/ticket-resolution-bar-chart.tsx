'use client';

import { DefaultCard, PinchSVGIcon } from '@/components/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { format } from 'date-fns';
import { useTicketResolution } from '../hooks/use-ticket-resolution';
import { EmptyChartState } from '@/components/ui';
import { CircleSlash } from 'lucide-react';

export const TicketResolutionBarChart = () => {
  const { ticketResolution, hasData, isLoading } = useTicketResolution();

  if (isLoading) {
    return (
      <DefaultCard
        title="Ticket Resolution"
        headerIcon={<PinchSVGIcon />}
        handleMoreOptions={() => {}}
      >
        <div className="w-full h-[300px] mt-6 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DefaultCard>
    );
  }

  return (
    <DefaultCard
      title="Ticket Resolution"
      headerIcon={<PinchSVGIcon />}
      handleMoreOptions={() => {}}
    >
      <div className="w-full h-[300px] mt-6">
        {!hasData && !isLoading && (
          <EmptyChartState
            icon={<CircleSlash size={20} />}
            title="No data available"
            description="No ticket resolution"
          />
        )}

        {hasData && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ticketResolution}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              barGap={4}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                dy={10}
                tickFormatter={(value) => format(new Date(value), 'MMM')}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12, fontWeight: 'normal' }}
                tickFormatter={(value) =>
                  value == 0 ? value : `${value.toLocaleString()}.0`
                }
                domain={[0, 1200]}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <Legend
                verticalAlign="bottom"
                height={50}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => (
                  <span
                    style={{
                      color: '#666',
                      fontSize: '12px',
                      marginLeft: '4px',
                      marginRight: '26px'
                    }}
                  >
                    {value}
                  </span>
                )}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(156, 163, 175, 0.2)', strokeWidth: 2 }}
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
              />
              <Bar
                dataKey="closed"
                fill="#1659E6"
                radius={[0, 0, 0, 0]}
                name="Number of Closed Tickets"
                maxBarSize={40}
              />
              <Bar
                dataKey="open"
                fill="#30B7EE"
                radius={[0, 0, 0, 0]}
                name="Number of Open Tickets"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DefaultCard>
  );
};
