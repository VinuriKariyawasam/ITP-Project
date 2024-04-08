const express = require("express");
const router = express.Router();

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

const {paymentinitiate,handlePaymentNotification,getPaymentbyOrderID} = require ("../controllers/finance/payment")
const {createBilling,getAllBillings,getPendingPayments,deleteBill,getPaymentByInvoiceId,updatePaymentStatus,getPendingPaymentByInvoiceId}=require("../controllers/finance/bill")

// Income routes
router.post("/incomes/add-income", addIncome);
router.delete("/incomes/delete-income/:id", deleteIncome);
router.patch("/incomes/update-income/:id", updateIncome);
router.get("/incomes/get-income/:id", getIncomeById);
router.get("/incomes", getIncomes);

// Expense routes
router.post("/expenses/add-expense", addExpense);
router.delete("/expenses/delete-expense/:id", deleteExpense);
router.patch("/expenses/update-expense/:id", updateExpense);
router.get("/expenses/get-expense/:id", getExpenseById);
router.get("/expenses", getExpenses);

//payment routes
router.post("/payments/initiatepayment", paymentinitiate);
router.post("/payments/handlenotification",handlePaymentNotification);
router.get("/payments/verifypayment/:order_id", getPaymentbyOrderID);


//billing routes

router.post("/billing/createbill",createBilling)
router.get("/billing/all",getAllBillings)
router.get("/billing/pendingpayments",getPendingPayments)
router.get("/billing/:paymentInvoiceId",getPaymentByInvoiceId)
router.get("/billing/pendingpayment/:paymentInvoiceId",getPendingPaymentByInvoiceId)
router.delete("/billing/delete/:paymentInvoiceId",deleteBill)
router.patch("/billing/inpersonpayment/:paymentInvoiceId",updatePaymentStatus)




module.exports = router;
