// ===========================================
// Firebase Setup
// ===========================================
// This file ensures that Firebase is initialized only once using the Singleton pattern.
// It sets up the Firebase configuration required for our Smart Home Emergency Alert System.
// Key actions:
// 1. Import the necessary Firebase SDKs.
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

const { initializeApp, getApps } = require("firebase/app");
const { getDatabase } = require("firebase/database");
require("dotenv").config();
const logger = require("../middleware/logger");

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

let firebaseApp;

if (!getApps().length) {
  // Initialize the Firebase app with the configuration object
  firebaseApp = initializeApp(firebaseConfig);
  logger.info("Firebase initialized with provided configuration");
} else {
  firebaseApp = getApps()[0];
}

// Get a reference to the Firebase Realtime Database
const db = getDatabase(firebaseApp);

logger.info("Database reference initialized");

// Export the Firebase app and database reference for use in other parts of the application
module.exports = { firebaseApp, db };
