const RecordController = require("../controllers/sm/record-controller");

const router = require("express").Router();

router.get("/records", RecordController.getRecords);

router.get("/records/:id", RecordController.getRecordById);

router.post("/records", RecordController.createRecord);

router.delete("/archive-record/:id", RecordController.deleteRecordById);
router.patch(
    "/update-record/:id",
    //updateRecordValidationRules,
    RecordController.updateRecordById
  );
  
/*router.post(
  "/add-employee",
  createEmployeeValidationRules,
  EmployeeController.createEmployee
);*/

module.exports = router;