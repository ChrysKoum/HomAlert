// ===========================================
// Authentication Controller
// ===========================================
// This file contains the logic for handling authentication-related routes.
// Key actions:
// 1. Handle user registration.
// 2. Handle user login.
// 3. Handle user logout.

const {
  signUpUser,
  signInUser,
  signOutUser,
} = require("../Firebase/firebaseAuth");
const { validateEmail, validatePassword } = require("../utils/validation");

const authController = {
  // Handles user registration
  // req: The request object represents the HTTP request and contains properties for the request query string, parameters, body, headers, etc.
  // res: The response object represents the HTTP response that an Express app sends when it gets an HTTP request.
  // next: A function that is called to pass control to the next middleware function. (Not used directly in this example but useful for error handling middleware.)
  register: async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).send("Invalid email or password");
    }

    try {
      // Asynchronously sign up the user
      const user = await signUpUser(email, password);
      res.status(201).send(user);
    } catch (error) {
      // Handle any errors that occur during user registration
      res.status(500).send("Error registering user");
    }
  },

  // Handles user login
  // The login method authenticates the user using email and password
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Asynchronously sign in the user
      const user = await signInUser(email, password);
      res.status(200).send(user);
    } catch (error) {
      // Handle any errors that occur during user login
      res.status(401).send("Invalid email or password");
    }
  },

  // Handles user logout
  // The logout method signs out the user from the application
  logout: async (req, res) => {
    try {
      // Asynchronously sign out the user
      await signOutUser();
      res.status(200).send("Logged out successfully");
    } catch (error) {
      // Handle any errors that occur during user logout
      res.status(500).send("Error logging out");
    }
  },
};

module.exports = authController;
