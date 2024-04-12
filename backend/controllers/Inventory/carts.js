const { config } = require("dotenv");
const cartSchema = require("../../models/inventory/cart");
const express = require("express");
const router = express.Router(); 
const path = require("path");
const PDFDocument = require('pdfkit');

exports.addcart = async (req, res) => {
  try {
    const { product_name, unit_price , quantity,image } = req.body;

    if (!product_name || !unit_price || !quantity || !image) {
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

    const newcart = new cartSchema({
      Product_name: product_name,
      Unit_price: UnitPrice,
      Quantity: Quantity,
      image: image,
    });

    await newcart.save();
    console.log(newcart);
    res.json({ message: "Product added", product: newcart });
  } catch (err) {
    console.error("Error occurred while adding product:", err);
    res.status(500).json({ error: "An error occurred while adding product" });
  }
};

exports.updatecart = async (req, res) => {
  try {
    const productId = req.params.id;
    const { Product_name, Unit_price, Quantity, image } =
      req.body;

    const updatecart = {
      Product_name,
      Unit_price,
      Quantity,
      image,
    };

    const updatedProduct = await cartSchema.findByIdAndUpdate(
      productId,
      updatecart,
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

exports.cartStock = async (req, res) => {
  try {
    const carts = await cartSchema.find().sort({ createdAt: -1 });
    res.json(carts);
  } catch (err) {
    console.log(err);
  }
};

exports.deletecarts = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await cartSchema.findById(id);

    if (!cart) {
      return res.status(404).send({ status: "cart not found" });
    }
      cartSchema.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "Product deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "Error with deleting product" });
        });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Internal server error" });
  }
};
exports.emptycart = async (req, res) => {
  try {
    await cartSchema.deleteMany({});
    res.status(200).json({ message: 'All items deleted successfully' });
  } catch (error) {
    console.error('Error deleting items:', error);
    res.status(500).json({ error: 'An error occurred while deleting items' });
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const doc = new PDFDocument();
    const carts = await cartSchema.find().sort({ createdAt: -1 });
    doc.text('Your Order Summary', { align: 'center', size: 20 });
    doc.moveDown(); 
    const headers = ['Product', 'Quantity', 'Unit Price', 'Total'];
const columnWidths = [200, 100, 100, 100];
const startXPositions = columnWidths.reduce((acc, width, index) => {
  acc.push(index === 0 ? 50 : acc[index - 1] + columnWidths[index - 1]);
  return acc;
}, []);
const startYPosition = doc.y;
headers.forEach((header, index) => {
  doc.text(header, startXPositions[index], startYPosition, { width: columnWidths[index], align: 'center', bold: true });
});
   doc.moveDown(); 
    let total = 0;
    carts.forEach((cart, index) => {
      const itemTotal = cart.Quantity * cart.Unit_price;
      total += itemTotal;
      const rowData = [cart.Product_name, cart.Quantity.toString(), `Rs.${cart.Unit_price.toFixed(2)}`, `Rs.${itemTotal.toFixed(2)}`];
      const currentYPosition = doc.y + 10;
      rowData.forEach((cell, cellIndex) => {
        const currentXPosition = startXPositions[cellIndex];
        doc.text(cell, currentXPosition, currentYPosition, { width: columnWidths[cellIndex], align: 'center' });
      });
    doc.moveDown();
    });
    doc.moveTo(startXPositions[3], doc.y + 10).lineTo(startXPositions[3] + columnWidths[3], doc.y + 10).stroke(); 
    doc.text(`    Rs.${total.toFixed(2)}`, startXPositions[3], doc.y + 15, { width: columnWidths[3]});
    doc.moveTo(startXPositions[3], doc.y + 5).lineTo(startXPositions[3] + columnWidths[3], doc.y + 5).stroke();
    doc.moveTo(startXPositions[3], doc.y + 1).lineTo(startXPositions[3] + columnWidths[3], doc.y + 1).stroke();  
   
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="ordersummary.pdf"');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
};
