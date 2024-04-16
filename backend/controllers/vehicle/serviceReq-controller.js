const express = require('express');
const router = express.Router();
const ServiceRequestModel = require("../../models/vehicle/serviceRequestModel");
const HttpError = require("../../models/http-error");
const multer = require("multer");
const fs = require('fs');
const path = require('path');


// Define your upload directory
const uploadDirectory = path.join(__dirname, "..", "..", "uploads", "super");

// Create the directory if it does not exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Adjust the file size limit as needed
}).single("report"); // Use single() for a single file upload

// Create a new service request
// Modify the createServiceReq function to include the file saving location in the response
exports.createServiceReq = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error("File upload error:", err.message);
        return res.status(400).json({ error: err.message });
      } else if (err) {
        console.error("File upload error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      // Extract form data and file path
      const serviceReqData = req.body;

      // Check if file was uploaded successfully
      const reportFilePath = req.file ? req.file.path : null;

      // Create a new service request instance
      const newServiceReq = new ServiceRequestModel({
        ...serviceReqData,
        report: reportFilePath, // Save file path in the database
      });

      // Save the new service request to the database
      await newServiceReq.save();

      // Respond with the created service request, including the file saving location
      res.status(201).json({ serviceReq: newServiceReq, reportFilePath }); // Include reportFilePath in the response
    });
  } catch (error) {
    console.error("Error saving service request:", error);
    res.status(500).json({ error: "Failed to save service request" });
  }
};

// Download report route
router.get('http://localhost:5000/api/vehicle/download-report/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDirectory, filename);
    res.download(filePath);
  } catch (error) {
    console.error("Error downloading report:", error);
    res.status(500).json({ error: "Failed to download report" });
  }
});


// Retrieve all service requests

// Retrieve all service requests
exports.getServiceReqs = async (req, res) => {
  try {
    // Fetch all service requests from the database
    const serviceReqs = await ServiceRequestModel.find();

    // Construct the response object with file URLs
    const serviceReqData = serviceReqs.map((serviceReq) => ({
      ...serviceReq.toObject({ getters: true }),
      reportUrl: serviceReq.report ? `${req.protocol}://${req.get("host")}/${serviceReq.report}` : null,
    }));

    // Respond with the retrieved service requests
    res.status(200).json({ serviceReqs: serviceReqData });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ error: "Failed to fetch service requests" });
  }
};



// Retrieve a service request by ID
exports.getServiceReqById = async (req, res) => {
  try {
    // Fetch the service request by ID from the database
    const serviceReq = await ServiceRequestModel.findById(req.params.id);

    // Check if the service request exists
    if (!serviceReq) {
      throw new HttpError("Service Request not found", 404);
    }

    // Construct the response object with file URLs
    const serviceReqData = {
      ...serviceReq.toObject({ getters: true }),

      documentUrls: serviceReq.documents.map(
        (report) => `${req.protocol}://${req.get("host")}${report}`
      ),
    };

    // Respond with the retrieved service request
    res.status(200).json(serviceReqData);
  } catch (error) {
    console.error("Error fetching service request:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
};

// Update a service request
exports.updateServiceReq = async (req, res) => {
  try {
    // Extract updated data and ID from the request
    const { id } = req.params;
    const updatedServiceReqData = req.body;

    // Update the service request in the database
    const updatedServiceReq = await ServiceRequestModel.findByIdAndUpdate(
      id,
      updatedServiceReqData,
      { new: true }
    );

    // Check if the service request exists
    if (!updatedServiceReq) {
      return res.status(404).json({ error: "Service Request not found" });
    }

    // Respond with the updated service request
    res.json(updatedServiceReq);
  } catch (error) {
    console.error("Error updating service request:", error);
    res.status(500).json({ error: "Failed to update service request" });
  }
};

// Delete a service request
exports.deleteServiceReq = async (req, res) => {
  try {
    // Extract ID from the request
    const { id } = req.params;

    // Delete the service request from the database
    const deletedServiceReq = await ServiceRequestModel.findByIdAndDelete(id);

    // Check if the service request exists
    if (!deletedServiceReq) {
      return res.status(404).json({ error: "Service Request not found" });
    }

    // Respond with success message
    res.json({ message: "Service Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting service request:", error);
    res.status(500).json({ error: "Failed to delete service request" });
  }
};

/*// Download report route
router.get('/download-report/:id', async (req, res) => {
  try {
    const serviceReq = await ServiceRequestModel.findById(req.params.id);
    if (!serviceReq || !serviceReq.report) {
      return res.status(404).json({ error: "Report not found" });
    }
    const reportFilePath = serviceReq.report;
    res.download(reportFilePath);
  } catch (error) {
    console.error("Error downloading report:", error);
    res.status(500).json({ error: "Failed to download report" });
  }
});*/

//module.exports = router;
