const express = require("express");
const router = express.Router();
const logger = require("../middleware/logger");
const teamMembers = require("../data/team/members");
const testimonials = require("../data/reviews/testimonials");
const sensors = require("../data/product/sensors");
const faqItems = require("../data/faq/questions");
const centerHub = sensors.find(sensor => sensor.title === "Center Hub:");

// Home route
router.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.render("home", { title: "Home", testimonials });
});

// About Us Route
router.get("/about", (req, res) => {
  logger.info("About Us route accessed");
  res.render("about-us.ejs", { teamMembers, testimonials });
});

// Contact Us Route
router.get("/contact", (req, res) => {
  logger.info("Contact Us route accessed");
  res.render("contact-us.ejs", { testimonials });
});

// ===========================================
// POST Route for Contact Us Form Submission
// ===========================================
// This route will handle the form submission from the contact-us.ejs page.
// It should call a controller function to process the email sending.
router.post("/contact", contactController.handleContactForm);
// ===========================================


// FAQ Route
router.get("/faq", (req, res) => {
  logger.info("FAQ route accessed");
  res.render("faq.ejs", { faqItems, testimonials });
});

// Product Route
router.get("/product", (req, res) => {
  logger.info("Product route accessed");
  res.render("product.ejs", { sensors, centerHub, testimonials });
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
