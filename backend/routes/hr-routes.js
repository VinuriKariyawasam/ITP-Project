const EmployeeController = require("../controllers/hr/employe-controller");
const LeavesController = require("../controllers/hr/leaves-controller");
const DesignationsController = require("../controllers/hr/desigantion-controller");
const SalaryController = require("../controllers/hr/salary-controller");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const router = require("express").Router();
router.use(bodyParser.json());

//--------Employee Routes-----------------
// Validation rules for creating an employee
const createEmployeeValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("birthDate").isDate().withMessage("Invalid birth date"),
  body("nic").notEmpty().withMessage("NIC is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("contact").notEmpty().withMessage("Contact number is required"),
  body("startDate").isDate().withMessage("Invalid start date"),
  body("position")
    .notEmpty()
    .withMessage("Position is required")
    .isIn([
      "HR Manager",
      "Inventory Manager",
      "Service Manager",
      "Finance Manager",
      "Supervisor",
      "Technician",
    ])
    .withMessage("Invalid position"),
  body("photo").optional().isString().withMessage("Invalid photo"),
  body("documents")
    .optional()
    .isString()
    .withMessage("Documents must be an array"),
  body("otherDetails")
    .optional()
    .isArray()
    .withMessage("Invalid other details"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password").optional().isString().withMessage("Invalid password"),
];

// Validation rules for updating an employee
const updateEmployeeValidationRules = [
  body("address").notEmpty().withMessage("Address is required"),
  body("contact").notEmpty().withMessage("Contact number is required"),
  body("position")
    .notEmpty()
    .withMessage("Position is required")
    .isIn([
      "HR Manager",
      "Inventory Manager",
      "Service Manager",
      "Finance Manager",
      "Supervisor",
      "Technician",
    ])
    .withMessage("Invalid position"),
  body("otherDetails")
    .optional()
    .isArray()
    .withMessage("Invalid other details"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password").optional().isString().withMessage("Invalid password"),
];

router.get("/employees", EmployeeController.getEmployees);

router.get("/employee/:id", EmployeeController.getEmployeeById);

router.post(
  "/add-employee",
  createEmployeeValidationRules,
  EmployeeController.createEmployee
);

router.patch(
  "/update-employee/:id",
  updateEmployeeValidationRules,
  EmployeeController.updateEmployeeById
);

router.delete("/archive-employee/:id", EmployeeController.deleteEmployeeById);

//---------Leaves Routes-------------------

// Validation middleware function for validating the leave request data
const validateLeaveRequest = [
  body("empId").notEmpty().withMessage("Employee ID is required"),
  body("empDBId").notEmpty().withMessage("Employee Database ID is required"),
  body("name").notEmpty().withMessage("Employee name is required"),
  body("fromDate").isISO8601().withMessage("Invalid fromDate format"),
  body("toDate").isISO8601().withMessage("Invalid toDate format"),
  body("reason").notEmpty().withMessage("Reason is required"),
  body("status")
    .isIn(["Approved", "Rejected", "Pending"])
    .withMessage("Invalid status"),
];

// Validation middleware function for validating the update leave request data
const validateUpdateLeaveRequest = [
  body("name").notEmpty().withMessage("Employee name is required"),
  body("fromDate").isISO8601().withMessage("Invalid fromDate format"),
  body("toDate").isISO8601().withMessage("Invalid toDate format"),
  body("reason").notEmpty().withMessage("Reason is required"),
];

// Route for creating a new leave record
router.post("/add-leave", validateLeaveRequest, LeavesController.createLeave);

// Route for getting all leave records
router.get("/leaves", LeavesController.getAllLeaves);

// Route for getting a single leave record by ID
router.get("/leaves/:id", LeavesController.getLeaveById);

// Route for updating a leave record by ID
router.patch(
  "/update-leave/:id",
  validateUpdateLeaveRequest,
  LeavesController.updateLeaveById
);

// Route for deleting a leave record by ID
router.delete("/delete-leave/:id", LeavesController.deleteLeaveById);

// Route for updating leave status
router.patch(
  "/update-leave-status/:id",
  LeavesController.updateLeaveStatusById
);

//---------Designation Routes-------------------

// Validation middleware function for validating the designation request data
const validateDesignationRequest = [
  body("position").notEmpty().withMessage("Position is required"),
  body("basicSalary")
    .notEmpty()
    .withMessage("Basic Salary is required")
    .isNumeric()
    .withMessage("Basic Salary must be a numeric value")
    .custom((value) => value >= 0)
    .withMessage("Basic Salary must be a non-negative number"),
];
// Validation middleware function for validating the update designation request data
const validateUpdateDesignationRequest = [
  body("basicSalary")
    .notEmpty()
    .withMessage("Basic Salary is required")
    .isNumeric()
    .withMessage("Basic Salary must be a numeric value")
    .custom((value) => value >= 0)
    .withMessage("Basic Salary must be a non-negative number"),
];

// CREATE
router.post(
  "/add-designation",
  validateDesignationRequest,
  DesignationsController.create
);

// READ
router.get("/designations", DesignationsController.getAll);

// UPDATE
router.patch(
  "/update-designation/:id",
  validateUpdateDesignationRequest,
  DesignationsController.update
);

// DELETE
router.delete("/delete-designation/:id", DesignationsController.delete);

//---------Salary Routes-------------------

// Create Salary
//router.post("/add-salary", SalaryController.createSalary);

// Update Salary
router.patch("/update-salaries/:id", SalaryController.updateSalary);

// Delete Salary
router.delete("/delete-salaries/:id", SalaryController.deleteSalary);

// Get all Salaries
router.get("/salaries", SalaryController.getAllSalaries);

// Get Salary by ID
router.get("/salaries/:id", SalaryController.getSalaryById);

module.exports = router;
