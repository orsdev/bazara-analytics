'use client';

import { menuItems } from '@/constants';
import { AvatarMenu } from '../avatar-menu';
import { Logo } from '../logo';
import { MobileNavigation } from './mobile-navigation';
import { NavbarLayout, NavbarSection } from './navbar-layout';
import { NavigationMenu } from './navigation-menu';
import { ActionButtons } from './action-buttons';
import { NavbarSearchBar } from './navbar-search-bar';

interface NavbarProps {
  onNotificationClick?: () => void;
  onGridClick?: () => void;
  showNotificationBadge?: boolean;
  notificationCount?: number;
}

export const Navbar = ({
  onNotificationClick = () => alert('Notifications'),
  onGridClick = () => alert('Grid'),
  showNotificationBadge = false,
  notificationCount = 0
}: NavbarProps) => {
  return (
    <NavbarLayout>
      <NavbarSection position="left">
        <Logo className="w-21.5 h-5.5" />
        <NavbarSearchBar />
      </NavbarSection>

      <NavbarSection position="right">
        <div className="hidden xl:flex items-center justify-center gap-8 flex-1">
          <NavigationMenu items={menuItems} />
        </div>

        <div className="flex items-center gap-6">
          {/* Divider */}
          <div className="items-center h-6 w-px bg-border hidden xl:flex" />

          {/* Right Side Actions */}
          <ActionButtons
            className="max-w-[9.34rem] w-full"
            onNotificationClick={onNotificationClick}
            onGridClick={onGridClick}
            showBadge={showNotificationBadge}
            badgeCount={notificationCount}
          />

          <AvatarMenu />
        </div>

        <MobileNavigation />
      </NavbarSection>
    </NavbarLayout>
  );
};
