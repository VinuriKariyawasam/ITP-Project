const { addmechanicalreqdata,getMechanical,deleteMechanical } = require('../controllers/mobile/mobileController')


// get this page if main route would be 'MobileService'

const router = require ('express').Router()


router.post('/add-mechanical',addmechanicalreqdata )
router.get('/get-mechanical',getMechanical)
router.put('/update-mechanical/:id,',updatemechanical)
router.delete('/delete-mechanical/:id',deleteMechanical)


module.exports=router