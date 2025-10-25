import { renderHook, waitFor } from '@testing-library/react';
import { usePendingApprovals } from '../use-pending-approvals';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('usePendingApprovals', () => {
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

    const { result } = renderHook(() => usePendingApprovals());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns default pending approvals when no data', () => {
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

    const { result } = renderHook(() => usePendingApprovals());

    expect(result.current.pendingApprovals).toEqual({
      id: 'pending-approval-id',
      count: 0
    });
  });

  it('returns pending approvals data', async () => {
    const mockData = {
      data: {
        id: 'approval-123',
        count: 25
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

    const { result } = renderHook(() => usePendingApprovals());

    await waitFor(() => {
      expect(result.current.pendingApprovals).toEqual({
        id: 'approval-123',
        count: 25
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

    const { result } = renderHook(() => usePendingApprovals());

    expect(result.current.error).toBe(mockError);
  });

  it('handles zero count', () => {
    const mockData = {
      data: {
        id: 'approval-456',
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

    const { result } = renderHook(() => usePendingApprovals());

    expect(result.current.pendingApprovals.count).toBe(0);
  });

  it('handles large count', () => {
    const mockData = {
      data: {
        id: 'approval-789',
        count: 1000
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

    const { result } = renderHook(() => usePendingApprovals());

    expect(result.current.pendingApprovals.count).toBe(1000);
  });
});
