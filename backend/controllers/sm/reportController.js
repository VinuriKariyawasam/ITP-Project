const ServiceReport = require('../../models/sm/reportsModel');

// Helper function to calculate total service price
const calculateTotalServicePrice = (services) => {
  let totalPrice = 0;
  services.forEach((service) => {
    if (service.completed && service.price !== "") {
      totalPrice += parseFloat(service.price);
    }
  });
  return totalPrice;
};

// Helper function to generate service report ID
const generateServiceReportId = (counter) => {
  const formattedId = `SM${counter.toString().padStart(2, '0')}`;
  return formattedId;
};

// Submit a new service report
exports.submitReport = async (req, res) => {
  try {
    const {
      vehicleNumber,
      selectedStartDate,
      selectedEndDate,
      selectedTestDate,
      services,
      inventoryUsed,
      borrowedItems,
      testRunDone,
      testRunDetails,
      inventoryTotalPrice,
      serviceDoneTechnicianId,
      testDoneTechnicianId
    } = req.body;

    // Validate required fields
    if (!vehicleNumber) {
      return res.status(400).json({ error: 'Vehicle number is required' });
    }

    // Calculate total service price
    const totalServicePrice = calculateTotalServicePrice(services);

    // Generate service report ID
    const serviceReportIdCounter = await ServiceReport.countDocuments({}) + 1;
    const serviceReportId = generateServiceReportId(serviceReportIdCounter);

    // Create a new service report instance
    const newServiceReport = new ServiceReport({
      serviceReportId,
      vehicleNumber,
      selectedStartDate,
      selectedEndDate,
      selectedTestDate,
      services,
      inventoryUsed,
      borrowedItems,
      testRunDone,
      testRunDetails,
      totalServicePrice,
      inventoryTotalPrice,
      serviceDoneTechnicianId,
      testDoneTechnicianId
    });

    // Save the service report to the database
    await newServiceReport.save();

    res.status(201).json({
      message: 'Report submitted successfully',
      serviceReport: newServiceReport
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
};


// Get all service reports
exports.getAllReports = async (req, res) => {
  try {
    const allReports = await ServiceReport.find();
    res.status(200).json(allReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// Get a single service report by ID
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ServiceReport.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

// Get count of all service reports
exports.getCountOfServiceReports = async (req, res) => {
  try {
    const count = await ServiceReport.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error counting service reports:', error);
    res.status(500).json({ error: 'Failed to count service reports' });
  }
};