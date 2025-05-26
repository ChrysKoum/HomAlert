const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth"); // If needed for some routes
const logger = require("../middleware/logger");

// Registration
router.post("/register", authController.register); // Keep existing POST for form submission

// Login
router.post("/login", authController.login); // Keep existing POST for form submission

// Logout
router.get("/logout", authMiddleware, authController.logout); // authMiddleware might be optional depending on flow

// Forgot Password
router.get("/forgot-password", authController.renderForgotPassword);
router.post("/forgot-password", authController.handleForgotPassword);

// Email Verification
// This route is where Firebase will redirect after user clicks verification link in email
// Configure this URL in your Firebase console -> Authentication -> Templates -> Email address verification -> Edit (pencil icon) -> Customize action URL
router.get("/verify-email-link", authController.renderEmailVerified); // Renamed for clarity as it's the link target

// Page to show "Verification email sent" message
// This is not strictly necessary if your register function directly renders a confirmation,
// but can be useful if you have a resend verification email feature.
// For now, the register controller renders 'email-verification-sent.ejs' directly.
// router.get("/email-verification-sent", (req, res) => {
//   res.render("auth/email-verification-sent", { title: "Check Your Email", email: req.query.email });
// });

module.exports = router;
