const RecordModel = require("../../models/sm/recordModel"); // Import your record model
const HttpError = require("../../models/sm/http-error");
const ArchivedEmployee = require("../../models/sm/archivedRecordModel"); //to save archive records
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");
const ArchivedRecord = require("../../models/sm/archivedRecordModel");

// Specify the new upload directory
// Specify the relative upload directory
const uploadDirectory = path.join(__dirname, "..", "..", "uploads");

// Create a multer storage instance with the destination set to the new directory
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
  { name: "photo", maxCount: 20 },
  { name: "documents", maxCount: 20 },
]);

class RecordController {
  // Create record controller function
  static async createRecord(req, res) {
    try {
      // Log the request body to see the uploaded data
      console.log("Request Body:", req.body);

      // Check for validation errors using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        new HttpError("Invalid inputs passed, please check your data.", 422);
      }

      //image and document upload logic
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // An unknown error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(500).json({ error: err.message });
        }

        // Log the request body to see the uploaded data
        console.log("Request Body:", req.body);

        // Use the correct URLs when constructing file paths
        const photoPath = req.files["photo"]
          ? `/uploads/hr/${path.basename(req.files["photo"][0].path)}`
          : null;
        const documentPaths = req.files["documents"]
          ? req.files["documents"].map(
              (file) => `/uploads/hr/${path.basename(file.path)}`
            )
          : [];

        const newRecord = new RecordModel({
          ...req.body,
          photo: photoPath,
          documents: documentPaths,
        });
        //save record to database
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
      });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error while fetching(sending) record to db:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get all record details
  static async getRecords(req, res) {
    try {
      // Find all records without specifying columns
      const records = await RecordModel.find();

      // Construct the response object with file URLs
      const recordData = records.map((record) => ({
        ...record.toObject({ getters: true }),
        photoUrl: record.photo || null, // Use photo URL directly from the database
        documentUrls: record.documents || [], // Use document URLs directly from the database
      }));

      res.status(200).json({ records: recordData });
    } catch (error) {
      console.error("Error while fetching records:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get record by ID
  static async getRecordById(req, res) {
    try {
      const record = await RecordModel.findById(req.params.id);
      if (!record) {
        throw new HttpError("Record not found", 404);
      }

      // Construct the response object with file URLs
      const recordData = {
        ...record.toObject({ getters: true }),
        photoUrl: record.photo
          ? `${req.protocol}://${req.get("host")}${record.photo}`
          : null,
        documentUrls: record.documents.map(
          (doc) => `${req.protocol}://${req.get("host")}${doc}`
        ),
      };

      res.status(200).json(recordData);
    } catch (error) {
      console.error("Error fetching record data:", error);
      res.status(error.code || 500).json({ error: error.message });
    }
  }
 // Delete record by ID
 static async deleteRecordById(req, res) {
  try {
    // Find and delete the record from the original table
    const deletedRecord= await RecordModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRecord) {
      throw new HttpError("Record not found", 404);
    }

    // Create an instance of ArchivedRecord using the deleted data
    const archivedRecord = new ArchivedRecord({
      // Copy the fields of the deleted record
      ...deletedRecord.toObject(),
      // You may need to modify or add additional fields if needed
      archived: true,
    });

    // Save the archived employee to the archive table
    await archivedRecord.save();

    // Respond with success (204 No Content) as the record has been successfully moved
    res.status(204).json(); // No content in response for successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/*class RecordController {
  // Create record
  static async createRecord(req, res) {
    try {
      const newRecord = new RecordModel(req.body);
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get all records
  static async getRecords(req, res) {
    try {
      const records = await RecordModel.find();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get record by ID
  static async getRecordById(req, res) {
    try {
      const record = await RecordModel.findById(req.params.id);
      if (!record) {
        throw new HttpError("Record not found", 404);
      }
      res.status(200).json(record);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message });
    }
  }
  // Delete record by ID
  static async deleteRecordById(req, res) {
    try {
      const deletedRecord = await RecordModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedRecord) {
        throw new HttpError("Record not found", 404);
      }
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  /* Update record by ID
  static async updateRecordById(req, res) {
    try {
      const updatedRecord = await RecordModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedRecord) {
        throw new HttpError("Employee not found", 404);
      }
      res.status(200).json(updatedRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }*/

  
}

module.exports = RecordController;