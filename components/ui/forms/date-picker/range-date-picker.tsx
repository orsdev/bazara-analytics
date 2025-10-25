'use client';

import { cn } from '@/lib';
import { enUS } from 'date-fns/locale';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDaysSVGIcon } from '../../icons';

import './style.css';

registerLocale('en', enUS);

interface RangeDatePickerProps {
  name: string;
  showTimeSelect?: boolean;
  isDisabled?: boolean;
  className?: string;
  startDate: Date | null;
  endDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  placeholder?: string;
  handleChange: ({ from, to }: { from: Date | null; to: Date | null }) => void;
}

export const RangeDatePicker = ({
  name,
  startDate,
  endDate,
  minDate,
  maxDate,
  handleChange,
  isDisabled = false,
  showTimeSelect = false,
  className,
  label,
  placeholder
}: RangeDatePickerProps) => {
  const inputId = `${name}-date-picker`;

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full relative cursor-pointer">
      <label htmlFor={inputId} className="sr-only">
        {label || 'Select date range'}
      </label>
      <ReactDatePicker
        id={inputId}
        name={name}
        onChange={(dates) => {
          const [from, to] = dates;
          handleChange({ from, to });
        }}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        disabled={isDisabled}
        locale="en"
        dateFormat="dd/MM/yyyy"
        showTimeSelect={showTimeSelect}
        autoComplete="off"
        selectsRange
        className={cn(
          'h-[2.13rem] min-h-[2.13rem]! w-full! rounded-[8px] bg-primary/14 text-primary shadow-xs px-5 py-2 font-medium text-sm placeholder:text-primary',
          className
        )}
        placeholderText={placeholder}
        aria-label={label || 'Select date range'}
      />
      <div className="absolute right-2 z-10 pointer-events-none">
        <CalendarDaysSVGIcon />
      </div>
    </div>
  );
};
