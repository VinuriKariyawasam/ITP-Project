const { config } = require("dotenv")
const mongoose = require('mongoose');
const consultationModel = require("../../models/CAM/consultationModel");
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { deleteObject } = require("firebase/storage");
const { firebaseConfig } = require("../../config/firebase-config");
//const { validationResult } = require("express-validator");

// Initialize a firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const fb_storage = getStorage(firebaseApp);

// Setting up multer as a middleware to grab PDF uploads
//const fb_upload = multer({ storage: multer.memoryStorage() }).array("files", 2);
const fb_upload = multer({ storage: multer.memoryStorage() }).single("files"); // Specify the file field name

// Specify the new upload directory
// Specify the relative upload directory
const uploadDirectory = path.join(__dirname, "..", "..","CAM", "uploads");

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
    limits: { fileSize: 1024 * 1024 * 5 },
  }).fields([
    { name: "files", maxCount: 10 },
  ]);

  class ConsultationController {
     //create consultation controller function
     static async createConsultation(req, res, next) {
     try{

  const generateConsultationId = () => {
  // Generate a random number between 1 and 999 for the last 5 digits
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  const randomDigits = randomNumber.toString().padStart(5, "0");
  
  // Construct the consiltation ID
  const consultId = `consult${randomDigits}`;
  
  return consultId;
}
   // Example usage
   const consultId = generateConsultationId();
   console.log(consultId); 

   // Log the request body to see the uploaded data
    console.log("Request Body:", req.body);

    // Upload files to Firebase Storage
    fb_upload(req, res, async function (err) {
      try {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // An unknown error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(500).json({ error: err.message });
        }

          // Check if file exists in the request
          if (!req.file) {
            console.error("No file uploaded");
            throw new Error("No file uploaded");
        }

        const giveCurrentDateTime = () => {
          const today = new Date();
          const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
          const dateTime = date + '_' + time;
          return dateTime;
      };

        const dateTime = giveCurrentDateTime();

        const storageRef = ref(fb_storage, `/CAM/uploads/${req.file.originalname}_${dateTime}${path.extname(req.file.originalname)}`);

         // Create file metadata including the content type
         const metadata = {
          contentType: req.file.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

      // Grab the public URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Log the request body to see the uploaded data after file upload
      console.log("Request Body:", req.body);

      const userId = req.body["userId"];
      const name = req.body["name"];
      const  vehicleType  = req.body["vehicleType"];
      const component= req.body["component"];
      const issue = req.body["issue"];
      const solution = req.body["solution"];
      const newsolution = req.body["newsolution"];
      const files = req.body["files"];

      // Assign properties one by one to the new feedback object
      const newConsultation = new consultationModel();
      newConsultation.userId = userId;
      newConsultation.name = name;
      newConsultation.consultId = consultId;
      newConsultation.vehicleType  = vehicleType ;
      newConsultation.component = component;
      newConsultation.issue = issue;
      newConsultation.solution = solution;
      newConsultation.newsolution = solution;
      newConsultation.files = downloadURL;

      //save employee to database
      const savedConsultation = await  newConsultation.save();
      // Send success response
      return res.status(200).json({ message: "Consultation created successfully", savedConsultation });
    }catch (error) {
      // Log the error for debugging purposes
      console.error("Error uploading file:", error);
      // Send error response
      return res.status(500).json({ error: "Error uploading file" });
    }
    });
  }catch (error) {
    // Log the error for debugging purposes
    console.error("Error while fetching(sending) consultation to db:", error);
    // Handle any errors that occur during consultation creation
    const err = new HttpError(
      "Failed to create consultation. Please try again.",
      500
    );
    return next(err);
  }
}

//Get all consultation details
static async getConsultation(req, res){
    try{
      const consultations = await consultationModel.find();
  
      // Construct the response object with file URLs
      const consultationData = await Promise.all(consultations.map(async (consultation) => {
        const fileUrls = await Promise.all(consultation.files.map(async (fileRef) => {
            const downloadUrl = await getDownloadURL(ref(fb_storage, fileRef));
            return downloadUrl;
        }));
        return {
            ...consultation.toObject({ getters: true }),
            fileUrls: fileUrls || [],
        };
    }));

    res.status(200).json({ consultations: consultationData });
} catch (error) {
    console.error("Error while fetching feedbacks:", error);
    res.status(500).json({ error: error.message });
}
  }

//Get consultation by userID
static async getConsultationById(req, res){
  const userId = req.params.userId;
    console.log("Request Body:", userId);

  try{
    const consultation = await consultationModel.find( {userId} );
    console.log("consultation", consultation)

    if(!consultation) {
      throw new HttpError("Consultation not found", 404);
    }

    //Construct the response object with file URLs
    const consultationData = await Promise.all(consultation.map(async (consult) => {
      const fileUrls = [];
      for (const file of consult.files) {
        const storageRef = ref(fb_storage, file); 
        // Assuming 'fb_storage' is your Firebase Storage reference
        const downloadUrl = await getDownloadURL(storageRef);
        fileUrls.push(downloadUrl);
      }
      return {
        ...consult.toObject({ getters: true }),
        fileUrls: fileUrls.length > 0 ? fileUrls : null
      };
    }));
    res.status(200).json(consultationData);
  }catch (error) {
    console.error("Error fetching consultation data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

//Get consultation by consultID
static async getConsultationByconsultId(req, res){
  const consultId = req.params.consultId;
    console.log("Request Body:", consultId);

  try{
    const consultation = await consultationModel.find( {consultId} );
    console.log("consultation", consultation)

    if(!consultation) {
      throw new HttpError("Consultation not found", 404);
    }

    //Construct the response object with file URLs
    //Construct the response object with file URLs
    const consultationData = await Promise.all(consultation.map(async (consult) => {
      const fileUrls = [];
      for (const file of consult.files) {
        const storageRef = ref(fb_storage, file); 
        // Assuming 'fb_storage' is your Firebase Storage reference
        const downloadUrl = await getDownloadURL(storageRef);
        fileUrls.push(downloadUrl);
      }
      return {
        ...consult.toObject({ getters: true }),
        fileUrls: fileUrls.length > 0 ? fileUrls : null
      };
    }));
    res.status(200).json(consultationData);
  }catch (error) {
    console.error("Error fetching consultation data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

  //update solution
  static async updateConsultationSolution(req, res) {
    const { consultId } = req.params;
    console.log(consultId)
    const { solution } = req.body;
    console.log(solution)

    try {
        // Find the consultation by consultId and update the solution field
        const updatedConsultation = await consultationModel.findOneAndUpdate(
            { consultId: consultId },
            { solution: solution },
            { new: true } // Return the updated document
        );

        if (!updatedConsultation) {
            return res.status(404).json({ error: "Consultation not found" });
        }

        res.status(200).json(updatedConsultation);
    } catch (error) {
        console.error("Error updating consultation solution:", error);
        res.status(500).json({ error: error.message });
    }
};

//delete a solution
static async deleteSolution(req, res)  {
  const { consultId } = req.params;

  try {
    // Find the consultation by consultId
    let consultation = await consultationModel.findOne({ consultId });

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    // Update the solution field to null or an empty string
    consultation.solution = ""; // or consultation.solution = "";

    // Save the updated consultation
    consultation = await consultation.save();

    res.status(200).json({ message: "Solution deleted successfully", consultation });
  } catch (error) {
    console.error("Error deleting solution:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete a consultation
static async deleteConsultationByConsultId(req, res) {
  const consultId = req.params.consultId;

  try {
      // Find the consultation by consultId
      const consultation = await consultationModel.findOne({ consultId });

      if (!consultation) {
          return res.status(404).json({ error: "Consultation not found" });
      }

      // Optionally, delete associated files from Firebase Storage
      // const filesToDelete = consultation.files;
      // Implement logic to delete files from Firebase Storage based on 'filesToDelete'
      // Delete files from Firebase Storage
    for (const file of consultation.files) {
      const storageRef = ref(fb_storage, file); // Assuming 'fb_storage' is your Firebase Storage reference
      await deleteObject(storageRef);
    }

      // Delete the consultation from the database
      await consultationModel.deleteOne({ consultId });

      res.status(200).json({ message: "Consultation deleted successfully" });
  } catch (error) {
      console.error("Error deleting consultation:", error);
      res.status(500).json({ error: error.message });
  }
}

//update new solution
static async updateNewSolution(req, res) {
  const { consultId } = req.params;
  const { newsolution } = req.body;

  try {
      // Find the consultation by consultId and update the solution field
      const updatedConsultation = await consultationModel.findOneAndUpdate(
          { consultId: consultId },
          { newsolution: newsolution },
          { new: true } // Return the updated document
      );

      if (!updatedConsultation) {
          return res.status(404).json({ error: "Consultation not found" });
      }

      res.status(200).json(updatedConsultation);
  } catch (error) {
      console.error("Error updating consultation solution:", error);
      res.status(500).json({ error: error.message });
  }
};

  }
  module.exports = ConsultationController;
