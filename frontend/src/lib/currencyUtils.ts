const DEFAULT_CURRENCY = 'ETB';

/**
 * Formats a number as an Ethiopian Birr currency string.
 * Example: formatETB(1500) => "ETB 1,500.00"
 */
export const formatETB = (amount: number): string => {
  if (isNaN(amount)) return `${DEFAULT_CURRENCY} 0.00`;
  return `${DEFAULT_CURRENCY} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formats a number as a USD currency string.
 * Example: formatUSD(25.5) => "$25.50"
 */
export const formatUSD = (amount: number): string => {
  if (isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Parses a currency string back to a number.
 * Strips non-numeric characters except decimal point.
 */
export const parseCurrencyString = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};