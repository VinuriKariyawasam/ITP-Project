const VehicleModel = require("../../models/vehicle/vehicleModel"); // Import your vehicle model
const HttpError = require("../../models/http-error");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/backend/uploads/"); // Create a folder named 'uploads' to store the files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Adjust the file size limit as needed
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

class VehicleController {
  // Create vehicle
  static async createVehicle(req, res) {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // An unknown error occurred when uploading.
          console.error("File upload error:", err.message);
          return res.status(500).json({ error: err.message });
        }

        // Log the request body to see the uploaded data
        console.log("Request Body:", req.body);

        // No error occurred during file upload. Proceed with saving vehicle.
        const newVehicle = new VehicleModel({
          ...req.body,
          photo: req.files["photo"]
            ? path.basename(req.files["photo"][0].path)
            : null,
          documents: req.files["documents"]
            ? req.files["documents"].map((file) => path.basename(file.path))
            : [],
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all vehicles with selected columns
  static async getVehicles(req, res) {
    let vehicles;
    try {
      // Find all vehicles without specifying columns
      vehicles = await VehicleModel.find();

      // Send the retrieved data to the frontend
      //res.setHeader("Content-Type", "application/json");
      //res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    res.json({
      vehicles: vehicles.map((vehicle) =>
        vehicle.toObject({ getters: true })
      ),
    });
  }

  // Get vehicle by ID
  static async getVehicleById(req, res) {
    try {
      const vehicle = await VehicleModel.findById(req.params.id);
      if (!vehicle) {
        throw new HttpError("Vehicle not found", 404);
      }
      console.log("Fetched vehicle data:", vehicle);
      res.status(200).json(vehicle);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      res.status(error.code || 500).json({ error: error.message });
    }
  }

  // Update vehicle by ID
  static async updateVehicleById(req, res) {
    try {
      const updatedVehicle = await VehicleModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedVehicle) {
        throw new HttpError("Vehicle not found", 404);
      }
      res.status(200).json(updatedVehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete vehicle by ID
  static async deleteVehicleById(req, res) {
    try {
      const deletedVehicle = await VehicleModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedVehicle) {
        throw new HttpError("Vehicle not found", 404);
      }
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VehicleController;