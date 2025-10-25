'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { TicketResolutionData } from '../types';

export function useTicketResolution() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: TicketResolutionData }>({
    queryKey: dashboardService.keys.ticketResolution,
    url: dashboardService.getTicketResolution().url
  });

  const ticketResolution = responseData?.data || [];
  const hasData = ticketResolution.length > 0;

  return {
    ticketResolution,
    isLoading,
    error,
    hasData
  };
}
