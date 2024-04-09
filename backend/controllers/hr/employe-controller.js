const EmployeeModel = require("../../models/hr/employeeModel"); // Import your employee model
const ArchivedEmployee = require("../../models/hr/archivedEmployeeModel"); //to save archive employees
const Salary = require("../../models/hr/salaryModel");
const Designation = require("../../models/hr/designationsModel");
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
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

class EmployeeController {
  // Create employee controller function
  static async createEmployee(req, res, next) {
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

        // Log the request body to see the uploaded data after file upload
        console.log("Request Body:", req.body);

        const nic = req.body["nic"];
        const email = req.body["email"];
        const contact = req.body["contact"];
        const bank = req.body["bank"];
        const branch = req.body["branch"];
        const account = req.body["account"];

        //check if employee alredy in db with nic or contact or email
        let existingEmployee;
        try {
          existingEmployee = await EmployeeModel.findOne({
            $or: [{ nic: nic }, { email: email }, { contact: contact }],
          });
        } catch (err) {
          const error = new HttpError(
            "Employee Registartion Fails.Try Again",
            500
          );
          return next(error);
        }

        if (existingEmployee) {
          if (!existingEmployee.email == "undefined") {
            const error = new HttpError(
              "Employee with this NIC and Email alredy exist.",
              422
            );
            return next(error);
          }
        }

        //-----Generating unique emp number---
        const startDate = new Date(req.body.startDate);
        const year = startDate.getFullYear().toString().substring(2); // Get last two digits of the year
        const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero if needed

        // Construct the regular expression to match employee IDs starting with EMPYYMM
        const regexPattern = new RegExp(`^EMP${year}${month}`);

        // Aggregation pipeline to count the number of employees with the given pattern
        const employeeCountPipeline = [
          {
            $match: {
              id: {
                $regex: regexPattern,
              },
            },
          },
          {
            $count: "count",
          },
        ];

        // Execute the aggregation pipeline
        const countResult = await EmployeeModel.aggregate(
          employeeCountPipeline
        );

        // Extract the count from the aggregation result, or default to 0 if no result found
        const count = countResult.length > 0 ? countResult[0].count : 0;

        // Generate the next employee ID
        const nextNumberString = (count + 1).toString().padStart(3, "0");
        const employeeId = `EMP${year}${month}${nextNumberString}`;

        // Use the correct URLs when constructing file paths
        const photoPath = req.files["photo"]
          ? `/uploads/hr/${path.basename(req.files["photo"][0].path)}`
          : null;
        const documentPaths = req.files["documents"]
          ? req.files["documents"].map(
              (file) => `/uploads/hr/${path.basename(file.path)}`
            )
          : [];

        // Assign properties one by one to the new employee object
        const newEmployee = new EmployeeModel();
        newEmployee.empId = employeeId;
        newEmployee.photo = photoPath;
        newEmployee.documents = documentPaths;
        newEmployee.firstName = req.body.firstName;
        newEmployee.lastName = req.body.lastName;
        newEmployee.birthDate = req.body.birthDate;
        newEmployee.nic = req.body.nic;
        newEmployee.address = req.body.address;
        newEmployee.gender = req.body.gender;
        newEmployee.contact = req.body.contact;
        newEmployee.startDate = req.body.startDate;
        newEmployee.position = req.body.position;
        newEmployee.otherDetails = req.body.otherDetails;
        newEmployee.email = req.body.email;
        newEmployee.password = req.body.password;
        //save employee to database
        const savedEmployee = await newEmployee.save();

        // Create a new salary record
        const position = newEmployee.position;
        console.log(position);

        //get the basic salary from desigantion
        let getDesignation;
        try {
          getDesignation = await Designation.findOne({ position: position });
        } catch (err) {
          const error = new HttpError(
            "Error in finding designation. Try Again",
            500
          );
          return next(error);
        }

        if (!getDesignation) {
          const error = new HttpError("There is no such designation.", 422);
          return next(error);
        }

        // Assign properties one by one to the new salary object
        const newSalary = new Salary();
        newSalary.empId = employeeId;
        newSalary.empDBId = savedEmployee._id;
        newSalary.name = `${savedEmployee.firstName} ${savedEmployee.lastName}`;
        newSalary.position = savedEmployee.position;
        newSalary.basicSalary = getDesignation.basicSalary;
        newSalary.allowance = 10000.0;
        newSalary.noPay = 0.0;
        newSalary.EPFC = newSalary.basicSalary * 0.12;
        newSalary.EPFE = newSalary.basicSalary * 0.08;
        newSalary.EPFT = newSalary.EPFC + newSalary.EPFE;
        newSalary.ETF = newSalary.basicSalary * 0.03;
        newSalary.totalSal = newSalary.basicSalary + newSalary.allowance;
        newSalary.netSal =
          newSalary.totalSal -
          (newSalary.noPay + newSalary.EPFC + newSalary.ETF);
        newSalary.bank = bank;
        newSalary.branch = branch;
        newSalary.account = account;
        // Save the new salary record
        await newSalary.save();

        res.status(201).json(savedEmployee);
      });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error while fetching(sending) employee to db:", error);
      // Handle any errors that occur during employee creation
      const err = new HttpError(
        "Failed to create employee. Please try again.",
        500
      );
      return next(err);
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
      // Check for validation errors using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        new HttpError("Invalid inputs passed, please check your data.", 422);
      }
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

  //Update employee by id
  static async updateEmployeeById(req, res, next) {
    console.log("Request Body:", req.params.id);
    console.log("Request Body:", req.body.otherDetails);
    console.log("Request Body:", req.body);

    const { address, contact, position, otherDetails, email, password, photo } =
      req.body;
    const employeeId = req.params.id;

    let emp;
    try {
      emp = await EmployeeModel.findById(employeeId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not find employee.",
        404
      );
      return next(error);
    }

    if (!emp) {
      const error = new HttpError("Employee not found", 404);
      return next(error);
    }

    // Update employee fields with values from req.body
    emp.address = address;
    emp.contact = contact;
    emp.position = position;
    emp.otherDetails = otherDetails;
    emp.email = email;
    emp.password = password;
    emp.photo = photo;

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

          const dbPhotoName = emp.photo ? path.basename(emp.photo) : null;

          if (!dbPhotoName || uploadedPhotoName !== dbPhotoName) {
            // Upload photo and update photo URL in emp object
            const photoPath = `/uploads/hr/${path.basename(
              req.files["photo"][0].path
            )}`;
            emp.photo = photoPath;
          }
        }

        // Save the updated employee
        try {
          const updatedEmployee = await emp.save();
          res.status(200).json(updatedEmployee);
        } catch (err) {
          const error = new HttpError(
            "Something went wrong, could not update employee.",
            500
          );
          return next(error);
        }
      });
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
        return res.status(404).json({ error: "Employee not found" });
      }

      // Find and delete the associated salary document
      const deletedSalary = await Salary.findOneAndDelete({
        empDBId: deletedEmployee._id,
      });

      if (!deletedSalary) {
        return res.status(404).json({ error: "Salary not found" });
      }

      // Create an instance of ArchivedEmployee using the deleted employee's data
      const archivedEmployee = new ArchivedEmployee({
        // Copy the fields of the deleted employee
        ...deletedEmployee.toObject(),
        // Copy the fields of the deleted salary
        ...deletedSalary.toObject(),
        // Set the archived field to true
        archived: true,
      });

      // Save the archived employee to the archive table
      const archived = await archivedEmployee.save();
      if (!archived) {
        return res.status(500).json({ error: "Employee archive faild" });
      }

      // Respond with success (204 No Content) as the employee has been successfully moved
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmployeeController;
