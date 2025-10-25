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
});
