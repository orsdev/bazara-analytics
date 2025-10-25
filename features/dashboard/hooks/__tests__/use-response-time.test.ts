import { renderHook, waitFor } from '@testing-library/react';
import { useResponseTime } from '../use-response-time';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useResponseTime', () => {
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns default response time when no data', () => {
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.responseTime).toHaveLength(2);
    expect(result.current.responseTime[0]).toMatchObject({
      id: 'incident-response-time',
      title: 'Average Incident Response Time - Me',
      value: '0',
      unit: 'Hours'
    });
  });

  it('transforms response time data correctly', async () => {
    const mockData = {
      data: {
        incidentResponseTime: {
          id: 'incident-response-time',
          currentValue: '4:30:00',
          previousValue: '5:00:00',
          comparisonRange: 'week',
          chartData: [{ value: 15 }, { value: 18 }]
        },
        changeResponseTime: {
          id: 'change-response-time',
          currentValue: '0:45:00',
          previousValue: '1:00:00',
          comparisonRange: 'week',
          chartData: [{ value: 10 }, { value: 12 }]
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

    const { result } = renderHook(() => useResponseTime());

    await waitFor(() => {
      expect(result.current.responseTime).toHaveLength(2);
    });

    expect(result.current.responseTime[0].title).toBe(
      'Average Incident Response Time - Me'
    );
    expect(result.current.responseTime[0].value).toBe('4:30:00');
    expect(result.current.responseTime[0].unit).toBe('Hours');
  });

  it('calculates percentage change correctly for improvement', () => {
    const mockData = {
      data: {
        incidentResponseTime: {
          id: 'incident-response-time',
          currentValue: '3:00:00',
          previousValue: '4:00:00',
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.responseTime[0].change.isPositive).toBe(true);
    expect(result.current.responseTime[0].change.value).toContain('%');
  });

  it('formats time with hours correctly', () => {
    const mockData = {
      data: {
        incidentResponseTime: {
          id: 'incident-response-time',
          currentValue: '2:30:00',
          previousValue: '2:00:00',
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.responseTime[0].unit).toBe('Hours');
  });

  it('formats time with minutes correctly', () => {
    const mockData = {
      data: {
        incidentResponseTime: {
          id: 'incident-response-time',
          currentValue: '0:45:00',
          previousValue: '0:30:00',
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.responseTime[0].unit).toBe('Minutes');
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.error).toBe(mockError);
    expect(result.current.responseTime).toHaveLength(2);
  });

  it('handles zero previous value', () => {
    const mockData = {
      data: {
        incidentResponseTime: {
          id: 'incident-response-time',
          currentValue: '1:00:00',
          previousValue: '0:00:00',
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

    const { result } = renderHook(() => useResponseTime());

    expect(result.current.responseTime[0].change.value).toBe('0%');
  });
});
