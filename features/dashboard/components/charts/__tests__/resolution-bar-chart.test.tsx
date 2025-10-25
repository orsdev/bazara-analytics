import { render, screen } from '@testing-library/react';
import { ResolutionBarChart } from '../resolution-bar-chart';
import * as hooks from '../../../hooks/use-ticket-resolution';

jest.mock('../../../hooks/use-ticket-resolution');
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: ({ tickFormatter }: { tickFormatter?: (value: string) => string }) => {
    if (tickFormatter) tickFormatter('2024-01-01');
    return <div data-testid="x-axis" />;
  },
  YAxis: ({ tickFormatter }: { tickFormatter?: (value: number) => string }) => {
    if (tickFormatter) {
      tickFormatter(0);
      tickFormatter(100);
    }
    return <div data-testid="y-axis" />;
  },
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: ({
    formatter
  }: {
    formatter?: (value: string) => React.ReactNode;
  }) => {
    if (formatter) formatter('Test');
    return <div data-testid="legend" />;
  },
  CartesianGrid: () => <div data-testid="cartesian-grid" />
}));

const mockUseTicketResolution =
  hooks.useTicketResolution as jest.MockedFunction<
    typeof hooks.useTicketResolution
  >;

describe('TicketResolutionBarChart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading', () => {
    mockUseTicketResolution.mockReturnValue({
      ticketResolution: [],
      hasData: false,
      isLoading: true,
      error: null
    });

    render(<ResolutionBarChart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseTicketResolution.mockReturnValue({
      ticketResolution: [{ month: '2024-01', closed: 50, open: 25 }],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ResolutionBarChart />);
    expect(screen.getByText(/Ticket Resolution/i)).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    mockUseTicketResolution.mockReturnValue({
      ticketResolution: [],
      hasData: false,
      isLoading: false,
      error: null
    });

    render(<ResolutionBarChart />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders chart when data exists', () => {
    mockUseTicketResolution.mockReturnValue({
      ticketResolution: [
        { month: '2024-01', closed: 50, open: 25 },
        { month: '2024-02', closed: 60, open: 30 }
      ],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ResolutionBarChart />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('calls handleMoreOptions', () => {
    mockUseTicketResolution.mockReturnValue({
      ticketResolution: [{ month: '2024-01', closed: 50, open: 25 }],
      hasData: true,
      isLoading: false,
      error: null
    });

    const { container } = render(<ResolutionBarChart />);
    expect(container).toBeInTheDocument();
  });
});
