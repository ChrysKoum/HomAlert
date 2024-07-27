// ===========================================
// Validation Utils
// ===========================================
// This file contains utility functions for validating user input.
// Key actions:
// 1. Validate email format.
// 2. Validate password strength.
// 3. Validate other form fields as necessary..

// Validate the format of an email address
// email: The email address to validate.
const validateEmail = (email) => {
  // Regular expression to validate email format
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Test the email against the regular expression
  return re.test(String(email).toLowerCase());
};

// Validate the strength of a password
// password: The password to validate.
// Example: Password must be at least 6 characters long
const validatePassword = (password) => {
  // Check if the password length is at least 8 characters
  return password.length >= 8;
};

module.exports = {
  validateEmail,
  validatePassword,
};
