const RecordController = require("../controllers/sm/record-controller");

const router = require("express").Router();

router.get("/add", RecordController.getRecords);

router.get("/add/:id", RecordController.getRecords);

router.post("/add", RecordController.createRecord);

module.exports = router;