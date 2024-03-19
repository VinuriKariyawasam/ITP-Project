const router = require("express").Router();
let Product = require("../models/inventory/Product");

router.route("/add").post((req, res) => {
  const Product_name = req.body.Product_name;
  const Product_code = req.body.Product_code;
  const Quantity = Number(req.body.Quantity);
  const Unit_price = req.body.Unit_price;

  const newProduct = new Product({
    Product_name,
    Product_code,
    Quantity,
    Unit_price,
  });

  newProduct
    .save()
    .then(() => {
      res.json("Product added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Product.find()
    .then((Products) => {
      res.json(Products);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let productId = req.params.id;
  const { Product_name, Product_code, Quantity, Unit_price } = req.body;

  const updateProduct = {
    Product_name,
    Product_code,
    Quantity,
    Unit_price,
  };

  const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating" });
    });
});



router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Product.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with deleting" });
    });
});

module.exports = router;