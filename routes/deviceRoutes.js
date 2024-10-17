const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/auth");
const logger = require("../middleware/logger");

// PUT Route for Editing Device Name and Place (Protected)
router.put("/update", authMiddleware, (req, res, next) => {
  logger.info("Device update attempted");
  dashboardController
    .updateDevice(req, res, next)
    .then(() => {
      logger.info("Device updated successfully");
    })
    .catch((err) => {
      logger.error(`Device update error: ${err.message}`);
      next(err);
    });
});

module.exports = router;
