/**
 * Shared constants used across the Eastern Sidama backend.
 */

/** Booking statuses */
const BOOKING_STATUS = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
});

/** Application review statuses */
const APPLICATION_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  UNDER_REVIEW: 'under_review'
});

/** User roles */
const USER_ROLES = Object.freeze({
  USER: 'user',
  HOST: 'host',
  GUIDE: 'guide',
  ADMIN: 'admin'
});

/** Experience categories */
const EXPERIENCE_CATEGORIES = Object.freeze([
  'coffee',
  'cultural',
  'culinary',
  'nature',
  'birdwatching',
  'hiking',
  'music',
  'artisan',
  'photography'
]);

/** Withdrawal statuses */
const WITHDRAWAL_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PROCESSED: 'processed'
});

module.exports = {
  BOOKING_STATUS,
  APPLICATION_STATUS,
  USER_ROLES,
  EXPERIENCE_CATEGORIES,
  WITHDRAWAL_STATUS
};