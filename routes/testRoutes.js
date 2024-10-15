const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

// Test route
// Renders the test page
router.get("/", testController.renderHome);

// Test routes for Firebase functions

router.post("/register", testController.testRegister);
router.post("/login", testController.testLogin);
router.get("/logout", testController.testLogout);
router.post("/resetPassword", testController.testResetPassword);
router.post("/writeUserData", testController.testWriteUserData);
router.post("/writeDeviceData", testController.testWriteDeviceData);
router.get("/readUserData/:userId", testController.testReadUserData);
router.get(
  "/readDeviceData/:userId/:deviceId",
  testController.testReadDeviceData
);
router.get(
  "/readSensorData/:userId/:deviceId",
  testController.testReadSensorData
);

module.exports = router;
