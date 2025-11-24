// filepath: d:\business\4_Personal Projects\3_IDAC\0_HomAlert\controllers\contactController.js
// ===========================================
// Contact Controller
// ===========================================
// This controller handles the logic for the "Contact Us" form.

// const nodemailer = require('nodemailer');
// const logger = require('../middleware/logger'); // It will be good to use logger so you can see on the terminal what is happening

// 1. Configure Nodemailer transporter

const contactController = {
  handleContactForm: async (req, res, next) => {
    // 2. Extract user input from req.body

    // 3. Validate input (optional but recommended)

    try {
      // 4. Send confirmation email to the user
      //    - Use transporter.sendMail() to send the email and if everything is okay then use the logger below so you can see it on the terminal
      //    - logger.info(`Confirmation email sent to ${email}`);

      // 5. Send notification email to your team

      // 6. Render the contact page with a success message

    } catch (error) {
      // 7. Handle errors
    }
  },
};

module.exports = contactController;