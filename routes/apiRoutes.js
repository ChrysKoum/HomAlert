// routes/apiRoutes.js

const express = require('express');
const router = express.Router();

// Import Controllers
const {
  getDashboardData,
  getSensorsData,
  getEventsStatistics,
  getWeatherData,
  getActivityLogs,
} = require('../controllers/apiController');

// Define API Routes

// GET /api/dashboard-data
router.get('/dashboard-data', getDashboardData);

// GET /api/sensors
router.get('/sensors', getSensorsData);

// GET /api/events-statistics
router.get('/events-statistics', getEventsStatistics);

// GET /api/weather
router.get('/weather', getWeatherData);

// GET /api/activity-logs
router.get('/activity-logs', getActivityLogs);

module.exports = router;
