import { render, screen } from '@testing-library/react';
import { MetricsGrid } from '../metrics-grid';
import * as hooks from '../../../hooks/use-dashboard-metrics';

jest.mock('../../../hooks/use-dashboard-metrics');
jest.mock('../metrics-grid-item', () => ({
  MetricsGridItem: ({ title, value }: { title: string; value: number }) => (
    <div data-testid="metrics-grid-item">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}));

const mockUseDashboardMetrics =
  hooks.useDashboardMetrics as jest.MockedFunction<
    typeof hooks.useDashboardMetrics
  >;

describe('MetricsGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [],
      isLoading: true,
      error: null
    });

    const { container } = render(<MetricsGrid />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(4);
  });

  it('renders metrics grid items', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [
        {
          id: '1',
          title: 'Total Tickets',
          value: 100,
          change: { value: '10%', label: 'this week', isPositive: true },
          chartData: []
        },
        {
          id: '2',
          title: 'Open Tickets',
          value: 50,
          change: { value: '5%', label: 'this week', isPositive: true },
          chartData: []
        }
      ],
      isLoading: false,
      error: null
    });

    render(<MetricsGrid />);
    const items = screen.getAllByTestId('metrics-grid-item');
    expect(items).toHaveLength(2);
  });

  it('renders correct grid layout classes', () => {
    mockUseDashboardMetrics.mockReturnValue({
      metrics: [],
      isLoading: false,
      error: null
    });

    const { container } = render(<MetricsGrid />);
    const grid = container.firstChild;
    expect(grid).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'xl:grid-cols-4'
    );
  });

  it('passes correct props to MetricsGridItem', () => {
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

    render(<MetricsGrid />);
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
