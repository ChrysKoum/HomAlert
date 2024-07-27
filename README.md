# HomAlert - Smart Home Emergency Alert System

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Key Technologies and Packages](#key-technologies-and-packages)
5. [Running the Project](#running-the-project)
6. [Working with the Codebase](#working-with-the-codebase)
7. [Error Handling](#error-handling)
8. [Logging](#logging)
9. [Version Control with Git](#version-control-with-git)
10. [Best Practices](#best-practices)
11. [Debugging Tips](#debugging-tips)
12. [Additional Resources](#additional-resources)

## 1. Overview

HomAlert is an advanced Smart Home Emergency Notification System designed to safeguard households by detecting a wide array of potential emergencies, such as fires, floods, gas leaks, and unauthorized intrusions. The system integrates strategically placed sensors throughout the home, which are interconnected through a central processing unit. The system uses ESP32 due to its robust processing capabilities and built-in Wi-Fi/Bluetooth functionalities. Real-time monitoring and rapid dissemination of alerts are achieved via a user-friendly mobile app or web dashboard, providing early warnings and actionable advice to mitigate risks.

---

## 2. Getting Started

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

   The application will start running on `http://localhost:3005`.

### Running the Application with Nodemon

Nodemon is used to automatically restart the server when changes are detected. The application can be started with Nodemon using the `start` script defined in `package.json`.

```sh
npm start
```

---

## 3. Project Structure

### Directory Structure

```
HomAlert/
├── .vscode/
│   ├── settings.json
├── controllers/
│   ├── authController.js
│   ├── dashboardController.js
├── Firebase/
│   ├── firebaseAuth.js
│   ├── firebaseConfig.js
│   ├── firebaseFirestore.js
├── logs/
│   ├── combined.log
│   ├── error.log
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── sign_up_icon.png
│   │   ├── logo/
│   │   │   ├── logo_transparent_without_text.png
│   │   ├── our_team/
│   │       ├── team_member_1.jpg
│   │       ├── team_member_2.jpg
│   ├── javascripts/
│   │   ├── main.js
│   ├── stylesheets/
│   │   ├── style.css
├── routes/
│   ├── index.js
├── utils/
│   ├── firebaseUtils.js
│   ├── format.js
│   ├── validation.js
├── views/
│   ├── auth/
│   │   ├── forgot-password.ejs
│   │   ├── sign-in.ejs
│   │   ├── sign-up.ejs
│   ├── layouts/
│   │   ├── boilerplate.ejs
│   ├── partials/
│   │   ├── footer.ejs
│   │   ├── navbar.ejs
│   ├── errors/
│   │   ├── 404.ejs
│   │   ├── 500.ejs
│   ├── home.ejs
├── .env-example
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
├── server.js
```

### Explanation of Key Directories and Files

- **.vscode/**: Contains Visual Studio Code settings.
- **controllers/**: Contains logic for handling requests for different routes.
  - `authController.js`: Handles authentication-related logic.
  - `dashboardController.js`: Manages dashboard-related logic.
- **Firebase/**: Manages Firebase configurations and utilities.
  - `firebaseAuth.js`: Sets up Firebase Authentication.
  - `firebaseConfig.js`: Contains Firebase configuration setup.
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

---

## 4. Key Technologies and Packages

### Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is used to build scalable network applications.

### Express

Express is a fast, unopinionated, minimalist web framework for Node.js. It is used to create the server and handle routing.

### EJS

EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript.

### Firebase

Firebase is a platform developed by Google for creating mobile and web applications. It provides a variety of tools and services to help you develop high-quality apps.

- **firebase-admin**: This is the Firebase Admin SDK that enables access to Firebase services from privileged environments (like servers).
- **firebase**: This is the client-side Firebase SDK.

### Winston

Winston is a logger for just about everything. It is a versatile logging library for Node.js applications.

### Bootstrap

Bootstrap is a popular framework for building responsive, mobile-first websites with CSS, JavaScript, and HTML.

---

## 5. Running the Project

To run the project locally:

1. **Start the server**

   ```sh
   npm start
   ```

2. **Open your browser**

   Navigate to `http://localhost:3005` to see the application running.

---

## 6. Working with the Codebase

### Controllers

Controllers handle the logic for different routes.

- **authController.js**: Handles authentication-related logic.
- **dashboardController.js**: Manages dashboard-related logic.

### Firebase

Manages Firebase configurations and utilities.

- **firebaseAuth.js**: Sets up Firebase Authentication.
- **firebaseConfig.js**: Contains Firebase configuration setup.
- **firebaseFirestore.js**: Manages Firestore interactions.

### Middleware

Middleware functions for request handling.

- **auth.js**: Middleware for authentication checks.
- **errorHandler.js**: Middleware for error handling.
- **logger.js**: Middleware for logging requests.

### Public

Contains static assets like images, JavaScript files, and stylesheets.

### Routes

Defines the main application routes.

- **index.js**: Main route definitions.

### Utils

Utility functions for validation, formatting, and Firebase operations.

- **firebaseUtils.js**: Functions for Firebase operations.
- **format.js**: Functions for formatting data.
- **validation.js**: Functions for validating user inputs.

### Views

Contains EJS templates for rendering HTML pages.

- **auth/**: Templates related to authentication (e.g., sign-in, sign-up).
- **layouts/**: Layout templates.
- **partials/**: Reusable partial templates (e.g., navbar, footer).
- **errors/**: Error pages (404 and 500).
- **home.ejs**: Home page template.

---

## 7. Error Handling

Errors are handled using middleware. There are specific templates for 404 and 500 errors in the `views/errors` directory.

---

## 8. Logging

Winston is used for logging. Logs are stored in the `logs` directory.

- **combined.log**: Contains both request and error logs.
- **error.log**: Contains

only error logs.

---

## 9. Version Control with Git

### Basic Git Commands

1. **Pull Latest Changes from Remote Repository**

   ````sh
   git pull
   ```

   ````

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

### Creating a New Branch

1. **Create a New Branch**

   To create a new branch, use the following command:

   ```sh
   git checkout -b <your-name>
   ```

   Replace `<your-name>` with your actual name to create a branch named `your-name` and switch to it.

2. **Push the New Branch to Remote**

   Once you have made your changes and committed them, push the new branch to the remote repository:

   ```sh
   git push -u origin <your-name>
   ```

### Getting Changes from Main

1. **Switch to the Main Branch**

   Ensure you are on the main branch before pulling the latest changes:

   ```sh
   git checkout main
   ```

2. **Pull the Latest Changes from Main**

   Pull the latest changes from the remote main branch:

   ```sh
   git pull origin main
   ```

3. **Merge Main into Your Branch**

   Switch back to your branch and merge the latest changes from main:

   ```sh
   git checkout <your-name>
   git merge main
   ```

### Solving Conflicts

1. **Identify Conflicts**

   During the merge process, Git will notify you of any conflicts. Open the conflicting files to identify the conflict markers:

   ```sh
   <<<<<<< HEAD
   Your changes
   =======
   Changes from main
   >>>>>>> main
   ```

2. **Resolve Conflicts**

   Edit the files to resolve the conflicts, choosing which changes to keep. Remove the conflict markers after resolving.

3. **Mark Conflicts as Resolved**

   After resolving the conflicts, add the resolved files to the staging area:

   ```sh
   git add <file_name>
   ```

4. **Complete the Merge**

   Complete the merge process by committing the resolved changes:

   ```sh
   git commit
   ```

By following these steps, you can effectively create new branches, stay up-to-date with changes from the main branch, and resolve any merge conflicts that arise. Make sure to replace `<your-name>` with your actual name when creating and managing your branches.

### Additional Resources

- **Git Walkthrough**: [Watch Video](https://www.youtube.com/watch?v=cJTXh7g-uCM&ab_channel=AmitThinks)
- **Why to Download Git**: [Watch Video](https://www.youtube.com/watch?v=2ReR1YJrNOM&ab_channel=ProgrammingwithMosh)
- **How to Install and Configure VS Code**: [Watch Video](https://www.youtube.com/watch?v=DKxS3IkduWQ&ab_channel=WebDevSimplified)
- **GitHub Extension for VS Code**: [Watch Video](https://www.youtube.com/watch?v=i_23KUAEtUM&ab_channel=VisualStudioCode)

---

## 10. Best Practices

### Coding Standards

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

### Security Practices

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

### Performance Optimization

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

---

## 11. Debugging Tips

### Setting Up Debugging in VS Code

1. **Create a `launch.json` File**

   In VS Code, go to the Debug view (click the Debug icon or press `Ctrl+Shift+D`), then click the gear icon to configure the `launch.json` file. Use the following configuration:

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "Launch Program",
         "skipFiles": ["<node_internals>/**"],
         "program": "${workspaceFolder}/app.js"
       }
     ]
   }
   ```

2. **Add Breakpoints**

   Set breakpoints in your JavaScript files by clicking in the gutter next to the line numbers.

3. **Start Debugging**

   Press `F5` or click the green play button in the Debug view to start debugging.

### Debugging Resources

- **How to Use Breakpoints**: [Watch Video](https://www.youtube.com/watch?v=vl32ue9xm2g&ab_channel=AwaisMirza)

### Additional Debugging Tips

- **Logs**: Check application logs for error messages. Logs can be found in the `logs` directory (e.g., `combined.log` and `error.log`). You can also use `console.log` statements for quick debugging.

  ```javascript
  console.log("Debugging message:", variable);
  ```

- **Breakpoints**: Use breakpoints to step through code and identify issues. In Visual Studio Code, you can set breakpoints in your JavaScript files and run the debugger to step through your code.

- **Inspector**: Use the browser's developer tools to inspect and debug front-end issues. You can open the developer tools in most browsers with `F12` or `Ctrl+Shift+I`.

- **Logger**: Use the configured logger (Winston) to log detailed information, warnings, and errors. This helps in maintaining a clean and consistent logging strategy.

  ```javascript
  const logger = require("./middleware/logger");

  logger.info("This is an info message");
  logger.warn("This is a warning message");
  logger.error("This is an error message");
  ```

---

## 12. Additional Resources

- **Git Walkthrough**: [Watch Video](https://www.youtube.com/watch?v=cJTXh7g-uCM&ab_channel=AmitThinks)
- **Why to Download Git**: [Watch Video](https://www.youtube.com/watch?v=2ReR1YJrNOM&ab_channel=ProgrammingwithMosh)
- **How to Install and Configure VS Code**: [Watch Video](https://www.youtube.com/watch?v=DKxS3IkduWQ&ab_channel=WebDevSimplified)
- **GitHub Extension for VS Code**: [Watch Video](https://www.youtube.com/watch?v=i_23KUAEtUM&ab_channel=VisualStudioCode)

---

By following this guide, you will have a comprehensive understanding of the HomAlert project and be able to work with it effectively. If you have any questions or need further clarification, don't hesitate to ask!!
