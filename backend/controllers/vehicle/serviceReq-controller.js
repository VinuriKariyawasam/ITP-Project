const ServiceRequestModel = require("../../models/vehicle/serviceRequestModel");
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");

const uploadDirectory = 'your/upload/directory'; // Define your upload directory

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Adjust the file size limit as needed
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

exports.createServiceReq = async (req, res) => {
  try {
    const serviceReqData = req.body;
    // Parse the quotation to remove currency symbol and convert it to a number
    serviceReqData.quotation = parseFloat(serviceReqData.quotation.replace("Rs. ", ""));
    const newServiceReq = new ServiceRequestModel(serviceReqData);
    await newServiceReq.save();

    res.status(201).json(newServiceReq);
  } catch (error) {
    console.error("Error saving service request:", error);
    res.status(500).json({ error: "Failed to save service request" });
  }
};


exports.getServiceReqs = async (req, res) => {
  try {
    let serviceReqs = await ServiceRequestModel.find();

    res.json({
        serviceReqs: serviceReqs.map((serviceReq) =>
        serviceReq.toObject({ getters: true })
      ),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceReqById = async (req, res) => {
  try {
    const serviceReq = await ServiceRequestModel.findById(req.params.id);
    if (!serviceReq) {
      throw new HttpError("Service Request not found", 404);
    }

    res.status(200).json(serviceReq);
  } catch (error) {
    console.error("Error fetching serviceReq data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
};

exports.updateServiceReq = async (req, res) => {
  try {
    const serviceReqId = req.params.id;
    const updatedServiceReqData = req.body;
    const updatedServiceReq = await ServiceRequestModel.findByIdAndUpdate(serviceReqId, updatedServiceReqData, { new: true });
    if (!updatedServiceReq) {
      return res.status(404).json({ error: "Service Request not found" });
    }
    res.json(updatedServiceReq);
  } catch (error) {
    console.error("Error updating service request:", error);
    res.status(500).json({ error: "Failed to update service request" });
  }
};

exports.deleteServiceReq = async (req, res) => {
  try {
    const serviceReqId = req.params.id;
    const deletedServiceReq = await ServiceRequestModel.findByIdAndDelete(serviceReqId);
    if (!deletedServiceReq) {
      return res.status(404).json({ error: "Service Request not found" });
    }
    res.json({ message: "Service Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting service request:", error);
    res.status(500).json({ error: "Failed to delete service request" });
  }
};