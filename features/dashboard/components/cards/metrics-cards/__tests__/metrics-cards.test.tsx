import { render, screen } from '@testing-library/react';
import { MetricsCards } from '../metrics-cards';
import * as hooks from '@/features/dashboard/hooks/use-dashboard-metrics';

jest.mock('../../../../hooks/use-dashboard-metrics');
jest.mock('../metrics-item-card', () => ({
  MetricsItemCard: ({
    title,
    value,
    change,
    chartData
  }: {
    title: string;
    value: number;
    change?: { value: string; label: string; isPositive?: boolean };
    chartData?: number[];
  }) => (
    <div data-testid="metrics-item-card">
      <span>{title}</span>
      <span>{value}</span>
      {change && (
        <span data-testid="card-change">
          {change.value} - {change.label}
        </span>
      )}
      {chartData && chartData.length > 0 && (
        <span data-testid="card-chart">Chart</span>
      )}
    </div>
  )
}));

const mockUseDashboardMetrics =
  hooks.useDashboardMetrics as jest.MockedFunction<
    typeof hooks.useDashboardMetrics
  >;

describe('MetricsCards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [],
      isLoading: true,
      error: null
    });

    const { container } = render(<MetricsCards />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(4);
  });

  it('renders metrics item cards when data is available', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [
        {
          id: '1',
          title: 'Total Tickets',
          value: 100,
          change: { value: '10%', label: 'this week', isPositive: true },
          chartData: [1, 2, 3, 4, 5]
        },
        {
          id: '2',
          title: 'Open Tickets',
          value: 50,
          change: { value: '5%', label: 'this week', isPositive: true },
          chartData: [2, 3, 4, 5, 6]
        }
      ],
      isLoading: false,
      error: null
    });

    render(<MetricsCards />);
    const items = screen.getAllByTestId('metrics-item-card');
    expect(items).toHaveLength(2);
  });

  it('renders correct grid layout classes', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [],
      isLoading: false,
      error: null
    });

    const { container } = render(<MetricsCards />);
    const grid = container.firstChild;
    expect(grid).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'xl:grid-cols-4'
    );
  });

  it('passes correct props to MetricsItemCard', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [
        {
          id: '1',
          title: 'Test Metric',
          value: 123,
          change: { value: '15%', label: 'this month', isPositive: false },
          chartData: [1, 2, 3]
        }
      ],
      isLoading: false,
      error: null
    });

    render(<MetricsCards />);
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('15% - this month')).toBeInTheDocument();
  });

  it('renders empty grid when no metrics', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [],
      isLoading: false,
      error: null
    });

    const { container } = render(<MetricsCards />);
    const grid = container.firstChild;
    expect(grid).toBeInTheDocument();
    expect(screen.queryAllByTestId('metrics-item-card')).toHaveLength(0);
  });

  it('renders all 4 loading skeletons with correct styling', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [],
      isLoading: true,
      error: null
    });

    const { container } = render(<MetricsCards />);
    const skeletons = container.querySelectorAll('.bg-gray-100');
    expect(skeletons).toHaveLength(4);

    skeletons.forEach((skeleton) => {
      expect(skeleton).toHaveClass(
        'h-32',
        'rounded-[0.75rem]',
        'animate-pulse'
      );
    });
  });

  it('handles metrics with chart data', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [
        {
          id: '1',
          title: 'Metric with Chart',
          value: 200,
          change: { value: '20%', label: 'this quarter', isPositive: true },
          chartData: [10, 20, 30, 40, 50]
        }
      ],
      isLoading: false,
      error: null
    });

    render(<MetricsCards />);
    expect(screen.getByTestId('card-chart')).toBeInTheDocument();
  });

  it('handles metrics without chart data', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [
        {
          id: '1',
          title: 'Metric without Chart',
          value: 150,
          change: { value: '8%', label: 'this year', isPositive: true },
          chartData: []
        }
      ],
      isLoading: false,
      error: null
    });

    render(<MetricsCards />);
    expect(screen.queryByTestId('card-chart')).not.toBeInTheDocument();
  });

  it('renders multiple metrics with different values', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [
        {
          id: '1',
          title: 'Metric 1',
          value: 100,
          change: { value: '10%', label: 'week', isPositive: true },
          chartData: [1, 2, 3]
        },
        {
          id: '2',
          title: 'Metric 2',
          value: 200,
          change: { value: '20%', label: 'month', isPositive: false },
          chartData: [4, 5, 6]
        },
        {
          id: '3',
          title: 'Metric 3',
          value: 300,
          change: { value: '30%', label: 'year', isPositive: true },
          chartData: [7, 8, 9]
        }
      ],
      isLoading: false,
      error: null
    });

    render(<MetricsCards />);
    expect(screen.getByText('Metric 1')).toBeInTheDocument();
    expect(screen.getByText('Metric 2')).toBeInTheDocument();
    expect(screen.getByText('Metric 3')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
  });
});
