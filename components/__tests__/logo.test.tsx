import { render, screen } from '@testing-library/react';
import { Logo } from '../ui/logo';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) => {
    return <img {...props} />;
  }
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>
}));

describe('Logo', () => {
  it('renders logo image with default props', () => {
    render(<Logo />);

    const logo = screen.getByAltText('Bazara');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
  });
});
