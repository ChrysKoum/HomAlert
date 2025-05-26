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
  requestPasswordReset, // Ensure this is imported
  sendUserEmailVerification, // Ensure this is imported
} = require("../Firebase/firebaseAuth");
const { validateEmail, validatePassword } = require("../utils/validation");
const logger = require("../middleware/logger"); // Import the logger

const authController = {
  // Handles user registration
  register: async (req, res, next) => {
    const { email, password, username /* other fields if any */ } = req.body;

    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).render("auth/sign-up", {
        title: "Register",
        error: "Invalid email or password format (password must be at least 8 characters).",
        email: email, // Pass back email to prefill form
        username: username, // Pass back username
      });
    }

    try {
      const user = await signUpUser(email, password);
      // Optionally, update user profile with username here if Firebase supports it directly
      // or store it in your own database linked to user.uid

      await sendUserEmailVerification(user); // Send verification email

      // Redirect to a page informing the user to check their email
      return res.render("auth/email-verification-sent", {
        title: "Verify Email",
        email: user.email,
      });
    } catch (error) {
      logger.error(`Registration error: ${error.message}`);
      let errorMessage = "Error registering user. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use. Please try a different email or login.";
      }
      return res.status(500).render("auth/sign-up", {
        title: "Register",
        error: errorMessage,
        email: email,
        username: username,
      });
    }
  },

  // Handles user login
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await signInUser(email, password);
      
      if (!user.emailVerified) {
        return res.status(401).render("auth/sign-in", {
          title: "Login",
          error: "Please verify your email address before logging in. Check your inbox.",
          email: email,
        });
      }

      // Create a user object with essential information
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        photoURL: user.photoURL || '/assets/default-avatar.png',
        emailVerified: user.emailVerified
      };

      // Create a script to inject into the dashboard page
      const userScript = `
        <script>
          localStorage.setItem('homalert_user', JSON.stringify(${JSON.stringify(userData)}));
          localStorage.setItem('authToken', '${user.uid}'); // Set auth token for session tracking
        </script>
      `;

      // Add userScript to res.locals to be included in the dashboard template
      res.locals.userScript = userScript;
      
      logger.info(`User logged in: ${user.email}`);
      return res.redirect("/dashboard");
    } catch (error) {
      logger.error(`Login error: ${error.code} - ${error.message}`); // Log the error code and message
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = "Invalid username or password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many login attempts. Please try again later.";
      }
      // Add other specific Firebase error codes as needed

      return res.status(401).render("auth/sign-in", {
        title: "Login",
        error: errorMessage,
        email: email,
      });
    }
  },

  // Handles user logout
  logout: async (req, res, next) => {
    try {
      await signOutUser();
      // For session-based auth: req.session.destroy();
      logger.info("User logged out successfully");
      res.redirect("/login");
    } catch (error) {
      logger.error(`Logout error: ${error.message}`);
      next(error); // Pass to global error handler
    }
  },

  // New: Render forgot password page
  renderForgotPassword: (req, res) => {
    res.render("auth/forgot-password", { title: "Forgot Password" });
  },

  // New: Handle forgot password submission
  handleForgotPassword: async (req, res, next) => {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.render("auth/forgot-password", {
        title: "Forgot Password",
        error: "Please enter a valid email address.",
        email: email,
      });
    }
    try {
      await requestPasswordReset(email);
      return res.render("auth/forgot-password", {
        title: "Forgot Password",
        message: "If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).",
      });
    } catch (error) {
      logger.error(`Forgot password error: ${error.message}`);
      // Avoid confirming if email exists for security, show generic message
      return res.render("auth/forgot-password", {
        title: "Forgot Password",
        message: "If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).",
        // error: "Failed to send password reset email. Please try again later.", // Optionally show specific error for debugging
      });
    }
  },

  // New: Render email verified page
  renderEmailVerified: (req, res) => {
    // This page is typically the target of the Firebase email verification link
    // No specific action needed here other than showing the page
    res.render("auth/email-verified", { title: "Email Verified" });
  },

  // Placeholder for resetPassword if you were to handle the oobCode yourself
  // resetPassword: async (req, res) => {
  //   // This would handle the link from the email if it points to your server with a code
  // },
};

module.exports = authController;
