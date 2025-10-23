import { render, screen, fireEvent } from '@/lib/test-utils';
import { LoadingButton } from '../ui/buttons/loading-button';

describe('Loading Button', () => {
  it('renders correctly', () => {
    render(<LoadingButton>Click me</LoadingButton>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
  });

  it('is clickable', () => {
    const handleClick = jest.fn();
    render(<LoadingButton onClick={handleClick}>Click me</LoadingButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('show spinner when isLoading is true', () => {
    render(<LoadingButton isLoading={true}>Loading button</LoadingButton>);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<LoadingButton disabled>Disabled</LoadingButton>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
