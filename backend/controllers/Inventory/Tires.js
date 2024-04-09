const { config } = require("dotenv");
const TiresSchema = require("../../models/inventory/Tires");
const fs = require("fs");

exports.addTires = async (req, res) => {
  try {
    const { product_name, product_brand, vehicle_Type, quantity, unit_price } =
      req.body;
    const image = req.file ? req.file.path : null;

    if (
      !product_name ||
      !product_brand ||
      !vehicle_Type ||
      !quantity ||
      !unit_price ||
      !image
    ) {
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

    const newTire = TiresSchema({
      Product_name: product_name,
      Product_Brand: product_brand,
      vehicle_Type: vehicle_Type,
      Quantity: Quantity,
      Unit_price: UnitPrice,
      image: image,
    });

    await newTire.save();
    console.log(newTire);
    res.json({ message: "Product added", product: newTire });
  } catch (err) {
    console.error("Error occurred while adding product:", err);
    res.status(500).json({ error: "An error occurred while adding product" });
  }
};


exports.updateTire = async (req, res) => {
  try {
    const productId = req.params.id;
    const { Product_name, Product_brand,vehicle_Type, Quantity, Unit_price, image } =
      req.body;

    const update_Tire = {
      Product_name,
      Product_brand,
      vehicle_Type,
      Quantity,
      Unit_price,
      image,
    };

    const updatedProduct = await TiresSchema.findByIdAndUpdate(
      productId,
      update_Tire,
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


exports.TireStock = async (req, res) => {
  try {
    const Tires = await TiresSchema.find().sort({ createdAt: -1 });
    res.json(Tires);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTires = async (req, res) => {
  const { id } = req.params;

  try {
    const tire = await TiresSchema.findById(id);

    if (!tire) {
      return res.status(404).send({ status: "Lubricant not found" });
    }

    const imagePath = tire.image;

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ status: "Error deleting file" });
      }

      TiresSchema.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "product deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "error with deleting" });
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Internal server error" });
  }
};
