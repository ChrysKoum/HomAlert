const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

// Test route
// Renders the test page
router.get("/test", testController.renderHome);

// Test routes for Firebase functions

router.post("/test/register", testController.testRegister);
router.post("/test/login", testController.testLogin);
router.get("/test/logout", testController.testLogout);
router.post("/test/resetPassword", testController.testResetPassword);
router.post("/test/writeUserData", testController.testWriteUserData);
router.post("/test/writeDeviceData", testController.testWriteDeviceData);
router.get("/test/readUserData/:userId", testController.testReadUserData);
router.get(
  "/test/readDeviceData/:userId/:deviceId",
  testController.testReadDeviceData
);
router.get(
  "/test/readSensorData/:userId/:deviceId",
  testController.testReadSensorData
);

module.exports = router;
