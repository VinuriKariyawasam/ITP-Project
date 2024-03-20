const { addReply,getReply,updateReply,deleteReply, getReplybyId } = require('../controllers/CAM/consult')
//const { addIncome,getIncomes,deleteIncome } = require('../controllers/finance/income')


const router = require ('express').Router()


/*router.post('/add-income',addIncome )
    .get('/get-incomes',getIncomes)
    .delete('/delete-income/:id',deleteIncome)*/



router.post('/add-reply',addReply)
    .get('/get-reply',getReply)
    .put('/update-reply/:id',updateReply)
    .delete('/delete-reply/:id',deleteReply)
    .get('/get-onereply/:id',getReplybyId)



module.exports=router