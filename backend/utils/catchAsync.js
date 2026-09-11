/**
 * Wraps an async Express route handler and forwards any rejected promise
 * to Express's next() error middleware, avoiding repetitive try/catch blocks.
 *
 * @param {Function} fn - Async function (req, res, next) => Promise.
 * @returns {Function} Express middleware function.
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};