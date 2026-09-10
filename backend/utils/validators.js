// Input validation helpers
const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPhone = (phone) => /^\+?[\d\s\-]{7,15}$/.test(phone);
const isNonEmpty = (str) => typeof str === 'string' && str.trim().length > 0;
module.exports = { isEmail, isPhone, isNonEmpty };
