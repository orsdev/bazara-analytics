import { render, screen } from '@testing-library/react';
import { FilterDropdown } from '../ui/forms/filter-dropdown';

// Mock dropdown menu components
jest.mock('../ui/dropdown-menu', () => ({
  DropdownMenu: ({
    children,
    modal
  }: {
    children: React.ReactNode;
    modal: boolean;
  }) => (
    <div data-testid="dropdown-menu" data-modal={modal}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({
    children,
    asChild
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => (
    <div data-testid="dropdown-trigger" data-aschild={asChild}>
      {children}
    </div>
  ),
  DropdownMenuContent: ({
    children,
    className,
    align
  }: {
    children: React.ReactNode;
    className?: string;
    align?: string;
  }) => (
    <div
      data-testid="dropdown-content"
      className={className}
      data-align={align}
    >
      {children}
    </div>
  )
}));

// Mock Button component
jest.mock('../ui/buttons', () => ({
  Button: ({
    children,
    variant,
    className,
    ...props
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <button data-variant={variant} className={className} {...props}>
      {children}
    </button>
  )
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <svg data-testid="chevron-down-icon" />
}));

describe('FilterDropdown', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(<FilterDropdown>Content</FilterDropdown>)
    ).not.toThrow();
  });

  it('renders "More Filters" text', () => {
    render(<FilterDropdown>Content</FilterDropdown>);
    expect(screen.getByText('More Filters')).toBeInTheDocument();
  });

  it('renders ChevronDown icon', () => {
    render(<FilterDropdown>Content</FilterDropdown>);
    expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <FilterDropdown>
        <div>Filter Options</div>
      </FilterDropdown>
    );
    expect(screen.getByText('Filter Options')).toBeInTheDocument();
  });

  it('configures dropdown as non-modal', () => {
    render(<FilterDropdown>Content</FilterDropdown>);
    const dropdown = screen.getByTestId('dropdown-menu');
    expect(dropdown).toHaveAttribute('data-modal', 'false');
  });

  it('renders dropdown trigger with button', () => {
    render(<FilterDropdown>Content</FilterDropdown>);
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    expect(screen.getByText('More Filters')).toBeInTheDocument();
  });

  it('renders dropdown content with correct alignment', () => {
    render(<FilterDropdown>Content</FilterDropdown>);
    const content = screen.getByTestId('dropdown-content');
    expect(content).toHaveAttribute('data-align', 'start');
  });

  it('renders with multiple children', () => {
    render(
      <FilterDropdown>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </FilterDropdown>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('button has outline variant', () => {
    render(<FilterDropdown>Content</FilterDropdown>);
    const button = screen.getByText('More Filters').closest('button');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });
});
