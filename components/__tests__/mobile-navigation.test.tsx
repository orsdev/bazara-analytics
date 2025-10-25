import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNavigation } from '../ui/navbar/mobile-navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

// Mock nextjs-toploader
jest.mock('nextjs-toploader/app', () => ({
  useRouter: jest.fn()
}));

// Mock constants
jest.mock('@/constants', () => ({
  menuItems: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' }
  ]
}));

// Mock dropdown components
jest.mock('../ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuTrigger: ({
    children,
    className,
    'aria-label': ariaLabel
  }: {
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
    asChild?: boolean;
  }) => (
    <button
      data-testid="dropdown-trigger"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
    className
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <div
      data-testid="dropdown-item"
      onClick={onClick}
      className={className}
      role="menuitem"
    >
      {children}
    </div>
  )
}));

// Mock icons
jest.mock('../ui/icons', () => ({
  HamburgerSVGIcon: ({ size }: { size?: number }) => (
    <svg data-testid="hamburger-icon" data-size={size} />
  )
}));

describe('MobileNavigation', () => {
  const mockPush = jest.fn();
  const mockUsePathname = require('next/navigation').usePathname;
  const mockUseRouter = require('nextjs-toploader/app').useRouter;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue('/');
  });

  it('renders without crashing', () => {
    expect(() => render(<MobileNavigation />)).not.toThrow();
  });

  it('renders hamburger icon', () => {
    render(<MobileNavigation />);
    expect(screen.getByTestId('hamburger-icon')).toBeInTheDocument();
  });

  it('renders dropdown menu', () => {
    render(<MobileNavigation />);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('renders dropdown trigger with correct aria-label', () => {
    render(<MobileNavigation />);
    const trigger = screen.getByTestId('dropdown-trigger');
    expect(trigger).toHaveAttribute('aria-label', 'Open navigation menu');
  });

  it('renders all menu items', () => {
    render(<MobileNavigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('navigates when menu item is clicked', () => {
    render(<MobileNavigation />);
    const menuItems = screen.getAllByTestId('dropdown-item');

    fireEvent.click(menuItems[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('highlights active route', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<MobileNavigation />);

    const menuItems = screen.getAllByTestId('dropdown-item');
    const dashboardItem = menuItems[1];

    expect(dashboardItem.className).toContain('text-primary');
    expect(dashboardItem.className).toContain('bg-primary/10');
  });

  it('does not highlight inactive routes', () => {
    mockUsePathname.mockReturnValue('/');
    render(<MobileNavigation />);

    const menuItems = screen.getAllByTestId('dropdown-item');
    const dashboardItem = menuItems[1];

    expect(dashboardItem.className).not.toContain('text-primary');
  });

  it('handles navigation to different routes', () => {
    render(<MobileNavigation />);
    const menuItems = screen.getAllByTestId('dropdown-item');

    fireEvent.click(menuItems[1]);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');

    fireEvent.click(menuItems[2]);
    expect(mockPush).toHaveBeenCalledWith('/settings');
  });

  it('correctly identifies active route for exact match', () => {
    mockUsePathname.mockReturnValue('/settings');
    render(<MobileNavigation />);

    const menuItems = screen.getAllByTestId('dropdown-item');
    const settingsItem = menuItems[2];

    expect(settingsItem.className).toContain('text-primary');
  });

  it('correctly identifies active route for sub-routes', () => {
    mockUsePathname.mockReturnValue('/settings/profile');
    render(<MobileNavigation />);

    const menuItems = screen.getAllByTestId('dropdown-item');
    const settingsItem = menuItems[2];

    expect(settingsItem.className).toContain('text-primary');
  });

  it('does not mark dashboard as active for dashboard sub-routes', () => {
    mockUsePathname.mockReturnValue('/dashboard/analytics');
    render(<MobileNavigation />);

    const menuItems = screen.getAllByTestId('dropdown-item');
    const dashboardItem = menuItems[1];

    expect(dashboardItem.className).not.toContain('text-primary');
  });
});
