'use client';

import { Search } from 'lucide-react';
import { Input, InputProps } from './input';
import { useState } from 'react';
import { cn } from '@/lib';

interface SearchInputProps extends InputProps {
  showKeyboardShortcut?: boolean;
  className?: string;
}

export const SearchInput = ({
  placeholder = 'Search...',
  showKeyboardShortcut = false,
  className,
  ...props
}: SearchInputProps) => {
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
        className={cn(
          'pl-7.5 h-9.5 text-sm! font-normal! placeholder:opacity-80 bg-gray-100',
          className
        )}
      />
      {showKeyboardShortcut && (
        <div className="absolute right-2">
          <button
            type="button"
            className="flex items-center gap-2 justify-center text-xs"
          >
            <span className="flex items-center justify-center rounded-[2.67px] bg-background  w-4 h-4 opacity-50">
              ⌘
            </span>
            <span className="flex items-center justify-center rounded-[2.67px] bg-background  w-4 h-4 opacity-50">
              K
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
