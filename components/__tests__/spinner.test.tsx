import { render } from '@testing-library/react';
import { Spinner } from '../ui/spinner';

describe('Spinner', () => {
  it('renders spinner component', () => {
    const { container } = render(<Spinner />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays loading icon', () => {
    const { container } = render(<Spinner />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct display name', () => {
    expect(Spinner.displayName).toBe('Spinner');
  });
});
it('has minimum height', () => {
  const { container } = render(<Spinner />);

  const wrapper = container.firstChild as HTMLElement;
  expect(wrapper).toHaveClass('min-h-[40px]');
});

it('takes full width', () => {
  const { container } = render(<Spinner />);

  const wrapper = container.firstChild as HTMLElement;
  expect(wrapper).toHaveClass('w-full');
});
