const EmployeeController = require("../controllers/hr/employe-controller");

const router = require("express").Router();

router.get("/employees", EmployeeController.getEmployees);

router.get("/employee/:id", EmployeeController.getEmployees);

router.post("/add-employee", EmployeeController.createEmployee);

module.exports = router;
