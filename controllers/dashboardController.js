// ===========================================
// Dashboard Controller
// ===========================================
// This file contains the logic for handling dashboard-related routes.
// Key actions:
// 1. Fetch and display real-time sensor data.
// 2. Render the dashboard view.

const { getSensorData } = require("../utils/firebaseUtils");

const dashboardController = {
  // Handles displaying the dashboard
  // req: The request object represents the HTTP request and contains properties for the request query string, parameters, body, headers, etc.
  // res: The response object represents the HTTP response that an Express app sends when it gets an HTTP request.
  // next: A function that is called to pass control to the next middleware function. (Not used directly in this example but useful for error handling middleware.)
  showDashboard: async (req, res) => {
    try {
      // Asynchronously fetch sensor data
      // const data = await getSensorData();
      // Render the dashboard view with the fetched data
      res.render("dashboard/dashboard", { title: "Dashboard" });
    } catch (error) {
      // Handle any errors that occur during data fetching
      res.status(500).send("Error fetching sensor data");
    }
  },
};

module.exports = dashboardController;
