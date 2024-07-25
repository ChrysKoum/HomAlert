// ===========================================
// Firebase Utils
// ===========================================
// This file contains utility functions for common Firebase operations.
// Key actions:
// 1. Get sensor data from Firebase Realtime Database.
// 2. Get user data from Firebase Firestore.
// 3. Other common Firebase operations as necessary.

const { db } = require("../Firebase/firebaseConfig");
const { ref, get } = require("firebase/database");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

const getSensorData = async () => {
  const snapshot = await get(ref(db, "Measurements"));
  return snapshot.val();
};

const getUserData = async (userId) => {
  const firestore = getFirestore();
  const userDoc = await getDoc(doc(firestore, "users", userId));
  return userDoc.exists() ? userDoc.data() : null;
};

module.exports = {
  getSensorData,
  getUserData,
};
