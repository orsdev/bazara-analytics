'use client';

import { SplashScreen } from '@/components/ui/splash-screen';
import { useUser } from '@/features/auth/hooks';
import { useAuthSlice } from '@/features/auth/slice/auth-slice';
import { ChildrenProps } from '@/types';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

export function AuthProvider({ children }: ChildrenProps) {
  const router = useRouter();
  const { handleLoadToken, accessToken, hasCheckedToken } = useAuthSlice();
  const { user } = useUser();

  useEffect(() => {
    handleLoadToken();
  }, [handleLoadToken]);

  useEffect(() => {
    if (!accessToken && hasCheckedToken) {
      router.push('/sign-in');
    }
  }, [accessToken, hasCheckedToken, router]);

  if (accessToken && !user) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
