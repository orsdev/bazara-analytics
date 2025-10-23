import { AxiosRequestConfig } from 'axios';
import { LoginPayload } from '../types';

export const authService = {
  keys: {
    profile: ['profile'] as const
  },
  getUser: () => ({
    url: '/auth/me'
  }),
  login: (data: LoginPayload): AxiosRequestConfig => ({
    url: '/auth/login',
    method: 'POST',
    data
  }),
  logout: (): AxiosRequestConfig => ({
    url: '/auth/logout',
    method: 'POST'
  })
};
