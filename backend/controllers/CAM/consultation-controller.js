const { config } = require("dotenv")
const consultationModel = require("../../models/CAM/consultationModel");
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

  class ConsultationController {
     //create consultation controller function
  static async createConsultation(req, res, next) {
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

      const  vehicleType  = req.body["vehicleType"];
      const component= req.body["component"];
      const issue = req.body["issue"];
      const solution = req.body["solution"];
      const files = req.body["files"];

      // Use the correct URLs when constructing file paths
      const filePaths = req.files["files"]
      ? req.files["files"].map(
          (file) => `/uploads/CAM/${path.basename(file.path)}`
        )
      : [];

      // Assign properties one by one to the new feedback object
      const newConsultation = new consultationModel();
      newConsultation.vehicleType  = vehicleType ;
      newConsultation.component = component;
      newConsultation.issue = issue;
      newConsultation.solution = solution;
      newConsultation.files = filePaths;

      //save employee to database
      const savedConsultation = await  newConsultation.save();
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
      const consultationData = consultations.map((consultation) => ({
        ...consultation.toObject({ getters:true}),
        fileUrls: consultation.files || [], // Use file URLs directly from the database
      }));
  
      res.status(200).json({ consultations: consultationData});
    }catch (error) {
      console.error("Error while fetching consultations:", error);
      res.status(500).json({ error: error.message });
    }
  }

//Get consultation by ID
static async getConsultationById(req, res){
    console.log("Request Body:", req.params.id);
  try{
    // Check for validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    const consultation = await consultationModel.findById(req.params.id);
    if(!consultation) {
      throw new HttpError("Consultation not found", 404);
    }

    //Construct the response object with file URLs
    const consultationData = {
      ...consultation.toObject({ getters: true}),
      filesUrls: consultation.files.map(
        (doc) => `${req.protocol}://${req.get("host")}${doc}`
      ),
    };
    res.status(200).json(consultationData);
  }catch (error) {
    console.error("Error fetching consultation data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
}

//Update consultation by Id
static async updateConsultationById(req, res, next) {
    console.log("Request Body:", req.params.id);
    console.log("Request Body:", req.body);
  
    const {vehicleType, component, issue, solution, files} = req.body;
    const id = req.params.id;
  
    let con;
    try{
      con = await consultationModel.findById(id);
    }catch (err) {
      const error = new HttpError(
        "Something went wrong, could not find consultation.",
        404
      );
      return next(error);
    }
  
    if(!con){
      const error = new HttpError("Consultation not found", 404);
        return next(error);
    }
    // Update feedback fields with values from req.body
    con.vehicleType = vehicleType;
    con.component = component;
    con.issue = issue;
    con.solution = solution;
    con.files = files;
  
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
    const updatedConsultation = await con.save();
    res.status(200).json(updatedConsultation);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update consultation.",
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
  module.exports = ConsultationController;
