import { renderHook, waitFor } from '@testing-library/react';
import { useChangeRequests } from '../use-change-requests';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useChangeRequests', () => {
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

    const { result } = renderHook(() => useChangeRequests({}));

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

    const { result } = renderHook(() => useChangeRequests({}));

    expect(result.current.requestData).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('returns change requests data', async () => {
    const mockData = {
      data: [
        { date: '2024-01-01', emergency: 10, normal: 20, standard: 30 },
        { date: '2024-02-01', emergency: 15, normal: 25, standard: 35 }
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

    const { result } = renderHook(() => useChangeRequests({}));

    await waitFor(() => {
      expect(result.current.requestData).toHaveLength(2);
    });

    expect(result.current.hasData).toBe(true);
    expect(result.current.requestData[0]).toEqual({
      date: '2024-01-01',
      emergency: 10,
      normal: 20,
      standard: 30
    });
  });

  it('handles filter parameter', () => {
    const filter = { status: 'open', priority: 'high' };
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

    renderHook(() => useChangeRequests(filter));

    expect(mockUseCustomQuery).toHaveBeenCalled();
  });

  it('sets isLoading to true when refetching', () => {
    const mockResult: MockQueryResult<{ data: unknown }> = {
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: true
    };
    mockUseCustomQuery.mockReturnValue(
      mockResult as UseQueryResult<{ data: unknown }, unknown>
    );

    const { result } = renderHook(() => useChangeRequests({}));

    expect(result.current.isLoading).toBe(true);
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

    const { result } = renderHook(() => useChangeRequests({}));

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

    const { result } = renderHook(() => useChangeRequests({}));

    expect(result.current.requestData).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('sets hasData to true when data exists', () => {
    const mockData = {
      data: [{ date: '2024-01-01', emergency: 5, normal: 10, standard: 15 }]
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

    const { result } = renderHook(() => useChangeRequests({}));

    expect(result.current.hasData).toBe(true);
  });
});
