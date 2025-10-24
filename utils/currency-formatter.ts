type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  amount: number;
};

export const DEFAULT_CURRENCY = 'NGN';
export const DEFAULT_CURRENCY_SYMBOL = '₦';

export const formatCurrency = ({
  amount,
  locale = 'en-US',
  currency = DEFAULT_CURRENCY,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2
}: FormatCurrencyOptions): string => {
  let formatAmount = Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation: 'standard'
  }).format(amount);

  // Replace NGN with custom symbol
  if (formatAmount.includes(DEFAULT_CURRENCY)) {
    formatAmount = formatAmount.replace(
      DEFAULT_CURRENCY,
      DEFAULT_CURRENCY_SYMBOL
    );
  }

  return formatAmount;
};
