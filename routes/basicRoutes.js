const express = require("express");
const router = express.Router();
const logger = require("../middleware/logger");
const teamMembers = require("../data/team/members");
const testimonials = require("../data/reviews/testimonials");
const sensors = require("../data/product/sensors");
const faqItems = require("../data/faq/questions");
const centerHub = sensors.find(sensor => sensor.title === "Center Hub:");
// Here becarefull here you deleted the old testimonials and didn't match with the new structure and getting error on the faq page
// const testimonials = require("../data/reviews/testimonials.json");
// You will remove this and replace all the logic on other pages with your new partials/testimonials to match your new data structure
const hero = require('../data/contents/hero.json');
const features = require('../data/contents/features.json');
const whyChooseUs = require('../data/contents/whyChooseUs');
const testimonials = require('../data/contents/testimonials.json');
// Home route
router.get("/", (req, res, next) => {
  try {
    res.render("home", { 
      hero,
      features,
      whyChooseUs,
      testimonials 
    });
  } catch (error) {
    logger.error(`Error in home route: ${error.message}`);
    next(error);
  }
});


// About Us Route
router.get("/about", (req, res) => {
  logger.info("About Us route accessed");
  res.render("about-us.ejs", { teamMembers, testimonials });
});

// Contact Us Route
router.get("/contact", (req, res) => {
  logger.info("Contact Us route accessed");
  res.render("contact-us.ejs");
});


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
