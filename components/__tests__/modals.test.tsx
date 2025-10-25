import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../ui/modals/modal';
import { ConfirmationModal } from '../ui/modals/confirmation-modal';

// Mock Dialog components
jest.mock('../ui/dialog', () => ({
  Dialog: ({
    children,
    open
  }: {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: () => void;
  }) =>
    open ? (
      <div data-testid="dialog" data-open={open}>
        {children}
      </div>
    ) : null,
  DialogContent: ({
    children,
    className
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="dialog-description">{children}</p>
  )
}));

// Mock LoadingButton
jest.mock('../ui/buttons', () => ({
  LoadingButton: ({
    children,
    variant,
    onClick,
    disabled,
    isLoading
  }: {
    children: React.ReactNode;
    variant?: string;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  }) => (
    <button
      data-testid={`loading-button-${variant || 'default'}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      data-loading={isLoading}
    >
      {children}
    </button>
  )
}));

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    description: 'Test description',
    children: <div>Modal content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog')).toHaveAttribute('data-open', 'true');
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Test Modal');
  });

  it('renders description when provided', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Test description'
    );
  });

  it('renders children content', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders description as empty when not provided', () => {
    render(<Modal {...defaultProps} description={undefined} />);
    expect(screen.getByTestId('dialog-description')).toBeEmptyDOMElement();
  });

  it('applies custom contentClassName', () => {
    render(<Modal {...defaultProps} contentClassName="custom-class" />);
    const content = screen.getByTestId('dialog-content');
    expect(content.className).toContain('custom-class');
  });

  it('includes default max-width class', () => {
    render(<Modal {...defaultProps} />);
    const content = screen.getByTestId('dialog-content');
    expect(content.className).toContain('max-w-[596px]');
  });

  it('renders dialog header', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId('dialog-header')).toBeInTheDocument();
  });

  it('renders dialog content', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });
});

describe('ConfirmationModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<ConfirmationModal {...defaultProps} />)).not.toThrow();
  });

  it('renders with default title', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      'Are you sure?'
    );
  });

  it('renders with default description', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'This action cannot be undone.'
    );
  });

  it('renders custom title', () => {
    render(<ConfirmationModal {...defaultProps} title="Custom Title" />);
    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      'Custom Title'
    );
  });

  it('renders custom description', () => {
    render(
      <ConfirmationModal {...defaultProps} description="Custom description" />
    );
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Custom description'
    );
  });

  it('renders default cancel button text', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId('loading-button-default')).toHaveTextContent(
      'Cancel'
    );
  });

  it('renders default confirm button text', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId('loading-button-outline')).toHaveTextContent(
      'Continue'
    );
  });

  it('renders custom button texts', () => {
    render(
      <ConfirmationModal {...defaultProps} cancelText="No" confirmText="Yes" />
    );
    expect(screen.getByTestId('loading-button-default')).toHaveTextContent(
      'No'
    );
    expect(screen.getByTestId('loading-button-outline')).toHaveTextContent(
      'Yes'
    );
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    const cancelButton = screen.getByTestId('loading-button-default');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    const confirmButton = screen.getByTestId('loading-button-outline');
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when loading', () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);
    const cancelButton = screen.getByTestId('loading-button-default');
    const confirmButton = screen.getByTestId('loading-button-outline');

    expect(cancelButton).toBeDisabled();
    expect(confirmButton).toBeDisabled();
  });

  it('shows loading state on confirm button', () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);
    const confirmButton = screen.getByTestId('loading-button-outline');
    expect(confirmButton).toHaveAttribute('data-loading', 'true');
  });

  it('does not show loading state by default', () => {
    render(<ConfirmationModal {...defaultProps} />);
    const confirmButton = screen.getByTestId('loading-button-outline');
    expect(confirmButton).toHaveAttribute('data-loading', 'false');
  });

  it('renders modal with correct props', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });
});
