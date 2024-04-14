const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseById,
} = require("../controllers/finance/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
  getIncomeById,
} = require("../controllers/finance/income");

const {getMonthlySalaryList,addEmpBenefits,getAllEmpBenefits,getPendingSalaryLists}=require("../controllers/finance/epf-etf")

const {paymentinitiate,handlePaymentNotification,getPaymentbyOrderID} = require ("../controllers/finance/payment")
const {createBilling,getAllBillings,getPendingPayments,deleteBill,getPaymentByInvoiceId,updatePaymentStatus,getPendingPaymentByInvoiceId}=require("../controllers/finance/bill")
const {uploadInvoice}= require("../controllers/finance/uploadinvoice")
const {saveInPersonRecord,saveOnlineRecord,getAllInPersonRecords,getAllOnlineRecords}=require("../controllers/finance/invoicerecord");
const { sendMail } = require("../config/nodemailer");



// router.post("/expenses/add-expense", addExpense);
// router.delete("/expenses/delete-expense/:id", deleteExpense);
// router.patch("/expenses/update-expense/:id", updateExpense);
// router.get("/expenses/get-expense/:id", getExpenseById);

// router.use(checkAuth)
router.get("/expenses", getExpenses);
router.get("/incomes", getIncomes);




// Income routes
// router.post("/incomes/add-income", addIncome);
// router.delete("/incomes/delete-income/:id", deleteIncome);
// router.patch("/incomes/update-income/:id", updateIncome);
// router.get("/incomes/get-income/:id", getIncomeById);

// Expense routes
router.post("/expenses/add-expense", addExpense);
router.delete("/expenses/delete-expense/:id", deleteExpense);
router.patch("/expenses/update-expense/:id", updateExpense);
router.get("/expenses/get-expense/:id", getExpenseById);

// router.get("/expenses", getExpenses);

//payment routes
// router.post("/payments/initiatepayment", paymentinitiate);
// router.post("/payments/handlenotification",handlePaymentNotification);
// router.get("/payments/verifypayment/:order_id", getPaymentbyOrderID);


// //billing routes

// router.post("/billing/createbill",createBilling)
// router.get("/billing/all",getAllBillings)
// router.get("/billing/pendingpayments",getPendingPayments)
// router.get("/billing/:paymentInvoiceId",getPaymentByInvoiceId)
// router.get("/billing/pendingpayment/:paymentInvoiceId",getPendingPaymentByInvoiceId)
// router.delete("/billing/delete/:paymentInvoiceId",deleteBill)
// router.patch("/billing/inpersonpayment/:paymentInvoiceId",updatePaymentStatus)


// //upload Invoice
// router.post("/billing/uploadinvoice", uploadInvoice);

// //invoice record routes
// router.post("/invoices/addonline",saveOnlineRecord)
// router.post("/invoices/addinperson",saveInPersonRecord)
// router.get("/invoices/online/all",getAllOnlineRecords)
// router.get("/invoices/inperson/all",getAllInPersonRecords)

//email route

router.post("/email",sendMail)


//get all salary lists

router.get("/salarylist/all",getMonthlySalaryList)
router.get("/salarylist/pending",getPendingSalaryLists)

// emp-benefits routes
router.post("/empbenefits/add",addEmpBenefits)
router.get("/empbenefits/all",getAllEmpBenefits)




module.exports = router;
