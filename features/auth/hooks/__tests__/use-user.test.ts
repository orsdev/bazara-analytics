import { renderHook } from '@testing-library/react';
import { useUser } from '../use-user';

jest.mock('@/lib', () => ({
  api: jest.fn()
}));

jest.mock('../../services/auth-service', () => ({
  authService: {
    keys: {
      profile: ['profile']
    },
    getUser: jest.fn()
  }
}));

jest.mock('../../slice/auth-slice', () => ({
  useAuthSlice: jest.fn()
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}));

/* eslint-disable @typescript-eslint/no-require-imports */
const mockApi = require('@/lib').api;
const mockAuthService = require('../../services/auth-service').authService;
const mockUseAuthSlice = require('../../slice/auth-slice').useAuthSlice;
const mockUseQuery = require('@tanstack/react-query').useQuery;
/* eslint-enable @typescript-eslint/no-require-imports */

describe('useUser', () => {
  const mockHandleLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuthSlice.mockReturnValue({
      handleLogout: mockHandleLogout
    });

    mockAuthService.getUser.mockReturnValue({
      url: '/auth/me'
    });
  });

  it('returns user data when query is successful', () => {
    const mockUser = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User'
    };

    mockUseQuery.mockReturnValue({
      data: { data: mockUser },
      isLoading: false
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
  });

  it('returns loading state when query is loading', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.user).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });

  it('configures useQuery with correct parameters', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false
    });

    renderHook(() => useUser());

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ['profile'],
      queryFn: expect.any(Function),
      staleTime: Infinity,
      retry: 2
    });
  });

  it('calls API with correct parameters in getUser function', async () => {
    const mockResponseData = {
      data: {
        id: 'user-1',
        email: 'test@example.com'
      }
    };

    mockApi.mockResolvedValue({
      data: mockResponseData
    });

    let queryFn: () => Promise<unknown>;
    mockUseQuery.mockImplementation(
      (config: { queryFn: () => Promise<unknown> }) => {
        queryFn = config.queryFn;
        return {
          data: undefined,
          isLoading: false
        };
      }
    );

    renderHook(() => useUser());

    await queryFn!();

    expect(mockApi).toHaveBeenCalledWith({
      method: 'get',
      url: '/auth/me',
      withCredentials: true
    });
  });

  it('calls handleLogout when API request fails', async () => {
    const mockError = new Error('API Error');
    mockApi.mockRejectedValue(mockError);

    let queryFn: () => Promise<unknown>;
    mockUseQuery.mockImplementation(
      (config: { queryFn: () => Promise<unknown> }) => {
        queryFn = config.queryFn;
        return {
          data: undefined,
          isLoading: false
        };
      }
    );

    renderHook(() => useUser());

    await expect(queryFn!()).rejects.toThrow('API Error');
    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });

  it('returns undefined user when no data', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.user).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles null data gracefully', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.user).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('extracts user data from nested response structure', () => {
    const mockUser = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User'
    };

    mockUseQuery.mockReturnValue({
      data: { data: mockUser },
      isLoading: false
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.user).toEqual(mockUser);
  });
});
