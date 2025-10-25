import { render, screen } from '@testing-library/react';
import { PanelSelector } from '../ui/control-panel/panel-selector';

// Mock Select components
jest.mock('../ui/forms', () => ({
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
  }) => (
    <div data-testid={`select-item-${value}`} data-value={value}>
      {children}
    </div>
  )
}));

describe('PanelSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<PanelSelector />)).not.toThrow();
  });

  it('renders Select component with default value "all"', () => {
    render(<PanelSelector />);
    const select = screen.getByTestId('select');
    expect(select).toHaveAttribute('data-default-value', 'all');
  });

  it('renders SelectTrigger with correct aria-label', () => {
    render(<PanelSelector />);
    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toHaveAttribute('aria-label', 'Panel Selector');
  });

  it('renders SelectTrigger with correct className', () => {
    render(<PanelSelector />);
    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toHaveClass('border-0');
    expect(trigger).toHaveClass('h-7!');
    expect(trigger).toHaveClass('opacity-80');
    expect(trigger).toHaveClass('font-medium');
    expect(trigger).toHaveClass('text-xs');
  });

  it('renders SelectValue with placeholder', () => {
    render(<PanelSelector />);
    const selectValue = screen.getByTestId('select-value');
    expect(selectValue).toHaveTextContent('Select');
  });

  it('renders SelectContent', () => {
    render(<PanelSelector />);
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
  });

  it('renders all select options', () => {
    render(<PanelSelector />);
    expect(screen.getByTestId('select-item-all')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-panel2')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-panel3')).toBeInTheDocument();
  });

  it('renders "All" option with correct text', () => {
    render(<PanelSelector />);
    const allOption = screen.getByTestId('select-item-all');
    expect(allOption).toHaveTextContent('All');
    expect(allOption).toHaveAttribute('data-value', 'all');
  });

  it('renders "Panel 2" option with correct text', () => {
    render(<PanelSelector />);
    const panel2Option = screen.getByTestId('select-item-panel2');
    expect(panel2Option).toHaveTextContent('Panel 2');
    expect(panel2Option).toHaveAttribute('data-value', 'panel2');
  });

  it('renders "Panel 3" option with correct text', () => {
    render(<PanelSelector />);
    const panel3Option = screen.getByTestId('select-item-panel3');
    expect(panel3Option).toHaveTextContent('Panel 3');
    expect(panel3Option).toHaveAttribute('data-value', 'panel3');
  });

  it('has correct component structure', () => {
    render(<PanelSelector />);
    const select = screen.getByTestId('select');
    const trigger = screen.getByTestId('select-trigger');
    const content = screen.getByTestId('select-content');

    expect(select).toContainElement(trigger);
    expect(select).toContainElement(content);
  });

  it('renders exactly 3 select items', () => {
    render(<PanelSelector />);
    const allItems = [
      screen.getByTestId('select-item-all'),
      screen.getByTestId('select-item-panel2'),
      screen.getByTestId('select-item-panel3')
    ];
    expect(allItems).toHaveLength(3);
  });
});
