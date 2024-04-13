const RegistartionController = require("../controllers/Customer/registration-controller");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const router = require("express").Router();
router.use(bodyParser.json());
const {addCustomer} = require("../controllers/Customer/registration-controller");

//Registration Routes
router.post("/signup/add-customer",RegistartionController.createCustomer);
router.get("/signup/get-customer/:id",RegistartionController.getCustomerById);
router.patch("/signup/update-customer/:id",RegistartionController.updateCustomerById);
router.delete("/signup/delete-customer/:id",RegistartionController.deleteCustomerById);

//Login Routes
router.post("/cus-login",RegistartionController.loginCustomer);

module.exports = router;