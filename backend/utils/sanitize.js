/**
 * Trims and lowercases a string value safely.
 * Returns an empty string if the input is not a string.
 * @param {any} value - The value to sanitize.
 * @returns {string} Sanitized string.
 */
const toLowerTrim = value =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - Input string.
 * @returns {string} String with first letter capitalized.
 */
const capitalize = str =>
  typeof str === 'string' && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : '';

/**
 * Strips HTML tags from a string to prevent XSS in plain-text fields.
 * @param {string} str - Input string.
 * @returns {string} String without HTML tags.
 */
const stripHtml = str =>
  typeof str === 'string' ? str.replace(/<[^>]*>/g, '') : '';

/**
 * Normalizes an Ethiopian phone number to the +251 international format.
 * Handles formats: 0911..., 911..., +251911...
 * @param {string} phone - Raw phone number string.
 * @returns {string} Normalized phone number or empty string if invalid.
 */
const normalizeEthiopianPhone = phone => {
  if (typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('251') && digits.length === 12) return '+' + digits;
  if (digits.startsWith('0') && digits.length === 10) return '+251' + digits.slice(1);
  if (digits.length === 9) return '+251' + digits;
  return '';
};

module.exports = { toLowerTrim, capitalize, stripHtml, normalizeEthiopianPhone };