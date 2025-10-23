import { render, screen, fireEvent } from '@/lib/test-utils';
import { ClientErrorBoundary } from '../client-error-boundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ClientErrorBoundary', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true
    });
  });

  it('renders children when there is no error', () => {
    render(
      <ClientErrorBoundary>
        <div>Test content</div>
      </ClientErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error fallback when child component throws error', () => {
    render(
      <ClientErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ClientErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(
        'An unexpected error occurred. Please try refreshing the page.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
      configurable: true
    });

    render(
      <ClientErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ClientErrorBoundary>
    );

    expect(screen.getByText('Error Details')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('hides error details in production mode', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
      configurable: true
    });

    render(
      <ClientErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ClientErrorBoundary>
    );

    expect(screen.queryByText('Error Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });

  it('try again button is clickable', () => {
    render(
      <ClientErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ClientErrorBoundary>
    );

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });

    // Verify button is present and clickable
    expect(tryAgainButton).toBeInTheDocument();
    expect(tryAgainButton).not.toBeDisabled();

    // Click should not throw
    fireEvent.click(tryAgainButton);
  });

  it('calls onError callback when error occurs', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ClientErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ClientErrorBoundary>
    );

    // The onError callback should log to console
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error caught by boundary:',
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
