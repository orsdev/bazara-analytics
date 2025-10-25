import { renderHook, waitFor } from '@testing-library/react';
import { useCategoryResults } from '../use-category-results';
import * as hooks from '@/hooks';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@/hooks');

const mockUseCustomQuery = hooks.useCustomQuery as jest.MockedFunction<
  typeof hooks.useCustomQuery
>;

type MockQueryResult<T> = Partial<UseQueryResult<T, unknown>>;

describe('useCategoryResults', () => {
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

    const { result } = renderHook(() => useCategoryResults());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns default values when no data', () => {
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

    const { result } = renderHook(() => useCategoryResults());

    expect(result.current.currency).toBe('NGN');
    expect(result.current.categories).toEqual([]);
  });

  it('returns category results data', async () => {
    const mockData = {
      data: {
        currency: 'USD',
        categories: [
          { id: 'cat-1', name: 'Marketing', value: 5000 },
          { id: 'cat-2', name: 'Sales', value: 8000 }
        ]
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

    const { result } = renderHook(() => useCategoryResults());

    await waitFor(() => {
      expect(result.current.currency).toBe('USD');
    });

    expect(result.current.categories).toHaveLength(2);
    expect(result.current.categories[0]).toEqual({
      id: 'cat-1',
      name: 'Marketing',
      value: 5000
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

    const { result } = renderHook(() => useCategoryResults());

    expect(result.current.error).toBe(mockError);
  });

  it('handles empty categories array', () => {
    const mockData = {
      data: {
        currency: 'EUR',
        categories: []
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

    const { result } = renderHook(() => useCategoryResults());

    expect(result.current.categories).toEqual([]);
    expect(result.current.currency).toBe('EUR');
  });

  it('handles multiple categories', () => {
    const mockData = {
      data: {
        currency: 'NGN',
        categories: [
          { id: '1', name: 'IT', value: 10000 },
          { id: '2', name: 'HR', value: 5000 },
          { id: '3', name: 'Finance', value: 15000 }
        ]
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

    const { result } = renderHook(() => useCategoryResults());

    expect(result.current.categories).toHaveLength(3);
  });
});
