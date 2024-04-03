const { addmechanicalreqdata,getMechanical,deleteMechanical } = require('../controllers/mobile/mobileController')


// get this page if main route would be 'MobileService'

const router = require ('express').Router()


router.post('/add-mechanical',addmechanicalreqdata )
    .get('/get-mechanical',getMechanical)
    .delete('/delete-mechanical/:id',deleteMechanical)


module.exports=router