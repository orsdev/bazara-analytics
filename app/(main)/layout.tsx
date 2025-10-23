import { ChildrenProps } from '@/types';
import { cookies } from 'next/headers';
import { authTokenKey } from '@/constants';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/providers';

export default async function MainLayout({ children }: ChildrenProps) {
  const accessToken = (await cookies()).get(authTokenKey)?.value;

  if (!accessToken) {
    return redirect('/sign-in');
  }

  return <AuthProvider>{children}</AuthProvider>;
}
