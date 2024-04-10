// nodemailerController.js

const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.outlook365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

const sendMail = async (req, res) => {
  const { to, subject, text, html, attachments } = req.body;

  try {
    // Create mail options
    const mailOptions = {
      from: {
        name: 'Neo Tech Motors',
        address: process.env.EMAIL
      },
      to,
      subject,
      text,
      html,
    
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { sendMail };
