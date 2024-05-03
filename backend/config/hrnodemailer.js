// nodemailerController.js

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.HRMAIL,
    pass: process.env.HRPWD,
  },
});

exports.sendMail = async (req, res) => {
  const { to, subject, text, html, attachments } = req.body;

  try {
    // Create mail options
    const mailOptions = {
      from: {
        name: "HR@ Neo Tech Motors",
        address: process.env.HRMAIL,
      },
      to,
      subject,
      text,
      html,
      attachments,
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error });
  }
};
