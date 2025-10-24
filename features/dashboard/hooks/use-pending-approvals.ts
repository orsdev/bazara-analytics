'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { PendingApproval } from '../types';

export function usePendingApprovals() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: PendingApproval }>({
    queryKey: dashboardService.keys.pendingApprovals,
    url: dashboardService.getPendingApprovals().url
  });

  const response = responseData?.data ?? {
    id: 'pending-approval-id',
    count: 0
  };

  return {
    pendingApprovals: response,
    isLoading,
    error
  };
}
