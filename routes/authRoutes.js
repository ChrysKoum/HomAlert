const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const logger = require("../middleware/logger");

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

// Post login
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

module.exports = router;
