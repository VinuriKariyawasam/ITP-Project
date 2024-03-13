const EmployeeController = require("../controllers/hr/employe-controller");
const bodyParser = require("body-parser");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/employees", EmployeeController.getEmployees);

router.get("/employee/:id", EmployeeController.getEmployeeById);

router.post("/add-employee", EmployeeController.createEmployee);

module.exports = router;
