const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Initialize transporter with SMTP config from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send welcome email to newly registered user
 * @param {Object} user - User object with name and email
 * @param {string} temporaryPassword - Temporary password for the user
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
async function sendWelcomeEmail(user, temporaryPassword) {
  try {
    // Render email template with user data
    const templatePath = path.join(__dirname, '../templates/welcomeEmail.ejs');
    const html = await ejs.renderFile(templatePath, {
      userName: user.name,
      userEmail: user.email,
      temporaryPassword: temporaryPassword,
      companyName: process.env.COMPANY_NAME || 'Our Company',
      loginUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`,
    });

    // Send email
    const result = await transporter.sendMail({
      from: `${process.env.COMPANY_NAME || 'Our Company'} <${process.env.SMTP_FROM_EMAIL}>`,
      to: user.email,
      subject: `Welcome to ${process.env.COMPANY_NAME || 'Our Company'}`,
      html: html,
    });

    console.log(`Welcome email sent successfully to ${user.email}`);
    return { success: true, error: null };
  } catch (error) {
    console.error(`Failed to send welcome email to ${user.email}:`, error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { sendWelcomeEmail };
