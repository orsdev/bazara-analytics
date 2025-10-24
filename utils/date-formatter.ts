import { parseISO, format, isValid } from 'date-fns';

export const dateFormatter = (date: string, dateFormat = 'dd/MM/yyyy') => {
  const dateObj =
    typeof date === 'string' ? parseISO(date) || new Date(date) : date;

  if (!isValid(dateObj)) {
    throw new Error(`Invalid date: ${date}`);
  }

  return format(dateObj, dateFormat);
};
