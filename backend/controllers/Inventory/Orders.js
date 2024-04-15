const { config } = require("dotenv");
const orderSchema = require("../../models/inventory/Order");
const express = require("express");
const router = express.Router(); 
const path = require("path");
const PDFDocument = require('pdfkit');

exports.addorder = async (req, res) => {
  try {
    const { date, products, total, status } = req.body;


    if (!date || !products || !total || !status ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const neworder = new orderSchema({
        date,
        products,
        total,
        status
    });

    await neworder.save();
    console.log(neworder);
    res.json({ message: "order added", orderId: neworder._id });
  } catch (err) {
    console.error("Error occurred while adding order:", err);
    res.status(500).json({ error: "An error occurred while adding order" });
  }
};

exports.pendingOrders = async (req, res) => {
  try {
    const pendingOrders = await orderSchema.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json(pendingOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.completedOrders = async (req, res) => {
  try {
    const completedOrders = await orderSchema.find({ status: "completed" }).sort({ createdAt: -1 });
    res.json(completedOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
