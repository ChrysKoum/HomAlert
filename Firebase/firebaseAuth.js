// ===========================================
// Firebase Authentication Setup
// ===========================================
// This file sets up Firebase Authentication for user management within our Smart Home Emergency Alert System.
// Key actions:
// 1. Import the necessary Firebase Authentication SDKs.
// 2. Initialize Firebase Authentication and set up user sign-up, sign-in, and sign-out functions.
// 3. Implement functions to manage user sessions and handle authentication state changes.
// 4. Ensure secure handling of user credentials and implement necessary error handling mechanisms.

const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification, // Add sendEmailVerification
  applyActionCode, // For handling email verification links if needed, though usually automatic
} = require("firebase/auth");
const { auth } = require("./firebaseSetup"); // Use the singleton
const logger = require("../middleware/logger");

// Asynchronously sign up a user with email and password
const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Optionally send verification email immediately after sign up
    // await sendVerificationEmail(userCredential.user);
    logger.info(`User signed up: ${email}`);
    return userCredential.user;
  } catch (error) {
    logger.error(`Error signing up: ${error.message}`);
    throw error;
  }
};

// Asynchronously sign in a user with email and password
const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    logger.info(`User signed in: ${email}`);
    return userCredential.user;
  } catch (error) {
    logger.error(`Error signing in: ${error.message}`);
    throw error;
  }
};

// Asynchronously sign out the current user
const signOutUser = async () => {
  try {
    await signOut(auth);
    logger.info("User signed out");
  } catch (error) {
    logger.error(`Error signing out: ${error.message}`);
    throw error;
  }
};

// Asynchronously send a password reset email
const requestPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    logger.info(`Password reset email sent to: ${email}`);
  } catch (error) {
    logger.error(`Error sending password reset email: ${error.message}`);
    throw error;
  }
};

// Send email verification to the currently signed-in user or a provided user
const sendUserEmailVerification = async (user) => {
  if (!user) {
    logger.warn("sendUserEmailVerification called without a user object.");
    throw new Error("User object is required to send verification email.");
  }
  try {
    await sendEmailVerification(user);
    logger.info(`Verification email sent to: ${user.email}`);
  } catch (error) {
    logger.error(`Error sending verification email: ${error.message}`);
    throw error;
  }
};

// Listen for authentication state changes
const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
  requestPasswordReset, // Updated name
  onAuthStateChangedListener,
  sendUserEmailVerification, // Export new function
};
