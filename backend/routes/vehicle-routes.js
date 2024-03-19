const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicle/vehicle-controller');

// Define routes
router.get('/vehicles', VehicleController.getVehicles);
router.get('/vehicle/:id', VehicleController.getVehicleById);
router.post('/add-vehicle', VehicleController.createVehicle);
router.put('/update-vehicle/:id', VehicleController.updateVehicle);
router.delete('/delete-vehicle/:id', VehicleController.deleteVehicle);

module.exports = router;
