/**
 * @module pagination
 * @description Utility functions for building pagination metadata
 * in API responses. Used across all list endpoints.
 */

/**
 * Builds pagination metadata from a Mongoose query result.
 * @param {number} total - Total number of documents matching the query.
 * @param {number} page - Current page number (1-indexed).
 * @param {number} limit - Number of results per page.
 * @returns {object} Pagination metadata object.
 */
const buildPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

module.exports = { buildPaginationMeta };