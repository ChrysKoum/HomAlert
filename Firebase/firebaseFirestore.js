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
const { initializeApp } = require("firebase/app");
const firebaseConfig = require("./firebaseConfig");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

const getUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting user: ", error);
  }
};

const updateUser = async (userId, userData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};

const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
