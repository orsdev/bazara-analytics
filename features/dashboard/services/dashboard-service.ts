export const dashboardService = {
  keys: {
    metrics: ['dashboard', 'metrics'] as const
  },
  getMetrics: () => ({
    url: '/dashboard/metrics',
    method: 'GET'
  })
};
