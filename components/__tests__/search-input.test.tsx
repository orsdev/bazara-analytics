import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../ui/forms/search-input';

describe('SearchInput', () => {
  const mockHandleSearchChange = jest.fn();

  const defaultProps = {
    value: '',
    handleSearchChange: mockHandleSearchChange
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input with default placeholder', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchInput {...defaultProps} placeholder="Search tickets..." />);

    const input = screen.getByPlaceholderText('Search tickets...');
    expect(input).toBeInTheDocument();
  });

  it('displays search icon', () => {
    const { container } = render(<SearchInput {...defaultProps} />);

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders keyboard shortcut when showKeyboardShortcut is true', () => {
    render(<SearchInput {...defaultProps} showKeyboardShortcut={true} />);

    expect(screen.getByText('⌘')).toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('calls handleSearchChange when input value changes', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(mockHandleSearchChange).toHaveBeenCalledTimes(1);
    expect(mockHandleSearchChange).toHaveBeenCalledWith('test query');
  });

  it('calls handleSearchChange with empty string', () => {
    render(<SearchInput {...defaultProps} value="existing" />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockHandleSearchChange).toHaveBeenCalledWith('');
  });

  it('calls handleSearchChange multiple times', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(mockHandleSearchChange).toHaveBeenCalledTimes(3);
    expect(mockHandleSearchChange).toHaveBeenNthCalledWith(1, 'a');
    expect(mockHandleSearchChange).toHaveBeenNthCalledWith(2, 'ab');
    expect(mockHandleSearchChange).toHaveBeenNthCalledWith(3, 'abc');
  });

  it('renders input element', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input.tagName).toBe('INPUT');
  });

  it('keyboard shortcut button has proper type', () => {
    const { container } = render(
      <SearchInput {...defaultProps} showKeyboardShortcut={true} />
    );

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
