// ===========================================
// Firebase Utils
// ===========================================
// This file contains utility functions for common Firebase operations.
// Key actions:
// 1. Get sensor data from Firebase Realtime Database.
// 2. Get user data from Firebase Firestore.
// 3. Get sensor data by user ID from Firebase Realtime Database.

const { db } = require("../Firebase/firebaseSetup");
const { ref, get, child } = require("firebase/database");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

// Asynchronously get all sensor data from Firebase Realtime Database
const getSensorData = async () => {
  // Reference to the 'Measurements' node in the database
  const snapshot = await get(ref(db, "Measurements"));
  // Return the data as a JavaScript object
  return snapshot.val();
};

// Asynchronously get user data from Firebase Firestore
// userId: The unique identifier for the user.
const getUserData = async (userId) => {
  // Initialize Firestore
  const firestore = getFirestore();
  // Create a reference to the user document in the 'users' collection
  const userDoc = await getDoc(doc(firestore, "users", userId));
  // Check if the document exists and return the data
  return userDoc.exists() ? userDoc.data() : null;
};

// Asynchronously get sensor data for a specific user from Firebase Realtime Database
// userId: The unique identifier for the user.
const getSensorDataByUserId = async (userId) => {
  // Reference to the user's specific sensor data node in the database
  const snapshot = await get(child(ref(db), `Users/${userId}/Measurements`));
  // Return the data as a JavaScript object
  return snapshot.val();
};

module.exports = {
  getSensorData,
  getUserData,
  getSensorDataByUserId,
};
