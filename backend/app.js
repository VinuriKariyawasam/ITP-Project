const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const VehicleModel = require('./models/vehicle/vehicleModel.js')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://teamoctagonit:y2s2_2024@neotech.dcrtlz8.mongodb.net/Vehicle?retryWrites=true&w=majority")

app.get("/getVehicles", (req, res)=> {
  VehicleModel.find({}).then(function(vehicles) {
    res.json(vehicles); // Corrected the typo here
  }).catch(function(err) {
    res.json(err)
  })
})

app.post("/createVehicles", async (req, res) => {
  try {
    const vehicleData = req.body;
    const newVehicle = new VehicleModel(vehicleData);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ error: "Failed to save vehicle" });
  }
});

app.put("/updateVehicle/:id", async (req, res) => {
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
});

app.delete("/delete-vehicle/:id", async (req, res) => {
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
});

// Define the default port
const DEFAULT_PORT = 3001;

// Function to start the server
function startServer(port) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            // If the port is already in use, try the next port
            console.log(`Port ${port} is already in use, trying the next port...`);
            startServer(port + 1);
        } else {
            // For other errors, log the error and exit
            console.error('Server could not start:', err);
            process.exit(1);
        }
    });
}

// Start the server with the default port
startServer(DEFAULT_PORT);
