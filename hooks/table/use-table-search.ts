import { useState } from 'react';
import { useDebounce } from '../use-debounce';

export const useTableSearch = (initialValue = '', debounceTime = 500) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchValue = useDebounce(searchTerm, debounceTime);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    debouncedSearchValue,
    handleSearchChange,
    handleClearSearch
  };
};
