// ===========================================
// Firebase Firestore Setup
// ===========================================
// This file sets up Firebase Firestore for storing and retrieving user and sensor data.
// Key actions:
// 1. Import the necessary Firestore SDKs.
// 2. Initialize Firestore and create references to collections and documents as needed.
// 3. Implement functions to read, write, update, and delete data in Firestore.
// 4. Ensure data is structured appropriately to support efficient querying and real-time updates.
// 5. Consider using Firestore for storing user profiles, system configurations, and historical sensor data.

const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const { firebaseApp } = require("./firebaseSetup"); // Use the singleton
const logger = require("../middleware/logger");

const db = getFirestore(firebaseApp);

// Asynchronously add a new user to Firestore
const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    logger.info(`User added: ${userId}`);
  } catch (error) {
    logger.error(`Error adding user: ${error.message}`);
    throw error;
  }
};

// Asynchronously get a user's data from Firestore
const getUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      logger.info(`User retrieved: ${userId}`);
      return docSnap.data();
    } else {
      logger.warn(`No such document: ${userId}`);
    }
  } catch (error) {
    logger.error(`Error getting user: ${error.message}`);
    throw error;
  }
};

// Asynchronously update a user's data in Firestore
const updateUser = async (userId, userData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, userData);
    logger.info(`User updated: ${userId}`);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    throw error;
  }
};

// Asynchronously delete a user from Firestore
const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    logger.info(`User deleted: ${userId}`);
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    throw error;
  }
};

// Export the CRUD functions for use in other parts of the application
module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
