import { render, screen } from '@testing-library/react';
import { MetricsGridItem } from '../metrics-grid-item';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  Line: () => <div data-testid="line" />
}));

describe('MetricsGridItem', () => {
  it('renders title and value', () => {
    render(<MetricsGridItem title="Total Tickets" value={100} />);
    expect(screen.getByText('Total Tickets')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('formats numeric value with locale string', () => {
    render(<MetricsGridItem title="Test" value={1000} />);
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('renders string value as-is', () => {
    render(<MetricsGridItem title="Test" value="50%" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders positive change indicator', () => {
    render(
      <MetricsGridItem
        title="Test"
        value={100}
        change={{ value: '10%', label: 'this week', isPositive: true }}
      />
    );
    expect(screen.getByText('↑ 10%')).toBeInTheDocument();
    expect(screen.getByText('this week')).toBeInTheDocument();
  });

  it('renders negative change indicator', () => {
    render(
      <MetricsGridItem
        title="Test"
        value={100}
        change={{ value: '5%', label: 'this month', isPositive: false }}
      />
    );
    expect(screen.getByText('↓ 5%')).toBeInTheDocument();
  });

  it('applies green color for positive change', () => {
    const { container } = render(
      <MetricsGridItem
        title="Test"
        value={100}
        change={{ value: '10%', label: 'test', isPositive: true }}
      />
    );
    const changeElement = container.querySelector('.text-green-600');
    expect(changeElement).toBeInTheDocument();
  });

  it('applies red color for negative change', () => {
    const { container } = render(
      <MetricsGridItem
        title="Test"
        value={100}
        change={{ value: '10%', label: 'test', isPositive: false }}
      />
    );
    const changeElement = container.querySelector('.text-red-600');
    expect(changeElement).toBeInTheDocument();
  });

  it('renders chart when chartData is provided', () => {
    render(
      <MetricsGridItem title="Test" value={100} chartData={[1, 2, 3, 4, 5]} />
    );
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('does not render chart when chartData is empty', () => {
    render(<MetricsGridItem title="Test" value={100} chartData={[]} />);
    expect(screen.queryByTestId('area-chart')).not.toBeInTheDocument();
  });

  it('does not render chart when chartData is not provided', () => {
    render(<MetricsGridItem title="Test" value={100} />);
    expect(screen.queryByTestId('area-chart')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MetricsGridItem title="Test" value={100} className="custom-class" />
    );
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toHaveClass('custom-class');
  });

  it('renders without change prop', () => {
    render(<MetricsGridItem title="Test" value={100} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
