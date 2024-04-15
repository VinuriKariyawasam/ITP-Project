const ServiceReport = require('../../models/sm/reportsModel');

const getAllServiceReports = async (req, res) => {
  try {
    const serviceReports = await ServiceReport.find();
    res.json(serviceReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUnapprovedServiceReports = async (req, res) => {
  try {
    const unapprovedServiceReports = await ServiceReport.find({
      FinanceApproval: false,
    });
    res.json(unapprovedServiceReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFinanceApproval = async (req, res) => {
  const { id } = req.params;
  const { FinanceApproval } = req.body;

  try {
    const serviceReport = await ServiceReport.findByIdAndUpdate(
      id,
      { FinanceApproval : true}
      
    );

    if (!serviceReport) {
      return res.status(404).json({ message: "Service report not found" });
    }

    res.json('updated successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllServiceReports,
  getUnapprovedServiceReports,
  updateFinanceApproval,
};
