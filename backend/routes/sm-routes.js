const RecordController = require("../controllers/sm/record-controller");

const router = require("express").Router();

router.get("/records", RecordController.getRecords);

router.get("/records/:id", RecordController.getRecordById);

router.post("/records", RecordController.createRecord);

router.delete("/archive-records/:id", RecordController.deleteRecordById);


module.exports = router;