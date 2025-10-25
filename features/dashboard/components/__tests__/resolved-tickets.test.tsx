import { render, screen } from '@testing-library/react';
import { ResolvedTickets } from '../resolved-tickets';
import * as hooks from '../../hooks/use-resolved-tickets';

jest.mock('../../hooks/use-resolved-tickets');
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: ({ tickFormatter }: { tickFormatter?: (value: string) => string }) => {
    if (tickFormatter) tickFormatter('Agent 1');
    return <div data-testid="x-axis" />;
  },
  YAxis: ({ tickFormatter }: { tickFormatter?: (value: number) => string }) => {
    if (tickFormatter) tickFormatter(100);
    return <div data-testid="y-axis" />;
  },
  Tooltip: ({
    content
  }: {
    content?: (props: {
      active: boolean;
      payload: Array<{ name: string; value: number }>;
    }) => React.ReactNode;
  }) => {
    if (content && typeof content === 'function') {
      content({ active: true, payload: [{ name: 'Agent 1', value: 50 }] });
    }
    return <div data-testid="tooltip" />;
  },
  ReferenceLine: () => <div data-testid="reference-line" />,
  Cell: () => <div data-testid="cell" />
}));

const mockUseResolvedTickets = hooks.useResolvedTickets as jest.MockedFunction<
  typeof hooks.useResolvedTickets
>;

describe('ResolvedTickets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton when loading', () => {
    mockUseResolvedTickets.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: true,
      error: null
    });

    const { container } = render(<ResolvedTickets />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseResolvedTickets.mockReturnValue({
      agents: [{ id: '1', name: 'Agent 1', ticketsResolved: 50 }],
      hasAgents: true,
      isLoading: false,
      error: null
    });

    render(<ResolvedTickets />);
    expect(
      screen.getByText('Tickets Resolved by Agent - Team')
    ).toBeInTheDocument();
  });

  it('renders empty state when no agents', () => {
    mockUseResolvedTickets.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: false,
      error: null
    });

    render(<ResolvedTickets />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(
      screen.getByText('No tickets resolved by agent')
    ).toBeInTheDocument();
  });

  it('renders chart when agents exist', () => {
    mockUseResolvedTickets.mockReturnValue({
      agents: [
        { id: '1', name: 'Agent 1', ticketsResolved: 50 },
        { id: '2', name: 'Agent 2', ticketsResolved: 30 }
      ],
      hasAgents: true,
      isLoading: false,
      error: null
    });

    render(<ResolvedTickets />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('renders expand button', () => {
    mockUseResolvedTickets.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: false,
      error: null
    });

    render(<ResolvedTickets />);
    expect(screen.getByLabelText('Expand')).toBeInTheDocument();
  });

  it('renders more options button', () => {
    mockUseResolvedTickets.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: false,
      error: null
    });

    render(<ResolvedTickets />);
    expect(screen.getByLabelText('More options')).toBeInTheDocument();
  });
});
