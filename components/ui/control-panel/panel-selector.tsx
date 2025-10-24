'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../forms';

export const PanelSelector = () => {
  return (
    <Select defaultValue="all">
      <SelectTrigger
        className="border-0 h-7! opacity-80 font-medium text-xs"
        aria-label="Panel Selector"
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="panel2">Panel 2</SelectItem>
        <SelectItem value="panel3">Panel 3</SelectItem>
      </SelectContent>
    </Select>
  );
};
