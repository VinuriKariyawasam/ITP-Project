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

// exports.updateorder = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { Product_name, Unit_price, Quantity, image } =
//       req.body;

//     const updateorder = {
//       Product_name,
//       Unit_price,
//       Quantity,
//       image,
//     };

//     const updatedProduct = await orderSchema.findByIdAndUpdate(
//       productId,
//       updateorder,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res
//       .status(200)
//       .json({ status: "Product updated", product: updatedProduct });
//   } catch (err) {
//     console.error("Error occurred while updating product:", err);
//     res.status(500).json({ error: "An error occurred while updating product" });
//   }
// };

// exports.orderStock = async (req, res) => {
//   try {
//     const orders = await orderSchema.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.deleteorders = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await orderSchema.findById(id);

//     if (!order) {
//       return res.status(404).send({ status: "order not found" });
//     }
//       orderSchema.findByIdAndDelete(id)
//         .then(() => {
//           res.status(200).send({ status: "Product deleted" });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).send({ status: "Error with deleting product" });
//         });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ status: "Internal server error" });
//   }
// };
// exports.emptyorder = async (req, res) => {
//   try {
//     await orderSchema.deleteMany({});
//     res.status(200).json({ message: 'All items deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting items:', error);
//     res.status(500).json({ error: 'An error occurred while deleting items' });
//   }
// };

// exports.generatePDF = async (req, res) => {
//   try {
//     const doc = new PDFDocument();
//     const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }); // Get current date
//     const orders = await orderSchema.find().sort({ createdAt: -1 });
//     doc.text('NEO TECH MOTORS', { align: 'center', size: 50,bold: true  });
//     doc.moveDown(); 
//     doc.moveDown(); 
//     doc.text(`Date: ${currentDate}`, { align: 'right'});
//     doc.moveDown(); 
//     doc.text('Your Order Summary', { align: 'center', size: 20 });
//     doc.moveDown(); 
//     const headers = ['Product', 'Quantity', 'Unit Price', 'Total'];
// const columnWidths = [200, 100, 100, 100];
// const startXPositions = columnWidths.reduce((acc, width, index) => {
//   acc.push(index === 0 ? 50 : acc[index - 1] + columnWidths[index - 1]);
//   return acc;
// }, []);
// const startYPosition = doc.y;
// headers.forEach((header, index) => {
//   doc.text(header, startXPositions[index], startYPosition, { width: columnWidths[index], align: 'center', bold: true });
// });
//    doc.moveDown(); 
//     let total = 0;
//     orders.forEach((order, index) => {
//       const itemTotal = order.Quantity * order.Unit_price;
//       total += itemTotal;
//       const rowData = [order.Product_name, order.Quantity.toString(), `Rs.${order.Unit_price.toFixed(2)}`, `Rs.${itemTotal.toFixed(2)}`];
//       const currentYPosition = doc.y + 10;
//       rowData.forEach((cell, cellIndex) => {
//         const currentXPosition = startXPositions[cellIndex];
//         doc.text(cell, currentXPosition, currentYPosition, { width: columnWidths[cellIndex], align: 'center' });
//       });
//     doc.moveDown();
//     });
//     doc.moveTo(startXPositions[3], doc.y + 10).lineTo(startXPositions[3] + columnWidths[3], doc.y + 10).stroke(); 
//     doc.text(`    Rs.${total.toFixed(2)}`, startXPositions[3], doc.y + 15, { width: columnWidths[3]});
//     doc.moveTo(startXPositions[3], doc.y + 5).lineTo(startXPositions[3] + columnWidths[3], doc.y + 5).stroke();
//     doc.moveTo(startXPositions[3], doc.y + 1).lineTo(startXPositions[3] + columnWidths[3], doc.y + 1).stroke();  
   
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'inline; filename="ordersummary.pdf"');
//     doc.pipe(res);
//     doc.end();
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF');
//   }
// };
