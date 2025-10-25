import { render, screen } from '@testing-library/react';
import { SubNavbar } from '../ui/sub-navbar';

describe('SubNavbar', () => {
  it('renders sub-navbar component', () => {
    const { container } = render(<SubNavbar />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays home button', () => {
    render(<SubNavbar />);

    const button = screen.getByRole('button', { name: /home/i });
    expect(button).toBeInTheDocument();
  });

  it('renders home icon', () => {
    const { container } = render(<SubNavbar />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('home button has proper aria-label', () => {
    render(<SubNavbar />);

    const button = screen.getByRole('button', { name: /home/i });
    expect(button).toHaveAttribute('aria-label', 'Home');
  });
});
