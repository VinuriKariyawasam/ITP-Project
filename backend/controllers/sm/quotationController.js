const Quotation = require("../../models/sm/quotationModel");

// Controller function to create a new quotation
const createQuotation = async (req, res) => {
  try {
    const { vnumber, startDate, services, otherDetails } = req.body;

    // Calculate total price based on selected services
    const totalPrice = services
      .filter((service) => service.selected && service.price)
      .reduce((total, service) => total + parseFloat(service.price), 0);

    // Create a new Quotation instance with the provided data including totalPrice
    const newQuotation = new Quotation({
      vnumber,
      startDate,
      services,
      totalPrice,
      otherDetails,
    });

    // Save the new quotation to the database
    const savedQuotation = await newQuotation.save();

    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createQuotation,
};
