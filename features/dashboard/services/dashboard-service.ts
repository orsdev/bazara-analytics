import { buildQueryParams } from '@/utils';

export const dashboardService = {
  keys: {
    metrics: ['dashboard', 'metrics'] as const,
    teamTicketsMetrics: ['dashboard', 'team-tickets-metrics'] as const,
    pendingTickets: ['dashboard', 'pending-tickets'] as const,
    pendingApprovals: ['dashboard', 'pending-approvals'] as const,
    categoryResults: ['dashboard', 'category-results'] as const,
    responseTime: ['dashboard', 'response-time'] as const,
    ticketResolution: ['dashboard', 'ticket-resolution'] as const,
    changeRequestStatus: ['dashboard', 'change-request-status'] as const,
    changeRequests: (filter: Record<string, string>) =>
      ['dashboard', 'change-requests', filter] as const,
    requests: (filter: Record<string, string>) =>
      ['dashboard', 'requests', filter] as const
  },
  getMetrics: () => ({
    url: '/dashboard/metrics',
    method: 'GET'
  }),
  getTeamTicketsMetrics: () => ({
    url: '/dashboard/metrics/team-ticket',
    method: 'GET'
  }),
  getPendingTickets: () => ({
    url: '/dashboard/pending-tickets',
    method: 'GET'
  }),
  getPendingApprovals: () => ({
    url: '/dashboard/pending-approvals',
    method: 'GET'
  }),
  getRequests: (filter: Record<string, string>) => {
    const queryParams = buildQueryParams(filter);
    return {
      url: `/dashboard/requests${queryParams ? `?${queryParams}` : ''}`,
      method: 'GET'
    };
  },
  getCategoryResults: () => ({
    url: '/dashboard/category-results',
    method: 'GET'
  }),
  getResponseTime: () => ({
    url: '/dashboard/response-time',
    method: 'GET'
  }),
  getChangeRequests: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams(filter);
    return {
      url: `/dashboard/change-requests${queryParams ? `?${queryParams}` : ''}`,
      method: 'GET'
    };
  },
  getTicketResolution: () => ({
    url: '/dashboard/ticket-resolution',
    method: 'GET'
  }),
  getChangeRequestStatus: () => ({
    url: '/dashboard/change-request-status',
    method: 'GET'
  })
};
