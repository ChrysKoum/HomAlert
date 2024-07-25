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

// Home route
router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authMiddleware, authController.logout);

// Dashboard route (protected)
router.get("/dashboard", authMiddleware, dashboardController.showDashboard);

module.exports = router;
