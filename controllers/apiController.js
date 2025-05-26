// controllers/apiController.js

// Mock Data - Replace with actual data fetching logic (e.g., database queries)
const dashboardData = {
  user: {
    name: 'Kostantine',
  },
  message: 'Welcome back to your smart home dashboard!',
};

const activityLogs = [
  { sensor: 'Motion-LR', date: '2024-07-27 10:35', description: 'Motion detected', room: 'Living Room', notify: 'Yes' },
  { sensor: 'Smoke-K', date: '2024-07-27 10:30', description: 'Smoke Alert Triggered', room: 'Kitchen', notify: 'Yes' },
  { sensor: 'Door-F', date: '2024-07-27 09:55', description: 'Door Opened', room: 'Entrance', notify: 'No' },
  { sensor: 'Water-B', date: '2024-07-27 09:15', description: 'Water Leak Warning', room: 'Basement', notify: 'Yes' },
  { sensor: 'Temp-BR1', date: '2024-07-27 08:00', description: 'Temperature set to 22°C', room: 'Bedroom 1', notify: 'No' },
  { sensor: 'Motion-LR', date: '2024-07-26 22:10', description: 'Motion detected', room: 'Living Room', notify: 'Yes' },
  { sensor: 'Window-LR', date: '2024-07-26 18:05', description: 'Window Closed', room: 'Living Room', notify: 'No' },
  { sensor: 'Gas-K', date: '2024-07-26 17:30', description: 'Gas level normal', room: 'Kitchen', notify: 'No' },
];

const sensorsData = {
  water: { moistureLevel: '41%', indicator: '+6%', average: '35%', status: 'OK' },
  gas: { ppm: '4 ppm', indicator: '+1 ppm', average: '3 ppm', status: 'Offline' },           // marked offline
  temperature: { value: '22°C', indicator: '+2°C', average: '20°C', status: 'OK' },
  humidity: { value: '45%', indicator: '+6%', average: '40%', status: 'OK' },
  fire: { status: 'ON', indicator: 'Warning' },
  motion: { status: 'OFF', indicator: '', statusDetail: 'Offline' },                           // explicitly offline
  smoke: { status: 'ON', indicator: 'Warning', statusDetail: 'Critical' },                   // critical alert
  door: { status: 'Closed', indicator: '', status: 'OK' },  
  window: { status: 'Open', indicator: 'Alert', status: 'Warning' },                         // warning
  earthquake: { magnitude: '2.5', indicator: 'Minor', depth: '10 km', status: 'Critical' },  // critical sensor
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
    { hour: '9 pm', events: 130 },
  ],
};

// Weekly aggregated events (last 7 days)
const weeklyStatistics = {
  weekStart: '14 September 2024',
  weekEnd: '20 September 2024',
  data: [
    { day: 'Saturday', events: 800 },
    { day: 'Sunday', events: 950 },
    { day: 'Monday', events: 1100 },
    { day: 'Tuesday', events: 1050 },
    { day: 'Wednesday', events: 1200 },
    { day: 'Thursday', events: 1150 },
    { day: 'Friday', events: 1250 },
  ],
};

// Monthly aggregated events (last 30 days)
const monthlyStatistics = {
  month: 'September 2024',
  data: Array.from({ length: 30 }).map((_, i) => ({
    date: `${i + 1} September 2024`, // adjust month format as needed
    events: Math.floor(500 + Math.random() * 1000),
  })),
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

// --- Room Specific Mock Data ---

const kitchenSensorsData = {
  smoke: { status: 'OK', indicator: '' },
  gas: { ppm: '3 ppm', indicator: '-1 ppm', average: '4 ppm' },
  // Add other kitchen-specific sensors like smart faucet, fridge temp etc.
};

const kitchenActivityLogs = activityLogs.filter(log => log.room === 'Kitchen');

const bathroomSensorsData = {
  water: { moistureLevel: '15%', indicator: '-2%', average: '17%' },
  humidity: { value: '55%', indicator: '+1%' },
  // Add other bathroom sensors like smart mirror, vent status etc.
};

const bathroomActivityLogs = activityLogs.filter(log => log.room === 'Bathroom' || log.room === 'Basement'); // Example: Include Basement water

const livingRoomSensorsData = {
  motion: { status: 'Inactive', indicator: '' },
  temperature: { value: '21°C', indicator: '-1°C' }, // Assuming weatherData.home.temperature is general
  window: { status: 'Closed' },
  // Add smart TV, lights etc.
};

const livingRoomActivityLogs = activityLogs.filter(log => log.room === 'Living Room');

// Controller Functions
// Get Dashboard Data
const getDashboardData = (req, res) => {
  res.json(dashboardData);
};

// Get Sensors Data
const getSensorsData = (req, res) => {
  res.json(sensorsData);
};

// Combined Statistics Controller
const getStatistics = (req, res) => {
  const timeframe = req.query.timeframe || 'day'; // Default to 'day'

  // --- IMPORTANT ---
  // Replace this switch with logic to efficiently query
  // your PRE-AGGREGATED data based on the timeframe.
  switch (timeframe.toLowerCase()) {
    case 'week':
      // Example: Fetch pre-aggregated weekly data
      res.json(weeklyStatistics); // Replace with actual DB query result
      break;
    case 'month':
      // Example: Fetch pre-aggregated monthly data
      res.json(monthlyStatistics); // Replace with actual DB query result
      break;
    case 'day':
    default:
      // Example: Fetch pre-aggregated daily data
      res.json(eventsStatistics); // Replace with actual DB query result
      break;
  }
};

// Get Weather Data
const getWeatherData = (req, res) => {
  res.json(weatherData);
};

// Get Activity Logs
const getActivityLogs = (req, res) => {
  res.json(activityLogs);
};

// --- Room Specific Controllers ---

const getRoomData = (req, res) => {
  const room = req.params.roomName?.toLowerCase();
  let sensors = {};
  let activities = [];
  let roomTitle = 'Room';

  switch (room) {
    case 'kitchen':
      sensors = kitchenSensorsData;
      activities = kitchenActivityLogs;
      roomTitle = 'Kitchen';
      break;
    case 'bathroom':
      sensors = bathroomSensorsData;
      activities = bathroomActivityLogs;
      roomTitle = 'Bathroom';
      break;
    case 'living':
      sensors = livingRoomSensorsData;
      activities = livingRoomActivityLogs;
      roomTitle = 'Living Room';
      break;
    default:
      return res.status(404).json({ message: 'Room not found' });
  }

  // Combine general data with room-specific data
  // Note: Statistics and Weather are kept general for this example,
  // but could be made room-specific if needed.
  res.json({
    room: roomTitle,
    user: dashboardData.user, // Reuse general user data
    sensors: sensors,
    statistics: eventsStatistics, // Use general stats for now
    weather: weatherData,         // Use general weather for now
    activities: activities,
  });
};

module.exports = {
  getDashboardData,
  getSensorsData,
  getStatistics,
  getWeatherData,
  getActivityLogs,
  getRoomData, // Export the new room controller
};
