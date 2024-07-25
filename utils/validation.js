// ===========================================
// Validation Utils
// ===========================================
// This file contains utility functions for validating user input.
// Key actions:
// 1. Validate email format.
// 2. Validate password strength.
// 3. Validate other form fields as necessary.

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  // Example: Password must be at least 6 characters long
  return password.length >= 6;
};

module.exports = {
  validateEmail,
  validatePassword,
};
