import { dashboardService } from '../dashboard-service';

describe('dashboardService', () => {
  describe('keys', () => {
    it('has metrics key', () => {
      expect(dashboardService.keys.metrics).toEqual(['dashboard', 'metrics']);
    });

    it('has resolvedTickets key', () => {
      expect(dashboardService.keys.resolvedTickets).toEqual([
        'dashboard',
        'resolved-tickets'
      ]);
    });

    it('has pendingTickets key', () => {
      expect(dashboardService.keys.pendingTickets).toEqual([
        'dashboard',
        'pending-tickets'
      ]);
    });

    it('has pendingApprovals key', () => {
      expect(dashboardService.keys.pendingApprovals).toEqual([
        'dashboard',
        'pending-approvals'
      ]);
    });

    it('has categoryResults key', () => {
      expect(dashboardService.keys.categoryResults).toEqual([
        'dashboard',
        'category-results'
      ]);
    });

    it('has responseTime key', () => {
      expect(dashboardService.keys.responseTime).toEqual([
        'dashboard',
        'response-time'
      ]);
    });

    it('has ticketResolution key', () => {
      expect(dashboardService.keys.ticketResolution).toEqual([
        'dashboard',
        'ticket-resolution'
      ]);
    });

    it('has changeRequestStatus key', () => {
      expect(dashboardService.keys.changeRequestStatus).toEqual([
        'dashboard',
        'change-request-status'
      ]);
    });

    it('generates changeRequests key with filter', () => {
      const filter = { status: 'pending' };
      expect(dashboardService.keys.changeRequests(filter)).toEqual([
        'dashboard',
        'change-requests',
        filter
      ]);
    });

    it('generates requests key with filter', () => {
      const filter = { priority: 'high' };
      expect(dashboardService.keys.requests(filter)).toEqual([
        'dashboard',
        'requests',
        filter
      ]);
    });
  });

  describe('getMetrics', () => {
    it('returns correct config', () => {
      const result = dashboardService.getMetrics();
      expect(result).toEqual({
        url: '/dashboard/metrics',
        method: 'GET'
      });
    });
  });

  describe('getResolvedTickets', () => {
    it('returns correct config', () => {
      const result = dashboardService.getResolvedTickets();
      expect(result).toEqual({
        url: '/dashboard/resolved-tickets',
        method: 'GET'
      });
    });
  });

  describe('getPendingTickets', () => {
    it('returns correct config', () => {
      const result = dashboardService.getPendingTickets();
      expect(result).toEqual({
        url: '/dashboard/pending-tickets',
        method: 'GET'
      });
    });
  });

  describe('getPendingApprovals', () => {
    it('returns correct config', () => {
      const result = dashboardService.getPendingApprovals();
      expect(result).toEqual({
        url: '/dashboard/pending-approvals',
        method: 'GET'
      });
    });
  });

  describe('getRequests', () => {
    it('returns correct config without filter', () => {
      const result = dashboardService.getRequests({});
      expect(result).toEqual({
        url: '/dashboard/requests',
        method: 'GET'
      });
    });

    it('returns correct config with filter', () => {
      const filter = { status: 'pending', priority: 'high' };
      const result = dashboardService.getRequests(filter);
      expect(result.url).toContain('/dashboard/requests?');
      expect(result.url).toContain('status=pending');
      expect(result.url).toContain('priority=high');
      expect(result.method).toBe('GET');
    });

    it('filters out empty values', () => {
      const filter = { status: 'pending', priority: '' };
      const result = dashboardService.getRequests(filter);
      expect(result.url).toContain('status=pending');
      expect(result.url).not.toContain('priority');
    });
  });

  describe('getCategoryResults', () => {
    it('returns correct config', () => {
      const result = dashboardService.getCategoryResults();
      expect(result).toEqual({
        url: '/dashboard/category-results',
        method: 'GET'
      });
    });
  });

  describe('getResponseTime', () => {
    it('returns correct config', () => {
      const result = dashboardService.getResponseTime();
      expect(result).toEqual({
        url: '/dashboard/response-time',
        method: 'GET'
      });
    });
  });

  describe('getChangeRequests', () => {
    it('returns correct config without filter', () => {
      const result = dashboardService.getChangeRequests();
      expect(result).toEqual({
        url: '/dashboard/change-requests',
        method: 'GET'
      });
    });

    it('returns correct config with empty filter', () => {
      const result = dashboardService.getChangeRequests({});
      expect(result).toEqual({
        url: '/dashboard/change-requests',
        method: 'GET'
      });
    });

    it('returns correct config with filter', () => {
      const filter = { type: 'emergency', status: 'open' };
      const result = dashboardService.getChangeRequests(filter);
      expect(result.url).toContain('/dashboard/change-requests?');
      expect(result.url).toContain('type=emergency');
      expect(result.url).toContain('status=open');
      expect(result.method).toBe('GET');
    });
  });

  describe('getTicketResolution', () => {
    it('returns correct config', () => {
      const result = dashboardService.getTicketResolution();
      expect(result).toEqual({
        url: '/dashboard/ticket-resolution',
        method: 'GET'
      });
    });
  });

  describe('getChangeRequestStatus', () => {
    it('returns correct config', () => {
      const result = dashboardService.getChangeRequestStatus();
      expect(result).toEqual({
        url: '/dashboard/change-request-status',
        method: 'GET'
      });
    });
  });

  describe('service structure', () => {
    it('has all required methods', () => {
      expect(dashboardService).toHaveProperty('getMetrics');
      expect(dashboardService).toHaveProperty('getResolvedTickets');
      expect(dashboardService).toHaveProperty('getPendingTickets');
      expect(dashboardService).toHaveProperty('getPendingApprovals');
      expect(dashboardService).toHaveProperty('getRequests');
      expect(dashboardService).toHaveProperty('getCategoryResults');
      expect(dashboardService).toHaveProperty('getResponseTime');
      expect(dashboardService).toHaveProperty('getChangeRequests');
      expect(dashboardService).toHaveProperty('getTicketResolution');
      expect(dashboardService).toHaveProperty('getChangeRequestStatus');
    });

    it('all methods return objects with url and method', () => {
      const methods = [
        dashboardService.getMetrics(),
        dashboardService.getResolvedTickets(),
        dashboardService.getPendingTickets(),
        dashboardService.getPendingApprovals(),
        dashboardService.getRequests({}),
        dashboardService.getCategoryResults(),
        dashboardService.getResponseTime(),
        dashboardService.getChangeRequests(),
        dashboardService.getTicketResolution(),
        dashboardService.getChangeRequestStatus()
      ];

      methods.forEach((method) => {
        expect(method).toHaveProperty('url');
        expect(method).toHaveProperty('method');
        expect(method.method).toBe('GET');
      });
    });
  });
});
