const VehicleController = require("../controllers/hr/employe-controller");
const bodyParser = require("body-parser");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/vehicles", VehicleController.getVehicle);

router.get("/vehicle/:id", VehicleController.getVeicleById);

router.post("/add-vehicle", VehicleController.createVehicle);

module.exports = router;