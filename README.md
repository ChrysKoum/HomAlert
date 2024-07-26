# HomAlert - Smart Home Emergency Alert System

## Overview

HomAlert is an advanced Smart Home Emergency Notification System designed to safeguard households by detecting a wide array of potential emergencies, such as fires, floods, gas leaks, and unauthorized intrusions. The system integrates strategically placed sensors throughout the home, which are interconnected through a central processing unit. The system uses ESP32 due to its robust processing capabilities and built-in Wi-Fi/Bluetooth functionalities. Real-time monitoring and rapid dissemination of alerts are achieved via a user-friendly mobile app or web dashboard, providing early warnings and actionable advice to mitigate risks.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Firebase account with configured Firestore and Realtime Database
- Git

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/ChrysKoum/HomAlert.git
   cd HomAlert
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Firebase credentials.

   ```sh
   cp .env-example .env
   ```

   Fill in the values in the `.env` file with your Firebase configuration:

   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_DATABASE_URL=your_database_url
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the Application**

   ```sh
   npm start
   ```

   The application will start running on `http://localhost:3000`.

### Running the Application with Nodemon

Nodemon is used to automatically restart the server when changes are detected. The application can be started with Nodemon using the `start` script defined in `package.json`.

```sh
npm start
```

## Project Structure

### Directory Structure

```
|-- .vscode
|   |-- settings.json
|-- controllers
|   |-- authController.js
|   |-- dashboardController.js
|-- Firebase
|   |-- firebaseAuth.js
|   |-- firebaseSetup.js
|   |-- firebaseFirestore.js
|-- middleware
|   |-- auth.js
|   |-- errorHandler.js
|   |-- logger.js
|-- public
|   |-- assets
|   |   |-- icons
|   |   |   |-- sign_up_icon.png
|   |   |-- logo
|   |   |   |-- logo transparent without text.png
|   |   |-- our team
|   |       |-- ahmed-yameen.jpg
|   |       |-- angelo-abear.jpg
|   |       |-- ethan-rougon.jpg
|   |       |-- jose-matute.jpg
|   |       |-- unsplash-profile-1.jpg
|   |       |-- unsplash-profile-2.jpg
|   |       |-- unsplash-source-404.jpg
|   |-- javascripts
|   |   |-- main.js
|   |   |-- index.js
|   |-- stylesheets
|   |   |-- style.css
|-- routes
|   |-- index.js
|-- utils
|   |-- validation.js
|   |-- format.js
|   |-- firebaseUtils.js
|-- views
|   |-- auth
|   |   |-- forgot-password.ejs
|   |   |-- sign-in.ejs
|   |   |-- sign-up.ejs
|   |-- layouts
|   |   |-- boilerplate.ejs
|   |-- partials
|   |   |-- footer.ejs
|   |   |-- navbar.ejs
|   |-- about-us.ejs
|   |-- contact-us.ejs
|   |-- dashboard.ejs
|   |-- faq.ejs
|   |-- home.ejs
|   |-- product.ejs
|   |-- profile-page.ejs
|-- .env-example
|-- .gitignore
|-- app.js
|-- package.json
|-- README.md
```

### Explanation of Key Directories and Files

