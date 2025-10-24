import { cn } from '@/lib';
import { ChildrenProps, ClassNameProps } from '@/types';

export function NavbarLayout({ children }: ChildrenProps) {
  return (
    <nav className="w-full bg-white border-b py-4">
      <div className="flex items-center justify-between gap-6.5 max-w-xl2 mx-auto px-5 sm:px-10">
        {children}
      </div>
    </nav>
  );
}

interface NavbarSectionProps extends ChildrenProps, ClassNameProps {
  position?: 'left' | 'center' | 'right';
}

export function NavbarSection({
  children,
  className,
  position = 'left'
}: NavbarSectionProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        {
          'gap-10 xl:max-w-[23.63rem] w-full': position === 'left',
          'max-w-239 gap-6.5': position === 'right',
          'flex-1 justify-center': position === 'center'
        },
        className
      )}
    >
      {children}
    </div>
  );
}
