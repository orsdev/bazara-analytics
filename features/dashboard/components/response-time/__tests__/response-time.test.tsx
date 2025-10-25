import { render, screen } from '@testing-library/react';
import { ResponseTime } from '../response-time';
import * as hooks from '../../../hooks/use-response-time';

jest.mock('../../../hooks/use-response-time');
jest.mock('../response-time-item', () => ({
  ResponseTimeItem: ({
    title,
    value,
    unit
  }: {
    title: string;
    value: string;
    unit: string;
  }) => (
    <div data-testid="response-time-item">
      <span>{title}</span>
      <span>{value}</span>
      <span>{unit}</span>
    </div>
  )
}));

const mockUseResponseTime = hooks.useResponseTime as jest.MockedFunction<
  typeof hooks.useResponseTime
>;

describe('ResponseTime', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    mockUseResponseTime.mockReturnValue({
      responseTime: [],
      isLoading: true,
      error: null
    });

    const { container } = render(<ResponseTime />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders response time items', () => {
    mockUseResponseTime.mockReturnValue({
      responseTime: [
        {
          id: '1',
          title: 'Incident Response Time',
          value: '2:30:00',
          unit: 'Hours',
          change: { value: '10%', label: 'this week', isPositive: true },
          chartData: []
        },
        {
          id: '2',
          title: 'Change Response Time',
          value: '1:15:00',
          unit: 'Hours',
          change: { value: '5%', label: 'this week', isPositive: false },
          chartData: []
        }
      ],
      isLoading: false,
      error: null
    });

    render(<ResponseTime />);
    const items = screen.getAllByTestId('response-time-item');
    expect(items).toHaveLength(2);
  });

  it('renders grid layout', () => {
    mockUseResponseTime.mockReturnValue({
      responseTime: [],
      isLoading: false,
      error: null
    });

    const { container } = render(<ResponseTime />);
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid', 'md:grid-cols-2');
  });
});
