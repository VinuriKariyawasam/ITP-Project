const EmployeeModel = require("../../models/hr/employeeModel"); // Import your employee model
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/backend/uploads/"); // Create a folder named 'uploads' to store the files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
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
  // Create employee
  static async createEmployee(req, res) {
    try {
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

        // No error occurred during file upload. Proceed with saving employee.
        const newEmployee = new EmployeeModel({
          ...req.body,
          photo: req.files["photo"]
            ? path.basename(req.files["photo"][0].path)
            : null,
          documents: req.files["documents"]
            ? req.files["documents"].map((file) => path.basename(file.path))
            : [],
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all employees with selected columns
  static async getEmployees(req, res) {
    let employees;
    try {
      // Find all employees without specifying columns
      employees = await EmployeeModel.find();

      // Send the retrieved data to the frontend
      //res.setHeader("Content-Type", "application/json");
      //res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    res.json({
      employees: employees.map((employee) =>
        employee.toObject({ getters: true })
      ),
    });
  }

  // Get employee by ID
  static async getEmployeeById(req, res) {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (!employee) {
        throw new HttpError("Employee not found", 404);
      }
      console.log("Fetched employee data:", employee);
      res.status(200).json(employee);
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
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedEmployee) {
        throw new HttpError("Employee not found", 404);
      }
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmployeeController;
