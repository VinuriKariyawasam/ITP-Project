const { config } = require("dotenv");
const LubricantSchema = require("../../models/inventory/Lubricant");
const multer = require("multer");
const express = require("express");
const router = express.Router(); // Define router here
const path = require("path");


exports.addLubricant = async (req, res) => {
  console.log(req.body)
    const Product_name = req.body.product_name;
    const Product_code = req.body.product_code;
    const Quantity = Number(req.body.quantity);
    const Unit_price = req.body.unit_price;
   const image = req.file.path;

    const newLubricant = new LubricantSchema({
      Product_name,
      Product_code,
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

  LubricantSchema.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with deleting" });
    });
};
