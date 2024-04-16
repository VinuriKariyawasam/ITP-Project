const contactusSchema = require('../models/contactusModel');

const contactusController = {
  sendMessage: async (req, res) => {
    try {
      const { cusName, cusEmail, message } = req.body;
      
      // Create a new contact us message
      const newMessage = new contactusSchema({
        cusName,
        cusEmail,
        message
      });

      // Save the message to the database
      await newMessage.save();

      // Send success response
      res.status(201).json({ message: "Your message has been successfully sent" });
    } catch (error) {
      // Handle errors
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllContacts : async (req, res) => {
    try {
        const contacts = await contactusSchema.find();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching contacts' });
    }
  }
};

module.exports =  contactusController ;