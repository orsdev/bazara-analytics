'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { ResolvedTicketAgent } from '../types';

export function useResolvedTickets() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: ResolvedTicketAgent[] }>({
    queryKey: dashboardService.keys.resolvedTickets,
    url: dashboardService.getResolvedTickets().url
  });

  const response = responseData?.data || [];
  const hasAgents = response.length > 0 && !isLoading;

  return {
    agents: response,
    hasAgents,
    isLoading,
    error
  };
}
