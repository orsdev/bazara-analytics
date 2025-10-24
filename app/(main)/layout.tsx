import { Navbar, SubNavbar, ControlPanel } from '@/components/ui';
import { AuthProvider } from '@/providers';
import { ChildrenProps } from '@/types';

export default async function MainLayout({ children }: ChildrenProps) {
  return (
    <AuthProvider>
      <main className="w-full relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-secondary before:z-1">
        <div className="z-2 relative">
          <Navbar />
        </div>
        <div className="flex flex-col sticky top-0 z-20">
          <SubNavbar />
          <ControlPanel />
        </div>
        <div className="p-6 relative z-3">{children}</div>
      </main>
    </AuthProvider>
  );
}
