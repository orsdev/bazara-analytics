import { render, screen, fireEvent } from '@testing-library/react';
import { DefaultCard } from '../ui/cards/default-card';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  EllipsisVerticalIcon: ({ size }: { size?: number }) => (
    <svg data-testid="ellipsis-icon" data-size={size} />
  )
}));

describe('DefaultCard', () => {
  const mockHandleMoreOptions = jest.fn();
  const defaultProps = {
    title: 'Test Card',
    headerIcon: <svg data-testid="header-icon" />,
    children: <div>Card Content</div>,
    handleMoreOptions: mockHandleMoreOptions
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<DefaultCard {...defaultProps} />)).not.toThrow();
  });

  it('displays the title', () => {
    render(<DefaultCard {...defaultProps} />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('renders the header icon', () => {
    render(<DefaultCard {...defaultProps} />);
    expect(screen.getByTestId('header-icon')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<DefaultCard {...defaultProps} />);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders expand button with correct aria-label', () => {
    render(<DefaultCard {...defaultProps} />);
    const expandButton = screen.getByLabelText('Expand');
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveAttribute('type', 'button');
  });

  it('renders more options button with correct aria-label', () => {
    render(<DefaultCard {...defaultProps} />);
    const moreButton = screen.getByLabelText('More options');
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toHaveAttribute('type', 'button');
  });

  it('calls handleMoreOptions when more options button is clicked', () => {
    render(<DefaultCard {...defaultProps} />);
    const moreButton = screen.getByLabelText('More options');

    fireEvent.click(moreButton);

    expect(mockHandleMoreOptions).toHaveBeenCalledTimes(1);
  });

  it('renders ellipsis icon in more options button', () => {
    render(<DefaultCard {...defaultProps} />);
    expect(screen.getByTestId('ellipsis-icon')).toBeInTheDocument();
  });

  it('renders horizontal divider', () => {
    const { container } = render(<DefaultCard {...defaultProps} />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
  });

  it('handles multiple clicks on more options button', () => {
    render(<DefaultCard {...defaultProps} />);
    const moreButton = screen.getByLabelText('More options');

    fireEvent.click(moreButton);
    fireEvent.click(moreButton);
    fireEvent.click(moreButton);

    expect(mockHandleMoreOptions).toHaveBeenCalledTimes(3);
  });

  it('renders with custom title', () => {
    render(<DefaultCard {...defaultProps} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.queryByText('Test Card')).not.toBeInTheDocument();
  });

  it('renders with different children', () => {
    render(
      <DefaultCard {...defaultProps}>
        <p>Different content</p>
        <button>Action Button</button>
      </DefaultCard>
    );

    expect(screen.getByText('Different content')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });
});
