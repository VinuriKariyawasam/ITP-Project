// vehicle-routes.js
const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicle/vehicle-controller');
const ServiceReqController = require('../controllers/vehicle/serviceReq-controller');

// vehicle routes
router.get('/vehicles', VehicleController.getVehicles);
router.get('/vehicle/:id', VehicleController.getVehicleById);
router.post('/add-vehicle', VehicleController.createVehicle);

router.put('/update-vehicle/:id', VehicleController.updateVehicle);
router.delete('/delete-vehicle/:id', VehicleController.deleteVehicle);

module.exports = router;


// service request routes
router.get('/serviceReqs', ServiceReqController.getServiceReqs);
router.get('/serviceReq/:id', ServiceReqController.getServiceReqById);
router.post('/add-serviceReq', ServiceReqController.createServiceReq);

router.put('/update-serviceReq/:id', ServiceReqController.updateServiceReq);
router.delete('/delete-serviceReq/:id', ServiceReqController.deleteServiceReq);

module.exports = router;
