export const dashboardService = {
  keys: {
    metrics: ['dashboard', 'metrics'] as const,
    resolvedTickets: ['dashboard', 'resolved-tickets'] as const
  },
  getMetrics: () => ({
    url: '/dashboard/metrics',
    method: 'GET'
  }),
  getResolvedTickets: () => ({
    url: '/dashboard/resolved-tickets',
    method: 'GET'
  })
};
