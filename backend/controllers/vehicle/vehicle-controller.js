const VehicleModel = require("../../models/vehicle/vehicleModel");
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");

exports.createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;
    const newVehicle = new VehicleModel(vehicleData);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ error: "Failed to save vehicle" });
  }
};


exports.getVehicles = async (req, res) => {
  try {
    let vehicles = await VehicleModel.find();
    res.json({
      vehicles: vehicles.map((vehicle) =>
        vehicle.toObject({ getters: true })
      ),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await VehicleModel.findById(req.params.id);
    if (!vehicle) {
      throw new HttpError("Vehicle not found", 404);
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updatedVehicleData = req.body;
    const updatedVehicle = await VehicleModel.findByIdAndUpdate(vehicleId, updatedVehicleData, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Failed to update vehicle" });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const deletedVehicle = await VehicleModel.findByIdAndDelete(vehicleId);
    if (!deletedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
};
