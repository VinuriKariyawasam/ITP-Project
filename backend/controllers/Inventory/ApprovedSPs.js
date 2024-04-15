const { config } = require("dotenv");
const aspSchema = require("../../models/inventory/ApprovedSP");

exports.addapprovedSP = async (req, res) => {
  try {
    const {
      id,
      name,
      vehicleNumber,
      brand,
      model,
      year,
      color,
      contactNumber,
      description,
      image,
      status,
      email,
      total,
      orderdate
    } = req.body;
   

    if (
      !id||
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
      !total ||
      !orderdate
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const Year = Number(year);

    if (typeof Year !== "number" || isNaN(Year) || Year <= 1600) {
      return res.status(400).json({ error: "year must be a positive year" });
    }

    const newSP = aspSchema({
      id:id,
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
      total:total,
      orderdate:orderdate
    });

    await newSP.save();
    console.log(newSP);
    res.json({ message: "order added", order: newSP });
  } catch (err) {
    console.error("Error occurred while adding order:", err);
    res.status(500).json({ error: "An error occurred while adding order" });
  }
};

exports.SPapprovedorders = async (req, res) => {
  try {
    const Sp = await aspSchema
      .find({ status: "approved" })
      .sort({ createdAt: -1 });
    res.json(Sp);
  } catch (err) {
    console.log(err);
  }
};

exports.Spupdateongoing = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      id,
      name,
      vehicleNumber,
      brand,
      model,
      year,
      color,
      contactNumber,
      description,
      image,
      status,
      email,
      total,
      orderdate,
    } = req.body;

    const updateorder = {
      id:id,
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
      total:total,
      orderdate:orderdate
    };

    const updatedorder = await aspSchema.findByIdAndUpdate(
      orderId,
      updateorder,
      { new: true }
    );

    if (!updatedorder) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ status: "Product updated", product: updatedorder });
  } catch (err) {
    console.error("Error occurred while updating product:", err);
    res.status(500).json({ error: "An error occurred while updating product" });
  }
};

exports. SPongoingorders = async (req, res) => {
  try {
    const Sp = await aspSchema
      .find({ status: "ongoing" })
      .sort({ createdAt: -1 });
    res.json(Sp);
  } catch (err) {
    console.log(err);
  }
};

exports.Spupdatecompleted = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      id,
      name,
      vehicleNumber,
      brand,
      model,
      year,
      color,
      contactNumber,
      description,
      image,
      status,
      email,
      total,
      orderdate,
      completeddate
    } = req.body;

    const updateorder = {
      id:id,
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
      total:total,
      orderdate:orderdate,
      completeddate:completeddate
    };

    const updatedorder = await aspSchema.findByIdAndUpdate(
      orderId,
      updateorder,
      { new: true }
    );

    if (!updatedorder) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ status: "Product updated", product: updatedorder });
  } catch (err) {
    console.error("Error occurred while updating product:", err);
    res.status(500).json({ error: "An error occurred while updating product" });
  }
};

exports. SPcompletedorders = async (req, res) => {
  try {
    const Sp = await aspSchema
      .find({ status: "completed" })
      .sort({ createdAt: -1 });
    res.json(Sp);
  } catch (err) {
    console.log(err);
  }
};