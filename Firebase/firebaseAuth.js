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
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    logger.info(`Password reset email sent to: ${email}`);
  } catch (error) {
    logger.error(`Error sending password reset email: ${error.message}`);
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
  resetPassword,
  onAuthStateChangedListener,
};
