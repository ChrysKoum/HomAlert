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
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const firebaseConfig = require("./firebaseConfig");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};

const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
};
