
const { addLubricant, LubricantStock, deleteLubricants,updateLubricant} =require('../controllers/Inventory/Lubricants')
const fileUpload = require('../controllers/Inventory/ImageUpload');
const { addTires, TireStock, deleteTires} = require('../controllers/Inventory/Tires')
//const upload = require ("./multerStorage")
const router = require("express").Router();

router.post("/addlubricant",fileUpload.single('image'),addLubricant)
router.get("/lubricantstock", LubricantStock)
router.delete("/deletelubricant/:id",deleteLubricants)
router.put("/updatelubricant/:id",updateLubricant)
router.post("/addTires",addTires)
router.get("/Tirestock", TireStock)
router.delete("/deleteTires/:id",deleteTires)

module.exports = router;
