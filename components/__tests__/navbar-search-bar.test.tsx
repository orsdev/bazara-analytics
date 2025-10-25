import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarSearchBar } from '../ui/navbar/navbar-search-bar';

// Mock SearchInput component
jest.mock('../ui/forms', () => ({
  SearchInput: ({
    placeholder,
    value,
    handleSearchChange
  }: {
    placeholder?: string;
    value?: string;
    handleSearchChange?: (value: string) => void;
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleSearchChange?.(e.target.value)}
    />
  )
}));

describe('NavbarSearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<NavbarSearchBar />)).not.toThrow();
  });

  it('renders SearchInput component', () => {
    render(<NavbarSearchBar />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('displays default placeholder', () => {
    render(<NavbarSearchBar />);
    expect(
      screen.getByPlaceholderText('Search for anything')
    ).toBeInTheDocument();
  });

  it('displays custom placeholder', () => {
    render(<NavbarSearchBar placeholder="Custom search" />);
    expect(screen.getByPlaceholderText('Custom search')).toBeInTheDocument();
  });

  it('initializes with empty search value', () => {
    render(<NavbarSearchBar />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
  });

  it('updates search value when typing', () => {
    render(<NavbarSearchBar />);
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input).toHaveValue('test query');
  });

  it('calls onSearch callback when typing', () => {
    render(<NavbarSearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('calls onSearch callback multiple times', () => {
    render(<NavbarSearchBar onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });

    expect(mockOnSearch).toHaveBeenCalledTimes(3);
    expect(mockOnSearch).toHaveBeenNthCalledWith(1, 't');
    expect(mockOnSearch).toHaveBeenNthCalledWith(2, 'te');
    expect(mockOnSearch).toHaveBeenNthCalledWith(3, 'tes');
  });

  it('works without onSearch callback', () => {
    render(<NavbarSearchBar />);
    const input = screen.getByTestId('search-input');

    expect(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    }).not.toThrow();
  });

  it('applies custom className', () => {
    const { container } = render(<NavbarSearchBar className="custom-class" />);
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('maintains search state across re-renders', () => {
    const { rerender } = render(<NavbarSearchBar />);
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'persistent' } });
    expect(input).toHaveValue('persistent');

    rerender(<NavbarSearchBar />);
    expect(input).toHaveValue('persistent');
  });
});
