import { render, screen } from '@testing-library/react';
import { ResponseTimeItem } from '../response-time-item';

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

describe('ResponseTimeItem', () => {
  it('renders title, value, and unit', () => {
    render(
      <ResponseTimeItem
        title="Incident Response Time"
        value="2:30:00"
        unit="Hours"
        change={{ value: '10%', label: 'this week', isPositive: true }}
        chartData={[]}
      />
    );

    expect(screen.getByText('Incident Response Time')).toBeInTheDocument();
    expect(screen.getByText('2:30:00')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
  });

  it('renders positive change indicator', () => {
    const { container } = render(
      <ResponseTimeItem
        title="Test"
        value="1:00:00"
        unit="Hours"
        change={{ value: '15%', label: 'this week', isPositive: true }}
        chartData={[]}
      />
    );

    expect(container.querySelector('.text-green-600')).toBeInTheDocument();
    expect(screen.getByText(/15%/)).toBeInTheDocument();
  });

  it('renders negative change indicator', () => {
    const { container } = render(
      <ResponseTimeItem
        title="Test"
        value="1:00:00"
        unit="Hours"
        change={{ value: '10%', label: 'this week', isPositive: false }}
        chartData={[]}
      />
    );

    expect(container.querySelector('.text-red-600')).toBeInTheDocument();
    expect(screen.getByText(/10%/)).toBeInTheDocument();
  });

  it('renders chart when chartData is provided', () => {
    render(
      <ResponseTimeItem
        title="Test"
        value="1:00:00"
        unit="Hours"
        change={{ value: '10%', label: 'this week', isPositive: true }}
        chartData={[
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 }
        ]}
      />
    );

    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('does not render chart when chartData is empty', () => {
    render(
      <ResponseTimeItem
        title="Test"
        value="1:00:00"
        unit="Hours"
        change={{ value: '10%', label: 'this week', isPositive: true }}
        chartData={[]}
      />
    );

    expect(screen.queryByTestId('area-chart')).not.toBeInTheDocument();
  });

  it('applies green color for positive change', () => {
    const { container } = render(
      <ResponseTimeItem
        title="Test"
        value="1:00:00"
        unit="Hours"
        change={{ value: '10%', label: 'test', isPositive: true }}
        chartData={[]}
      />
    );

    const changeElement = container.querySelector('.text-green-600');
    expect(changeElement).toBeInTheDocument();
  });

  it('applies red color for negative change', () => {
    const { container } = render(
      <ResponseTimeItem
        title="Test"
        value="1:00:00"
        unit="Hours"
        change={{ value: '10%', label: 'test', isPositive: false }}
        chartData={[]}
      />
    );

    const changeElement = container.querySelector('.text-red-600');
    expect(changeElement).toBeInTheDocument();
  });
});
