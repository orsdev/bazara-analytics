'use client';

import { Card, DefaultCard, PinchSVGIcon } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib';
import { CategoryResults } from '../../types';
import { useCategoryResults } from '../../hooks';

const colors = [
  'var(--chart-9)',
  'var(--chart-7)',
  'var(--chart-5)',
  'var(--chart-12)'
];

interface CategoryLegendProps {
  categories: CategoryResults['categories'];
}

const CustomLegend = ({ categories }: CategoryLegendProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 gap-x-10 mt-4">
      {categories.map((entry, index) => (
        <div key={entry.id} className="flex items-center gap-2">
          <div
            className={cn('w-3 h-3 rounded-full')}
            style={{ backgroundColor: colors[index % colors.length] }}
          />
          <span className="text-sm text-foreground opacity-80">
            {entry.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export const CategoryPieChart = () => {
  const { currency, categories, isLoading } = useCategoryResults();
  const totalValue = categories.reduce((sum, item) => sum + item.value, 0);

  if (isLoading) {
    return (
      <Card className="p-4 pb-5.5 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] gap-0">
        <div className="h-8 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="border w-full h-px my-4" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <DefaultCard
      title="Change Result By Category"
      headerIcon={<PinchSVGIcon />}
      handleMoreOptions={() => {}}
    >
      <div className="w-full">
        <div className="relative h-[12.06rem] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                paddingAngle={-12}
                cornerRadius={8}
                dataKey="value"
              >
                {categories.map((entry, index) => (
                  <Cell key={entry.id} fill={colors[index]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-bold">
                {formatCurrency({ amount: totalValue, currency })}
              </p>
              <p className="text-sm font-medium opacity-60">Total Spent</p>
            </div>
          </div>
        </div>
        <CustomLegend categories={categories} />
      </div>
    </DefaultCard>
  );
};
