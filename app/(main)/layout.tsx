import { Navbar, SubNavbar, ControlPanel } from '@/components/ui';
import { AuthProvider } from '@/providers';
import { ChildrenProps } from '@/types';

export default async function MainLayout({ children }: ChildrenProps) {
  return (
    <AuthProvider>
      <main className="w-full">
        <Navbar />
        <div className="flex flex-col sticky top-0 z-20">
          <SubNavbar />
          <ControlPanel />
        </div>
        <div>{children}</div>
      </main>
    </AuthProvider>
  );
}
