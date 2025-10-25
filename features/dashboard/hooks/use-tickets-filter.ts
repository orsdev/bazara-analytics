import { useTableSearch } from '@/hooks/table/use-table-search';
import { useState } from 'react';

export const useTicketsFilter = () => {
  const {
    searchTerm,
    handleSearchChange,
    handleClearSearch,
    debouncedSearchValue
  } = useTableSearch();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const hasStartDate = !!selectedStartDate;
  const hasEndDate = !!selectedEndDate;
  const hasDateFilter = hasStartDate && hasEndDate;

  return {
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
    hasStartDate,
    hasEndDate,
    hasDateFilter,
    searchTerm,
    handleSearchChange,
    handleClearSearch,
    debouncedSearchValue
  };
};
