'use client';

import { Card } from '@/components/ui';
import { EllipsisVerticalIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface DefaultCardProps {
  title: string;
  headerIcon: ReactNode;
  children: ReactNode;
  handleMoreOptions: () => void;
}

export const DefaultCard = ({
  title,
  headerIcon,
  children,
  handleMoreOptions
}: DefaultCardProps) => {
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
              {headerIcon}
            </button>
            <p className="text-sm font-bold">{title}</p>
          </div>
          <button
            className="cursor-pointer flex items-center border w-5 h-5 rounded-[5px]"
            type="button"
            aria-label="More options"
            onClick={handleMoreOptions}
          >
            <EllipsisVerticalIcon size={20} />
          </button>
        </div>
      </div>
      <hr className="w-full block my-3" />
      {children}
    </Card>
  );
};
