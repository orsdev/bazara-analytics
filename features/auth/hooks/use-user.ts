'use client';

import { api } from '@/lib';
import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/auth-service';
import { useAuthSlice } from '../slice/auth-slice';
import { AuthUser } from '../types';

export function useUser() {
  const { handleLogout } = useAuthSlice();

  const getUser = async () => {
    try {
      const response = await api({
        method: 'get',
        url: authService.getUser().url,
        withCredentials: true // Include HTTP-only cookies
      });
      const responseData = response.data as { data: AuthUser };

      return responseData;
    } catch (error: unknown) {
      handleLogout();
      throw error;
    }
  };

  const { data: responseData, isLoading } = useQuery<{ data: AuthUser | null }>(
    {
      queryKey: authService.keys.profile,
      queryFn: getUser,
      staleTime: Infinity,
      retry: 2
    }
  );

  return {
    user: responseData?.data,
    isLoading
  };
}
