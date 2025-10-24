export const dashboardService = {
  keys: {
    metrics: ['dashboard', 'metrics'] as const,
    resolvedTickets: ['dashboard', 'resolved-tickets'] as const,
    pendingTickets: ['dashboard', 'pending-tickets'] as const,
    pendingApprovals: ['dashboard', 'pending-approvals'] as const,
    categoryResults: ['dashboard', 'category-results'] as const
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
  getCategoryResults: () => ({
    url: '/dashboard/category-results',
    method: 'GET'
  })
};
