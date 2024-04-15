const fs = require('fs');
const axios = require('axios');
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass:process.env.PASSWORD
  },
  
});

exports.sendIMail = async (req, res) => {
  const { to, subject, text, html, orderId} = req.body;

  try {
    const pdfResponse = await axios.get('http://localhost:5000/Product/generate-pdf', {
      responseType: 'arraybuffer',
      params: { orderId } 
    });
    const pdfData = Buffer.from(pdfResponse.data, 'binary');

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
      attachments: [
        {
          filename: 'ordersummary.pdf',
          content: pdfData
        }
      ]
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error });
  }
}
