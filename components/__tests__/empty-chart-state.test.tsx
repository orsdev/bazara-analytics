import { render, screen } from '@testing-library/react';
import { EmptyChartState } from '../ui/empty-chart-state';
import { CircleSlash } from 'lucide-react';

describe('EmptyChartState', () => {
  const defaultProps = {
    title: 'No data available',
    description: 'There is no data to display'
  };

  it('renders with required props', () => {
    render(<EmptyChartState {...defaultProps} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('There is no data to display')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(
      <EmptyChartState
        {...defaultProps}
        icon={<CircleSlash data-testid="custom-icon" />}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
