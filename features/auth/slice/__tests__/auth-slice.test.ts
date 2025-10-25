import { act, renderHook } from '@testing-library/react';
import { useAuthSlice } from '../auth-slice';

// Mock the API module
jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn()
  }
}));

const mockApi = require('@/lib/api').api;

describe('useAuthSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useAuthSlice());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.hasCheckedToken).toBe(false);
  });

  it('has all required methods', () => {
    const { result } = renderHook(() => useAuthSlice());

    expect(typeof result.current.handleCheckAuth).toBe('function');
    expect(typeof result.current.handleLogout).toBe('function');
    expect(typeof result.current.handleSetAuthenticated).toBe('function');
  });

  describe('handleCheckAuth', () => {
    it('sets authenticated state when API call succeeds', async () => {
      mockApi.get.mockResolvedValue({ data: { success: true } });
      const { result } = renderHook(() => useAuthSlice());

      await act(async () => {
        await result.current.handleCheckAuth();
      });

      expect(mockApi.get).toHaveBeenCalledWith('/auth/me', {
        withCredentials: true
      });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.hasCheckedToken).toBe(true);
    });

    it('logs out when API call fails', async () => {
      mockApi.get.mockRejectedValue(new Error('Unauthorized'));
      const { result } = renderHook(() => useAuthSlice());

      await act(async () => {
        await result.current.handleCheckAuth();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.hasCheckedToken).toBe(true);
    });
  });

  describe('handleLogout', () => {
    it('resets state to initial values', async () => {
      const { result } = renderHook(() => useAuthSlice());

      // Set some initial state
      act(() => {
        result.current.handleSetAuthenticated(true);
      });

      await act(async () => {
        await result.current.handleLogout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.hasCheckedToken).toBe(false);
    });
  });

  describe('handleSetAuthenticated', () => {
    it('sets authentication state to true', () => {
      const { result } = renderHook(() => useAuthSlice());

      act(() => {
        result.current.handleSetAuthenticated(true);
      });

      expect(result.current.isAuthenticated).toBe(true);
    });

    it('sets authentication state to false', () => {
      const { result } = renderHook(() => useAuthSlice());

      // First set to true
      act(() => {
        result.current.handleSetAuthenticated(true);
      });

      // Then set to false
      act(() => {
        result.current.handleSetAuthenticated(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
