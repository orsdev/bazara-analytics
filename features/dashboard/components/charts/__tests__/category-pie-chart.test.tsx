import { render, screen } from '@testing-library/react';
import { CategoryPieChart } from '../category-pie-chart';
import * as hooks from '../../../hooks/use-category-results';

jest.mock('../../../hooks/use-category-results');
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({
    label
  }: {
    label?: (entry: { percent: number; name: string }) => string;
  }) => {
    if (label) label({ percent: 0.5, name: 'Test' });
    return <div data-testid="pie" />;
  },
  Cell: () => <div data-testid="cell" />
}));

const mockUseCategoryResults = hooks.useCategoryResults as jest.MockedFunction<
  typeof hooks.useCategoryResults
>;

describe('CategoryChart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton when loading', () => {
    mockUseCategoryResults.mockReturnValue({
      currency: 'NGN',
      categories: [],
      isLoading: true,
      error: null
    });

    const { container } = render(<CategoryPieChart />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseCategoryResults.mockReturnValue({
      currency: 'NGN',
      categories: [
        { id: '1', name: 'Marketing', value: 5000 },
        { id: '2', name: 'Sales', value: 3000 }
      ],
      isLoading: false,
      error: null
    });

    render(<CategoryPieChart />);
    expect(screen.getByText('Change Result By Category')).toBeInTheDocument();
  });

  it('renders pie chart with categories', () => {
    mockUseCategoryResults.mockReturnValue({
      currency: 'NGN',
      categories: [
        { id: '1', name: 'Marketing', value: 5000 },
        { id: '2', name: 'Sales', value: 3000 }
      ],
      isLoading: false,
      error: null
    });

    render(<CategoryPieChart />);
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  it('displays total spent', () => {
    mockUseCategoryResults.mockReturnValue({
      currency: 'NGN',
      categories: [
        { id: '1', name: 'Marketing', value: 5000 },
        { id: '2', name: 'Sales', value: 3000 }
      ],
      isLoading: false,
      error: null
    });

    render(<CategoryPieChart />);
    expect(screen.getByText('Total Spent')).toBeInTheDocument();
  });

  it('renders category legend', () => {
    mockUseCategoryResults.mockReturnValue({
      currency: 'NGN',
      categories: [
        { id: '1', name: 'Marketing', value: 5000 },
        { id: '2', name: 'Sales', value: 3000 }
      ],
      isLoading: false,
      error: null
    });

    render(<CategoryPieChart />);
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });

  it('handles empty categories', () => {
    mockUseCategoryResults.mockReturnValue({
      currency: 'NGN',
      categories: [],
      isLoading: false,
      error: null
    });

    render(<CategoryPieChart />);
    expect(screen.getByText('Change Result By Category')).toBeInTheDocument();
  });
});
