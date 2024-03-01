const { addIncome } = require('../controllers/finance/income')

const router = require ('express').Router()


router.post('/add-income',addIncome )



module.exports=router