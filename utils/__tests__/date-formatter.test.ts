import { dateFormatter } from '../date-formatter';

describe('date-formatter', () => {
  describe('dateFormatter', () => {
    it('formats ISO date string with default format', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z');
      expect(result).toBe('15/01/2024');
    });

    it('formats ISO date string with custom format', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z', 'yyyy-MM-dd');
      expect(result).toBe('2024-01-15');
    });

    it('formats date string with MM/dd/yyyy format', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z', 'MM/dd/yyyy');
      expect(result).toBe('01/15/2024');
    });

    it('formats date with time', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z', 'dd/MM/yyyy HH:mm');
      expect(result).toMatch(/15\/01\/2024 \d{2}:\d{2}/);
    });

    it('formats date with full month name', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z', 'MMMM dd, yyyy');
      expect(result).toBe('January 15, 2024');
    });

    it('formats date with short month name', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z', 'MMM dd, yyyy');
      expect(result).toBe('Jan 15, 2024');
    });

    it('formats date with day of week', () => {
      const result = dateFormatter('2024-01-15T10:30:00Z', 'EEEE, MMMM dd');
      expect(result).toBe('Monday, January 15');
    });

    it('handles different date string formats', () => {
      const result = dateFormatter('2024-01-15');
      expect(result).toBe('15/01/2024');
    });

    it('throws error for invalid date string', () => {
      expect(() => dateFormatter('invalid-date')).toThrow('Invalid date');
    });

    it('throws error for empty string', () => {
      expect(() => dateFormatter('')).toThrow('Invalid date');
    });

    it('formats date at start of year', () => {
      const result = dateFormatter('2024-01-01T00:00:00Z');
      expect(result).toBe('01/01/2024');
    });

    it('formats date at end of year', () => {
      const result = dateFormatter('2024-12-31T00:00:00Z');
      expect(result).toBe('31/12/2024');
    });

    it('formats leap year date', () => {
      const result = dateFormatter('2024-02-29T12:00:00Z');
      expect(result).toBe('29/02/2024');
    });

    it('handles timezone offsets', () => {
      const result = dateFormatter('2024-01-15T10:30:00+01:00');
      expect(result).toBe('15/01/2024');
    });

    it('formats with year only', () => {
      const result = dateFormatter('2024-06-15T10:30:00Z', 'yyyy');
      expect(result).toBe('2024');
    });

    it('formats with custom separators', () => {
      const result = dateFormatter('2024-06-15T10:30:00Z', 'dd-MM-yyyy');
      expect(result).toBe('15-06-2024');
    });
  });
});
