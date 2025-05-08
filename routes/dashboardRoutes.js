const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/auth");
const logger = require("../middleware/logger");

// Dashboard route (protected)
router.get("/", (req, res, next) => {
  logger.info("Dashboard route accessed");
  dashboardController
    .showDashboard(req, res, next)
    .catch((err) => {
      logger.error(`Dashboard error: ${err.message}`);
      next(err);
    });
});

// Profile Page Route (Protected by Authentication Middleware)
router.get("/profile-page", authMiddleware, (req, res) => {
  logger.info("Profile Page route accessed");
  res.render("profile-page.ejs");
});

module.exports = router;
