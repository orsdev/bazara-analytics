import { act, renderHook } from '@testing-library/react';
import { useAuthSlice } from '../auth-slice';
import { authTokenKey } from '@/constants';

jest.mock('@/utils', () => ({
  isDev: jest.fn()
}));

jest.mock('cookies-next', () => ({
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
  setCookie: jest.fn()
}));

/* eslint-disable @typescript-eslint/no-require-imports */
const mockDeleteCookie = require('cookies-next').deleteCookie;
const mockGetCookie = require('cookies-next').getCookie;
/* eslint-enable @typescript-eslint/no-require-imports */

describe('useAuthSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useAuthSlice());

    expect(result.current.accessToken).toBe('');
    expect(result.current.hasCheckedToken).toBe(false);
  });

  it('has all required methods', () => {
    const { result } = renderHook(() => useAuthSlice());

    expect(typeof result.current.handleLoadToken).toBe('function');
    expect(typeof result.current.handleLogOut).toBe('function');
    expect(typeof result.current.handleClearToken).toBe('function');
    expect(typeof result.current.handleSaveToken).toBe('function');
  });

  describe('handleLoadToken', () => {
    it('loads token from cookie and saves it', async () => {
      mockGetCookie.mockResolvedValue('existing-token');
      const { result } = renderHook(() => useAuthSlice());

      await act(async () => {
        await result.current.handleLoadToken();
      });

      expect(mockGetCookie).toHaveBeenCalledWith(authTokenKey);
    });

    it('handles empty token from cookie', async () => {
      mockGetCookie.mockResolvedValue('');
      const { result } = renderHook(() => useAuthSlice());

      await act(async () => {
        await result.current.handleLoadToken();
      });

      expect(result.current.hasCheckedToken).toBe(true);
    });
  });

  describe('handleLogOut', () => {
    it('deletes cookie and resets state', async () => {
      const { result } = renderHook(() => useAuthSlice());

      // Set some initial state
      act(() => {
        result.current.handleSaveToken(authTokenKey);
      });

      await act(async () => {
        await result.current.handleLogOut();
      });

      expect(mockDeleteCookie).toHaveBeenCalledWith(authTokenKey);
      expect(result.current.accessToken).toBe('');
      expect(result.current.hasCheckedToken).toBe(false);
    });
  });

  describe('handleClearToken', () => {
    it('deletes cookie with provided key', async () => {
      const { result } = renderHook(() => useAuthSlice());

      await act(async () => {
        await result.current.handleClearToken(authTokenKey);
      });

      expect(mockDeleteCookie).toHaveBeenCalledWith(authTokenKey);
    });

    it('does nothing when key is empty', async () => {
      const { result } = renderHook(() => useAuthSlice());

      await act(async () => {
        await result.current.handleClearToken('');
      });

      expect(mockDeleteCookie).not.toHaveBeenCalled();
    });
  });
});
