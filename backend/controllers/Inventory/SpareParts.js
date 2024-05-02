const { config } = require("dotenv");
const spSchema = require("../../models/inventory/SparePart");
const fs = require("fs");
const axios = require("axios")

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
      image,
      orderdate
    } = req.body;

    if (
      !name ||
      !vehicleNumber ||
      !brand ||
      !model ||
      !year ||
      !color ||
      !contactNumber ||
      !description ||
      !status ||
      !email ||
      !image ||
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
  const Url = req.body.image;
  await axios.delete("http://localhost:5000/Product/deleteimg", {
    data: { Url: Url } // Pass the URL in the request body
  });

  try {
    const pendingsp =spSchema.findById(id);

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
exports.removependingsp = async (req, res) => {
  const { id } = req.params;
  try {
    const pendingsp =spSchema.findById(id);

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