- **.vscode/**: Contains Visual Studio Code settings.
- **controllers/**: Contains logic for handling requests for different routes.
  - `authController.js`: Handles authentication-related logic.
  - `dashboardController.js`: Manages dashboard-related logic.
- **Firebase/**: Manages Firebase configurations and utilities.
  - `firebaseAuth.js`: Sets up Firebase Authentication.
  - `firebaseSetup.js`: Contains Firebase configuration setup.
  - `firebaseFirestore.js`: Manages Firestore interactions.
  - `firebaseUtils.js`: Contains utility functions for Firebase operations.
- **middleware/**: Contains middleware functions for request handling.
  - `auth.js`: Middleware for authentication checks.
  - `errorHandler.js`: Middleware for error handling.
  - `logger.js`: Middleware for logging requests.
- **public/**: Contains static assets like images, JavaScript files, and stylesheets.
- **routes/**: Defines the main application routes.
  - `index.js`: Main route definitions.
- **utils/**: Contains utility functions for validation, formatting, and Firebase operations.
  - `validation.js`: Utility functions for validating user inputs.
  - `format.js`: Utility functions for formatting data.
  - `firebaseUtils.js`: Utility functions for Firebase operations.
- **views/**: Contains EJS templates for rendering HTML pages.
  - `auth/`: Templates related to authentication (e.g., sign-in, sign-up).
  - `layouts/`: Layout templates.
  - `partials/`: Reusable partial templates (e.g., navbar, footer).
  - Main pages (e.g., home.ejs, dashboard.ejs, contact-us.ejs).

## Git Workflow Guide

### Basic Git Commands

1. **Pull Latest Changes from Remote Repository First think after opeening Vs Code**

   ```sh
   git pull
   ```

2. **Add Changes to Staging**

   ```sh
   git add .
   ```

3. **Check Status of the Repository**

   ```sh
   git status
   ```

4. **Commit Changes**

   ```sh
   git commit -m "Your descriptive commit message"
   ```

5. **Push Changes to Remote Repository**

   ```sh
   git push
   ```

### Installing VS Code Extensions

1. **Open VS Code**

2. **Go to Extensions View**

   Click on the Extensions icon in the Activity Bar on the side of the window or press `Ctrl+Shift+X`.

3. **Search and Install Extensions**

   - **Prettier - Code formatter**: Ensures consistent code formatting.
   - **ESLint**: Identifies and fixes common coding issues.
   - **GitLens**: Enhances Git capabilities within VS Code.
   - **Live Server**: Launches a local development server with live reload.

4. **Install an Extension**

   Click the install button for the desired extension.

### Best Practices

#### Coding Standards

- **Consistent Naming Conventions**: Use camelCase for variables and functions, PascalCase for classes.

  ```javascript
  // Bad
  var my_variable = 10;

  // Good
  var myVariable = 10;
  ```

- **Commenting and Documentation**: Add comments and documentation to explain complex logic.

  ```javascript
  /**
   * Calculates the sum of two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} - The sum of a and b.
   */
  function sum(a, b) {
    return a + b;
  }
  ```

- **Avoid Magic Numbers**: Use constants instead of hardcoding numbers.

  ```javascript
  // Bad
  for (let i = 0; i < 7; i++) {
    // ...
  }

  // Good
  const DAYS_IN_WEEK = 7;
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    // ...
  }
  ```

#### Security Practices

- **Environment Variables**: Always use environment variables for sensitive data.

  ```env
  FIREBASE_API_KEY=your_api_key
  ```

- **Input Validation**: Validate all user inputs to prevent SQL injection and other vulnerabilities.

  ```javascript
  const validateInput = (input) => {
    if (typeof input !== "string") {
      throw new Error("Invalid input");
    }
  };
  ```

- **Authentication and Authorization**: Ensure that routes are protected and only accessible to authenticated users.
  ```javascript
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };
  ```

#### Performance Optimization

- **Caching**: Use caching strategies to improve performance.

  ```javascript
  const cache = new Map();

  const getData = (key) => {
    if (cache.has(key)) {
      return cache.get(key);
    }
    const data = fetchDataFromDatabase(key);
    cache.set(key, data);
    return data;
  };
  ```

- **Database Optimization**: Optimize queries and use indexing.

```sql
 CREATE INDEX idx_user_id ON users(user_id);
```

## Troubleshooting

### Common Issues

- **Installation Errors**: Ensure all dependencies are installed and environment variables are set correctly.
- **Firebase Connectivity**: Check Firebase configuration and network connectivity.

### Debugging Tips

- **Logs**: Check application logs for error messages.
- **Breakpoints**: Use breakpoints to step through code and identify issues.
