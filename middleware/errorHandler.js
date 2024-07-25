// ===========================================
// Error Handling Middleware
// ===========================================
// This middleware handles errors that occur during request processing.
// Key actions:
// 1. Capture any errors thrown during request processing.
// 2. Log the error details for debugging.
// 3. Send a meaningful error response to the client.

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

module.exports = errorHandler;
