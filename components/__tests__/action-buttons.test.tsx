import { render, screen, fireEvent } from '@testing-library/react';
import { ActionButtons } from '../ui/navbar/action-buttons';

// Mock icons
jest.mock('../ui/icons', () => ({
  BellSVGIcon: ({ size, className }: { size?: number; className?: string }) => (
    <svg data-testid="bell-icon" data-size={size} className={className} />
  ),
  GridSVGIcon: ({ size }: { size?: number }) => (
    <svg data-testid="grid-icon" data-size={size} />
  )
}));

describe('ActionButtons', () => {
  const mockNotificationClick = jest.fn();
  const mockGridClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<ActionButtons />)).not.toThrow();
  });

  it('renders notification button with correct aria-label', () => {
    render(<ActionButtons />);
    const notificationButton = screen.getByLabelText('Notifications');
    expect(notificationButton).toBeInTheDocument();
    expect(notificationButton).toHaveAttribute('type', 'button');
  });

  it('renders grid button with correct aria-label', () => {
    render(<ActionButtons />);
    const gridButton = screen.getByLabelText('Grid');
    expect(gridButton).toBeInTheDocument();
    expect(gridButton).toHaveAttribute('type', 'button');
  });

  it('renders bell icon', () => {
    render(<ActionButtons />);
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
  });

  it('renders grid icon', () => {
    render(<ActionButtons />);
    expect(screen.getByTestId('grid-icon')).toBeInTheDocument();
  });

  it('calls onNotificationClick when notification button is clicked', () => {
    render(<ActionButtons onNotificationClick={mockNotificationClick} />);
    const notificationButton = screen.getByLabelText('Notifications');

    fireEvent.click(notificationButton);

    expect(mockNotificationClick).toHaveBeenCalledTimes(1);
  });

  it('calls onGridClick when grid button is clicked', () => {
    render(<ActionButtons onGridClick={mockGridClick} />);
    const gridButton = screen.getByLabelText('Grid');

    fireEvent.click(gridButton);

    expect(mockGridClick).toHaveBeenCalledTimes(1);
  });

  it('does not show badge when showBadge is false', () => {
    render(<ActionButtons showBadge={false} badgeCount={5} />);
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('does not show badge when badgeCount is 0', () => {
    render(<ActionButtons showBadge={true} badgeCount={0} />);
    const notificationButton = screen.getByLabelText('Notifications');
    expect(notificationButton.querySelector('span')).not.toBeInTheDocument();
  });

  it('shows badge with count when showBadge is true and badgeCount > 0', () => {
    render(<ActionButtons showBadge={true} badgeCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows "9+" when badgeCount is greater than 9', () => {
    render(<ActionButtons showBadge={true} badgeCount={15} />);
    expect(screen.getByText('9+')).toBeInTheDocument();
  });

  it('shows exact count when badgeCount is 9 or less', () => {
    render(<ActionButtons showBadge={true} badgeCount={9} />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ActionButtons className="custom-class" />);
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('handles multiple clicks on notification button', () => {
    render(<ActionButtons onNotificationClick={mockNotificationClick} />);
    const notificationButton = screen.getByLabelText('Notifications');

    fireEvent.click(notificationButton);
    fireEvent.click(notificationButton);
    fireEvent.click(notificationButton);

    expect(mockNotificationClick).toHaveBeenCalledTimes(3);
  });

  it('handles multiple clicks on grid button', () => {
    render(<ActionButtons onGridClick={mockGridClick} />);
    const gridButton = screen.getByLabelText('Grid');

    fireEvent.click(gridButton);
    fireEvent.click(gridButton);

    expect(mockGridClick).toHaveBeenCalledTimes(2);
  });

  it('renders both buttons simultaneously', () => {
    render(<ActionButtons />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Grid')).toBeInTheDocument();
  });
});
