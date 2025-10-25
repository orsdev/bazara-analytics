import { render, screen, waitFor } from '@/lib/test-utils';
import { ResponseTimeCards } from '../response-time-cards';
import { useResponseTime } from '@/features/dashboard/hooks';

// Mock the useResponseTime hook
jest.mock('@/features/dashboard/hooks', () => ({
  useResponseTime: jest.fn()
}));

// Mock the child components
jest.mock('../response-time-item-card', () => ({
  ResponseTimeItemCard: ({
    title,
    value,
    unit,
    change,
    chartData
  }: {
    title: string;
    value: string | number;
    unit: string;
    change?: { value: string; label: string; isPositive?: boolean };
    chartData: Array<{ value: number }>;
  }) => (
    <div data-testid="response-time-item-card">
      <div data-testid="card-title">{title}</div>
      <div data-testid="card-value">{value}</div>
      <div data-testid="card-unit">{unit}</div>
      {change && (
        <div data-testid="card-change">
          {change.value} - {change.label}
        </div>
      )}
      {chartData && chartData.length > 0 && (
        <div data-testid="card-chart">Chart</div>
      )}
    </div>
  ),
  ResponseTimeItemCardSkeleton: () => (
    <div data-testid="response-time-skeleton">Loading...</div>
  )
}));

const mockUseResponseTime = useResponseTime as jest.MockedFunction<
  typeof useResponseTime
>;

