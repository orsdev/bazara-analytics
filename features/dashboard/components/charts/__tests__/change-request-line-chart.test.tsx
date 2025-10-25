import { render, screen } from '@testing-library/react';
import * as hooks from '../../../hooks/use-change-requests';
import { ChangeRequestLineChart } from '..';

jest.mock('../../../hooks/use-change-requests');
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: ({ tickFormatter }: { tickFormatter?: (value: string) => string }) => {
    if (tickFormatter) tickFormatter('2024-01-01');
    return <div data-testid="x-axis" />;
  },
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: ({
    labelFormatter
  }: {
    labelFormatter?: (value: string) => string;
  }) => {
    if (labelFormatter) labelFormatter('2024-01-01');
    return <div data-testid="tooltip" />;
  },
  Legend: () => <div data-testid="legend" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />
}));

const mockUseChangeRequests = hooks.useChangeRequests as jest.MockedFunction<
  typeof hooks.useChangeRequests
>;

describe('ChangeRequestLineChart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading', () => {
    mockUseChangeRequests.mockReturnValue({
      requestData: [],
      hasData: false,
      isLoading: true,
      error: null
    });

    render(<ChangeRequestLineChart />);
    expect(screen.getByText('Loading chart data...')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseChangeRequests.mockReturnValue({
      requestData: [
        { date: '2024-01', emergency: 5, normal: 10, standard: 15 }
      ],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestLineChart />);
    expect(screen.getByText('Change Request By Status')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    mockUseChangeRequests.mockReturnValue({
      requestData: [],
      hasData: false,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestLineChart />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders chart when data exists', () => {
    mockUseChangeRequests.mockReturnValue({
      requestData: [
        { date: '2024-01', emergency: 5, normal: 10, standard: 15 },
        { date: '2024-02', emergency: 7, normal: 12, standard: 18 }
      ],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestLineChart />);
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders custom legend', () => {
    mockUseChangeRequests.mockReturnValue({
      requestData: [
        { date: '2024-01', emergency: 5, normal: 10, standard: 15 }
      ],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestLineChart />);
    expect(screen.getByText('Emergency')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
  });
});
