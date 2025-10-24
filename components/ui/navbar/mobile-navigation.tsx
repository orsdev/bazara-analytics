'use client';

import { menuItems } from '@/constants';
import { cn } from '@/lib';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../dropdown-menu';
import { HamburgerSVGIcon } from '../icons';

export function MobileNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const isRouteActive = (targetRoute: string, currentPath: string) => {
    if (!targetRoute) return false;
    if (currentPath === targetRoute) return true;

    if (currentPath.startsWith(targetRoute + '/')) {
      return targetRoute !== '/dashboard';
    }

    return false;
  };

  return (
    <>
      <div className="w-9 h-9 xl:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer m-0 p-0 relative top-1"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-haspopup="menu"
          >
            <HamburgerSVGIcon size={28} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[14.63rem]  py-4 rounded-[0.75rem] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)]"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => {
                const key = item.href;
                const isActive = isRouteActive(item.href, pathname);
                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => router.push(item.href)}
                    className={cn(
                      'text-sm font-normal flex items-center justify-center cursor-pointer py-2.5 px-4.5 gap-4 hover:bg-primary/5!',
                      {
                        'text-primary bg-primary/10 rounded-sm h-6.5 px-2 py-4.5 cursor-pointer ':
                          isActive
                      }
                    )}
                  >
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
