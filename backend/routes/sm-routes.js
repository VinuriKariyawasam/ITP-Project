const RecordController = require("../controllers/sm/record-controller");
const quotationController = require("../controllers/sm/quotationController");
const reportController = require("../controllers/sm/reportController");
const job =require("../controllers/sm/jobscheduleController");
const router = require("express").Router();

router.get("/records", RecordController.getRecords);

router.get("/record/:id", RecordController.getRecordById);

router.post("/records", RecordController.createRecord);

router.delete("/archive-record/:id", RecordController.deleteRecordById);

router.patch("/update-record/:id",RecordController.updateRecordById );

// Route to create a new quotation
router.post("/quotations", quotationController.createQuotation);

// Route to get all quotations
router.get("/quotations", quotationController.getAllQuotations);

// DELETE /api/sm/quotations/:id
router.delete("/quotations/:id", quotationController.deleteQuotation);

// POST /api/submit-report
router.post("/reports", reportController.submitReport);

// GET: /api/sm/reports
router.get("/reports", reportController.getAllReports);

router.get("/reports/:id", reportController.getReportById);

//job schedule
router.post("/assign-job", job.assignedJob);

router.get("/jobs", job.getAllJobs);

// Route to get count of service reports
router.get('/count', reportController.getCountOfServiceReports);

// Route to get count of all records
router.get("/records/count", RecordController.getRecordCount);

// Route to get count of all quotations
router.get("/quotations/count", quotationController.getQuotationCount);

// Route to fetch PDF details for a service report by ID
router.get('/reports/pdf/:id', reportController.generatePDF);

module.exports = router;