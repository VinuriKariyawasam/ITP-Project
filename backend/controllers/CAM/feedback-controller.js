const {config} = require("dotenv");
const feedbackModel = require("../../models/CAM/feedbackModel"); //import feedback model
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");

// Specify the new upload directory
// Specify the relative upload directory
const uploadDirectory = path.join(__dirname, "..", "..", "uploads", "CAM");

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
      // Log the request body to see the uploaded data
      console.log("Request Body:", req.body);

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
      // Log the request body to see the uploaded data after file upload
      console.log("Request Body:", req.body);

      const userId = req.body["userId"];
      const serviceType = req.body["serviceType"];
      const employee = req.body["employee"];
      const files = req.body["files"];
      const feedback = req.body["feedback"];
      const rating = req.body["rating"];

      // Use the correct URLs when constructing file paths
      const filePaths = req.files["files"]
      ? req.files["files"].map(
          (file) => `/uploads/CAM/${path.basename(file.path)}`
        )
      : [];

      // Assign properties one by one to the new feedback object
      const newFeedback = new feedbackModel();
      newFeedback.userId = userId;
      newFeedback.serviceType = serviceType;
      newFeedback.employee = employee;
      newFeedback.files = filePaths;
      newFeedback.feedback = feedback;
      newFeedback.rating = rating;

      //save employee to database
      const savedFeedback = await newFeedback.save();
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
static async getFeedback(req, res){
  try{
    const feedbacks = await feedbackModel.find();

    // Construct the response object with file URLs
    const feedbackData = feedbacks.map((feedback) => ({
      ...feedback.toObject({ getters:true}),
      fileUrls: feedback.files || [], // Use file URLs directly from the database
    }));

    res.status(200).json({ feedbacks: feedbackData});
  }catch (error) {
    console.error("Error while fetching feedbacks:", error);
    res.status(500).json({ error: error.message });
  }
}

//Get feedback by ID
static async getFeedbackById(req, res){
  const userId = req.params;
  console.log("Request Body:", userId);
  try{
    
    const feedback = await feedbackModel.find( userId );
    console.log("feedback", feedback)
    if(!feedback) {
      throw new HttpError("Feedback not found", 404);
    }

    //Construct the response object with file URLs
    const feedbackData = feedback.map((feed) => ({
      ...feed.toObject({ getters: true}),
      filesUrls: feed.files.length>0?feed.files.map(
        (doc) => (`${req.protocol}://${req.get("host")}${doc}`)
      ):null
    }));
    res.status(200).json(feedbackData);
  }catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

//update feedback by Id
static async updateFeedbackByUserId(req, res, next){
  const { userId } = req.params; // Extract user ID from request parameters
  console.log("Request Body:", userId);
  const { serviceType, employee, feedback, rating, files } = req.body; // Extract updated data from request body

  try {
    // Find the feedback document by user ID and update it
    const updatedFeedback = await feedbackModel.findOneAndUpdate(
      { userId: userId }, // Search criteria
      { serviceType, employee, feedback, rating, files }, // Updated data
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
  const { userId } = req.params; // Extract user ID from request parameters
  console.log("Request Body:", userId);
  try {
    // Find and delete the feedback from the original table
    const deletedFeedback = await feedbackModel.deleteOne(
      { userId: userId }, // Search criteria
    );
    if (deletedFeedback.deletedCount === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}
module.exports = FeedbackController;







