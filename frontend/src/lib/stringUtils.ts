/**
 * Truncates a string to a maximum length and appends ellipsis.
 */
export const truncate = (str: string, maxLength: number): string => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '\u2026';
};

/**
 * Converts a string to title case.
 * Example: "hello world" => "Hello World"
 */
export const toTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * Converts a string to a URL-safe slug.
 * Example: "My Tour Name!" => "my-tour-name"
 */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Returns initials from a full name string.
 * Example: "Abebe Bekele" => "AB"
 */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');