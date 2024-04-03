const { config } = require("dotenv");
const LubricantSchema = require("../../models/inventory/Lubricant");

exports.addLubricants = async (req, res) => {
  const Product_name = req.body.Product_name;
  const Product_code = req.body.Product_code;
  const Quantity = Number(req.body.Quantity);
  const Unit_price = req.body.Unit_price;

  const newLubricant = LubricantSchema({
    Product_name,
    Product_code,
    Quantity,
    Unit_price,
  });

  newLubricant
    .save()
    .then(() => {
      res.json("Product added");
    })
    .catch((err) => {
      console.log(err);
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

  LubricantSchema.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with deleting" });
    });
};
