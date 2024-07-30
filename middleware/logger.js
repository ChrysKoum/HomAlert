// ===========================================
// Logging Middleware
// ===========================================
// This middleware logs incoming requests for monitoring and debugging purposes.
// Key actions:
// 1. Capture details of each incoming request.
// 2. Log the request method, URL, and timestamp.

const { createLogger, format, transports } = require("winston");
const { combine, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const timestampWithOffset = format((info) => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 3); // Adding 3 hours to the current time
  info.timestamp = currentDate.toISOString();
  return info;
});

const logger = createLogger({
  format: combine(timestampWithOffset(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;
