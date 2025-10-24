'use client';

import { DefaultCard } from '@/components/ui';
import { ReactNode } from 'react';

interface PendingItemCardProps {
  title: string;
  value: string | number;
  description: string;
  headerIcon: ReactNode;
  bodyIcon?: ReactNode;
  handleMoreOptions: () => void;
}

export const PendingItemCard = ({
  title,
  bodyIcon,
  description,
  headerIcon,
  value,
  handleMoreOptions
}: PendingItemCardProps) => {
  return (
    <DefaultCard
      title={title}
      headerIcon={headerIcon}
      handleMoreOptions={handleMoreOptions}
    >
      <div className="w-full flex gap-4">
        {bodyIcon}
        <div>
          <h2 className="text-[1.75rem] font-bold text-black">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h2>
          <span className="text-xs font-medium text-foreground opacity-60">
            {description}
          </span>
        </div>
      </div>
    </DefaultCard>
  );
};

export const PendingItemCardSkeleton = () => (
  <div className="p-4 rounded-[0.75rem] shadow-[0px_0px_4px_rgba(150,143,143,0.15)] animate-pulse">
    <div className="h-8 bg-gray-100 rounded mb-4" />
    <div className="h-16 bg-gray-100 rounded" />
  </div>
);
