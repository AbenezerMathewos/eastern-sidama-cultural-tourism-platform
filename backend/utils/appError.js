/**
 * Custom operational error class for the Eastern Sidama API.
 * Distinguishes between expected operational errors (e.g. 404, 400)
 * and unexpected programming errors so that the error controller
 * can respond appropriately.
 */
class AppError extends Error {
  /**
   * @param {string} message - Human-readable error description.
   * @param {number} statusCode - HTTP status code (e.g. 400, 404, 500).
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = ${statusCode}.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;