import { render, screen, fireEvent } from '@testing-library/react';
import { RangeDatePicker } from '../ui/forms/date-picker/range-date-picker';

// Mock react-datepicker
jest.mock('react-datepicker', () => {
  const MockDatePicker = ({
    onChange,
    startDate,
    endDate,
    placeholderText,
    disabled,
    name,
    className
  }: {
    onChange?: (dates: [Date | null, Date | null]) => void;
    startDate?: Date | null;
    endDate?: Date | null;
    placeholderText?: string;
    disabled?: boolean;
    name?: string;
    className?: string;
  }) => (
    <input
      data-testid="date-picker"
      name={name}
      placeholder={placeholderText}
      disabled={disabled}
      className={className}
      value={
        startDate && endDate
          ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
          : ''
      }
      onChange={() => {
        // Simulate date range selection
        const mockStartDate = new Date('2024-01-01');
        const mockEndDate = new Date('2024-01-31');
        onChange?.([mockStartDate, mockEndDate]);
      }}
    />
  );

  return {
    __esModule: true,
    default: MockDatePicker,
    registerLocale: jest.fn()
  };
});

// Mock date-fns locale
jest.mock('date-fns/locale', () => ({
  enUS: {}
}));

// Mock CalendarDaysSVGIcon
jest.mock('../ui/icons', () => ({
  CalendarDaysSVGIcon: () => <svg data-testid="calendar-icon" />
}));

// Mock cn utility
jest.mock('@/lib', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' '))
}));

