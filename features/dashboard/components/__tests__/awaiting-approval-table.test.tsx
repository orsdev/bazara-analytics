import { render, screen } from '@testing-library/react';
import { AwaitingApprovalTable } from '../awaiting-approval-table';
import * as hooks from '../../hooks/use-requests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RequestStatus, Request } from '../../types';

jest.mock('../../hooks/use-requests');
jest.mock('../../hooks/use-tickets-filter', () => ({
  useTicketsFilter: () => ({
    searchTerm: '',
    handleSearchChange: jest.fn(),
    handleClearSearch: jest.fn(),
    debouncedSearchValue: '',
    selectedStartDate: null,
    selectedEndDate: null,
    setSelectedStartDate: jest.fn(),
    setSelectedEndDate: jest.fn(),
    hasStartDate: false,
    hasEndDate: false,
    hasDateFilter: false
  })
}));

const mockUseRequests = hooks.useRequests as jest.MockedFunction<
  typeof hooks.useRequests
>;

describe('AwaitingApprovalTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('renders loading skeleton when loading', () => {
    mockUseRequests.mockReturnValue({
      requests: [],
      hasData: false,
      isLoading: true,
      isRefetching: false,
      error: null
    });

    const { container } = render(<AwaitingApprovalTable />, { wrapper });
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders title', () => {
    mockUseRequests.mockReturnValue({
      requests: [],
      hasData: false,
      isLoading: false,
      isRefetching: false,
      error: null
    });

    render(<AwaitingApprovalTable />, { wrapper });
    expect(screen.getByText(/Awaiting Approval/i)).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    mockUseRequests.mockReturnValue({
      requests: [],
      hasData: false,
      isLoading: false,
      isRefetching: false,
      error: null
    });

    render(<AwaitingApprovalTable />, { wrapper });
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders table when data exists', () => {
    mockUseRequests.mockReturnValue({
      requests: [
        {
          id: '1',
          title: 'Test Request',
          status: RequestStatus.PENDING,
          priority: 'High',
          createdAt: '2024-01-01'
        } as Request
      ],
      hasData: true,
      isLoading: false,
      isRefetching: false,
      error: null
    });

    render(<AwaitingApprovalTable />, { wrapper });
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
