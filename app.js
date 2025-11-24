const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors"); // Import cors
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

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:3005"
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow Vercel deployments (main and preview) and local development
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    
    // Optional: Log blocked origins for debugging
    console.log("Blocked by CORS:", origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true // Allow cookies/sessions
}));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true, // Uncomment if using HTTPS
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Middleware to make user available to all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});

app.get('/dashboard', (req, res) => {
  // Redirect to frontend app. Use FRONTEND_URL if set (works for Vercel),
  // otherwise fall back to local dev URL. Strip trailing slash to avoid double slashes.
  const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
  res.redirect(`${frontendUrl}/dashboard`);
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
