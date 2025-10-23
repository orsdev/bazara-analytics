import { ChildrenProps } from '@/types';
import { cookies } from 'next/headers';
import { authTokenKey } from '@/constants';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: ChildrenProps) {
  const accessToken = (await cookies()).get(authTokenKey)?.value;

  if (accessToken) {
    return redirect('/dashboard');
  }

  return (
    <main className="relative flex flex-col justify-center items-center h-dvh bg-[url('/auth-bg.png')] bg-cover bg-center bg-no-repeat w-full p-4">
      {children}
    </main>
  );
}
