const RecordController = require("../controllers/sm/record-controller");

const router = require("express").Router();

router.get("/records", RecordController.getRecords);

router.get("/record/:id", RecordController.getRecords);

router.post("/add-record", RecordController.createRecord);

module.exports = router;