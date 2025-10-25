'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { ChangeRequestStatusData } from '../types';

export function useChangeRequestStatus() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: ChangeRequestStatusData }>({
    queryKey: dashboardService.keys.changeRequestStatus,
    url: dashboardService.getChangeRequestStatus().url
  });

  const changeRequestStatus = responseData?.data || [];
  const hasData = changeRequestStatus.length > 0;

  return {
    changeRequestStatus,
    isLoading,
    error,
    hasData
  };
}
