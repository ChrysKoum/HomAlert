const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const logger = require("../middleware/logger");

// PUT Route for User Update (Protected)
router.put("/update", authMiddleware, (req, res, next) => {
  logger.info("User update attempted");
  authController
    .updateUser(req, res, next)
    .then(() => {
      logger.info("User updated successfully");
    })
    .catch((err) => {
      logger.error(`User update error: ${err.message}`);
      next(err);
    });
});

// DELETE Route for User Deletion (Protected)
router.delete("/delete", authMiddleware, (req, res, next) => {
  logger.info("User deletion attempted");
  authController
    .deleteUser(req, res, next)
    .then(() => {
      logger.info("User deleted successfully");
    })
    .catch((err) => {
      logger.error(`User deletion error: ${err.message}`);
      next(err);
    });
});

module.exports = router;
