import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../use-auth';

jest.mock('@/hooks/use-mutation', () => ({
  useCustomMutation: jest.fn()
}));

jest.mock('nextjs-toploader/app', () => ({
  useRouter: jest.fn()
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('../../services/auth-service', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn()
  }
}));

jest.mock('../../slice/auth-slice', () => ({
  useAuthSlice: jest.fn()
}));

jest.mock('@/utils', () => ({
  errorHandler: jest.fn()
}));

/* eslint-disable @typescript-eslint/no-require-imports */
const mockUseCustomMutation = require('@/hooks/use-mutation').useCustomMutation;
const mockUseRouter = require('nextjs-toploader/app').useRouter;
const mockToast = require('react-hot-toast').toast;
const mockAuthService = require('../../services/auth-service').authService;
const mockUseAuthSlice = require('../../slice/auth-slice').useAuthSlice;
const mockErrorHandler = require('@/utils').errorHandler;
/* eslint-enable @typescript-eslint/no-require-imports */

describe('useAuth', () => {
  const mockMutate = jest.fn();
  const mockPush = jest.fn();
  const mockHandleSaveToken = jest.fn();
  const mockHandleClearToken = jest.fn();

  beforeEach(() => {
    mockUseCustomMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false
    });

    mockUseRouter.mockReturnValue({
      push: mockPush
    });

    mockUseAuthSlice.mockReturnValue({
      handleSaveToken: mockHandleSaveToken,
      handleClearToken: mockHandleClearToken
    });

    mockAuthService.login.mockReturnValue({
      url: '/auth/login',
      method: 'POST'
    });
    mockAuthService.logout.mockReturnValue({
      url: '/auth/logout',
      method: 'POST'
    });
    mockErrorHandler.mockReturnValue('Error message');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns login, logout, and isLoading', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('isLoading');
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('calls mutation with auth service login config', () => {
    const { result } = renderHook(() => useAuth());
    const credentials = { email: 'test@example.com', password: 'password' };

    act(() => {
      result.current.login(credentials);
    });

    expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
    expect(mockMutate).toHaveBeenCalled();
  });

  it('handles successful login', () => {
    mockUseCustomMutation.mockReturnValue({
      mutate: (
        config: unknown,
        callbacks: { onSuccess: (data: { data: { token: string } }) => void }
      ) => {
        callbacks.onSuccess({ data: { token: 'mock-token' } });
      },
      isPending: false
    });

    const { result } = renderHook(() => useAuth());
    const credentials = { email: 'test@example.com', password: 'password' };

    act(() => {
      result.current.login(credentials);
    });

    expect(mockHandleSaveToken).toHaveBeenCalledWith('mock-token');
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('calls logout mutation', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockMutate).toHaveBeenCalled();
  });

  it('handles successful logout', () => {
    mockUseCustomMutation.mockReturnValue({
      mutate: (config: unknown, callbacks: { onSuccess: () => void }) => {
        callbacks.onSuccess();
      },
      isPending: false
    });

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(mockHandleClearToken).toHaveBeenCalledWith('auth_token');
    expect(mockPush).toHaveBeenCalledWith('/sign-in');
  });

  it('handles login error', () => {
    const mockError = new Error('Login failed');
    mockUseCustomMutation.mockReturnValue({
      mutate: (
        config: unknown,
        callbacks: { onError: (error: Error) => void }
      ) => {
        callbacks.onError(mockError);
      },
      isPending: false
    });

    const { result } = renderHook(() => useAuth());
    const credentials = { email: 'test@example.com', password: 'password' };

    act(() => {
      result.current.login(credentials);
    });

    expect(mockErrorHandler).toHaveBeenCalledWith(mockError);
    expect(mockToast.error).toHaveBeenCalledWith('Error message');
  });

  it('handles login success without token', () => {
    mockUseCustomMutation.mockReturnValue({
      mutate: (
        config: unknown,
        callbacks: {
          onSuccess: (data: { data: Record<string, unknown> }) => void;
        }
      ) => {
        callbacks.onSuccess({ data: {} });
      },
      isPending: false
    });

    const { result } = renderHook(() => useAuth());
    const credentials = { email: 'test@example.com', password: 'password' };

    act(() => {
      result.current.login(credentials);
    });

    expect(mockToast.error).toHaveBeenCalledWith('Token not found');
    expect(mockHandleSaveToken).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('handles logout error', () => {
    const mockError = new Error('Logout failed');
    mockUseCustomMutation.mockReturnValue({
      mutate: (
        config: unknown,
        callbacks: { onError: (error: Error) => void }
      ) => {
        callbacks.onError(mockError);
      },
      isPending: false
    });

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(mockErrorHandler).toHaveBeenCalledWith(mockError);
    expect(mockToast.error).toHaveBeenCalledWith('Error message');
  });

  it('returns correct loading state', () => {
    mockUseCustomMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: true
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
  });
});
