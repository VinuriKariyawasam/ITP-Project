const VehicleController = require("../controllers/vehicle/vehicle-controller");
const bodyParser = require("body-parser");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/vehicles", VehicleController.getVehicles);

router.get("/vehicle/:id", VehicleController.getVehicleById);

router.post("/add-vehicle", VehicleController.createVehicle);
router.put("/update-vehicle/:id", VehicleController.updateVehicle);
router.delete("/delete-vehicle/:id", VehicleController.deleteVehicle);

module.exports = router;