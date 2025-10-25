import { render, screen } from '@testing-library/react';
import { DashboardHeader } from '../dashboard-header';

describe('DashboardHeader', () => {
  it('renders the header title', () => {
    render(<DashboardHeader />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders dashboard view label', () => {
    render(<DashboardHeader />);
    expect(screen.getByText('Dashboard View:')).toBeInTheDocument();
  });

  it('renders select with default value', () => {
    render(<DashboardHeader />);
    const select = screen.getByRole('combobox', {
      name: /dashboard view selector/i
    });
    expect(select).toBeInTheDocument();
  });

  it('has correct layout classes', () => {
    const { container } = render(<DashboardHeader />);
    const headerDiv = container.firstChild;
    expect(headerDiv).toHaveClass('flex', 'items-center', 'justify-between');
  });

  it('renders with proper accessibility attributes', () => {
    render(<DashboardHeader />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-label', 'Dashboard View Selector');
  });
});
