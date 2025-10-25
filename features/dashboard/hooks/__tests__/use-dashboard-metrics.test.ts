import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardMetrics } from '../use-dashboard-metrics';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useDashboardMetrics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.metrics).toHaveLength(4);
  });

  it('returns default metrics when no data', () => {
    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.metrics).toHaveLength(4);
    expect(result.current.metrics[0]).toMatchObject({
      id: 'total-user-tickets',
      title: 'Total Number of Users Tickets',
      value: 0
    });
  });

  it('transforms metrics data correctly', async () => {
    const mockData = {
      data: {
        totalUserTickets: {
          id: 'total-user-tickets',
          currentValue: 100,
          previousValue: 80,
          comparisonRange: 'week',
          chartData: [1, 2, 3]
        },
        totalOpenTickets: {
          id: 'total-open-tickets',
          currentValue: 50,
          previousValue: 60,
          comparisonRange: 'week',
          chartData: [4, 5, 6]
        },
        totalClosedTickets: {
          id: 'total-closed-tickets',
          currentValue: 200,
          previousValue: 150,
          comparisonRange: 'week',
          chartData: [7, 8, 9]
        },
        totalDueTickets: {
          id: 'total-due-tickets',
          currentValue: 10,
          previousValue: 15,
          comparisonRange: 'week',
          chartData: [10, 11, 12]
        }
      }
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    await waitFor(() => {
      expect(result.current.metrics).toHaveLength(4);
    });

    expect(result.current.metrics[0]).toMatchObject({
      id: 'total-user-tickets',
      title: 'Total Number of Users Tickets',
      value: 100,
      change: {
        value: '25.0%',
        label: 'this week',
        isPositive: true
      }
    });
  });

  it('calculates positive change correctly', () => {
    const mockData = {
      data: {
        totalUserTickets: {
          id: 'total-user-tickets',
          currentValue: 120,
          previousValue: 100,
          comparisonRange: 'week',
          chartData: []
        }
      }
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.metrics[0].change.isPositive).toBe(true);
    expect(result.current.metrics[0].change.value).toBe('20.0%');
  });

  it('calculates negative change correctly', () => {
    const mockData = {
      data: {
        totalUserTickets: {
          id: 'total-user-tickets',
          currentValue: 80,
          previousValue: 100,
          comparisonRange: 'week',
          chartData: []
        }
      }
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.metrics[0].change.isPositive).toBe(false);
    expect(result.current.metrics[0].change.value).toBe('20.0%');
  });

  it('handles zero previous value', () => {
    const mockData = {
      data: {
        totalUserTickets: {
          id: 'total-user-tickets',
          currentValue: 100,
          previousValue: 0,
          comparisonRange: 'week',
          chartData: []
        }
      }
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.metrics[0].change.value).toBe('0%');
  });

  it('returns error state', () => {
    const mockError = new Error('Failed to fetch');

    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: false,
      error: mockError,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.error).toBe(mockError);
    expect(result.current.metrics).toHaveLength(4);
  });

  it('uses default values for missing metric properties', () => {
    const mockData = {
      data: {
        totalUserTickets: {
          currentValue: 100,
          previousValue: 80
        }
      }
    };

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.metrics[0].chartData).toEqual([]);
    expect(result.current.metrics[0].change.label).toBe('this period');
  });
});
