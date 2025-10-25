import { renderHook, waitFor } from '@testing-library/react';
import { useRequests } from '../use-requests';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useRequests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    const mockResult: MockQueryResult<unknown[]> = {
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<unknown[], unknown>
    );

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasData).toBe(false);
  });

  it('returns empty array when no data', () => {
    const mockResult: MockQueryResult<unknown[]> = {
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<unknown[], unknown>
    );

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.requests).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('returns requests data', async () => {
    const mockData = [
      { id: 'req-1', title: 'Request 1', status: 'pending' },
      { id: 'req-2', title: 'Request 2', status: 'approved' }
    ];

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

    const { result } = renderHook(() => useRequests({}));

    await waitFor(() => {
      expect(result.current.requests).toHaveLength(2);
    });

    expect(result.current.hasData).toBe(true);
    expect(result.current.requests[0]).toEqual({
      id: 'req-1',
      title: 'Request 1',
      status: 'pending'
    });
  });

  it('handles filter parameter', () => {
    const filter = { status: 'pending', priority: 'high' };
    const mockResult: MockQueryResult<unknown[]> = {
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<unknown[], unknown>
    );

    renderHook(() => useRequests(filter));

    expect(mockUseCustomQuery).toHaveBeenCalled();
  });

  it('tracks isRefetching separately', () => {
    const mockData = [{ id: 'req-1', title: 'Request 1' }];

    const mockResult: MockQueryResult<typeof mockData> = {
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: true
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<typeof mockData, unknown>
    );

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.isRefetching).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('returns error state', () => {
    const mockError = new Error('Failed to fetch');

    const mockResult: MockQueryResult<unknown[]> = {
      data: undefined,
      isLoading: false,
      error: mockError,
      refetch: jest.fn(),
      isRefetching: false
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<unknown[], unknown>
    );

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.error).toBe(mockError);
  });

  it('handles empty array', () => {
    const mockData: unknown[] = [];

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

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.requests).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('sets hasData to true when data exists', () => {
    const mockData = [{ id: 'req-1', title: 'Request 1', status: 'open' }];

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

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.hasData).toBe(true);
  });

  it('handles multiple requests', () => {
    const mockData = [
      { id: '1', title: 'Request 1' },
      { id: '2', title: 'Request 2' },
      { id: '3', title: 'Request 3' }
    ];

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

    const { result } = renderHook(() => useRequests({}));

    expect(result.current.requests).toHaveLength(3);
    expect(result.current.hasData).toBe(true);
  });
});
