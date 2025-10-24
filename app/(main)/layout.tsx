import { Navbar } from '@/components/ui';
import { AuthProvider } from '@/providers';
import { ChildrenProps } from '@/types';

export default async function MainLayout({ children }: ChildrenProps) {
  return (
    <AuthProvider>
      <main className="w-full">
        <Navbar />
        <div>{children}</div>
      </main>
    </AuthProvider>
  );
}
