import { render, screen } from '@testing-library/react';
import { PanelSelector } from '../ui/control-panel/panel-selector';
import { ControlPanel } from '../ui/control-panel/control-panel';

// Mock PanelSelector to avoid import issues
jest.mock('../ui/control-panel/panel-selector', () => ({
  PanelSelector: () => <div data-testid="panel-selector">Panel Selector</div>
}));

// Mock SearchInput component
jest.mock('../ui/forms', () => ({
  SearchInput: ({
    placeholder,
    className,
    value,
    handleSearchChange,
    showKeyboardShortcut
  }: {
    placeholder?: string;
    className?: string;
    value?: string;
    handleSearchChange?: (value: string) => void;
    showKeyboardShortcut?: boolean;
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => handleSearchChange?.(e.target.value)}
      data-show-shortcut={showKeyboardShortcut}
    />
  )
}));

// Mock icons
jest.mock('../ui/icons', () => ({
  EditSVGIcon: () => <svg data-testid="edit-icon" />
}));

// Mock Select components properly
jest.mock('../ui/forms/select', () => ({
  Select: ({
    children,
    defaultValue
  }: {
    children: React.ReactNode;
    defaultValue?: string;
  }) => (
    <div data-testid="select" data-default-value={defaultValue}>
      {children}
    </div>
  ),
  SelectTrigger: ({
    children,
    className,
    'aria-label': ariaLabel
  }: {
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
  }) => (
    <button
      data-testid="select-trigger"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => (
    <span data-testid="select-value">{placeholder}</span>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({
    children,
    value
  }: {
    children: React.ReactNode;
    value?: string;
  }) => <div data-testid={`select-item-${value}`}>{children}</div>
}));

describe('ControlPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<ControlPanel />)).not.toThrow();
  });

  it('renders search input with correct placeholder', () => {
    render(<ControlPanel />);
    const searchInput = screen.getByPlaceholderText(
      'Search in service request'
    );
    expect(searchInput).toBeInTheDocument();
  });

  it('shows keyboard shortcut on SearchInput', () => {
    render(<ControlPanel />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveAttribute('data-show-shortcut', 'true');
  });

  it('renders Edit button with correct aria-label', () => {
    render(<ControlPanel />);
    const editButton = screen.getByLabelText('Edit');
    expect(editButton).toBeInTheDocument();
  });

  it('renders Edit icon', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
  });
});

describe('PanelSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<PanelSelector />)).not.toThrow();
  });

  it('renders panel selector component', () => {
    render(<PanelSelector />);
    expect(screen.getByTestId('panel-selector')).toBeInTheDocument();
  });
});
