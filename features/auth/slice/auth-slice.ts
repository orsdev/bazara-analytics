import { create } from 'zustand';
import { AuthSliceState } from '../types';
import { api } from '@/lib/api';

const INITIAL_STATE = {
  isAuthenticated: false,
  hasCheckedToken: false
};

export const useAuthSlice = create<AuthSliceState>()((set, get) => ({
  ...INITIAL_STATE,
  handleCheckAuth: async () => {
    try {
      const response = await api.get('/auth/me', {
        withCredentials: true
      });

      if (response.data.success) {
        get().handleSetAuthenticated(true);
      } else {
        get().handleLogout();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      get().handleLogout();
    } finally {
      set((state) => ({
        ...state,
        hasCheckedToken: true
      }));
    }
  },
  handleLogout: async () => {
    set((state) => ({
      ...state,
      ...INITIAL_STATE
    }));
  },
  handleSetAuthenticated(isAuth: boolean) {
    set((state) => ({
      ...state,
      isAuthenticated: isAuth
    }));
  }
}));