describe('RangeDatePicker', () => {
  const mockHandleChange = jest.fn();
  const defaultProps = {
    name: 'date-range',
    startDate: null,
    endDate: null,
    label: 'Select date range',
    handleChange: mockHandleChange
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<RangeDatePicker {...defaultProps} />)).not.toThrow();
  });

  it('renders date picker input', () => {
    render(<RangeDatePicker {...defaultProps} />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('renders calendar icon', () => {
    render(<RangeDatePicker {...defaultProps} />);
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <RangeDatePicker {...defaultProps} placeholder="Select date range" />
    );
    expect(
      screen.getByPlaceholderText('Select date range')
    ).toBeInTheDocument();
  });

  it('renders with correct name attribute', () => {
    render(<RangeDatePicker {...defaultProps} name="custom-date-range" />);
    const input = screen.getByTestId('date-picker');
    expect(input).toHaveAttribute('name', 'custom-date-range');
  });

  it('handles date range selection', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');

    fireEvent.change(input, { target: { value: '01/01/2024 - 31/01/2024' } });

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('renders with start and end dates', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    render(
      <RangeDatePicker
        {...defaultProps}
        startDate={startDate}
        endDate={endDate}
      />
    );

    const input = screen.getByTestId('date-picker');
    expect(input).toHaveValue('1/1/2024 - 1/31/2024');
  });

  it('renders as disabled when isDisabled is true', () => {
    render(<RangeDatePicker {...defaultProps} isDisabled={true} />);
    const input = screen.getByTestId('date-picker');
    expect(input).toBeDisabled();
  });

  it('renders as enabled by default', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');
    expect(input).not.toBeDisabled();
  });

  it('renders with custom className', () => {
    render(<RangeDatePicker {...defaultProps} className="custom-class" />);
    const input = screen.getByTestId('date-picker');
    expect(input.className).toContain('custom-class');
  });

  it('handles min and max date constraints', () => {
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2024-12-31');

    expect(() =>
      render(
        <RangeDatePicker
          {...defaultProps}
          minDate={minDate}
          maxDate={maxDate}
        />
      )
    ).not.toThrow();
  });

  it('renders with showTimeSelect option', () => {
    expect(() =>
      render(<RangeDatePicker {...defaultProps} showTimeSelect={true} />)
    ).not.toThrow();
  });

  it('renders without showTimeSelect by default', () => {
    expect(() => render(<RangeDatePicker {...defaultProps} />)).not.toThrow();
  });

  it('calls handleChange with correct date format', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');

    fireEvent.change(input, { target: { value: '01/01/2024 - 31/01/2024' } });

    expect(mockHandleChange).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date)
    });
  });

  it('renders with null dates initially', () => {
    render(
      <RangeDatePicker {...defaultProps} startDate={null} endDate={null} />
    );
    const input = screen.getByTestId('date-picker');
    expect(input).toHaveValue('');
  });

  it('renders sr-only label with placeholder text', () => {
    const { container } = render(
      <RangeDatePicker {...defaultProps} placeholder="Select date range" />
    );
    const label = container.querySelector('label.sr-only');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Select date range');
  });

  it('handles onChange callback correctly', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');

    // Trigger change event which calls the mock onChange
    fireEvent.change(input, { target: { value: '01/01/2024 - 31/01/2024' } });

    expect(mockHandleChange).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date)
    });
  });

  it('handles onChange with only start date selected', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');

    fireEvent.change(input, { target: { value: '01/01/2024' } });

    expect(mockHandleChange).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date)
    });
  });

  it('applies default className styles', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');
    expect(input.className).toContain('h-[2.13rem]');
    expect(input.className).toContain('bg-primary/14');
  });

  it('combines custom className with default styles', () => {
    render(<RangeDatePicker {...defaultProps} className="my-custom-class" />);
    const input = screen.getByTestId('date-picker');
    expect(input.className).toContain('h-[2.13rem]');
    expect(input.className).toContain('my-custom-class');
  });

  it('renders calendar icon in correct position', () => {
    const { container } = render(<RangeDatePicker {...defaultProps} />);
    const iconContainer = container.querySelector('.absolute.right-2');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toContainElement(screen.getByTestId('calendar-icon'));
  });

  it('renders with different date formats', () => {
    const startDate = new Date('2024-12-25');
    const endDate = new Date('2024-12-31');

    render(
      <RangeDatePicker
        {...defaultProps}
        startDate={startDate}
        endDate={endDate}
      />
    );

    const input = screen.getByTestId('date-picker') as HTMLInputElement;
    expect(input.value).toBeTruthy();
  });

  it('handles edge case with same start and end date', () => {
    const sameDate = new Date('2024-06-15');

    render(
      <RangeDatePicker
        {...defaultProps}
        startDate={sameDate}
        endDate={sameDate}
      />
    );

    const input = screen.getByTestId('date-picker');
    expect(input).toBeInTheDocument();
  });

  it('renders with minDate constraint', () => {
    const minDate = new Date('2024-01-01');

    render(<RangeDatePicker {...defaultProps} minDate={minDate} />);

    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('renders with maxDate constraint', () => {
    const maxDate = new Date('2024-12-31');

    render(<RangeDatePicker {...defaultProps} maxDate={maxDate} />);

    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('handles multiple onChange calls', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');

    fireEvent.change(input, { target: { value: '01/01/2024 - 15/01/2024' } });
    fireEvent.change(input, { target: { value: '01/02/2024 - 28/02/2024' } });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it('renders wrapper div with correct classes', () => {
    const { container } = render(<RangeDatePicker {...defaultProps} />);
    const wrapper = container.querySelector(
      '.flex.flex-col.justify-center.items-center'
    );
    expect(wrapper).toBeInTheDocument();
  });

  it('handles showTimeSelect false explicitly', () => {
    render(<RangeDatePicker {...defaultProps} showTimeSelect={false} />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('handles isDisabled false explicitly', () => {
    render(<RangeDatePicker {...defaultProps} isDisabled={false} />);
    const input = screen.getByTestId('date-picker');
    expect(input).not.toBeDisabled();
  });

  it('renders without placeholder', () => {
    render(<RangeDatePicker {...defaultProps} />);
    const input = screen.getByTestId('date-picker');
    expect(input).toBeInTheDocument();
  });

  it('handles empty string placeholder', () => {
    render(<RangeDatePicker {...defaultProps} placeholder="" />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });
});
