// ===========================================
// Server Initialization File
// ===========================================
// This file starts the Express server and listens on a specified port.
// Key actions:
// 1. Import the Express app from the main application file.
// 2. Define the port to listen on.
// 3. Start the server and log the startup.

const app = require("./app"); // Import the Express app
const logger = require("./middleware/logger"); // Import the logger

// Define the port to listen on
const PORT = process.env.PORT || 3005;

// Start the server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
