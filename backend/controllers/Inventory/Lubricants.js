const { config } = require("dotenv");
const LubricantSchema = require("../../models/inventory/Lubricant");
const multer = require("multer");
const express = require("express");
const router = express.Router(); // Define router here
const path = require("path");
const fs = require('fs');


exports.addLubricant = async (req, res) => {
  console.log(req.body)
    const Product_name = req.body.product_name;
    const Product_brand = req.body.product_brand;
    const Quantity = Number(req.body.quantity);
    const Unit_price = req.body.unit_price;
   const image = req.file.path;

    const newLubricant = new LubricantSchema({
      Product_name,
      Product_brand,
      Quantity,
      Unit_price,
      image
    });

    newLubricant
      .save()
      .then(() => {
        console.log(newLubricant)
        res.json("Product added");
      })
      .catch((err) => {
        console.log(err);
      });
  }


exports.updateLubricant = async (req, res) => {
  let productId = req.params.id;
  const { Product_name, Product_brand, Quantity, Unit_price,image } = req.body;

  const updateLubricant = {
    Product_name,
    Product_brand,
    Quantity,
    Unit_price,
    image
  };
  const update = await LubricantSchema.findByIdAndUpdate(productId, updateLubricant)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating" });
    });
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
    // Find the Lubricant document by ID
    const lubricant = await LubricantSchema.findById(id);

    if (!lubricant) {
      return res.status(404).send({ status: "Lubricant not found" });
    }

    // Get the image path from the Lubricant document
    const imagePath = lubricant.image;

    // Unlink the file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ status: "Error deleting file" });
      }

      // Delete the Lubricant document from the database
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
