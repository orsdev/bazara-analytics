'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { Request } from '../types';
import { EMPTY_ARRAY } from '@/constants';

export function useRequests(filter: Record<string, string>) {
  const {
    data: responseData,
    isLoading,
    isRefetching,
    error
  } = useCustomQuery<Request[]>({
    queryKey: dashboardService.keys.requests(filter),
    url: dashboardService.getRequests(filter).url
  });

  const requests = responseData || EMPTY_ARRAY;
  const hasData = requests.length > 0;

  return {
    requests,
    hasData,
    isLoading: isLoading,
    isRefetching,
    error
  };
}
