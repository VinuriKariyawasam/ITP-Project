const EmployeeController = require("../controllers/hr/employe-controller");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const router = require("express").Router();
router.use(bodyParser.json());

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

module.exports = router;
