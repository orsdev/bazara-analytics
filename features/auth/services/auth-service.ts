import { AxiosRequestConfig } from 'axios';
import { LoginPayload } from '../types';

export const authService = {
  keys: {
    profile: ['profile'] as const
  },
  getUser: () => ({
    url: '/auth/me'
  }),
  login: (credentials: LoginPayload): AxiosRequestConfig => ({
    url: '/auth/login',
    method: 'POST',
    data: credentials
  }),
  logout: (): AxiosRequestConfig => ({
    url: '/auth/logout',
    method: 'POST'
  })
};
