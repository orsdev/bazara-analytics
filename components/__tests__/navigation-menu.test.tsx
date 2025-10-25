import { render, screen } from '@testing-library/react';
import { NavigationMenu } from '../ui/navbar/navigation-menu';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

const mockMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings', href: '/settings' }
];

describe('NavigationMenu', () => {
  const mockUsePathname = require('next/navigation').usePathname;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  it('renders without crashing', () => {
    expect(() =>
      render(<NavigationMenu items={mockMenuItems} />)
    ).not.toThrow();
  });

  it('renders as a nav element', () => {
    render(<NavigationMenu items={mockMenuItems} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    render(<NavigationMenu items={mockMenuItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(<NavigationMenu items={mockMenuItems} />);
    const homeLink = screen.getByText('Home').closest('a');
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const settingsLink = screen.getByText('Settings').closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  it('highlights active route', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<NavigationMenu items={mockMenuItems} />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink?.className).toContain('text-primary');
    expect(dashboardLink?.className).toContain('bg-primary/10');
  });

  it('does not highlight inactive routes', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavigationMenu items={mockMenuItems} />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink?.className).not.toContain('bg-primary/10');
    expect(dashboardLink?.className).toContain('hover:text-primary');
  });

  it('applies custom className', () => {
    const { container } = render(
      <NavigationMenu items={mockMenuItems} className="custom-class" />
    );
    const nav = container.querySelector('.custom-class');
    expect(nav).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    render(<NavigationMenu items={[]} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav.children).toHaveLength(0);
  });

  it('correctly identifies active route for exact match', () => {
    mockUsePathname.mockReturnValue('/settings');
    render(<NavigationMenu items={mockMenuItems} />);

    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink?.className).toContain('text-primary');
  });

  it('correctly identifies active route for sub-routes', () => {
    mockUsePathname.mockReturnValue('/settings/profile');
    render(<NavigationMenu items={mockMenuItems} />);

    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink?.className).toContain('text-primary');
  });

  it('does not mark dashboard as active for dashboard sub-routes', () => {
    mockUsePathname.mockReturnValue('/dashboard/analytics');
    render(<NavigationMenu items={mockMenuItems} />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink?.className).not.toContain('bg-primary/10');
    expect(dashboardLink?.className).toContain('hover:text-primary');
  });

  it('handles root path correctly', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavigationMenu items={mockMenuItems} />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink?.className).toContain('text-primary');
  });

  it('renders correct number of links', () => {
    render(<NavigationMenu items={mockMenuItems} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('handles items with special characters', () => {
    const specialItems = [
      { label: 'About & Contact', href: '/about' },
      { label: "FAQ's", href: '/faq' }
    ];
    render(<NavigationMenu items={specialItems} />);
    expect(screen.getByText('About & Contact')).toBeInTheDocument();
    expect(screen.getByText("FAQ's")).toBeInTheDocument();
  });
});
