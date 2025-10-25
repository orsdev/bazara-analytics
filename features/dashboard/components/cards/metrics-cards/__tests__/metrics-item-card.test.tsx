import { render, screen } from '@testing-library/react';
import { MetricsItemCard } from '../metrics-item-card';

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  Line: () => <div data-testid="line" />,
  linearGradient: () => null,
  defs: () => null,
  stop: () => null
}));

describe('MetricsItemCard', () => {
  const defaultProps = {
    title: 'Total Tickets',
    value: 150,
    change: {
      value: '12%',
      label: 'this week',
      isPositive: true
    },
    chartData: [10, 20, 30, 40, 50]
  };

  it('renders title correctly', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByText('Total Tickets')).toBeInTheDocument();
  });

  it('renders numeric value with locale formatting', () => {
    render(<MetricsItemCard {...defaultProps} value={1000} />);
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('renders string value without formatting', () => {
    render(<MetricsItemCard {...defaultProps} value="2:30" />);
    expect(screen.getByText('2:30')).toBeInTheDocument();
  });

  it('renders positive change indicator', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByText(/↑ 12%/)).toBeInTheDocument();
    expect(screen.getByText(/↑ 12%/)).toHaveClass('text-green-600');
  });

  it('renders negative change indicator', () => {
    const propsWithNegativeChange = {
      ...defaultProps,
      change: {
        value: '5%',
        label: 'this month',
        isPositive: false
      }
    };

    render(<MetricsItemCard {...propsWithNegativeChange} />);
    expect(screen.getByText(/↓ 5%/)).toBeInTheDocument();
    expect(screen.getByText(/↓ 5%/)).toHaveClass('text-red-600');
  });

  it('renders change label', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByText('this week')).toBeInTheDocument();
  });

  it('renders chart when chartData is provided', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('does not render chart when chartData is empty', () => {
    render(<MetricsItemCard {...defaultProps} chartData={[]} />);
    expect(screen.queryByTestId('area-chart')).not.toBeInTheDocument();
  });

  it('does not render chart when chartData is not provided', () => {
    const { title, value, change } = defaultProps;
    render(<MetricsItemCard title={title} value={value} change={change} />);
    expect(screen.queryByTestId('area-chart')).not.toBeInTheDocument();
  });

  it('does not render change section when change is not provided', () => {
    const { title, value, chartData } = defaultProps;
    render(
      <MetricsItemCard title={title} value={value} chartData={chartData} />
    );
    expect(screen.queryByText(/↑/)).not.toBeInTheDocument();
    expect(screen.queryByText(/↓/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MetricsItemCard {...defaultProps} className="custom-class" />
    );
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('applies default styling classes', () => {
    const { container } = render(<MetricsItemCard {...defaultProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass(
      'p-5',
      'rounded-[0.75rem]',
      'shadow-[0px_0px_4px_rgba(150,143,143,0.15)]'
    );
  });

  it('handles large numeric values', () => {
    render(<MetricsItemCard {...defaultProps} value={1234567} />);
    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });

  it('handles zero value', () => {
    render(<MetricsItemCard {...defaultProps} value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('defaults isPositive to true when not specified', () => {
    const propsWithoutIsPositive = {
      ...defaultProps,
      change: {
        value: '8%',
        label: 'this quarter'
      }
    };

    render(<MetricsItemCard {...propsWithoutIsPositive} />);
    expect(screen.getByText(/↑ 8%/)).toBeInTheDocument();
    expect(screen.getByText(/↑ 8%/)).toHaveClass('text-green-600');
  });

  it('renders chart with correct dimensions', () => {
    const { container } = render(<MetricsItemCard {...defaultProps} />);
    const chartWrapper = container.querySelector('.w-\\[8\\.44rem\\]');
    expect(chartWrapper).toBeInTheDocument();
    expect(chartWrapper).toHaveClass('h-10');
  });

  it('formats chart data correctly for rendering', () => {
    render(<MetricsItemCard {...defaultProps} chartData={[10, 20, 30]} />);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getAllByTestId('line')).toHaveLength(2); // Main line + forecast line
  });

  it('renders title with correct styling', () => {
    render(<MetricsItemCard {...defaultProps} />);
    const title = screen.getByText('Total Tickets');
    expect(title).toHaveClass('text-sm', 'font-normal', 'mb-4');
  });

  it('renders value with correct styling', () => {
    render(<MetricsItemCard {...defaultProps} />);
    const value = screen.getByText('150');
    expect(value.tagName).toBe('H3');
    expect(value).toHaveClass('text-lg', 'font-bold', 'text-black');
  });

  it('renders change label with correct styling', () => {
    render(<MetricsItemCard {...defaultProps} />);
    const label = screen.getByText('this week');
    expect(label).toHaveClass('text-xs', 'text-gray-500');
  });

  it('handles single data point in chartData', () => {
    render(<MetricsItemCard {...defaultProps} chartData={[50]} />);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('handles multiple metrics with different chart data lengths', () => {
    const { rerender } = render(
      <MetricsItemCard {...defaultProps} chartData={[1, 2, 3]} />
    );
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();

    rerender(
      <MetricsItemCard
        {...defaultProps}
        chartData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    );
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('renders responsive container for chart', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renders area component in chart', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByTestId('area')).toBeInTheDocument();
  });

  it('creates forecast data from chartData', () => {
    const chartData = [10, 20, 30];
    render(<MetricsItemCard {...defaultProps} chartData={chartData} />);
    // The component creates forecast data by offsetting the values
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('handles negative values in chartData', () => {
    render(<MetricsItemCard {...defaultProps} chartData={[-10, -20, -30]} />);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('renders all chart components when data is available', () => {
    render(<MetricsItemCard {...defaultProps} />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('area')).toBeInTheDocument();
    expect(screen.getAllByTestId('line')).toHaveLength(2);
  });

  it('maintains proper layout structure', () => {
    const { container } = render(<MetricsItemCard {...defaultProps} />);
    const flexContainer = container.querySelector(
      '.flex.gap-2.items-center.justify-between'
    );
    expect(flexContainer).toBeInTheDocument();
  });

  it('renders change indicator with correct font weight', () => {
    render(<MetricsItemCard {...defaultProps} />);
    const changeElement = screen.getByText(/↑ 12%/);
    expect(changeElement).toHaveClass('text-sm', 'font-medium');
  });
});
