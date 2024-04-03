const { addperiodicalAppointment,getperiodicalAppointment,updateperiodicalAppointment, deleteperiodicalAppointment,getOneperiodicalAppointment,getOneperiodicalAppointmentbyVno} = require('../controllers/appointment/periodical-controller');
const { addmechanicalAppointment,getmechanicalAppointment,updatemechanicalAppointment, deletemechanicalAppointment,getOneMechanicalAppointment,getOneMechanicalAppointmentbyVno} = require('../controllers/appointment/mechanical-controller');
const { addacceptedappointment,getacceptedappointment,updateacceptedappointment, deleteacceptedappointment,getOneacceptedappointment,getOneacceptedappointmentbyVno} = require('../controllers/appointment/acceptedappointment-controller');
const router = require ('express').Router();

//periodical Appointment Routes
router.post('/addperiodicalAppointment',addperiodicalAppointment)
router.get('/get-periodicalAppointment',getperiodicalAppointment)
router.put('/update-periodicalAppointment/:id', updateperiodicalAppointment);
router.delete('/delete-periodicalAppointment/:id',deleteperiodicalAppointment);
router.get('/get-oneperiodicalAppointment/:id',getOneperiodicalAppointment);
router.get('/get-oneperiodicalAppointmentbyVno/:vNo',getOneperiodicalAppointmentbyVno)

//Mechanical Appointment Routes
router.post('/addmechanicalAppointment',addmechanicalAppointment )
router.get('/get-mechanicalAppointment',getmechanicalAppointment)
router.put('/update-mechanicalAppointment/:id',updatemechanicalAppointment)
router.delete('/delete-mechanicalAppointment/:id',deletemechanicalAppointment)
router.get('/get-onemechanicalAppointment/:id',getOneMechanicalAppointment)
router.get('/get-onemechanicalAppointmentbyVno/:vNo',getOneMechanicalAppointmentbyVno)

//Accepteed Appointment Routes
router.post('/addacceptedappointment',addacceptedappointment )
router.get('/get-acceptedappointment',getacceptedappointment)
router.put('/update-acceptedappointment/:id',updateacceptedappointment)
router.delete('/delete-acceptedappointment/:id',deleteacceptedappointment)
router.get('/get-oneacceptedappointment/:id',getOneacceptedappointment)
router.get('/get-oneacceptedappointmentbyVno/:vNo',getOneacceptedappointmentbyVno)

module.exports = router;
