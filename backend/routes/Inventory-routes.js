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
    
    })

    newProduct.save().then(() => {
        res.json("Product added");
    }).catch((err) => {
        console.log(err);
    })

})



module.exports = router;