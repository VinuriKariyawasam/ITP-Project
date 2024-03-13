const VehicleController = require("../controllers/hr/vehicle-controller");
const bodyParser = require("body-parser");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/vehicles", VehicleController.getVehicles);

router.get("/vehicle/:id", EmployeeController.getVehicleById);

router.post("/add-vehicle", EmployeeController.createVehicle);

module.exports = router;