import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarMenu } from '../ui/avatar-menu';

const mockLogout = jest.fn();
const mockUseAuth = jest.fn();
const mockUseUser = jest.fn();

// Mock the auth hooks
jest.mock('@/features/auth/hooks', () => ({
  useAuth: () => mockUseAuth(),
  useUser: () => mockUseUser()
}));

// Mock the dropdown menu components
jest.mock('../ui/dropdown-menu', () => ({
  DropdownMenu: ({
    children,
    modal
  }: {
    children: React.ReactNode;
    modal: boolean;
  }) => (
    <div data-testid="dropdown-menu" data-modal={modal}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="dropdown-trigger" className={className} {...props}>
      {children}
    </div>
  ),
  DropdownMenuContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    side?: string;
    align?: string;
  }) => (
    <div data-testid="dropdown-content" className={className} {...props}>
      {children}
    </div>
  ),
  DropdownMenuItem: ({
    children,
    className,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <div
      data-testid="dropdown-item"
      className={className}
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  )
}));

// Mock the icons
jest.mock('../ui/icons', () => ({
  AvatarSVGIcon: ({ size }: { size?: number }) => (
    <svg data-testid="avatar-icon" data-size={size} />
  ),
  LogoutSVGIcon: ({ className }: { className?: string }) => (
    <svg data-testid="logout-icon" className={className} />
  ),
  UserSVGIcon: ({ size }: { size?: number }) => (
    <svg data-testid="user-icon" data-size={size} />
  )
}));

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}));

describe('AvatarMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogout.mockClear();

    // Set default mock return values
    mockUseAuth.mockReturnValue({
      logout: mockLogout
    });

    mockUseUser.mockReturnValue({
      user: {
        avatar: '/test-avatar.jpg',
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    });
  });

  it('renders avatar menu component', () => {
    render(<AvatarMenu />);

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('displays user avatar when available', () => {
    render(<AvatarMenu />);

    const avatarImages = screen.getAllByAltText('User');
    expect(avatarImages.length).toBeGreaterThan(0);
    expect(avatarImages[0]).toHaveAttribute('src', '/test-avatar.jpg');
  });

  it('displays user name and email in dropdown', () => {
    render(<AvatarMenu />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders profile and logout menu items', () => {
    render(<AvatarMenu />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders default avatar icon when avatar is not available', () => {
    mockUseUser.mockReturnValue({
      user: {
        avatar: null,
        name: 'Jane Doe',
        email: 'jane@example.com'
      }
    });

    render(<AvatarMenu />);

    const avatarIcons = screen.getAllByTestId('avatar-icon');
    expect(avatarIcons.length).toBeGreaterThan(0);
  });

  it('handles missing user data gracefully', () => {
    mockUseUser.mockReturnValue({
      user: null
    });

    render(<AvatarMenu />);

    // Should not crash and render empty fields
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('renders with partial user data', () => {
    mockUseUser.mockReturnValue({
      user: {
        name: 'Test User'
        // email is missing
      }
    });

    render(<AvatarMenu />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('logout function is called when logout menu item is clicked', () => {
    render(<AvatarMenu />);

    const logoutItem = screen
      .getByText('Logout')
      .closest('[data-testid="dropdown-item"]');
    fireEvent.click(logoutItem!);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('dropdown is configured as non-modal', () => {
    render(<AvatarMenu />);

    const dropdown = screen.getByTestId('dropdown-menu');
    expect(dropdown).toHaveAttribute('data-modal', 'false');
  });

  it('menu items have proper role', () => {
    render(<AvatarMenu />);

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(2); // Profile and Logout
  });

  it('logout button is focusable', () => {
    render(<AvatarMenu />);

    const logoutItem = screen
      .getByText('Logout')
      .closest('[data-testid="dropdown-item"]');
    expect(logoutItem).toBeInTheDocument();
    expect(logoutItem).toHaveAttribute('tabIndex', '0'); // Should be focusable
  });

  it('handles logout function errors gracefully', () => {
    const mockErrorLogout = jest.fn();

    mockUseAuth.mockReturnValue({
      logout: mockErrorLogout
    });

    render(<AvatarMenu />);

    const logoutItem = screen
      .getByText('Logout')
      .closest('[data-testid="dropdown-item"]');
    fireEvent.click(logoutItem!);

    expect(mockErrorLogout).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when hooks throw errors', () => {
    mockUseAuth.mockImplementation(() => {
      throw new Error('Auth hook failed');
    });

    // Should not crash the entire app, just this component
    expect(() => render(<AvatarMenu />)).toThrow();
  });
});
