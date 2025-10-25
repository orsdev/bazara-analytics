import { renderHook, waitFor } from '@testing-library/react';
import { usePendingTickets } from '../use-pending-tickets';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('usePendingTickets', () => {
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

    const { result } = renderHook(() => usePendingTickets());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns default pending tickets when no data', () => {
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

    const { result } = renderHook(() => usePendingTickets());

    expect(result.current.pendingTickets).toEqual({
      id: 'pending-ticket-id',
      count: 0
    });
  });

  it('returns pending tickets data', async () => {
    const mockData = {
      data: {
        id: 'pending-tickets-123',
        count: 15
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

    const { result } = renderHook(() => usePendingTickets());

    await waitFor(() => {
      expect(result.current.pendingTickets).toEqual({
        id: 'pending-tickets-123',
        count: 15
      });
    });
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

    const { result } = renderHook(() => usePendingTickets());

    expect(result.current.error).toBe(mockError);
  });

  it('handles zero count', () => {
    const mockData = {
      data: {
        id: 'pending-tickets-123',
        count: 0
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

    const { result } = renderHook(() => usePendingTickets());

    expect(result.current.pendingTickets.count).toBe(0);
  });

  it('handles large count', () => {
    const mockData = {
      data: {
        id: 'pending-tickets-123',
        count: 9999
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

    const { result } = renderHook(() => usePendingTickets());

    expect(result.current.pendingTickets.count).toBe(9999);
  });
});
