const { addperiodicalAppointment,getperiodicalAppointment,updateperiodicalAppointment, deleteperiodicalAppointment,getOneperiodicalAppointment,getOneperiodicalAppointmentbyVno} = require('../controllers/appointment/periodical-controller');
const { addmechanicalAppointment,getmechanicalAppointment,updatemechanicalAppointment, deletemechanicalAppointment,getOneMechanicalAppointment,getOneMechanicalAppointmentbyVno,getmechanicalappointmentbyDate } = require('../controllers/appointment/mechanical-controller');
const {addaccidentalAppointment,getaccidentalAppointment,deleteaccidentalAppointment } = require('../controllers/appointment/accidental-controller');
const { addacceptedappointment,getacceptedappointment,updateacceptedappointment, deleteacceptedappointment,getOneacceptedappointment,getOneacceptedappointmentbyVno,getacceptedappointmentbyDate } = require('../controllers/appointment/acceptedappointment-controller');
const { addaceptedperiodicalAppointment,getacceptedperiodicalAppointment,getacceptedperiodicalappointmentbyDate} = require('../controllers/appointment/acceptedPeriodical-controller');
const { addacceptedmechanicalAppointment,getacceptedmechanicalAppointment,getacceptedmechanicalappointmentbyDate} = require('../controllers/appointment/acceptedmechanical-controller');
const {addacceptedaccidentalAppointment,getacceptedaccidentalAppointment,getacceptedaccidentalappointmentbyDate} = require('../controllers/appointment/acceptedAcidental');
const ImageUpload = require('../controllers/appointment/ImageUpload')


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
router.get('/get-mechanicalAppointmentbyDate/:appointmentdate',getmechanicalappointmentbyDate)
//router.get('/get-mechanicalAppointmentTimebyDate/:appointmentdate',getMechanicalAppointmenTimetbyDate)

//Accidental Appointment Routes
router.post('/addaccidentalAppointment',ImageUpload.single('image'),addaccidentalAppointment )
router.get('/get-accidentalAppointment',getaccidentalAppointment )
router.delete('/delete-accidentalAppointment/:id',deleteaccidentalAppointment)

//Accepteed Appointment Routes
router.post('/addacceptedappointment',addacceptedappointment )
router.get('/get-acceptedappointment',getacceptedappointment)
router.put('/update-acceptedappointment/:id',updateacceptedappointment)
router.delete('/delete-acceptedappointment/:id',deleteacceptedappointment)
router.get('/get-oneacceptedappointment/:id',getOneacceptedappointment)
router.get('/get-oneacceptedappointmentbyVno/:vNo',getOneacceptedappointmentbyVno)
router.get('/get-acceptedappointmentbyDate/:appointmentdate',getacceptedappointmentbyDate)


//Accepteed Periodical Appointment Routes
router.post('/addaceptedperiodicalAppointment',addaceptedperiodicalAppointment )
router.get('/get-acceptedperiodicalAppointment',getacceptedperiodicalAppointment)
router.get('/get-acceptedperiodicalappointmentbyDate/:appointmentdate',getacceptedperiodicalappointmentbyDate)


//Accepteed mechanical Appointment Routes
router.post('/addacceptedmechanicalAppointment',addacceptedmechanicalAppointment )
router.get('/get-acceptedmechanicalAppointment',getacceptedmechanicalAppointment)
router.get('/get-acceptedmechanicalappointmentbyDate/:appointmentdate',getacceptedmechanicalappointmentbyDate)

//Accepteed accidental Appointment Routes
router.post('/addacceptedaccidentalAppointment',addacceptedaccidentalAppointment )
router.get('/get-acceptedaccidentalAppointment',getacceptedaccidentalAppointment)
router.get('/get-acceptedaccidentalappointmentbyDate/:appointmentdate',getacceptedaccidentalappointmentbyDate)

module.exports = router;