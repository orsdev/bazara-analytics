import { renderHook, waitFor } from '@testing-library/react';
import { useTicketResolution } from '../use-ticket-resolution';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useTicketResolution', () => {
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

    const { result } = renderHook(() => useTicketResolution());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasData).toBe(false);
  });

  it('returns empty array when no data', () => {
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

    const { result } = renderHook(() => useTicketResolution());

    expect(result.current.ticketResolution).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('returns ticket resolution data', async () => {
    const mockData = {
      data: [
        { month: '2024-01', closed: 100, open: 50 },
        { month: '2024-02', closed: 120, open: 40 }
      ]
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

    const { result } = renderHook(() => useTicketResolution());

    await waitFor(() => {
      expect(result.current.ticketResolution).toHaveLength(2);
    });

    expect(result.current.hasData).toBe(true);
    expect(result.current.ticketResolution[0]).toEqual({
      month: '2024-01',
      closed: 100,
      open: 50
    });
  });

  it('sets hasData to true when data exists', () => {
    const mockData = {
      data: [{ month: '2024-01', closed: 50, open: 25 }]
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

    const { result } = renderHook(() => useTicketResolution());

    expect(result.current.hasData).toBe(true);
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

    const { result } = renderHook(() => useTicketResolution());

    expect(result.current.error).toBe(mockError);
  });

  it('handles empty array', () => {
    const mockData = {
      data: []
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

    const { result } = renderHook(() => useTicketResolution());

    expect(result.current.ticketResolution).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('handles multiple months of data', () => {
    const mockData = {
      data: [
        { month: '2024-01', closed: 100, open: 50 },
        { month: '2024-02', closed: 120, open: 40 },
        { month: '2024-03', closed: 90, open: 60 }
      ]
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

    const { result } = renderHook(() => useTicketResolution());

    expect(result.current.ticketResolution).toHaveLength(3);
    expect(result.current.hasData).toBe(true);
  });
});
