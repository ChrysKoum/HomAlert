// ===========================================
// Formatting Utils
// ===========================================
// This file contains utility functions for formatting data before displaying it to the user.
// Key actions:
// 1. Format dates.
// 2. Format numbers.
// 3. Format other types of data as necessary.

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

module.exports = {
  formatDate,
};
