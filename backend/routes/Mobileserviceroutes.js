const MobileMechController = require("../controllers/Mobileservice/mechanicalcontroller");
const bodyParser = require("body-parser");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/mechanical", MobileMechController.getMRequest);

//router.get("/employee/:id", EmployeeController.getEmployeeById);

router.post("/createrequest", MobileMechController.createMRequest);

module.exports = router;