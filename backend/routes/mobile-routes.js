const { addmechanicalreqdata,getMechanical,updatemechanical,deleteMechanical } = require('../controllers/mobile/mobileController')
const { addcarrierreqdata,getcarrierreq,updatecarrierreq,deletecarrierreq } = require('../controllers/mobile/vehicleCarrierController')

// get this page if main route would be 'MobileService'

const router = require ('express').Router()

//mechanical
router.post('/add-mechanical',addmechanicalreqdata )
router.get('/get-mechanical',getMechanical)
router.put('/update-mechanical/:id,',updatemechanical)
router.delete('/delete-mechanical/:id',deleteMechanical)

//vehicle carrier
router.post('/add-vehiclecarrier',addcarrierreqdata )
router.get('/get-vehiclecarrier',getcarrierreq)
router.put('/update-vehiclecarrier/:id,',updatecarrierreq)
router.delete('/delete-vehiclecarrier/:id',deletecarrierreq)


module.exports=router