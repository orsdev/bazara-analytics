import { ChildrenProps, ClassNameProps } from '@/types';
import { cn } from '@/lib/tw-merge';

interface NavbarLayoutProps extends ChildrenProps, ClassNameProps {
  variant?: 'default' | 'compact';
}

export function NavbarLayout({
  children,
  className,
  variant = 'default'
}: NavbarLayoutProps) {
  return (
    <nav
      className={cn(
        'w-full bg-white border-b py-4',
        {
          'px-5 sm:px-10': variant === 'default',
          'px-4': variant === 'compact'
        },
        className
      )}
    >
      <div className="flex items-center justify-between gap-6.5 max-w-xl2 mx-auto">
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
