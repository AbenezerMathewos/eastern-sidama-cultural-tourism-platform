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

module.exports = { toLowerTrim, capitalize, stripHtml };