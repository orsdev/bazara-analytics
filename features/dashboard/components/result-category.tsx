'use client';

import { Card, PinchSVGIcon } from '@/components/ui';
import { EllipsisVerticalIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CategoryResults } from '../types';
import { formatCurrency } from '@/utils';
import { useCategoryResults } from '../hooks/use-category-results';

const colors = ['#FFC300', '#00C033', '#9A00C0', '#C0006A'];

const CustomLegend = ({
  categories
}: {
  categories: CategoryResults['categories'];
}) => (
  <div className="flex flex-wrap justify-center gap-3 gap-x-10 mt-4">
    {categories.map((entry, index) => (
      <div key={entry.id} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colors[index] }}
        />
        <span className="text-sm text-foreground opacity-80">{entry.name}</span>
      </div>
    ))}
  </div>
);

export const ResultCategory = () => {
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
    <Card className="p-4 pb-5.5 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] gap-0">
      <div className="flex gap-6 items-center justify-between">
        <div className="flex gap-2 items-center justify-between w-full">
          <div className="flex gap-2.5 items-center">
            <button
              className="cursor-pointer flex items-center text-primary"
              type="button"
              aria-label="Expand"
            >
              <PinchSVGIcon />
            </button>
            <p className="text-sm font-bold">Change Result By Category</p>
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

      <hr className="w-full block my-3" />
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
    </Card>
  );
};
