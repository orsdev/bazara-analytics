import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../ui/navbar/navbar';
import { NavbarLayout, NavbarSection } from '../ui/navbar/navbar-layout';

// Mock all the navbar sub-components
jest.mock('../ui/avatar-menu', () => ({
  AvatarMenu: () => <div data-testid="avatar-menu">Avatar Menu</div>
}));

jest.mock('../ui/logo', () => ({
  Logo: ({ className }: { className?: string }) => (
    <div data-testid="logo" className={className}>
      Logo
    </div>
  )
}));

jest.mock('../ui/navbar/navbar-search-bar', () => ({
  NavbarSearchBar: () => <div data-testid="navbar-search-bar">Search Bar</div>
}));

jest.mock('../ui/navbar/navigation-menu', () => ({
  NavigationMenu: ({
    items
  }: {
    items?: Array<{ id: string; label: string; href: string }>;
  }) => (
    <nav data-testid="navigation-menu" data-items-count={items?.length || 0}>
      Navigation Menu
    </nav>
  )
}));

jest.mock('../ui/navbar/action-buttons', () => ({
  ActionButtons: ({
    className,
    onNotificationClick,
    onGridClick,
    showBadge,
    badgeCount
  }: {
    className?: string;
    onNotificationClick?: () => void;
    onGridClick?: () => void;
    showBadge?: boolean;
    badgeCount?: number;
  }) => (
    <div
      data-testid="action-buttons"
      className={className}
      onClick={() => {
        onNotificationClick?.();
        onGridClick?.();
      }}
      data-show-badge={showBadge}
      data-badge-count={badgeCount}
    >
      Action Buttons
    </div>
  )
}));

jest.mock('../ui/navbar/mobile-navigation', () => ({
  MobileNavigation: () => <div data-testid="mobile-navigation">Mobile Nav</div>
}));

// Mock constants
jest.mock('@/constants', () => ({
  menuItems: [
    { id: '1', label: 'Home', href: '/' },
    { id: '2', label: 'Dashboard', href: '/dashboard' },
    { id: '3', label: 'Settings', href: '/settings' }
  ]
}));

describe('Navbar', () => {
  const mockNotificationClick = jest.fn();
  const mockGridClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<Navbar />)).not.toThrow();
  });

  it('renders Logo component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders NavbarSearchBar component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('navbar-search-bar')).toBeInTheDocument();
  });

  it('renders NavigationMenu with menu items', () => {
    render(<Navbar />);
    const navMenu = screen.getByTestId('navigation-menu');
    expect(navMenu).toBeInTheDocument();
    expect(navMenu).toHaveAttribute('data-items-count', '3');
  });

  it('renders ActionButtons component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
  });

  it('renders AvatarMenu component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('avatar-menu')).toBeInTheDocument();
  });

  it('renders MobileNavigation component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('mobile-navigation')).toBeInTheDocument();
  });

  it('calls default notification click handler', () => {
    // Mock alert to avoid console output
    const originalAlert = window.alert;
    window.alert = jest.fn();

    render(<Navbar />);
    const actionButtons = screen.getByTestId('action-buttons');

    fireEvent.click(actionButtons);

    expect(window.alert).toHaveBeenCalledWith('Notifications');
    expect(window.alert).toHaveBeenCalledWith('Grid');

    window.alert = originalAlert;
  });

  it('calls custom notification and grid click handlers', () => {
    render(
      <Navbar
        onNotificationClick={mockNotificationClick}
        onGridClick={mockGridClick}
      />
    );
    const actionButtons = screen.getByTestId('action-buttons');

    fireEvent.click(actionButtons);

    expect(mockNotificationClick).toHaveBeenCalledTimes(1);
    expect(mockGridClick).toHaveBeenCalledTimes(1);
  });

  it('passes notification badge props to ActionButtons', () => {
    render(<Navbar showNotificationBadge={true} notificationCount={5} />);
    const actionButtons = screen.getByTestId('action-buttons');
    expect(actionButtons).toHaveAttribute('data-show-badge', 'true');
    expect(actionButtons).toHaveAttribute('data-badge-count', '5');
  });

  it('passes correct className to ActionButtons', () => {
    render(<Navbar />);
    const actionButtons = screen.getByTestId('action-buttons');
    expect(actionButtons).toHaveClass('max-w-[9.34rem] w-full');
  });

  it('passes correct className to Logo', () => {
    render(<Navbar />);
    const logo = screen.getByTestId('logo');
    expect(logo).toHaveClass('w-21.5 h-5.5');
  });

  it('renders NavbarLayout with correct structure', () => {
    render(<Navbar />);
    // The NavbarLayout should render a nav element with specific class
    const navs = screen.getAllByRole('navigation');
    const navbarLayout = navs.find(
      (nav) =>
        nav.classList.contains('w-full') && nav.classList.contains('bg-white')
    );
    expect(navbarLayout).toBeInTheDocument();
  });
});

describe('NavbarLayout', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <NavbarLayout>
          <div>Test Content</div>
        </NavbarLayout>
      )
    ).not.toThrow();
  });

  it('renders as navigation element', () => {
    render(
      <NavbarLayout>
        <div>Test Content</div>
      </NavbarLayout>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <NavbarLayout>
        <div>Test Content</div>
      </NavbarLayout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});

describe('NavbarSection', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <NavbarSection>
          <div>Test Content</div>
        </NavbarSection>
      )
    ).not.toThrow();
  });

  it('renders children content', () => {
    render(
      <NavbarSection>
        <div>Test Content</div>
      </NavbarSection>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies left position classes by default', () => {
    render(
      <NavbarSection>
        <div>Test Content</div>
      </NavbarSection>
    );
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('gap-10');
    expect(section).toHaveClass('xl:max-w-[23.63rem]');
  });

  it('applies right position classes', () => {
    render(
      <NavbarSection position="right">
        <div>Test Content</div>
      </NavbarSection>
    );
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('max-w-239');
    expect(section).toHaveClass('gap-6.5');
  });

  it('applies center position classes', () => {
    render(
      <NavbarSection position="center">
        <div>Test Content</div>
      </NavbarSection>
    );
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('flex-1');
    expect(section).toHaveClass('justify-center');
  });

  it('applies custom className', () => {
    render(
      <NavbarSection className="custom-class">
        <div>Test Content</div>
      </NavbarSection>
    );
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('custom-class');
  });

  it('always applies base flex classes', () => {
    render(
      <NavbarSection>
        <div>Test Content</div>
      </NavbarSection>
    );
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveClass('flex');
    expect(section).toHaveClass('items-center');
  });
});
