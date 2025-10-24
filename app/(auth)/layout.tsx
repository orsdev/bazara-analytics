import { ChildrenProps } from '@/types';

export default async function AuthLayout({ children }: ChildrenProps) {
  return (
    <main className="relative flex flex-col justify-center items-center h-dvh bg-[url('/auth-bg.png')] bg-cover bg-center bg-no-repeat w-full p-4">
      {children}
    </main>
  );
}
