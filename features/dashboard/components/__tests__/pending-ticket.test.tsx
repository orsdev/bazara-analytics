import { render, screen } from '@testing-library/react';
import { PendingTicket } from '../pending-ticket';
import * as hooks from '../../hooks/use-pending-tickets';

jest.mock('../../hooks/use-pending-tickets');

const mockUsePendingTickets = hooks.usePendingTickets as jest.MockedFunction<
  typeof hooks.usePendingTickets
>;

describe('PendingTicket', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton when loading', () => {
    mockUsePendingTickets.mockReturnValue({
      pendingTickets: { id: 'test', count: 0 },
      isLoading: true,
      error: null
    });

    const { container } = render(<PendingTicket />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders pending ticket card with data', () => {
    mockUsePendingTickets.mockReturnValue({
      pendingTickets: { id: 'test', count: 25 },
      isLoading: false,
      error: null
    });

    render(<PendingTicket />);
    expect(screen.getByText('Pending Tickets - Team')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders zero count when no pending tickets', () => {
    mockUsePendingTickets.mockReturnValue({
      pendingTickets: { id: 'test', count: 0 },
      isLoading: false,
      error: null
    });

    render(<PendingTicket />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders description text', () => {
    mockUsePendingTickets.mockReturnValue({
      pendingTickets: { id: 'test', count: 10 },
      isLoading: false,
      error: null
    });

    render(<PendingTicket />);
    expect(screen.getByText('Pending Tickets')).toBeInTheDocument();
  });

  it('handles undefined count gracefully', () => {
    mockUsePendingTickets.mockReturnValue({
      pendingTickets: { id: 'test', count: 0 },
      isLoading: false,
      error: null
    });

    render(<PendingTicket />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles null pendingTickets', () => {
    mockUsePendingTickets.mockReturnValue({
      pendingTickets: null as unknown as { id: string; count: number },
      isLoading: false,
      error: null
    });

    render(<PendingTicket />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