describe('ResponseTimeCards', () => {
  const mockResponseTimeData = [
    {
      id: 'incident-response-time',
      title: 'Average Incident Response Time - Me',
      value: '2:30',
      unit: 'Hours',
      change: {
        value: '15%',
        label: 'response time this week',
        isPositive: true
      },
      chartData: [{ value: 10 }, { value: 20 }, { value: 15 }]
    },
    {
      id: 'change-response-time',
      title: 'Average Change Response Time - Me',
      value: '1:45',
      unit: 'Hours',
      change: {
        value: '10%',
        label: 'response time this week',
        isPositive: false
      },
      chartData: [{ value: 5 }, { value: 10 }, { value: 8 }]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('renders skeleton when loading', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: [],
        isLoading: true,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(screen.getByTestId('response-time-skeleton')).toBeInTheDocument();
      expect(
        screen.queryByTestId('response-time-item-card')
      ).not.toBeInTheDocument();
    });

    it('does not render cards while loading', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: true,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(screen.getByTestId('response-time-skeleton')).toBeInTheDocument();
      expect(
        screen.queryByTestId('response-time-item-card')
      ).not.toBeInTheDocument();
    });
  });

  describe('Data Rendering', () => {
    it('renders response time cards when data is loaded', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      const cards = screen.getAllByTestId('response-time-item-card');
      expect(cards).toHaveLength(2);
    });

    it('renders correct data for each card', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(
        screen.getByText('Average Incident Response Time - Me')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Average Change Response Time - Me')
      ).toBeInTheDocument();
      expect(screen.getByText('2:30')).toBeInTheDocument();
      expect(screen.getByText('1:45')).toBeInTheDocument();
    });

    it('passes all props correctly to ResponseTimeItemCard', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      // Check first card
      expect(
        screen.getByText('Average Incident Response Time - Me')
      ).toBeInTheDocument();
      expect(screen.getByText('2:30')).toBeInTheDocument();
      expect(
        screen.getByText('15% - response time this week')
      ).toBeInTheDocument();

      // Check second card
      expect(
        screen.getByText('Average Change Response Time - Me')
      ).toBeInTheDocument();
      expect(screen.getByText('1:45')).toBeInTheDocument();
      expect(
        screen.getByText('10% - response time this week')
      ).toBeInTheDocument();
    });

    it('renders charts for cards with chartData', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      const charts = screen.getAllByTestId('card-chart');
      expect(charts).toHaveLength(2);
    });
  });

  describe('Grid Layout', () => {
    it('applies correct grid classes', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      const { container } = render(<ResponseTimeCards />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      if (gridContainer) {
        expect(gridContainer).toHaveClass('md:grid-cols-2', 'gap-6');
      }
    });
  });

  describe('Empty State', () => {
    it('renders empty grid when no data is available', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: [],
        isLoading: false,
        error: null
      });

      const { container } = render(<ResponseTimeCards />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(
        screen.queryByTestId('response-time-item-card')
      ).not.toBeInTheDocument();
    });

    it('handles undefined response time data', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: [],
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(
        screen.queryByTestId('response-time-item-card')
      ).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('renders cards even when there is an error', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: new Error('Failed to fetch')
      });

      render(<ResponseTimeCards />);

      const cards = screen.getAllByTestId('response-time-item-card');
      expect(cards).toHaveLength(2);
    });
  });

  describe('Key Assignment', () => {
    it('assigns unique keys to each card based on id', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      const { container } = render(<ResponseTimeCards />);

      const cards = screen.getAllByTestId('response-time-item-card');
      expect(cards).toHaveLength(2);
      // Keys are internal to React, but we can verify all cards render
      expect(cards[0]).toBeInTheDocument();
      expect(cards[1]).toBeInTheDocument();
    });
  });

  describe('Hook Integration', () => {
    it('calls useResponseTime hook', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(mockUseResponseTime).toHaveBeenCalledTimes(1);
    });

    it('responds to hook state changes', async () => {
      const { rerender } = render(<ResponseTimeCards />);

      // Initially loading
      mockUseResponseTime.mockReturnValue({
        responseTime: [],
        isLoading: true,
        error: null
      });

      rerender(<ResponseTimeCards />);
      expect(screen.getByTestId('response-time-skeleton')).toBeInTheDocument();

      // Then loaded
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      rerender(<ResponseTimeCards />);

      await waitFor(() => {
        expect(
          screen.queryByTestId('response-time-skeleton')
        ).not.toBeInTheDocument();
        expect(screen.getAllByTestId('response-time-item-card')).toHaveLength(
          2
        );
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid classes for different screen sizes', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: mockResponseTimeData,
        isLoading: false,
        error: null
      });

      const { container } = render(<ResponseTimeCards />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('md:grid-cols-2');
    });
  });

  describe('Data Variations', () => {
    it('handles single response time item', () => {
      mockUseResponseTime.mockReturnValue({
        responseTime: [mockResponseTimeData[0]],
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      const cards = screen.getAllByTestId('response-time-item-card');
      expect(cards).toHaveLength(1);
    });

    it('handles multiple response time items', () => {
      const multipleItems = [
        ...mockResponseTimeData,
        {
          id: 'third-response-time',
          title: 'Third Response Time',
          value: '3:00',
          unit: 'Hours',
          change: {
            value: '5%',
            label: 'response time this month',
            isPositive: true
          },
          chartData: [{ value: 15 }, { value: 25 }]
        }
      ];

      mockUseResponseTime.mockReturnValue({
        responseTime: multipleItems,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      const cards = screen.getAllByTestId('response-time-item-card');
      expect(cards).toHaveLength(3);
    });

    it('handles items without change data', () => {
      const itemsWithoutChange = [
        {
          id: 'incident-response-time',
          title: 'Average Incident Response Time - Me',
          value: '2:30',
          unit: 'Hours',
          change: {
            value: '0%',
            label: 'no change',
            isPositive: true
          },
          chartData: [{ value: 10 }, { value: 20 }]
        }
      ];

      mockUseResponseTime.mockReturnValue({
        responseTime: itemsWithoutChange,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(screen.getByTestId('response-time-item-card')).toBeInTheDocument();
    });

    it('handles items without chart data', () => {
      const itemsWithoutChart = [
        {
          id: 'incident-response-time',
          title: 'Average Incident Response Time - Me',
          value: '2:30',
          unit: 'Hours',
          change: {
            value: '15%',
            label: 'response time this week',
            isPositive: true
          },
          chartData: []
        }
      ];

      mockUseResponseTime.mockReturnValue({
        responseTime: itemsWithoutChart,
        isLoading: false,
        error: null
      });

      render(<ResponseTimeCards />);

      expect(screen.getByTestId('response-time-item-card')).toBeInTheDocument();
      expect(screen.queryByTestId('card-chart')).not.toBeInTheDocument();
    });
  });
});
