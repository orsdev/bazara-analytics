import {
  formatCurrency,
  DEFAULT_CURRENCY,
  DEFAULT_CURRENCY_SYMBOL
} from '../currency-formatter';

describe('currency-formatter', () => {
  describe('formatCurrency', () => {
    it('formats amount with default options', () => {
      const result = formatCurrency({ amount: 1000 });
      expect(result).toContain('1,000');
      expect(result).toContain(DEFAULT_CURRENCY_SYMBOL);
    });

    it('formats amount with NGN currency and custom symbol', () => {
      const result = formatCurrency({ amount: 5000, currency: 'NGN' });
      expect(result).toContain('5,000');
      expect(result).toContain(DEFAULT_CURRENCY_SYMBOL);
      expect(result).not.toContain('NGN');
    });

    it('formats amount with USD currency', () => {
      const result = formatCurrency({ amount: 1000, currency: 'USD' });
      expect(result).toContain('1,000');
      expect(result).toContain('$');
    });

    it('formats amount with custom locale', () => {
      const result = formatCurrency({
        amount: 1234.56,
        locale: 'de-DE',
        currency: 'EUR'
      });
      expect(result).toContain('1');
      expect(result).toContain('234');
    });

    it('respects minimumFractionDigits', () => {
      const result = formatCurrency({
        amount: 100,
        minimumFractionDigits: 2
      });
      expect(result).toMatch(/100[.,]00/);
    });

    it('respects maximumFractionDigits', () => {
      const result = formatCurrency({
        amount: 100.999,
        maximumFractionDigits: 2
      });
      expect(result).not.toContain('999');
    });

    it('formats zero amount', () => {
      const result = formatCurrency({ amount: 0 });
      expect(result).toContain('0');
    });

    it('formats negative amount', () => {
      const result = formatCurrency({ amount: -500 });
      expect(result).toContain('500');
    });

    it('formats large amounts', () => {
      const result = formatCurrency({ amount: 1000000 });
      expect(result).toContain('1,000,000');
    });

    it('formats decimal amounts', () => {
      const result = formatCurrency({
        amount: 123.45,
        minimumFractionDigits: 2
      });
      expect(result).toContain('123');
      expect(result).toContain('45');
    });

    it('handles very small amounts', () => {
      const result = formatCurrency({
        amount: 0.01,
        minimumFractionDigits: 2
      });
      expect(result).toContain('0');
      expect(result).toContain('01');
    });

    it('uses en-US locale by default', () => {
      const result = formatCurrency({ amount: 1000 });
      expect(result).toContain('1,000');
    });
  });

  describe('constants', () => {
    it('has correct DEFAULT_CURRENCY', () => {
      expect(DEFAULT_CURRENCY).toBe('NGN');
    });

    it('has correct DEFAULT_CURRENCY_SYMBOL', () => {
      expect(DEFAULT_CURRENCY_SYMBOL).toBe('₦');
    });
  });
});
