'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { ChangeRequestData } from '../types';

export function useChangeRequests(filter: Record<string, string>) {
  const {
    data: responseData,
    isLoading,
    isRefetching,
    error
  } = useCustomQuery<{ data: ChangeRequestData }>({
    queryKey: dashboardService.keys.changeRequests(filter),
    url: dashboardService.getChangeRequests(filter).url
  });

  const changeRequests = responseData?.data || [];
  const hasData = changeRequests.length > 0;

  return {
    requestData: changeRequests,
    hasData,
    isLoading: isLoading || isRefetching,
    error
  };
}
