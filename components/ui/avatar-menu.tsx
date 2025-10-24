'use client';

import { useAuth, useUser } from '@/features/auth/hooks';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './dropdown-menu';
import { AvatarSVGIcon, LogoutSVGIcon, UserSVGIcon } from './icons';

export function AvatarMenu() {
  const { logout } = useAuth();
  const { user } = useUser();

  const { avatar, name, email } = user || {};

  return (
    <>
      <div className="w-9 h-9">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer"
            aria-label="Open user menu"
            aria-expanded="false"
            aria-haspopup="menu"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="User"
                  width={36}
                  height={36}
                  className="object-contain rounded-full h-full w-full"
                />
              ) : (
                <div className="w-9 h-9 flex items-center justify-center">
                  <AvatarSVGIcon />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[14.63rem]  py-4 rounded-[0.75rem] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.1),0px_8px_8px_-4px_rgba(16,24,40,0.04)]"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <div className="flex gap-2 px-4.5 mb-2">
              <div className="w-9 h-9">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="User"
                    width={36}
                    height={36}
                    className="object-contain rounded-full h-full w-full"
                  />
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center">
                    <AvatarSVGIcon size={36} />
                  </div>
                )}
              </div>
              <div className="flex-col">
                <p className="font-medium text-black text-sm">{name}</p>
                <p className="text-xs font-normal">{email}</p>
              </div>
            </div>
            <DropdownMenuItem
              className="cursor-pointer text-sm py-2.5 px-4.5 gap-4 hover:bg-primary/5!"
              data-test="profile"
            >
              <UserSVGIcon size={24} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-sm py-2.5 px-4.5 text-destructive! gap-4 hover:bg-primary/5! mt-2"
              onClick={logout}
              data-test="logout"
            >
              <LogoutSVGIcon className="scale-150" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
