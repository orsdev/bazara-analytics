import { render, screen, fireEvent, waitFor } from '@/lib/test-utils';
import { LoginForm } from '../login-form';

jest.mock('../../hooks/use-auth', () => ({
  useAuth: jest.fn()
}));

jest.mock('@/lib/validations', () => ({
  loginSchema: {
    validate: jest.fn()
  },
  LoginFormData: {}
}));

/* eslint-disable @typescript-eslint/no-require-imports */
const mockUseAuth = require('../../hooks/use-auth').useAuth;
/* eslint-enable @typescript-eslint/no-require-imports */

describe('LoginForm', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText('Email Address/Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('has email input field', () => {
    render(<LoginForm />);
    const emailInput = screen.getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });

  it('has password input field', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByTestId('password-input');

    expect(passwordInput).toBeInTheDocument();
  });

  it('calls login function on form submission', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it('shows loading state when isLoading is true', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: true
    });

    render(<LoginForm />);
    const submitButton = screen.getByTestId('login-button');

    expect(submitButton).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('disables submit button when loading', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: true
    });

    render(<LoginForm />);
    const submitButton = screen.getByTestId('login-button');
    expect(submitButton).toBeDisabled();
  });
});
