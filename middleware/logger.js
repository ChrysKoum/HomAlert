// ===========================================
// Logging Middleware
// ===========================================
// This middleware logs incoming requests for monitoring and debugging purposes.
// Key actions:
// 1. Capture details of each incoming request.
// 2. Log the request method, URL, and timestamp.

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;
