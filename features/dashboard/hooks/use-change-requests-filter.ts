import { useState } from 'react';

const defaultStartDate = new Date('2024-01-01T09:00:00+01:00');
const defaultEndDate = new Date('2025-11-01T09:00:00+00:00');

export const useChangeRequestsFilter = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    defaultStartDate
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    defaultEndDate
  );

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
    hasDateFilter
  };
};
