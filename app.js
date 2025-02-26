const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const ejsMate = require("ejs-mate");
const indexRouter = require("./routes/index");
const logger = require("./middleware/logger");

// Load environment variables from .env file
dotenv.config();

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/dashboard', (req, res) => {
  // Redirect to Vite development server
  res.redirect('http://localhost:5173/dashboard');
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).render("errors/404", { title: "404 Not Found" });
});

app.use((err, req, res, next) => {
  logger.error(`Server error: ${err.message}`);
  res.status(500).render("errors/500", { title: "500 Internal Server Error" });
});



module.exports = app;
