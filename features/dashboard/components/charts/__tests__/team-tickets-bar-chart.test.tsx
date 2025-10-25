import { render, screen } from '@testing-library/react';
import { TeamTicketsBarChart } from '../team-tickets-bar-chart';
import * as hooks from '../../../hooks/use-team-tickets-metrics';

jest.mock('../../../hooks/use-team-tickets-metrics');
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

const mockUseTeamTicketsMetrics =
  hooks.useTeamTicketsMetrics as jest.MockedFunction<
    typeof hooks.useTeamTicketsMetrics
  >;

describe('TeamTicketsBarChart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton when loading', () => {
    mockUseTeamTicketsMetrics.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: true,
      error: null
    });

    const { container } = render(<TeamTicketsBarChart />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseTeamTicketsMetrics.mockReturnValue({
      agents: [{ id: '1', name: 'Agent 1', ticketsResolved: 50 }],
      hasAgents: true,
      isLoading: false,
      error: null
    });

    render(<TeamTicketsBarChart />);
    expect(
      screen.getByText('Tickets Resolved by Agent - Team')
    ).toBeInTheDocument();
  });

  it('renders empty state when no agents', () => {
    mockUseTeamTicketsMetrics.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: false,
      error: null
    });

    render(<TeamTicketsBarChart />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(
      screen.getByText('No tickets resolved by agent')
    ).toBeInTheDocument();
  });

  it('renders chart when agents exist', () => {
    mockUseTeamTicketsMetrics.mockReturnValue({
      agents: [
        { id: '1', name: 'Agent 1', ticketsResolved: 50 },
        { id: '2', name: 'Agent 2', ticketsResolved: 30 }
      ],
      hasAgents: true,
      isLoading: false,
      error: null
    });

    render(<TeamTicketsBarChart />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('renders expand button', () => {
    mockUseTeamTicketsMetrics.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: false,
      error: null
    });

    render(<TeamTicketsBarChart />);
    expect(screen.getByLabelText('Expand')).toBeInTheDocument();
  });

  it('renders more options button', () => {
    mockUseTeamTicketsMetrics.mockReturnValue({
      agents: [],
      hasAgents: false,
      isLoading: false,
      error: null
    });

    render(<TeamTicketsBarChart />);
    expect(screen.getByLabelText('More options')).toBeInTheDocument();
  });
});
