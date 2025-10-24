'use client';

import { useCustomMutation } from '@/hooks/use-mutation';
import { useRouter } from 'nextjs-toploader/app';
import { toast } from 'react-hot-toast';
import { authService } from '../services/auth-service';
import { useAuthSlice } from '../slice/auth-slice';
import { LoginPayload } from '../types';
import { errorHandler } from '@/utils';

export function useAuth() {
  const { handleSetAuthenticated, handleLogout } = useAuthSlice();
  const mutation = useCustomMutation();

  const router = useRouter();

  const login = async (credentials: LoginPayload) => {
    mutation.mutate(authService.login(credentials), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess(data) {
        const response = data as { data: { token: string } };
        const token = response?.data?.token;
        if (token) {
          handleSetAuthenticated(true);
          router.push('/dashboard');
        } else {
          toast.error('Token not found');
        }
      }
    });
  };

  const logout = () => {
    mutation.mutate(authService.logout(), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        handleLogout();
        router.push('/login');
      }
    });
  };

  const isLoading = mutation.isPending;

  return {
    login,
    logout,
    isLoading
  };
}
