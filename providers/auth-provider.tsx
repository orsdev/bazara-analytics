'use client';

import { SplashScreen } from '@/components/ui/splash-screen';
import { useUser } from '@/features/auth/hooks';
import { useAuthSlice } from '@/features/auth/slice/auth-slice';
import { ChildrenProps } from '@/types';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

export function AuthProvider({ children }: ChildrenProps) {
  const router = useRouter();
  const { handleCheckAuth, isAuthenticated, hasCheckedToken } = useAuthSlice();
  const { user } = useUser();

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  useEffect(() => {
    if (!isAuthenticated && hasCheckedToken) {
      router.push('/login');
    }
  }, [isAuthenticated, hasCheckedToken, router]);

  if (isAuthenticated && !user) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
