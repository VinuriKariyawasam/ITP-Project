const RecordModel = require("../../models/sm/recordModel"); // Import your record model
const HttpError = require("../../models/sm/http-error");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");
const ArchivedRecord = require("../../models/sm/archivedRecordModel");

//firebase config
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { firebaseConfig } = require("../../config/firebase-config");

// Initialize a firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

const upload = multer().fields([
  { name: "photo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

class RecordController {
  // Create record controller function
  static async createRecord(req, res, next) {
    try {
      // Log the request body to see the uploaded data
      console.log("Request Body:", req.body);

      // Check for validation errors using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        new HttpError("Invalid inputs passed, please check your data.", 422);
      }

      // Handle photo and document upload using Firebase Storage
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.error("File upload error:", err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          console.error("File upload error:", err.message);
          return res.status(500).json({ error: err.message });
        }

        let photoURL = ""; // Firebase photo download URL
        let documentURLs = []; // Firebase document download URLs

        // Handle photo upload if not null
        const photoFile = req.files["photo"] ? req.files["photo"][0] : null;
        if (photoFile) {
          const photoRef = ref(
            storage,
            `SM/uploads/photos/${photoFile.originalname}`
          );
          await uploadBytesResumable(photoRef, photoFile.buffer)
            .then(async (snapshot) => {
              console.log("Uploaded photo successfully");
              photoURL = await getDownloadURL(photoRef);
            })
            .catch((error) => {
              console.error("Error uploading photo:", error.message);
            });
        }

        // Handle document upload if not null
        const documentFiles = req.files["documents"]
          ? req.files["documents"]
          : [];
        if (documentFiles.length > 0) {
          for (const file of documentFiles) {
            const documentRef = ref(
              storage,
              `SM/uploads/documents/${file.originalname}`
            );
            await uploadBytesResumable(documentRef, file.buffer)
              .then(async (snapshot) => {
                console.log(
                  "Uploaded document successfully:",
                  file.originalname
                );
                const downloadURL = await getDownloadURL(documentRef);
                documentURLs.push(downloadURL);
              })
              .catch((error) => {
                console.error("Error uploading document:", error.message);
              });
          }
        }

        // Create a new record object with uploaded data
        const newRecord = new RecordModel({
          ...req.body,
          photo: photoURL, // Firebase photo download URL
          documents: documentURLs, // Firebase document download URLs
        });

        // Save record to database
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
      });
    } catch (error) {
      console.error("Error while creating record:", error);
      const err = new HttpError(
        "Failed to create record. Please try again.",
        500
      );
      return next(err);
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

  // Get count of all records
  static async getRecordCount(req, res) {
    try {
      const count = await RecordModel.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error counting records:", error);
      res.status(500).json({ error: "Failed to count records" });
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
      const deletedRecord = await RecordModel.findByIdAndDelete(
        req.params.id
      );

      if (!deletedRecord) {
        return res.status(404).json({ error: "Record not found" });
      }

      // Create an instance of ArchivedRecord using the deleted data
      const archivedRecord = new ArchivedRecord({
        // Copy the fields of the deleted record
        ...deletedRecord.toObject(),
        // You may need to modify or add additional fields if needed
        archived: true,
      });

      // Save the archived employee to the archive table
      const archived = await archivedRecord.save();
      if (!archived) {
        return res.status(500).json({ error: "Employee archive faild" });
      }

      // Respond with success (204 No Content) as the record has been successfully moved
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update record by id
  static async updateRecordById(req, res, next) {
    console.log("Request Body:", req.params.id);
    console.log("Request Body:", req.body.otherDetails);
    console.log("Request Body:", req.body);

    const { vnumber, startDate, inumber, EndDate, photo, documents, otherDetails } =
      req.body;
    const recordId = req.params.id;

    let rec;
    try {
      rec = await RecordModel.findById(recordId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not find any.",
        404
      );
      return next(error);
    }

    if (!rec) {
      const error = new HttpError("Record not found", 404);
      return next(error);
    }

    // Update record fields with values from req.body
    rec.vnumber = vnumber;
    rec.startDate = startDate;
    rec.inumber = inumber;
    rec.EndDate = EndDate;
    rec.photo = photo;
    rec.documents = documents;
    rec.otherDetails = otherDetails;

    try {
      // Check if there are file uploads for photo
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.error("File upload error:", err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          console.error("File upload error:", err.message);
          return res.status(500).json({ error: err.message });
        }

        // Handle photo upload if needed
        if (req.files && req.files["photo"]) {
          const uploadedPhotoName = req.files["photo"][0].originalname;

          const dbPhotoName = rec.photo ? path.basename(rec.photo) : null;

          if (!dbPhotoName || uploadedPhotoName !== dbPhotoName) {
            // Upload photo and update photo URL in rec object
            const photoPath = `/uploads/SM/${path.basename(
              req.files["photo"][0].path
            )}`;
            rec.photo = photoPath;
          }
        }

        // Save the updated record
        try {
          const updatedRecord = await rec.save();
          res.status(200).json(updatedRecord);
        } catch (err) {
          const error = new HttpError(
            "Something went wrong, could not update.",
            500
          );
          return next(error);
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RecordController;
