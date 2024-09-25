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
const testController = require("../controllers/testController");
const authMiddleware = require("../middleware/auth");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");



// Test route
// Renders the test page
router.get("/test", testController.renderHome);

// Test routes for Firebase functions
router.post("/test/register", testController.testRegister);
router.post("/test/login", testController.testLogin);
router.get("/test/logout", testController.testLogout);
router.post("/test/resetPassword", testController.testResetPassword);
router.post("/test/writeUserData", testController.testWriteUserData);
router.post("/test/writeDeviceData", testController.testWriteDeviceData);
router.get("/test/readUserData/:userId", testController.testReadUserData);
router.get(
  "/test/readDeviceData/:userId/:deviceId",
  testController.testReadDeviceData
);
router.get(
  "/test/readSensorData/:userId/:deviceId",
  testController.testReadSensorData
);


/////// 1 Basic routes ///////

// Home route
router.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.render("home", { title: "Home" }); // Make sure there is a home.ejs in your views directory
});

// About Us Route
router.get("/about", (req, res) => {
  logger.info("About Us route accessed");
  res.render("about-us.ejs");
});

// Contact Us Route
router.get("/contact", (req, res) => {
  logger.info("Contact Us route accessed");
  res.render("contact-us.ejs");
});

// FAQ Route
router.get("/faq", (req, res) => {
  logger.info("FAQ route accessed");
  res.render("faq.ejs");
});

// Product Route
router.get("/product", (req, res) => {
  logger.info("Product route accessed");
  res.render("product.ejs");
});


/////// 2 Authentication routes ///////

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



// Forgot Password Route 
// todo//

// Reset Password Route//
// todo //

///////////////LOG IN ////////////////////

// Get login page
router.get("/login", (req, res, next) => {
  logger.info("Login page accessed");
  res.render("login.ejs");
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

//////////////////////////////////////////


///////////////Log OUT //////////////////

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

////////////////////////////////////////////////////////////









// Dashboard route (protected)
// Shows the dashboard, protected by authentication middleware
router.get("/dashboard", authMiddleware, (req, res, next) => {
  logger.info("Dashboard route accessed");
  dashboardController.showDashboard(req, res, next).catch((err) => {
    logger.error(`Dashboard error: ${err.message}`);
    next(err);
  });
});

// Profile Page Route (Protected by Authentication Middleware)
router.get("/profile-page", authMiddleware, (req, res) => {
  logger.info("Profile Page route accessed");
  res.render("profile-page.ejs");
});

////// 3 User Management Routes ///////

// PUT Route for User Update (Protected)
router.put("/user/update", authMiddleware, (req, res, next) => {
  logger.info("User update attempted");
  authController
    .updateUser(req, res, next)
    .then(() => {
      logger.info("User updated successfully");
    })
    .catch((err) => {
      logger.error(`User update error: ${err.message}`);
      next(err);
    });
});

// DELETE Route for User Deletion (Protected)
router.delete("/user/delete", authMiddleware, (req, res, next) => {
  logger.info("User deletion attempted");
  authController
    .deleteUser(req, res, next)
    .then(() => {
      logger.info("User deleted successfully");
    })
    .catch((err) => {
      logger.error(`User deletion error: ${err.message}`);
      next(err);
    });
});

// PUT Route for Editing Device Name and Place (Protected)
router.put("/device/update", authMiddleware, (req, res, next) => {
  logger.info("Device update attempted");
  // Assuming you have a controller function for updating device information
  dashboardController
    .updateDevice(req, res, next)
    .then(() => {
      logger.info("Device updated successfully");
    })
    .catch((err) => {
      logger.error(`Device update error: ${err.message}`);
      next(err);
    });
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
