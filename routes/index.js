// ===========================================
// Main Routes File
// ===========================================
// This file defines the main routes for the application.
// Key actions:
// 1. Set up routes for different endpoints.
// 2. Handle requests and send responses.
// 3. Use middleware for route-specific logic.

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/auth");
const logger = require("../middleware/logger");

// Home route
// Renders the home page
router.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.render("home", { title: "Home" }); // Make sure there is a home.ejs in your views directory
});

// Authentication routes
// Handles user registration
router.post("/register", (req, res, next) => {
  logger.info("Registration attempt");
  authController
    .register(req, res, next)
    .then(() => {
      logger.info("User registered successfully");
    })
    .catch((err) => {
      logger.error(`Registration error: ${err.message}`);
      next(err);
    });
});

// Handles user login
router.post("/login", (req, res, next) => {
  logger.info("Login attempt");
  authController
    .login(req, res, next)
    .then(() => {
      logger.info("User logged in successfully");
    })
    .catch((err) => {
      logger.error(`Login error: ${err.message}`);
      next(err);
    });
});

// Handles user logout, protected by authentication middleware
router.get("/logout", authMiddleware, (req, res, next) => {
  logger.info("Logout attempt");
  authController
    .logout(req, res, next)
    .then(() => {
      logger.info("User logged out successfully");
    })
    .catch((err) => {
      logger.error(`Logout error: ${err.message}`);
      next(err);
    });
});

// Dashboard route (protected)
// Shows the dashboard, protected by authentication middleware
router.get("/dashboard", authMiddleware, (req, res, next) => {
  logger.info("Dashboard route accessed");
  dashboardController.showDashboard(req, res, next).catch((err) => {
    logger.error(`Dashboard error: ${err.message}`);
    next(err);
  });
});

module.exports = router;
