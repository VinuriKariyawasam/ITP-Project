const { config } = require("dotenv");
const TiresSchema = require("../../models/inventory/Tires");

exports.addTires = async (req, res) => {
  const Product_name = req.body.Product_name;
  const Product_code = req.body.Product_code;
  const Quantity = Number(req.body.Quantity);
  const Unit_price = req.body.Unit_price;

  const newTire = TiresSchema({
    Product_name,
    Product_code,
    Quantity,
    Unit_price,
  });

  newTire
    .save()
    .then(() => {
      res.json("Product added");
    })
    .catch((err) => {
      console.log(err);
    });
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

  TiresSchema.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with deleting" });
    });
};
