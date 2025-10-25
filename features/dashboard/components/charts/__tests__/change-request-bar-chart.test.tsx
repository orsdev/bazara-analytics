import { render, screen } from '@testing-library/react';
import { ChangeRequestBarChart } from '../change-request-bar-chart';
import * as hooks from '../../../hooks/use-change-request-status';

jest.mock('../../../hooks/use-change-request-status');
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: ({ tickFormatter }: { tickFormatter?: (value: string) => string }) => {
    if (tickFormatter) tickFormatter('Open');
    return <div data-testid="x-axis" />;
  },
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: ({
    content
  }: {
    content?: (props: {
      active: boolean;
      payload: Array<{ name: string; value: number }>;
    }) => React.ReactNode;
  }) => {
    if (content && typeof content === 'function') {
      content({ active: true, payload: [{ name: 'Open', value: 10 }] });
    }
    return <div data-testid="tooltip" />;
  },
  Cell: () => <div data-testid="cell" />
}));

const mockUseChangeRequestStatus =
  hooks.useChangeRequestStatus as jest.MockedFunction<
    typeof hooks.useChangeRequestStatus
  >;

describe('ChangeRequestBarChart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading', () => {
    mockUseChangeRequestStatus.mockReturnValue({
      changeRequestStatus: [],
      hasData: false,
      isLoading: true,
      error: null
    });

    render(<ChangeRequestBarChart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseChangeRequestStatus.mockReturnValue({
      changeRequestStatus: [{ name: 'Open', value: 10 }],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestBarChart />);
    expect(screen.getByText('Change Request By Status')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    mockUseChangeRequestStatus.mockReturnValue({
      changeRequestStatus: [],
      hasData: false,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestBarChart />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders chart when data exists', () => {
    mockUseChangeRequestStatus.mockReturnValue({
      changeRequestStatus: [
        { name: 'Open', value: 10 },
        { name: 'Closed', value: 20 }
      ],
      hasData: true,
      isLoading: false,
      error: null
    });

    render(<ChangeRequestBarChart />);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
