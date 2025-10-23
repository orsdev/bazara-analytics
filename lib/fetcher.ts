import { AxiosRequestConfig } from 'axios';
import { api } from './api';

export const fetcher = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const res = await api({
    ...options
  });
  return res.data;
};
