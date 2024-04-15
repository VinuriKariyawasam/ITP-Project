
const { addLubricant, LubricantStock, deleteLubricants,updateLubricant} =require('../controllers/Inventory/Lubricants')
const fileUpload = require('../controllers/Inventory/ImageUpload');
const { addTires, TireStock, deleteTires, updateTire} = require('../controllers/Inventory/Tires');
const { addSP, SPpendingorders, deletependingsp } = require('../controllers/Inventory/SpareParts');
const{addcart, cartStock, updatecart, deletecarts, emptycart, generatePDF, clearCart} = require('../controllers/Inventory/carts')
const { sendIMail } = require("../config/inventorynodemailer");
const {sendMail} = require("../config/nodemailer");
const { addorder, pendingOrders, completedOrders, orderupdatetocompleted } = require('../controllers/Inventory/Orders');
const { addapprovedSP,  SPapprovedorders, SPongoingorders, SPcompletedorders, Spupdateongoing, Spupdatecompleted} = require('../controllers/Inventory/ApprovedSPs');
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

router.post("/addapprovedsp",addapprovedSP)
router.get("/approvedsp",SPapprovedorders)
router.patch("/updatetoongoing/:id",Spupdateongoing)
router.get("/ongoingsp",SPongoingorders)
router.put("/updatetocomplete/:id",Spupdatecompleted)
router.get("/completedsp",SPcompletedorders)

router.post("/addcart", addcart)
router.get("/getcart", cartStock)
router.put("/updatecart/:id",updatecart)
router.delete("/deletecart/:id",deletecarts)
router.delete('/emptycart',emptycart)
router.get('/generate-pdf',generatePDF);
router.delete("/clear-cart", clearCart);

router.post("/addorder",addorder)
router.get("/getorderpending",pendingOrders)
router.get("/getordercompleted",completedOrders)
router.put("/updatetocompletedorder/:id",orderupdatetocompleted)

router.post("/sendinventoryemail",sendIMail)
router.post("/sendrejectemail",sendMail)

module.exports = router;
