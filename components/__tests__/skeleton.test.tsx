import { render } from '@testing-library/react';
import { Skeleton } from '../ui/skeleton';

describe('Skeleton', () => {
  it('renders skeleton component', () => {
    const { container } = render(<Skeleton />);

    expect(container.firstChild).toBeInTheDocument();
  });
  it('renders e', () => {
    const { container } = render(<Skeleton className="" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with multiple custom classes', () => {
    const { container } = render(
      <Skeleton className="h-20 w-full rounded-lg shadow-md" />
    );

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('h-20', 'w-full', 'rounded-lg', 'shadow-md');
  });

  it('handles undefined className gracefully', () => {
    const { container } = render(<Skeleton className={undefined} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
