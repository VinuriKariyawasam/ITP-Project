const Quotation = require("../../models/sm/quotationModel");

// Controller function to create a new quotation
const createQuotation = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request body for debugging
    const { vnumber, startDate, services, borrowingItems } = req.body;

    // Calculate total price based on selected services
const totalPrice = services.reduce((total, service) => {
  if (service.selected && service.price) {
    return total + parseFloat(service.price);
  }
  return total;
}, 0);

    // Create a new Quotation instance with the provided data including totalPrice
    const newQuotation = new Quotation({
      vnumber,
      startDate,
      services,
      borrowingItems,
      totalPrice,
    });

    // Save the new quotation to the database
    const savedQuotation = await newQuotation.save();

    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all quotations
const getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a quotation by ID
const deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuotation = await Quotation.findByIdAndDelete(id);
    if (!deletedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json({ message: "Quotation deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuotation,
  getAllQuotations,
  deleteQuotation,
};
