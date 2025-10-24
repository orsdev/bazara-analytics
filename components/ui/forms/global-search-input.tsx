'use client';

import { Search } from 'lucide-react';
import { Input, InputProps } from './input';
import { useState } from 'react';

export const GlobalSearchInput = ({
  placeholder = 'Search...',
  ...props
}: InputProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative w-full flex items-center h-[2.19rem]">
      <Search size={16} className="absolute left-2 opacity-50" />
      <Input
        placeholder={placeholder}
        {...props}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="pl-7.5 h-9.5 text-sm! font-normal! placeholder:opacity-80"
      />
    </div>
  );
};
