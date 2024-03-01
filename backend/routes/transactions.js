const { addExpense } = require('../controllers/finance/expense')
const { addIncome } = require('../controllers/finance/income')

const router = require ('express').Router()


router.post('/add-income',addIncome )
router.post('/add-expense',addExpense)



module.exports=router