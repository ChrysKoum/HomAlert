// ===========================================
// Formatting Utils
// ===========================================
// This file contains utility functions for formatting data before displaying it to the user.
// Key actions:
// 1. Format dates.
// 2. Format numbers.
// 3. Format other types of data as necessary.

// Format a date to a locale string
// date: The date to format.
const formatDate = (date) => {
  // Convert the date to a locale date string
  return new Date(date).toLocaleDateString();
};

module.exports = {
  formatDate,
};
