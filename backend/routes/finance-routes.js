const { addExpense,getExpenses,deleteExpense } = require('../controllers/finance/expense')
const { addIncome,getIncomes,deleteIncome } = require('../controllers/finance/income')


const router = require ('express').Router()


router.post('/add-income',addIncome )
    .get('/get-incomes',getIncomes)
    .delete('/delete-income/:id',deleteIncome)



router.post('/add-expense',addExpense)
    .get('/get-expenses',getExpenses)
    .delete('/delete-expense/:id',deleteExpense)



module.exports=router