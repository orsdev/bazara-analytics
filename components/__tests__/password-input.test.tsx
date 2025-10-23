import { render, screen, fireEvent } from '@/lib/test-utils';
import { PasswordInput } from '../ui/forms/password-input';

jest.mock('lucide-react', () => ({
  Eye: ({ size }: { size: number }) => (
    <div data-testid="eye-icon" data-size={size}>
      Eye
    </div>
  ),
  EyeOff: ({ size }: { size: number }) => (
    <div data-testid="eye-off-icon" data-size={size}>
      EyeOff
    </div>
  )
}));

describe('PasswordInput', () => {
  it('renders correctly with password type by default', () => {
    render(<PasswordInput data-testid="password-input" />);
    const input = screen.getByTestId('password-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays eye-off icon initially', () => {
    render(<PasswordInput />);

    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-icon')).not.toBeInTheDocument();
  });

  it('toggles password visibility when button is clicked', () => {
    render(<PasswordInput data-testid="password-input" />);
    const input = screen.getByTestId('password-input');
    const toggleButton = screen.getByRole('button');

    // Initially password type
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-off-icon')).not.toBeInTheDocument();

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-icon')).not.toBeInTheDocument();
  });

  it('accepts and displays value', () => {
    render(
      <PasswordInput data-testid="password-input" value="secret123" readOnly />
    );
    const input = screen.getByTestId('password-input') as HTMLInputElement;

    expect(input.value).toBe('secret123');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(
      <PasswordInput data-testid="password-input" onChange={handleChange} />
    );
    const input = screen.getByTestId('password-input');

    fireEvent.change(input, { target: { value: 'newpassword' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
