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
  try{
    // Check for validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    const feedback = await feedbackModel.findById(req.params.id);
    if(!feedback) {
      throw new HttpError("Feedback not found", 404);
    }

    //Construct the response object with file URLs
    const feedbackData = {
      ...feedback.toObject({ getters: true}),
      filesUrls: feedback.files.map(
        (doc) => `${req.protocol}://${req.get("host")}${doc}`
      ),
    };
    res.status(200).json(feedbackData);
  }catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

//update feedback by Id
static async updateFeedbackById(req, res, next) {
  console.log("Request Body:", req.params.id);
  console.log("Request Body:", req.body);

  const {serviceType, employee, feedback, files} = req.body;
  const id = req.params.id;

  let fb;
  try{
    fb = await feedbackModel.findById(id);
  }catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find feedback.",
      404
    );
    return next(error);
  }

  if(!fb){
    const error = new HttpError("Feedback not found", 404);
      return next(error);
  }
  // Update feedback fields with values from req.body
  fb.serviceType = serviceType;
  fb.employee = employee;
  fb.feedback = feedback;
  fb.files = files;

  try{
    // Check if there are file uploads
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error("File upload error:", err.message);
        return res.status(400).json({ error: err.message });
      } else if (err) {
        console.error("File upload error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      // Handle photo upload if needed
      if (req.files && req.files["files"]) {
        const uploadedFileName = req.files["files"][0].originalname;

        const dbFileName = fb.files ? path.basename(fb.files) : null;

        if (!dbFileName || uploadedFileName !== dbFileName) {
          // Upload photo and update photo URL in emp object
          const filePath = `/uploads/CAM/${path.basename(
            req.files["files"][0].path
          )}`;
          fb.files = filePath;
  }
}
// Save the updated feedback
try {
  const updatedFeedback = await fb.save();
  res.status(200).json(updatedFeedback);
} catch (err) {
  const error = new HttpError(
    "Something went wrong, could not update feedback.",
    500
  );
  return next(error);
}
});
} catch (error) {
res.status(500).json({ error: error.message });
}
}

//Delete feedback by Id
static async deleteFeedbackById (req, res) {
  try{
    // Find and delete the feedback from the original table
    const deletedFeedback = await feedbackModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(204).json();
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}
module.exports = FeedbackController;







