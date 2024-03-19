const VehicleModel = require('../../models/vehicle/vehicleModel');
const HttpError = require('../../models/http-error');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads/'); // Corrected the destination path
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'documents', maxCount: 10 },
]);

class VehicleController {
  static async createVehicle(req, res) {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.error('File upload error:', err.message);
          return res.status(400).json({ error: err.message });
        } else if (err) {
          console.error('File upload error:', err.message);
          return res.status(500).json({ error: err.message });
        }

        console.log('Request Body:', req.body);

        const newVehicle = new VehicleModel({
          ...req.body,
          photo: req.files['photo']
            ? path.basename(req.files['photo'][0].path)
            : null,
          documents: req.files['documents']
            ? req.files['documents'].map((file) => path.basename(file.path))
            : [],
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getVehicles(req, res) {
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
  }

  static async getVehicleById(req, res) {
    try {
      const vehicle = await VehicleModel.findById(req.params.id);
      if (!vehicle) {
        throw new HttpError('Vehicle not found', 404);
      }
      res.status(200).json(vehicle);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      res.status(error.code || 500).json({ error: error.message });
    }
  }

  static async updateVehicle(req, res) {
    try {
      const vehicleId = req.params.id;
      const updatedVehicleData = req.body;
      const updatedVehicle = await VehicleModel.findByIdAndUpdate(
        vehicleId,
        updatedVehicleData,
        { new: true }
      );
      if (!updatedVehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(updatedVehicle);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ error: 'Failed to update vehicle' });
    }
  }

  static async deleteVehicle(req, res) {
    try {
      const vehicleId = req.params.id;
      const deletedVehicle = await VehicleModel.findByIdAndDelete(vehicleId);
      if (!deletedVehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ error: 'Failed to delete vehicle' });
    }
  }
}

module.exports = VehicleController;
