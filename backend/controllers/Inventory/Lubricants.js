const { config } = require("dotenv");
const LubricantSchema = require("../../models/inventory/Lubricant");
const multer = require("multer");
const express = require("express");
const router = express.Router(); // Define router here
const path = require("path");
const fs = require("fs");

exports.addLubricant = async (req, res) => {
  try {
    const { product_name, product_brand, quantity, unit_price } = req.body;
    const image = req.file ? req.file.path : null;

    if (!product_name || !product_brand || !quantity || !unit_price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const Quantity = Number(quantity);
    const UnitPrice = Number(unit_price);

    if (typeof Quantity !== "number" || isNaN(Quantity) || Quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive number" });
    }

    if (typeof UnitPrice !== "number" || isNaN(UnitPrice) || UnitPrice <= 0) {
      return res
        .status(400)
        .json({ error: "Unit price must be a positive number" });
    }

    const newLubricant = new LubricantSchema({
      Product_name: product_name,
      Product_brand: product_brand,
      Quantity: Quantity,
      Unit_price: UnitPrice,
      image: image,
    });

    await newLubricant.save();
    console.log(newLubricant);
    res.json({ message: "Product added", product: newLubricant });
  } catch (err) {
    console.error("Error occurred while adding product:", err);
    res.status(500).json({ error: "An error occurred while adding product" });
  }
};

exports.updateLubricant = async (req, res) => {
  try {
    const productId = req.params.id;
    const { Product_name, Product_brand, Quantity, Unit_price, image } =
      req.body;

    const updateLubricant = {
      Product_name,
      Product_brand,
      Quantity,
      Unit_price,
      image,
    };

    const updatedProduct = await LubricantSchema.findByIdAndUpdate(
      productId,
      updateLubricant,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ status: "Product updated", product: updatedProduct });
  } catch (err) {
    console.error("Error occurred while updating product:", err);
    res.status(500).json({ error: "An error occurred while updating product" });
  }
};

exports.LubricantStock = async (req, res) => {
  try {
    const Lubricants = await LubricantSchema.find().sort({ createdAt: -1 });
    res.json(Lubricants);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteLubricants = async (req, res) => {
  const { id } = req.params;

  try {
    const lubricant = await LubricantSchema.findById(id);

    if (!lubricant) {
      return res.status(404).send({ status: "Lubricant not found" });
    }
    const imagePath = lubricant.image;

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ status: "Error deleting file" });
      }

      LubricantSchema.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "Product deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "Error with deleting product" });
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Internal server error" });
  }
};