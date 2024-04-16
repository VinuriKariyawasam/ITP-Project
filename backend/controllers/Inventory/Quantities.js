const { config } = require("dotenv");
const QuantitySchema = require("../../models/inventory/Quantity");
const fs = require("fs");

exports.addQuantity = async (req, res) => {
  try {
    const { product_name, product_type } =
      req.body;

    if (
      !product_name ||
      !product_type
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newproduct = QuantitySchema({
      Product_name: product_name,
      Product_type: product_type,
    });

    await newproduct.save();
    console.log(newproduct);
    res.json({ message: "Product added", product: newproduct });
  } catch (err) {
    console.error("Error occurred while adding product:", err);
    res.status(500).json({ error: "An error occurred while adding product" });
  }
};

exports.Quantitystock = async (req, res) => {
  try {
    const Quantity = await QuantitySchema.find().sort({ createdAt: -1 });
    res.json(Quantity);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteQuantity = async (req, res) => {
  const { id } = req.params;

  try {
    const tire = await QuantitySchema.findById(id);

    if (!tire) {
      return res.status(404).send({ status: "Tire not found" });
    }
        QuantitySchema.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "product deleted" });
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
