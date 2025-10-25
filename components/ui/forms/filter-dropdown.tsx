'use client';

import { ChildrenProps } from '@/types';
import { ChevronDown } from 'lucide-react';
import { Button } from '../buttons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../dropdown-menu';

export const FilterDropdown = ({ children }: ChildrenProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-8.5 w-[8.31rem] rounded-[8px] bg-primary/14 text-primary  px-5 py-2 font-medium text-sm hover:bg-primary/14 hover:text-primary"
        >
          <span>More Filters</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
