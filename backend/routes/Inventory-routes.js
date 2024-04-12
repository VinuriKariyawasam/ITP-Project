
const { addLubricant, LubricantStock, deleteLubricants,updateLubricant} =require('../controllers/Inventory/Lubricants')
const fileUpload = require('../controllers/Inventory/ImageUpload');
const { addTires, TireStock, deleteTires, updateTire} = require('../controllers/Inventory/Tires');
const { addSP, SPpendingorders, deletependingsp } = require('../controllers/Inventory/SpareParts');
const{addcart, cartStock, updatecart, deletecarts, emptycart, generatePDF} = require('../controllers/Inventory/carts')
const { sendMail } = require("../config/inventorynodemailer");
const router = require("express").Router();

router.post("/addlubricant",fileUpload.single('image'),addLubricant)
router.get("/lubricantstock", LubricantStock)
router.delete("/deletelubricant/:id",deleteLubricants)
router.put("/updatelubricant/:id",updateLubricant)

router.post("/addTires",fileUpload.single('image'),addTires)
router.get("/Tirestock", TireStock)
router.delete("/deleteTires/:id",deleteTires)
router.put("/updateTire/:id",updateTire)

router.post("/addsp",fileUpload.single('image'),addSP)
router.get("/pendingsp", SPpendingorders)
router.delete('/deletependingsp/:id', deletependingsp )

router.post("/addcart", addcart)
router.get("/getcart", cartStock)
router.put("/updatecart/:id",updatecart)
router.delete("/deletecart/:id",deletecarts)
router.delete('/emptycart',emptycart)
router.get('/generate-pdf',generatePDF);

router.post("/sendinventoryemail",sendMail)

module.exports = router;
