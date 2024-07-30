// controllers/testController.js

const {
  signUpUser,
  signInUser,
  signOutUser,
  resetPassword,
} = require("../Firebase/firebaseAuth");
const {
  writeUserData,
  readUserData,
  updateUserData,
  deleteUserData,
  writeDeviceData,
  readDeviceData,
  readSensorData,
} = require("../utils/firebaseUtils");
const logger = require("../middleware/logger");

// Render the test page
const renderHome = (req, res) => {
  logger.info("Test page rendered");
  res.render("test", { title: "Test" });
};

// Test registration
const testRegister = async (req, res, next) => {
  const { email, password, username, imageUrl } = req.body;
  try {
    const user = await signUpUser(email, password);
    await writeUserData(user.uid, username, email, imageUrl);
    res.send("User registered and data written successfully");
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    next(error);
  }
};

// Test login
const testLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await signInUser(email, password);
    res.send("User logged in successfully");
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    next(error);
  }
};

// Test logout
const testLogout = async (req, res, next) => {
  try {
    await signOutUser();
    res.send("User logged out successfully");
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    next(error);
  }
};

// Test password reset
const testResetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    await resetPassword(email);
    res.send("Password reset email sent");
  } catch (error) {
    logger.error(`Password reset error: ${error.message}`);
    next(error);
  }
};

// Test write user data
const testWriteUserData = async (req, res, next) => {
  const { userId, username, email, imageUrl } = req.body;
  try {
    await writeUserData(userId, username, email, imageUrl);
    res.send("User data written successfully");
  } catch (error) {
    logger.error(`Write user data error: ${error.message}`);
    next(error);
  }
};

// Test write device data
const testWriteDeviceData = async (req, res, next) => {
  const { userId, deviceId, deviceName, sensorData, place } = req.body;
  logger.info(
    `Device data: ${userId}, ${deviceId}, ${deviceName}, ${sensorData}, ${place}`
  );
  try {
    await writeDeviceData(userId, deviceId, deviceName, sensorData, place);
    res.send("Device data written successfully");
  } catch (error) {
    logger.error(`Write device data error: ${error.message}`);
    next(error);
  }
};

// Test read user data
const testReadUserData = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const data = await readUserData(userId);
    res.json(data);
  } catch (error) {
    logger.error(`Read user data error: ${error.message}`);
    next(error);
  }
};

// Test read device data
const testReadDeviceData = async (req, res, next) => {
  const { userId, deviceId } = req.params;
  try {
    const data = await readDeviceData(userId, deviceId);
    res.json(data);
  } catch (error) {
    logger.error(`Read device data error: ${error.message}`);
    next(error);
  }
};

// Test read sensor data
const testReadSensorData = async (req, res, next) => {
  const { userId, deviceId } = req.params;
  try {
    const data = await readSensorData(userId, deviceId);
    res.json(data);
  } catch (error) {
    logger.error(`Read sensor data error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  renderHome,
  testRegister,
  testLogin,
  testLogout,
  testResetPassword,
  testWriteUserData,
  testWriteDeviceData,
  testReadUserData,
  testReadDeviceData,
  testReadSensorData,
};
