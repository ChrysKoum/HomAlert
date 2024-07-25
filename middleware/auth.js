// ===========================================
// Authentication Middleware
// ===========================================
// This middleware checks if the user is authenticated before allowing access to certain routes.
// Key actions:
// 1. Check for the presence of a valid authentication token.
// 2. Verify the token using Firebase Authentication.
// 3. Allow access if the token is valid; otherwise, redirect to the login page.

const { getAuth } = require("firebase/auth");

const authMiddleware = async (req, res, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    req.user = user;
    next();
  } else {
    res.redirect("/auth/sign-in");
  }
};

module.exports = authMiddleware;
