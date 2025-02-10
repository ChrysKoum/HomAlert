// controllers/apiController.js

// Mock Data - Replace with actual data fetching logic (e.g., database queries)
const dashboardData = {
    user: {
      name: 'Kostantine',
    },
    message: 'Welcome back to your smart home dashboard!',
  };
  
  const sensorsData = {
    water: {
      moistureLevel: '41%',
      indicator: '+6%',
      average: '35%',
    },
    gas: {
      ppm: '4 ppm',
      indicator: '+1 ppm',
      average: '3 ppm',
    },
    fire: {
      status: 'ON',
      indicator: 'Warning',
    },
    motion: {
      status: 'OFF',
      indicator: '',
    },
    smoke: {
      status: 'ON',
      indicator: 'Warning',
    },
  };
  
  const eventsStatistics = {
    date: '20 September 2024',
    data: [
      { hour: '7 am', events: 50 },
      { hour: '8 am', events: 75 },
      { hour: '9 am', events: 100 },
      { hour: '10 am', events: 120 },
      { hour: '11 am', events: 90 },
      { hour: '12 pm', events: 80 },
      { hour: '1 pm', events: 70 },
      { hour: '2 pm', events: 60 },
      { hour: '3 pm', events: 65 },
      { hour: '4 pm', events: 85 },
      { hour: '5 pm', events: 95 },
      { hour: '6 pm', events: 110 },
      { hour: '7 pm', events: 130 },
      { hour: '8 pm', events: 120 },
      { hour: '9 pm', events: 1100 }, // Assuming a typo, perhaps 1300
    ],
  };
  
  const weatherData = {
    current: {
      temperature: '25°C',
      condition: 'Sunnyday Morning',
    },
    home: {
      temperature: {
        value: '22°C',
        indicator: '+3°C',
      },
      humidity: {
        value: '45%',
        indicator: '+6%',
      },
      aqi: {
        value: '50 AQI',
        indicator: '+110 AQI',
      },
    },
  };
  
  const activityLogs = [
    {
      sensor: 'Fire Sensor',
      date: '12/10/2024',
      description: 'Detect smoke in the kitchen',
      room: 'Kitchen',
      notify: 'Dad',
    },
    {
      sensor: 'Water Sensor',
      date: '11/10/2024',
      description: 'High moisture detected in basement',
      room: 'Basement',
      notify: 'Plumber',
    },
    // Add more logs as needed
  ];
  
  // Controller Functions
  
  // Get Dashboard Data
  const getDashboardData = (req, res) => {
    res.json(dashboardData);
  };
  
  // Get Sensors Data
  const getSensorsData = (req, res) => {
    res.json(sensorsData);
  };
  
  // Get Events Statistics
  const getEventsStatistics = (req, res) => {
    res.json(eventsStatistics);
  };
  
  // Get Weather Data
  const getWeatherData = (req, res) => {
    res.json(weatherData);
  };
  
  // Get Activity Logs
  const getActivityLogs = (req, res) => {
    res.json(activityLogs);
  };
  
  module.exports = {
    getDashboardData,
    getSensorsData,
    getEventsStatistics,
    getWeatherData,
    getActivityLogs,
  };
  