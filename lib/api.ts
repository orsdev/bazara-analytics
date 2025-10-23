import { authTokenKey } from '@/constants';
import { environment } from '@/utils/environment';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export const api = axios.create({
  baseURL: environment.baseUrl,
  timeout: 300000 // 5 minutes
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    try {
      const accessToken = await getCookie(authTokenKey);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers.Authorization = '';
      }
    } catch (error) {
      console.error('Failed to set auth token:', error);
    }
  }
  return config;
});
