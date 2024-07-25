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
  register: async (req, res) => {
    const { email, password } = req.body;
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).send("Invalid email or password");
    }
    try {
      const user = await signUpUser(email, password);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send("Error registering user");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await signInUser(email, password);
      res.status(200).send(user);
    } catch (error) {
      res.status(401).send("Invalid email or password");
    }
  },

  logout: async (req, res) => {
    try {
      await signOutUser();
      res.status(200).send("Logged out successfully");
    } catch (error) {
      res.status(500).send("Error logging out");
    }
  },
};

module.exports = authController;
