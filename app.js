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
const logger = require("morgan");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Set up middleware
app.use(logger("dev")); // Log requests to the console
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookie header and populate req.cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public directory

// Set up routes
app.use("/", indexRouter); // Use the indexRouter for root path

// Error handling middleware
app.use(errorHandler); // Use custom error handling middleware

module.exports = app;
