// ===========================================
// Dashboard Controller
// ===========================================
// This file contains the logic for handling dashboard-related routes.
// Key actions:
// 1. Fetch and display real-time sensor data.
// 2. Render the dashboard view.

const { getSensorData } = require("../utils/firebaseUtils");

const dashboardController = {
  showDashboard: async (req, res) => {
    try {
      const data = await getSensorData();
      res.render("dashboard", { title: "Dashboard", data });
    } catch (error) {
      res.status(500).send("Error fetching sensor data");
    }
  },
};

module.exports = dashboardController;
