
const { addLubricant, LubricantStock, deleteLubricants} =require('../controllers/Inventory/Lubricants')
const fileUpload = require('../controllers/Inventory/ImageUpload');
const { addTires, TireStock, deleteTires} = require('../controllers/Inventory/Tires')
//const upload = require ("./multerStorage")
const router = require("express").Router();

router.post("/addlubricant",fileUpload.single('image'),addLubricant)
router.get("/lubricantstock", LubricantStock)
router.delete("/deletelubricant/:id",deleteLubricants)
/*router.route("/updatelubricant/:id").put(async (req, res) => {
  let productId = req.params.id;
  const { Product_name, Product_code, Quantity, Unit_price } = req.body;

  const updateLubricant = {
    Product_name,
    Product_code,
    Quantity,
    Unit_price,
  };
  const update = await Lubricant.findByIdAndUpdate(productId, updateLubricant)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating" });
    });
});*/

router.post("/addTires",addTires)
router.get("/Tirestock", TireStock)
router.delete("/deleteTires/:id",deleteTires)

module.exports = router;
