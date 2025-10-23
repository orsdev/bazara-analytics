import { render, screen } from '@/lib/test-utils';
import { FormField } from '../ui/forms/form-field';

describe('FormField', () => {
  it('renders correctly with label and children', () => {
    render(
      <FormField label="Test Label">
        <input data-testid="test-input" />
      </FormField>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <FormField label="Test Label" error="This field is required">
        <input />
      </FormField>
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This field is required');
    expect(errorMessage).toHaveClass(
      'text-xs',
      'font-normal',
      'text-red-600',
      'mt-2'
    );
  });

  it('does not display error message when no error prop', () => {
    render(
      <FormField label="Test Label">
        <input />
      </FormField>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
