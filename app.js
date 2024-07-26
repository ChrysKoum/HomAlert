// ===========================================
// Main Application File
// ===========================================
// This file initializes the Express application and sets up middleware, routes, and error handling.
// Key actions:
// 1. Set up Express app and middleware.
// 2. Connect to Firebase services.
// 3. Define routes for the application.
// 4. Implement error handling middleware.

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const ejsMate = require("ejs-mate");
const indexRouter = require("./routes/index");
const logger = require("./middleware/logger");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use ejs-mate as the view engine
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views")); // Set the views directory
app.set("view engine", "ejs"); // Set EJS as the view engine

// Custom middleware to log requests using Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Set up middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookie header and populate req.cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public directory

// Set up routes
app.use("/", indexRouter); // Use the indexRouter for root path

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render("errors/404", { title: "404 Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Server error: ${err.message}`);
  res.status(500).render("errors/500", { title: "500 Internal Server Error" });
});

module.exports = app;
