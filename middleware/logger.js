// ===========================================
// Logging Middleware
// ===========================================
// This middleware logs incoming requests for monitoring and debugging purposes.
// Key actions:
// 1. Capture details of each incoming request.
// 2. Log the request method, URL, and timestamp.

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

module.exports = logger;
