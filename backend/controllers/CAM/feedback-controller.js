const {config} = require("dotenv");
const feedbackModel = require("../../models/CAM/feedbackModel"); //import feedback model
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

class FeedbackController {
  //create feedback controller function
  static async createFeedback(req, res, next) {
    try{
      const generateFeedbackId = () => {
        // Generate a random number between 1 and 999 for the last 5 digits
        const randomNumber = Math.floor(Math.random() * 999) + 1;
        const randomDigits = randomNumber.toString().padStart(5, "0");
        
        // Construct the consiltation ID
        const feedbackId = `feedback${randomDigits}`;
        
        return feedbackId;
      }
         // Example usage
         const feedbackId = generateFeedbackId();
         console.log(feedbackId); 

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
   const serviceType = req.body["serviceType"];
   const employee = req.body["employee"];
   const files = req.body["files"];
   const feedback = req.body["feedback"];
   const rating = req.body["rating"];

      // Assign properties one by one to the new feedback object
      const newFeedback = new feedbackModel();
      newFeedback.userId = userId;
      newFeedback.name = name;
      newFeedback.feedbackId = feedbackId;
      newFeedback.serviceType = serviceType;
      newFeedback.employee = employee;
      newFeedback.files = downloadURL;
      newFeedback.feedback = feedback;
      newFeedback.rating = rating;

      //save employee to database
      const savedFeedback = await newFeedback.save();
      // Send success response
      return res.status(200).json({ message: "Feedback created successfully", savedFeedback });
    }catch (error) {
      // Log the error for debugging purposes
      console.error("Error uploading file:", error);
      // Send error response
      return res.status(500).json({ error: "Error uploading file" });
    }
    });
  }catch (error) {
    // Log the error for debugging purposes
    console.error("Error while fetching(sending) feedback to db:", error);
    // Handle any errors that occur during feedback creation
    const err = new HttpError(
      "Failed to create feedback. Please try again.",
      500
    );
    return next(err);
  }
}
//Get all feedback details
static async getFeedback(req, res) {
  try {
      const feedbacks = await feedbackModel.find();

      // Construct the response object with file URLs
      const feedbackData = await Promise.all(feedbacks.map(async (feedback) => {
          const fileUrls = await Promise.all(feedback.files.map(async (fileRef) => {
              const downloadUrl = await getDownloadURL(ref(fb_storage, fileRef));
              return downloadUrl;
          }));
          return {
              ...feedback.toObject({ getters: true }),
              fileUrls: fileUrls || [],
          };
      }));

      res.status(200).json({ feedbacks: feedbackData });
  } catch (error) {
      console.error("Error while fetching feedbacks:", error);
      res.status(500).json({ error: error.message });
  }
}

//Get feedback by userID
static async getFeedbackById(req, res) {
  const userId = req.params.userId; // Assuming the user ID is passed as a parameter in the request URL
  console.log("Request Body:", userId);
  
  try {
    const feedback = await feedbackModel.find({ userId }); 
    // Assuming the user ID field in the database is 'userId'
    console.log("feedback", feedback);

    if (!feedback) {
      throw new HttpError("Feedback not found", 404);
    }

    // Construct the response object with file URLs
    const feedbackData = await Promise.all(feedback.map(async (feed) => {
      const fileUrls = [];
      for (const file of feed.files) {
        const storageRef = ref(fb_storage, file); 
        // Assuming 'fb_storage' is your Firebase Storage reference
        const downloadUrl = await getDownloadURL(storageRef);
        fileUrls.push(downloadUrl);
      }
      return {
        ...feed.toObject({ getters: true }),
        fileUrls: fileUrls.length > 0 ? fileUrls : null
      };
    }));
    
    res.status(200).json(feedbackData);
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

//Get feedback by feedbackID
static async getFeedbackByfeedbackId(req, res) {
  const feedbackId = req.params.feedbackId; // Assuming the user ID is passed as a parameter in the request URL
  console.log("Request Body:", feedbackId);
  
  try {
    const feedback = await feedbackModel.find({ feedbackId }); 
    // Assuming the user ID field in the database is 'feedbackId'
    console.log("feedback", feedback);

    if (!feedback) {
      throw new HttpError("Feedback not found", 404);
    }

    // Construct the response object with file URLs
    const feedbackData = await Promise.all(feedback.map(async (feed) => {
      const fileUrls = [];
      for (const file of feed.files) {
        const storageRef = ref(fb_storage, file); 
        // Assuming 'fb_storage' is your Firebase Storage reference
        const downloadUrl = await getDownloadURL(storageRef);
        fileUrls.push(downloadUrl);
      }
      return {
        ...feed.toObject({ getters: true }),
        fileUrls: fileUrls.length > 0 ? fileUrls : null
      };
    }));
    
    res.status(200).json(feedbackData);
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

//update feedback by feedbackId
 static async updateFeedbackByfeedbackId(req, res, next){
  const { feedbackId } = req.params; // Extract feedbackId from request parameters
  console.log("Request Body:", feedbackId);
  const updatedData = req.body; // Extract updated data from request body

  try {
    // Find the feedback document by user ID and update it
    const updatedFeedback = await feedbackModel.findOneAndUpdate(
      { feedbackId: feedbackId }, // Search criteria
      updatedData, // Updated data
      { new: true } // Return the updated document
    );

     // If the document is not found, return a 404 error
     if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Return the updated feedback document
    res.status(200).json(updatedFeedback);
    console.log("Request Body:",updatedFeedback);
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

static async deleteFeedbackById(req, res) {
  const { feedbackId } = req.params; // Extract user ID from request parameters
  console.log("Request Body:", feedbackId);
  try {
    // Find feedback data by user ID
    const feedback = await feedbackModel.findOne({ feedbackId });
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Delete files from Firebase Storage
    for (const file of feedback.files) {
      const storageRef = ref(fb_storage, file); // Assuming 'fb_storage' is your Firebase Storage reference
      await deleteObject(storageRef);
    }

    // Delete the feedback from the original table
    const deletedFeedback = await feedbackModel.deleteOne({ feedbackId });
    if (deletedFeedback.deletedCount === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting feedback and files:", error);
    res.status(500).json({ error: error.message });
  }
}

}
module.exports = FeedbackController;







