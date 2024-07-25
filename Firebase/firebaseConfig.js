// ===========================================
// Firebase Configuration Setup
// ===========================================
// This file sets up the Firebase configuration required for our Smart Home Emergency Alert System.
// Key actions:
// 1. Ensure that the necessary Firebase SDKs are imported.
// 2. Initialize the app using environment variables stored in a .env file.
// 3. The configuration includes:
//    - API Key
//    - Auth Domain
//    - Database URL
//    - Project ID
//    - Storage Bucket
//    - Messaging Sender ID
//    - App ID
//    - Measurement ID
// 4. Export the database reference for use in other parts of the application.
// 5. Prepare to add Firebase Authentication and Firestore integration as needed.
// Note: Ensure that the .env file contains the correct Firebase credentials.

const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };
