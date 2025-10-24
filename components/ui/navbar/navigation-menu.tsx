'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/tw-merge';
import { ClassNameProps } from '@/types';

interface MenuItem {
  label: string;
  href: string;
}

interface NavigationMenuProps extends ClassNameProps {
  items: MenuItem[];
}

export function NavigationMenu({ items, className }: NavigationMenuProps) {
  const pathname = usePathname();

  const isRouteActive = (targetRoute: string, currentPath: string) => {
    if (!targetRoute) return false;
    if (currentPath === targetRoute) return true;

    if (currentPath.startsWith(targetRoute + '/')) {
      return targetRoute !== '/dashboard';
    }

    return false;
  };

  return (
    <nav className={cn('flex items-center justify-center gap-8', className)}>
      {items.map((item) => {
        const isActive = isRouteActive(item.href, pathname);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'text-sm font-normal flex items-center justify-center transition-colors',
              {
                'text-primary bg-primary/10 rounded-sm h-6.5 px-2': isActive,
                'hover:text-primary': !isActive
              }
            )}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
