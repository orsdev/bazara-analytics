import { authTokenKey, cookieOptions } from '@/constants';
import { isDev } from '@/utils';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';
import { AuthSliceState } from '../types';

const INITIAL_STATE = {
  accessToken: '',
  hasCheckedToken: false
};

export const useAuthSlice = create<AuthSliceState>()((set, get) => ({
  ...INITIAL_STATE,
  handleLoadToken: async () => {
    try {
      const accessToken = (await getCookie(authTokenKey)) || '';

      if (accessToken) {
        get().handleSaveToken(accessToken);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      get().handleLogOut();
    } finally {
      set((state) => ({
        ...state,
        hasCheckedToken: true
      }));
    }
  },
  handleLogOut: async () => {
    await deleteCookie(authTokenKey);
    set((state) => ({
      ...state,
      ...INITIAL_STATE
    }));
  },
  handleClearToken: async (key: string) => {
    if (!key) return;
    await deleteCookie(key);
  },
  handleSaveToken(token: string) {
    const options = isDev() ? cookieOptions.dev() : cookieOptions.prod();

    if (token) {
      setCookie(authTokenKey, token, options);

      set((state) => {
        return {
          accessToken: token ?? state.accessToken
        };
      });
    }
  }
}));
