import { render, screen } from '@testing-library/react';
import { Bell } from 'lucide-react';
import { PendingItemCard } from '../ui/cards/pending-item-card';

jest.mock('../ui', () => ({
  DefaultCard: ({
    title,
    children,
    headerIcon,
    handleMoreOptions
  }: {
    title: string;
    children: React.ReactNode;
    headerIcon: React.ReactNode;
    handleMoreOptions: () => void;
  }) => {
    return (
      <div data-testid="default-card">
        <div data-testid="card-header">
          <span>{title}</span>
          {headerIcon}
          <button onClick={handleMoreOptions}>More</button>
        </div>
        <div data-testid="card-body">{children}</div>
      </div>
    );
  }
}));

describe('PendingItemCard', () => {
  const defaultProps = {
    title: 'Pending Tickets',
    value: 42,
    description: 'Tickets awaiting approval',
    headerIcon: <Bell data-testid="header-icon" />,
    handleMoreOptions: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with all required props', () => {
    render(<PendingItemCard {...defaultProps} />);

    expect(screen.getByText('Pending Tickets')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Tickets awaiting approval')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon')).toBeInTheDocument();
  });

  it('renders with string value', () => {
    render(<PendingItemCard {...defaultProps} value="N/A" />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders with numeric value', () => {
    render(<PendingItemCard {...defaultProps} value={1234} />);

    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders with optional body icon', () => {
    render(
      <PendingItemCard
        {...defaultProps}
        bodyIcon={<Bell data-testid="body-icon" />}
      />
    );

    expect(screen.getByTestId('body-icon')).toBeInTheDocument();
  });
});
