const { addmechanicalreqdata,getMechanical,updatemechanical,deleteMechanical } = require('../controllers/mobile/mobileController')
const { addcarrierreqdata,getcarrierreq,updatecarrierreq,deletecarrierreq } = require('../controllers/mobile/vehicleCarrierController')
const { addbreakdownreqdata,getbreakdownreq,updatebreakdownreq,deletebreakdownreq } = require('../controllers/mobile/emBreakdownController')
const contactUsController =require ("../controllers/contactusController")


// get this page if main route would be 'MobileService'

const router = require ('express').Router()

//mechanical
router.post('/add-mechanical',addmechanicalreqdata )
router.get('/get-mechanical',getMechanical)
router.put('/update-mechanical/:id',updatemechanical)
router.delete('/delete-mechanical/:id',deleteMechanical)

//vehicle carrier
router.post('/add-vehiclecarrier',addcarrierreqdata )
router.get('/get-vehiclecarrier',getcarrierreq)
router.put('/update-vehiclecarrier/:id',updatecarrierreq)
router.delete('/delete-vehiclecarrier/:id',deletecarrierreq)

//emergency breakdown
router.post('/add-breakdown',addbreakdownreqdata )
router.get('/get-breakdown',getbreakdownreq)
router.put('/update-breakdown/:id',updatebreakdownreq)
router.delete('/delete-breakdown/:id',deletebreakdownreq)

//contactus
router.post('/contact', contactUsController.sendMessage);
// Route to get all contact us messages
router.get('/contact-us-messages', contactUsController.getAllContacts);


module.exports=router