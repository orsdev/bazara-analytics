'use client';

import {
  EmptyChartState,
  PinchSVGIcon,
  RangeDatePicker
} from '@/components/ui';
import { DefaultCard } from '@/components/ui/cards';
import { cn } from '@/lib';
import { format, formatISO } from 'date-fns';
import { CircleSlash } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useChangeRequests } from '../hooks/use-change-requests';
import { useChangeRequestsFilter } from '../hooks/use-change-requests-filter';

const colors = {
  emergency: '#E95D5D',
  normal: '#4ACF7B',
  standard: '#4077EB'
};

const CustomLegend = () => {
  const legendItems = [
    { name: 'Emergency', color: colors.emergency },
    { name: 'Normal', color: colors.normal },
    { name: 'Standard', color: colors.standard }
  ];

  return (
    <div className="flex items-center gap-4">
      {legendItems.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-600">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export const ChangeRequest = () => {
  const {
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
    hasDateFilter
  } = useChangeRequestsFilter();

  const { requestData, isLoading, hasData } = useChangeRequests({
    startDate: hasDateFilter ? formatISO(selectedStartDate!) : '',
    endDate: hasDateFilter ? formatISO(selectedEndDate!) : ''
  });

  return (
    <DefaultCard
      title="Change Request By Status"
      headerIcon={<PinchSVGIcon />}
      handleMoreOptions={() => {}}
    >
      <div className="flex items-center justify-between flex-col sm:flex-row gap-5 mb-6">
        <CustomLegend />
        <div
          className={cn('max-w-[8.38rem] w-full flex items-center gap-3', {
            'max-w-[14.68rem]': hasDateFilter
          })}
        >
          <RangeDatePicker
            name="date"
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            handleChange={({ from, to }) => {
              setSelectedStartDate(from);
              setSelectedEndDate(to);
            }}
          />
        </div>
      </div>

      {!hasData && !isLoading && (
        <EmptyChartState
          icon={<CircleSlash size={20} />}
          title="No data available"
          description="No change request by status"
        />
      )}

      <div className="h-80">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading chart data...</div>
          </div>
        )}
        {hasData && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={requestData}
              margin={{
                top: 40,
                left: -20,
                bottom: 0
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: 'var(--foreground)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => format(new Date(value), 'MMM')}
              />
              <YAxis
                tick={{ fontSize: 12, fill: 'var(--foreground)' }}
                axisLine={false}
                tickLine={false}
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
                labelFormatter={(value) =>
                  format(new Date(value as string), 'MMM dd, yyyy')
                }
              />
              <Line
                type="natural"
                dataKey="emergency"
                name="Emergency"
                stroke={colors.emergency}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: colors.emergency,
                  strokeWidth: 2,
                  fill: colors.emergency
                }}
              />
              <Line
                type="natural"
                dataKey="normal"
                name="Normal"
                stroke={colors.normal}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: colors.normal,
                  strokeWidth: 2,
                  fill: colors.normal
                }}
              />
              <Line
                type="natural"
                dataKey="standard"
                name="Standard"
                stroke={colors.standard}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: colors.standard,
                  strokeWidth: 2,
                  fill: colors.standard
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </DefaultCard>
  );
};
