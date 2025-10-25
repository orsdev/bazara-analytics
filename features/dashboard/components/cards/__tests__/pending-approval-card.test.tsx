import { render, screen } from '@testing-library/react';
import { PendingApprovalCard } from '../pending-approval-card';
import * as hooks from '../../../hooks/use-pending-approvals';

jest.mock('../../../hooks/use-pending-approvals');

const mockUsePendingApprovals =
  hooks.usePendingApprovals as jest.MockedFunction<
    typeof hooks.usePendingApprovals
  >;

describe('PendingApproval', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton when loading', () => {
    mockUsePendingApprovals.mockReturnValue({
      pendingApprovals: { id: 'test', count: 0 },
      isLoading: true,
      error: null
    });

    const { container } = render(<PendingApprovalCard />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders pending approval card with data', () => {
    mockUsePendingApprovals.mockReturnValue({
      pendingApprovals: { id: 'test', count: 15 },
      isLoading: false,
      error: null
    });

    render(<PendingApprovalCard />);
    expect(screen.getByText('Pending Approval - Me')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders zero count when no pending approvals', () => {
    mockUsePendingApprovals.mockReturnValue({
      pendingApprovals: { id: 'test', count: 0 },
      isLoading: false,
      error: null
    });

    render(<PendingApprovalCard />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders description text', () => {
    mockUsePendingApprovals.mockReturnValue({
      pendingApprovals: { id: 'test', count: 10 },
      isLoading: false,
      error: null
    });

    render(<PendingApprovalCard />);
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
  });

  it('handles undefined count gracefully', () => {
    mockUsePendingApprovals.mockReturnValue({
      pendingApprovals: { id: 'test', count: 0 },
      isLoading: false,
      error: null
    });

    render(<PendingApprovalCard />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles null pendingApprovals', () => {
    mockUsePendingApprovals.mockReturnValue({
      pendingApprovals: null as unknown as { id: string; count: number },
      isLoading: false,
      error: null
    });

    render(<PendingApprovalCard />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
