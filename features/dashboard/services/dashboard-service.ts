export const dashboardService = {
  keys: {
    metrics: ['dashboard', 'metrics'] as const
  },
  getMetrics: () => ({
    url: '/dashboard/metricss',
    method: 'GET'
  })
};
