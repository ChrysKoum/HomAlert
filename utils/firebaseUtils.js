// utils/firebaseUtils.js
const { ref, set, get, child, update, remove } = require("firebase/database");
const { database } = require("../Firebase/firebaseSetup");

// Function to read user data
const readUserData = async (userId) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to update user data
const updateUserData = (userId, updatedData) => {
  update(ref(database, "users/" + userId), updatedData);
};

// Function to delete user data
const deleteUserData = (userId) => {
  remove(ref(database, "users/" + userId));
};

// Function to write user data
const writeUserData = (userId, name, email, imageUrl) => {
  set(ref(database, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
};

// Function to write device data
const writeDeviceData = (userId, deviceId, deviceName, sensorData, place) => {
  const deviceRef = ref(database, `devices/${userId}/${deviceId}`);
  set(deviceRef, {
    deviceName: deviceName,
    place: place,
    sensorData: sensorData,
  });
};

// Function to update device data
const updateDeviceData = (userId, deviceId, updatedData) => {
  const deviceRef = ref(database, `devices/${userId}/${deviceId}`);
  update(deviceRef, updatedData);
};

// Function to delete device data
const deleteDeviceData = (userId, deviceId) => {
  const deviceRef = ref(database, `devices/${userId}/${deviceId}`);
  remove(deviceRef);
};

// Function to read device data
const readDeviceData = async (userId, deviceId) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `devices/${userId}/${deviceId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to read sensor data
const readSensorData = async (userId, deviceId) => {
  const dbRef = ref(database, `devices/${userId}/${deviceId}/sensorData`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No sensor data available");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  writeUserData,
  readUserData,
  updateUserData,
  deleteUserData,
  writeDeviceData,
  updateDeviceData,
  deleteDeviceData,
  readDeviceData,
  readSensorData,
};
