import { render, screen } from '@/lib/test-utils';
import {
  ResponseTimeItemCard,
  ResponseTimeItemCardSkeleton
} from '../response-time-item-card';

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div className="recharts-responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div className="recharts-area-chart" data-testid="area-chart">
      {children}
    </div>
  ),
  Area: () => <div className="recharts-area" />,
  Line: () => <div className="recharts-line" />,
  linearGradient: () => null,
  defs: () => null,
  stop: () => null
}));

describe('ResponseTimeItemCard', () => {
  const mockChartData = [
    { value: 10 },
    { value: 20 },
    { value: 15 },
    { value: 25 },
    { value: 30 }
  ];

  const defaultProps = {
    title: 'Average Response Time',
    value: '2:30',
    unit: 'Hours',
    chartData: mockChartData
  };

  describe('Rendering', () => {
    it('renders the card with title, value, and unit', () => {
      render(<ResponseTimeItemCard {...defaultProps} />);

      expect(screen.getByText('Average Response Time')).toBeInTheDocument();
      expect(screen.getByText('2:30')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
    });

    it('renders the expand button with correct aria-label', () => {
      render(<ResponseTimeItemCard {...defaultProps} />);

      const expandButton = screen.getByRole('button', {
        name: /expand button/i
      });
      expect(expandButton).toBeInTheDocument();
    });

    it('renders without change data when not provided', () => {
      render(<ResponseTimeItemCard {...defaultProps} />);

      expect(screen.queryByText(/↑/)).not.toBeInTheDocument();
      expect(screen.queryByText(/↓/)).not.toBeInTheDocument();
    });

    it('renders with positive change indicator', () => {
      const propsWithChange = {
        ...defaultProps,
        change: {
          value: '15%',
          label: 'response time this week',
          isPositive: true
        }
      };

      render(<ResponseTimeItemCard {...propsWithChange} />);

      expect(screen.getByText(/↑/)).toBeInTheDocument();
      expect(screen.getByText(/↑ 15%/)).toBeInTheDocument();
      expect(screen.getByText('response time this week')).toBeInTheDocument();
    });

    it('renders with negative change indicator', () => {
      const propsWithChange = {
        ...defaultProps,
        change: {
          value: '10%',
          label: 'response time this week',
          isPositive: false
        }
      };

      render(<ResponseTimeItemCard {...propsWithChange} />);

      expect(screen.getByText(/↓/)).toBeInTheDocument();
      expect(screen.getByText(/↓ 10%/)).toBeInTheDocument();
    });

    it('renders chart when chartData is provided', () => {
      const { container } = render(<ResponseTimeItemCard {...defaultProps} />);

      // Check for ResponsiveContainer which wraps the chart
      const chartContainer = container.querySelector(
        '.recharts-responsive-container'
      );
      expect(chartContainer).toBeInTheDocument();
    });

    it('does not render chart when chartData is empty', () => {
      const propsWithoutChart = {
        ...defaultProps,
        chartData: []
      };

      const { container } = render(
        <ResponseTimeItemCard {...propsWithoutChart} />
      );

      const chartContainer = container.querySelector(
        '.recharts-responsive-container'
      );
      expect(chartContainer).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies green color for positive change', () => {
      const propsWithChange = {
        ...defaultProps,
        change: {
          value: '15%',
          label: 'response time this week',
          isPositive: true
        }
      };

      const { container } = render(
        <ResponseTimeItemCard {...propsWithChange} />
      );

      const changeElement = screen.getByText(/↑ 15%/);
      expect(changeElement).toHaveClass('text-green-600');
    });

    it('applies red color for negative change', () => {
      const propsWithChange = {
        ...defaultProps,
        change: {
          value: '10%',
          label: 'response time this week',
          isPositive: false
        }
      };

      render(<ResponseTimeItemCard {...propsWithChange} />);

      const changeElement = screen.getByText(/↓ 10%/);
      expect(changeElement).toHaveClass('text-red-600');
    });

    it('applies correct opacity to unit text', () => {
      render(<ResponseTimeItemCard {...defaultProps} />);

      const unitElement = screen.getByText('Hours');
      expect(unitElement).toHaveClass('opacity-50');
    });
  });

  describe('Accessibility', () => {
    it('has accessible button with aria-label', () => {
      render(<ResponseTimeItemCard {...defaultProps} />);

      const button = screen.getByRole('button', { name: /expand button/i });
      expect(button).toHaveAttribute('aria-label', 'Expand button');
    });

    it('renders semantic HTML structure', () => {
      render(<ResponseTimeItemCard {...defaultProps} />);

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles numeric value type', () => {
      const propsWithNumericValue = {
        ...defaultProps,
        value: 150
      };

      render(<ResponseTimeItemCard {...propsWithNumericValue} />);

      expect(screen.getByText('150')).toBeInTheDocument();
    });

    it('handles string value type', () => {
      const propsWithStringValue = {
        ...defaultProps,
        value: '2:30:45'
      };

      render(<ResponseTimeItemCard {...propsWithStringValue} />);

      expect(screen.getByText('2:30:45')).toBeInTheDocument();
    });

    it('handles change with isPositive undefined (defaults to positive)', () => {
      const propsWithChange = {
        ...defaultProps,
        change: {
          value: '5%',
          label: 'response time this week'
        }
      };

      render(<ResponseTimeItemCard {...propsWithChange} />);

      expect(screen.getByText(/↑/)).toBeInTheDocument();
      const changeElement = screen.getByText(/↑ 5%/);
      expect(changeElement).toHaveClass('text-green-600');
    });
  });
});

describe('ResponseTimeItemCardSkeleton', () => {
  it('renders skeleton loading state', () => {
    const { container } = render(<ResponseTimeItemCardSkeleton />);

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders correct number of skeleton elements', () => {
    const { container } = render(<ResponseTimeItemCardSkeleton />);

    const skeletonElements = container.querySelectorAll('.bg-gray-100');
    expect(skeletonElements).toHaveLength(2);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<ResponseTimeItemCardSkeleton />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('p-4', 'rounded-[0.75rem]', 'animate-pulse');
  });
});
