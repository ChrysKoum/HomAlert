const express = require("express");
const router = express.Router();
const logger = require("../middleware/logger");

// Home route
router.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.render("home", { title: "Home" });
});

// About Us Route
router.get("/about", (req, res) => {
  logger.info("About Us route accessed");
  res.render("about-us.ejs");
});

// Contact Us Route
router.get("/contact", (req, res) => {
  logger.info("Contact Us route accessed");
  res.render("contact-us.ejs");
});

// FAQ Route
router.get("/faq", (req, res) => {
  logger.info("FAQ route accessed");
  res.render("faq.ejs");
});

// Product Route
router.get("/product", (req, res) => {
  logger.info("Product route accessed");
  res.render("product.ejs");
});

// Login Route
router.get("/login", (req, res) => {
  logger.info("Login route accessed");
  res.render("auth/sign-in.ejs");
});

// Register Route
router.get("/register", (req, res) => {
  logger.info("Register route accessed");
  res.render("auth/sign-up.ejs");
});

module.exports = router;
