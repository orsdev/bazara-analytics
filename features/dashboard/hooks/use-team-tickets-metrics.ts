'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { ResolvedTicketAgent } from '../types';

export function useTeamTicketsMetrics() {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: ResolvedTicketAgent[] }>({
    queryKey: dashboardService.keys.teamTicketsMetrics,
    url: dashboardService.getTeamTicketsMetrics().url
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
