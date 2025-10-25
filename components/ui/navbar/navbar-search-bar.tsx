'use client';

import { SearchInput } from '@/components/ui/forms';
import { ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';
import { useState } from 'react';

interface SearchBarProps extends ClassNameProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const NavbarSearchBar = ({
  className,
  placeholder = 'Search for anything',
  onSearch
}: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <div className={cn('flex-1 hidden sm:flex', className)}>
      <SearchInput
        placeholder={placeholder}
        value={search}
        handleSearchChange={handleSearch}
      />
    </div>
  );
};
