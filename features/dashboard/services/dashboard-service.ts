import { buildQueryParams } from '@/utils';

export const dashboardService = {
  keys: {
    metrics: ['dashboard', 'metrics'] as const,
    resolvedTickets: ['dashboard', 'resolved-tickets'] as const,
    pendingTickets: ['dashboard', 'pending-tickets'] as const,
    pendingApprovals: ['dashboard', 'pending-approvals'] as const,
    categoryResults: ['dashboard', 'category-results'] as const,
    responseTime: ['dashboard', 'response-time'] as const,
    changeRequests: (filer: Record<string, string>) =>
      ['dashboard', 'change-requests', buildQueryParams(filer)] as const,
    requests: (filter: Record<string, string>) =>
      ['dashboard', 'requests', buildQueryParams(filter)] as const
  },
  getMetrics: () => ({
    url: '/dashboard/metrics',
    method: 'GET'
  }),
  getResolvedTickets: () => ({
    url: '/dashboard/resolved-tickets',
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
  }
};
