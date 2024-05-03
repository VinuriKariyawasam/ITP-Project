const EmployeeModel = require("../../models/hr/employeeModel"); // Import your employee model
const ArchivedEmployee = require("../../models/hr/archivedEmployeeModel"); //to save archive employees
const Salary = require("../../models/hr/salaryModel");
const Designation = require("../../models/hr/designationsModel");
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AttendanceModel = require("../../models/hr/attendanceModel");
const defaultMaleAvatar = "/uploads/hr/DefaultMaleAvatar.jpg";
const defaultFemaleAvatar = "/uploads/hr/DefaultFemaleAvatar.png";
const empBenefitsSchema = require("../../models/finance/empbenefitsModel");

//firebase config
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
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

// Specify the relative upload directory
//const uploadDirectory = path.join(__dirname, "..", "..", "uploads", "hr");

// Create a multer storage instance with the destination set to the new directory
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});*/

/*const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);*/

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
      /*upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // An unknown error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(500).json({ error: err.message });
        }*/

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
            `hr/uploads/photos/${photoFile.originalname}`
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
              `hr/uploads/documents/${file.originalname}`
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

        // Log the request body to see the uploaded data after file upload
        console.log("Request Body:", req.body);

        const nic = req.body["nic"];
        const email = req.body.email.toLowerCase();
        const contact = req.body["contact"];
        const bank = req.body["bank"];
        const branch = req.body["branch"];
        const account = req.body["account"];
        const password = req.body["password"];
        //const newFiels = req.body["newFields"];
        //console.log("New Fields:", newFiels);

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

        //password convert to hashcode
        let hashedPassword;
        if (password != null && password != "" && password != "undefined") {
          try {
            hashedPassword = await bcrypt.hash(password, 12);
          } catch (err) {
            const error = new HttpError(
              "Could not create user, please try again.",
              500
            );
            return next(error);
          }
        }

        //-----Generating unique emp number---
        const startDate = new Date(req.body.startDate);
        const year = startDate.getFullYear().toString().substring(2); // Get last two digits of the year
        const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero if needed

        // Filter employees based on year and month
        const filteredEmployees = await EmployeeModel.find({
          empId: { $regex: `^EMP${year}${month}` },
        });

        // Count the number of filtered employees
        const count = filteredEmployees.length;

        // Generate the new employee number
        const nextNumberString = (count + 1).toString().padStart(3, "0");
        const employeeId = `EMP${year}${month}${nextNumberString}`;

        // Use the correct URLs when constructing file paths
        /* const photoPath = req.files["photo"]
          ? `/uploads/hr/${path.basename(req.files["photo"][0].path)}`
          : req.body.gender === "Male"
          ? defaultMaleAvatar
          : defaultFemaleAvatar;
        const documentPaths = req.files["documents"]
          ? req.files["documents"].map(
              (file) => `/uploads/hr/${path.basename(file.path)}`
            )
          : [];*/

        // Assign properties one by one to the new employee object
        const newEmployee = new EmployeeModel();
        newEmployee.empId = employeeId;
        newEmployee.photo = photoURL;
        newEmployee.documents = documentURLs;
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
        newEmployee.password = hashedPassword;
        newEmployee.points = 5;
        //save employee to database
        const savedEmployee = await newEmployee.save();

        //create an Employee Benefits profile for the new employee (For Finance Module)
        const BenefitProfile = new empBenefitsSchema();
        BenefitProfile.employeeid = employeeId;
        BenefitProfile.employeeName = `${savedEmployee.firstName} ${savedEmployee.lastName}`;
        BenefitProfile.updatedDate = new Date().toISOString().split("T")[0];

        await BenefitProfile.save();

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
        newSalary.EPFC = (newSalary.basicSalary * 0.12).toFixed(2);
        newSalary.EPFE = (newSalary.basicSalary * 0.08).toFixed(2);
        newSalary.EPFT = (
          parseFloat(newSalary.EPFC) + parseFloat(newSalary.EPFE)
        ).toFixed(2);
        newSalary.ETF = (newSalary.basicSalary * 0.03).toFixed(2);
        newSalary.totalSal = (
          parseFloat(newSalary.basicSalary) + parseFloat(newSalary.allowance)
        ).toFixed(2);
        newSalary.netSal = (
          parseFloat(newSalary.totalSal) -
          (parseFloat(newSalary.noPay) + parseFloat(newSalary.EPFC))
        ).toFixed(2);
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
        photoUrl: employee.photo,
        /*? `${req.protocol}://${req.get("host")}${employee.photo}`
          : null*/ documentUrls: employee.documents /*.map(
          (doc) => `${req.protocol}://${req.get("host")}${doc}`
        )*/,
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

    if (emp.position != position) {
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

      try {
        // Find the salary document based on specific conditions (e.g., empId)
        const salary = await Salary.findOne({ empDBId: emp._id });

        if (!salary) {
          return res.status(404).json({ message: "Salary not found" });
        }

        // Update the fields of the retrieved salary document with new values
        salary.position = position;
        salary.basicSalary = getDesignation.basicSalary;
        salary.EPFC = salary.basicSalary * 0.12;
        salary.EPFE = salary.basicSalary * 0.08;
        salary.EPFT = salary.EPFC + salary.EPFE;
        salary.ETF = salary.basicSalary * 0.03;
        salary.totalSal = salary.basicSalary + salary.allowance;
        salary.netSal = salary.totalSal - (salary.noPay + salary.EPFC);
        // Update other fields as needed...

        // Save the updated salary document
        const updatedSalary = await salary.save();

        res.status(200).json(updatedSalary); // Return the updated salary document
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
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

  //employee login
  static async loginEmployee(req, res) {
    console.log("Request Body:", req.body);
    const { username, password } = req.body;

    try {
      let user;

      // Check if the username matches the email format
      if (/^\S+@\S+\.\S+$/.test(username)) {
        const lowercaseUsername = username.toLowerCase();
        user = await EmployeeModel.findOne({ email: lowercaseUsername });
      } else {
        // Assuming it's an employee ID
        user = await EmployeeModel.findOne({ empId: username });
      }

      /* if (email) {
        user = await EmployeeModel.findOne({ email });
      } else if (empId) {
        user = await EmployeeModel.findOne({ empId: empId });
      } else {
        return res
          .status(400)
          .json({ message: "Email or Employee ID is required" });
      }*/

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, empId: user.empId },
        "super_secret_staff_key",
        { expiresIn: "1h" }
      );

      res.json({
        userId: user._id,
        email: user.email,
        empId: user.empId,
        position: user.position,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get today employees details
  static async getTodayEmployeesWithAttendance(req, res) {
    try {
      // Find employees who are either Technician or Supervisor
      const employees = await EmployeeModel.find({
        $or: [{ position: "Technician" }, { position: "Supervisor" }],
      });

      // Find attendance entries for today with value = true
      const today = new Date().toISOString().split("T")[0];
      const isoDate = new Date(today);
      const attendance = await AttendanceModel.find({
        date: {
          $gte: isoDate,
          $lt: new Date(isoDate.getTime() + 24 * 60 * 60 * 1000),
        },
      });
      console.log("Attendance:", attendance);
      // Filter employees with true attendance for today
      const todayEmployees = employees.filter((employee) =>
        attendance.some((attendanceEntry) =>
          attendanceEntry.employeeAttendance.some(
            (entry) =>
              entry.empDBId === employee._id.toString() && entry.value === true
          )
        )
      );

      // Return the filtered employees as a response
      res.status(200).json({ employees: todayEmployees });
    } catch (error) {
      console.error(
        "Error while fetching today's employees with attendance:",
        error
      );
      res.status(500).json({ error: error.message });
    }
  }

  // Controller function to reset user password as an admin
  static async updateCredentials(req, res, next) {
    const { password } = req.body;
    const email = req.body.email.toLowerCase();
    const userId = req.params.id;
    try {
      const user = await EmployeeModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      //password convert to hashcode
      let hashedPassword;
      if (password != null && password != "" && password != "undefined") {
        try {
          hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
          const error = new HttpError(
            "Could not create user, please try again.",
            500
          );
          return next(error);
        }
      }
      user.email = email;
      if (hashedPassword) {
        user.password = hashedPassword;
      } else {
        return res.status(400).json({ message: "Password is required." });
      }

      const employee = await user.save();

      return res.status(200).json(employee);
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  //get archives
  // Controller function to get all archived employee records
  static async getAllArchivedEmployees(req, res) {
    try {
      // Fetch all archived employee records from the database
      const archivedEmployees = await ArchivedEmployee.find();
      res.status(200).json(archivedEmployees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch archived employees" });
    }
  }

  //update profile photo
  static async updateEmployeePhoto(req, res, next) {
    try {
      console.log("Request Body:", req.body);
      const { employeeId } = req.params;
      console.log("Photo:", req.file);
      const photo = req.file; // Access the file from req.file

      // Check if employeeId and photo are provided
      if (!employeeId) {
        throw new HttpError("Employee ID is required.", 400);
      }
      if (!photo) {
        throw new HttpError("No photo file provided.", 400);
      }

      // Fetch the existing employee from the database
      const existingEmployee = await EmployeeModel.findById(employeeId);
      if (!existingEmployee) {
        throw new HttpError("Employee not found.", 404);
      }

      // Delete the existing photo from Firebase Storage if it exists
      if (existingEmployee.photo) {
        const photoRef = ref(storage, existingEmployee.photo);
        await deleteObject(photoRef);
      }

      // Upload new photo to Firebase Storage
      const newPhotoRef = ref(
        storage,
        `hr/uploads/photos/${photo.originalname}`
      );
      await uploadBytesResumable(newPhotoRef, photo.buffer);

      // Get the download URL of the uploaded photo
      const photoURL = await getDownloadURL(newPhotoRef);

      console.log("Photo URL:", photoURL);
      // Update employee's photo URL in the database
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        employeeId,
        { $set: { photo: photoURL } },
        { new: true }
      );

      res.status(200).json({
        message: "Employee photo updated successfully.",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Error updating employee photo:", error.message);
      const err = new HttpError(
        "Failed to update employee photo. Please try again.",
        500
      );
      return next(err);
    }
  }

  //addding more documnenst to employee in case of need
  /*static async addEmployeeDocuments(req, res, next) {
    try {
      // Check if employeeId is provided
      const { employeeId } = req.params;
      if (!employeeId) {
        const error = new HttpError("Employee ID is required.", 400);
        return next(error);
      }

      // Check if documents are provided
      if (!req.files || !req.files["documents"]) {
        const error = new HttpError("No document files provided.", 400);
        return next(error);
      }

      const documentFiles = req.files["documents"];

      // Fetch the existing employee from the database
      const existingEmployee = await EmployeeModel.findById(employeeId);
      if (!existingEmployee) {
        const error = new HttpError("Employee not found.", 404);
        return next(error);
      }

      // Extract existing document URLs
      const existingDocuments = existingEmployee.documents || [];

      // Handle document upload using Firebase Storage
      const documentURLs = [];
      for (const file of documentFiles) {
        const documentRef = ref(
          storage,
          `hr/uploads/documents/${file.originalname}`
        );
        await uploadBytesResumable(documentRef, file.buffer)
          .then(async (snapshot) => {
            console.log("Uploaded document successfully:", file.originalname);
            const downloadURL = await getDownloadURL(documentRef);
            documentURLs.push(downloadURL);
          })
          .catch((error) => {
            console.error("Error uploading document:", error.message);
          });
      }

      // Combine existing and new document URLs
      const updatedDocuments = [...existingDocuments, ...documentURLs];

      // Update employee's documents in the database
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        employeeId,
        { $set: { documents: updatedDocuments } },
        { new: true }
      );

      res.status(200).json({
        message: "Employee documents updated successfully.",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Error adding employee documents:", error.message);
      const err = new HttpError(
        "Failed to add employee documents. Please try again.",
        500
      );
      return next(err);
    }
  }*/
}

module.exports = EmployeeController;
