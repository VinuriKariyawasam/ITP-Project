const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const { firebaseConfig } = require("../../config/firebase-config");
const ServiceRequestModel = require("../../models/vehicle/serviceRequestModel");
const HttpError = require("../../models/http-error");
const path = require('path');

// Initialize a firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

// Setting up multer as a middleware to grab file uploads
const upload = multer({ storage: multer.memoryStorage() }).single("report"); // Specify the file field name

// Create a new service request
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
            const reportFile = req.file ? req.file.path : null;

            // Upload the file to Firebase Storage
            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `supervisor/${dateTime}_${reportFile.originalname}`);
            const metadata = {
                contentType: reportFile.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, reportFile.buffer, metadata);
            const reportFilePath = await getDownloadURL(snapshot.ref);

            // Create a new service request instance
            const newServiceReq = new ServiceRequestModel({
                ...serviceReqData,
                report: reportFilePath, // Save file path in the database
            });

            // Save the new service request to the database
            await newServiceReq.save();

            // Respond with the created service request and file saving location
            res.status(201).json({ serviceReq: newServiceReq, reportFilePath });
        });
    } catch (error) {
        console.error("Error saving service request:", error);
        res.status(500).json({ error: "Failed to save service request" });
    }
};

exports.createServiceReqfromApp = async (req, res) => {
    const vehicleNo = req.body.vehicleNo;
    const date = req.body.date;
    const  name = req.body.name;
    const issue = req.body.issue;
    const quotation= req.body.issue;
    const request= req.body.request;


    const newServiceReqp = ServiceRequestModel({
        vehicleNo,
        date,
        name,
        issue,
        quotation,
        request
       
    });
    try { await newServiceReqp.save();
        res.status(200).json({ message: 'Service request added' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Retrieve all service requests
exports.getServiceReqs = async (req, res) => {
    try {
        // Fetch all service requests from the database
        const serviceReqs = await ServiceRequestModel.find();

        // Construct the response object with file URLs
        const serviceReqData = serviceReqs.map((serviceReq) => ({
            ...serviceReq.toObject({ getters: true }),
            reportUrl: serviceReq.report ? serviceReq.report : null,
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

        // Respond with the retrieved service request
        res.status(200).json(serviceReq);
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

// Function to get current date and time
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    const dateTime = date + '_' + time;
    return dateTime;
};
