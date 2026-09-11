const DEFAULT_CURRENCY = 'ETB';
const DEFAULT_LOCALE = 'en-ET';

/**
 * Formats a numeric amount as a currency string.
 * @param {number} amount - The monetary amount.
 * @param {string} [currency=ETB] - ISO 4217 currency code.
 * @param {string} [locale=en-ET] - BCP 47 locale string.
 * @returns {string} Formatted currency string.
 */
const formatCurrency = (amount, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) => {
  if (typeof amount !== 'number' || isNaN(amount)) return ${DEFAULT_CURRENCY} 0.00;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Converts an amount from one currency to another using a simple rate.
 * @param {number} amount - Source amount.
 * @param {number} rate - Conversion rate (target / source).
 * @returns {number} Converted amount rounded to 2 decimal places.
 */
const convertCurrency = (amount, rate) =>
  Math.round(amount * rate * 100) / 100;

module.exports = { formatCurrency, convertCurrency, DEFAULT_CURRENCY };