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

const router = require("express").Router();

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

module.exports = router;