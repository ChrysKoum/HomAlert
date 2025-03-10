const express = require("express");
const router = express.Router();

// Import all route files
const basicRoutes = require("./basicRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const deviceRoutes = require("./deviceRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const apiRoutes = require("./apiRoutes");
const testRoutes = require("./testRoutes");

// Use the routes in the main router
router.use("/", basicRoutes); // Basic routes like home, about, contact
router.use("/auth", authRoutes); // Authentication-related routes
router.use("/user", userRoutes); // User management routes
router.use("/device", deviceRoutes); // Device-related routes
router.use("/dashboard", dashboardRoutes); // Dashboard-related routes
router.use("/test", testRoutes); // Test routes
router.use("/api", apiRoutes); // Test routes

module.exports = router;
