import { render, screen, fireEvent } from '@/lib/test-utils';
import { Input } from '../ui/forms/input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
  });

  it('accepts and displays value', () => {
    render(<Input data-testid="test-input" value="test value" readOnly />);
    const input = screen.getByTestId('test-input') as HTMLInputElement;

    expect(input.value).toBe('test value');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Input data-testid="test-input" onChange={handleChange} />);
    const input = screen.getByTestId('test-input');

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies correct type attribute', () => {
    render(<Input type="email" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    expect(input).toHaveAttribute('type', 'email');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    expect(input).toBeDisabled();
  });

  it('accepts placeholder text', () => {
    render(<Input placeholder="Enter text here" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');

    expect(input).toHaveAttribute('placeholder', 'Enter text here');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="test-input"
      />
    );
    const input = screen.getByTestId('test-input');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
