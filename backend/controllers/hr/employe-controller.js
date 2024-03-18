const EmployeeModel = require("../../models/hr/employeeModel"); // Import your employee model
const ArchivedEmployee = require("../../models/hr/archivedEmployeeModel"); //to save archive employees
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");

// Specify the new upload directory
// Specify the relative upload directory
const uploadDirectory = path.join(__dirname, "..", "..", "uploads", "hr");

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
  { name: "photo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

class EmployeeController {
  // Create employee controller function
  static async createEmployee(req, res) {
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

        const newEmployee = new EmployeeModel({
          ...req.body,
          photo: photoPath,
          documents: documentPaths,
        });
        //save employee to database
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
      });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error while fetching(sending) employee to db:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get all employees details
  static async getEmployees(req, res) {
    try {
      // Find all employees without specifying columns
      const employees = await EmployeeModel.find();

      // Construct the response object with file URLs
      const employeeData = employees.map((employee) => ({
        ...employee.toObject({ getters: true }),
        photoUrl: employee.photo || null, // Use photo URL directly from the database
        documentUrls: employee.documents || [], // Use document URLs directly from the database
      }));

      res.status(200).json({ employees: employeeData });
    } catch (error) {
      console.error("Error while fetching employees:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get employee by ID
  static async getEmployeeById(req, res) {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (!employee) {
        throw new HttpError("Employee not found", 404);
      }

      // Construct the response object with file URLs
      const employeeData = {
        ...employee.toObject({ getters: true }),
        photoUrl: employee.photo
          ? `${req.protocol}://${req.get("host")}${employee.photo}`
          : null,
        documentUrls: employee.documents.map(
          (doc) => `${req.protocol}://${req.get("host")}${doc}`
        ),
      };

      res.status(200).json(employeeData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      res.status(error.code || 500).json({ error: error.message });
    }
  }

  // Update employee by ID
  static async updateEmployeeById(req, res) {
    try {
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedEmployee) {
        throw new HttpError("Employee not found", 404);
      }
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete employee by ID
  static async deleteEmployeeById(req, res) {
    try {
      // Find and delete the employee from the original table
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(
        req.params.id
      );

      if (!deletedEmployee) {
        throw new HttpError("Employee not found", 404);
      }

      // Create an instance of ArchivedEmployee using the deleted employee's data
      const archivedEmployee = new ArchivedEmployee({
        // Copy the fields of the deleted employee
        ...deletedEmployee.toObject(),
        // You may need to modify or add additional fields if needed
        archived: true,
      });

      // Save the archived employee to the archive table
      await archivedEmployee.save();

      // Respond with success (204 No Content) as the employee has been successfully moved
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmployeeController;
