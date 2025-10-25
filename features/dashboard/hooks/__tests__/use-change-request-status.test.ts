import { renderHook, waitFor } from '@testing-library/react';
import { useChangeRequestStatus } from '../use-change-request-status';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useChangeRequestStatus', () => {
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

    const { result } = renderHook(() => useChangeRequestStatus());

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

    const { result } = renderHook(() => useChangeRequestStatus());

    expect(result.current.changeRequestStatus).toEqual([]);
    expect(result.current.hasData).toBe(false);
  });

  it('returns change request status data', async () => {
    const mockData = {
      data: [
        { name: 'Open', value: 100 },
        { name: 'In Progress', value: 50 },
        { name: 'Closed', value: 200 }
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

    const { result } = renderHook(() => useChangeRequestStatus());

    await waitFor(() => {
      expect(result.current.changeRequestStatus).toHaveLength(3);
    });

    expect(result.current.hasData).toBe(true);
    expect(result.current.changeRequestStatus[0]).toEqual({
      name: 'Open',
      value: 100
    });
  });

  it('sets hasData to true when data exists', () => {
    const mockData = {
      data: [{ name: 'Open', value: 10 }]
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

    const { result } = renderHook(() => useChangeRequestStatus());

    expect(result.current.hasData).toBe(true);
  });

  it('sets hasData to false when array is empty', () => {
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

    const { result } = renderHook(() => useChangeRequestStatus());

    expect(result.current.hasData).toBe(false);
    expect(result.current.changeRequestStatus).toEqual([]);
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

    const { result } = renderHook(() => useChangeRequestStatus());

    expect(result.current.error).toBe(mockError);
  });

  it('handles multiple status items', () => {
    const mockData = {
      data: [
        { name: 'Open', value: 50 },
        { name: 'In Progress', value: 30 },
        { name: 'Closed', value: 100 },
        { name: 'Cancelled', value: 20 }
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

    const { result } = renderHook(() => useChangeRequestStatus());

    expect(result.current.changeRequestStatus).toHaveLength(4);
    expect(result.current.hasData).toBe(true);
  });
});
