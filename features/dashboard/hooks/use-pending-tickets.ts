'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { PendingTicket } from '../types';

export function usePendingTickets() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: PendingTicket }>({
    queryKey: dashboardService.keys.pendingTickets,
    url: dashboardService.getPendingTickets().url
  });

  const response = responseData?.data ?? {
    id: 'pending-ticket-id',
    count: 0
  };

  return {
    pendingTickets: response,
    isLoading,
    error
  };
}
