const { config } = require("dotenv");
const spSchema = require("../../models/inventory/SparePart");
const fs = require("fs");

exports.addSP = async (req, res) => {
  try {
    const {
      name,
      vehicleNumber,
      brand,
      model,
      year,
      color,
      contactNumber,
      description,
      status,
      email,
      orderdate
    } = req.body;
    const image = req.file ? req.file.path : null;

    if (
      !name ||
      !vehicleNumber ||
      !brand ||
      !model ||
      !year ||
      !color ||
      !contactNumber ||
      !description ||
      !image ||
      !status ||
      !email ||
      !orderdate 
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const Year = Number(year);

    if (typeof Year !== "number" || isNaN(Year) || Year <= 1600) {
      return res.status(400).json({ error: "year must be a positive year" });
    }

    const newSP = spSchema({
      name: name,
      vehicleNumber: vehicleNumber,
      brand: brand,
      model: model,
      year: year,
      color: color,
      contactNumber: contactNumber,
      description: description,
      image: image,
      status: status,
      email:email,
      orderdate:orderdate
    });

    await newSP.save();
    console.log(newSP);
    res.json({ message: "Product added", product: newSP });
  } catch (err) {
    console.error("Error occurred while adding product:", err);
    res.status(500).json({ error: "An error occurred while adding product" });
  }
};

exports.SPpendingorders = async (req, res) => {
  try {
    const Sp = await spSchema
      .find({ status: "pending" })
      .sort({ createdAt: -1 });
    res.json(Sp);
  } catch (err) {
    console.log(err);
  }
};

exports.deletependingsp = async (req, res) => {
  const { id } = req.params;

  try {
    const pendingsp = await spSchema.findById(id);

    if (!pendingsp) {
      return res.status(404).send({ status: "order not found" });
    }
      spSchema
        .findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "order deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "error with deleting" });
        });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Internal server error" });
  }
};
