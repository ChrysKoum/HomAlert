// routes/apiRoutes.js

const express = require('express');
const router = express.Router();

// Import Controllers
const {
  getDashboardData,
  getSensorsData,
  getStatistics, // Renamed/New combined controller
  getWeatherData,
  getActivityLogs,
  getRoomData, 
} = require('../controllers/apiController');

// Define API Routes

// GET /api/dashboard-data
router.get('/dashboard-data', getDashboardData);

// GET /api/sensors
router.get('/sensors', getSensorsData);

// GET /api/statistics?timeframe=day|week|month
router.get('/statistics', getStatistics); // Use a single route

// GET /api/room/:roomName (e.g., /api/room/kitchen)
router.get('/room/:roomName', getRoomData); // Add route for specific rooms

// GET /api/weather
router.get('/weather', getWeatherData);

// GET /api/activity-logs
router.get('/activity-logs', getActivityLogs);

module.exports = router;
