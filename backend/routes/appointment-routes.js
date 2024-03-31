const { addperiodicalAppointment ,getperiodicalAppointment,updateperiodicalAppointment, deleteperiodicalAppointment,getOneperiodicalAppointment } = require('../controllers/appointment/periodical-controller');

const router = require ('express').Router();

router.post('/add',addperiodicalAppointment )
router.get('/get-periodicalAppointment',getperiodicalAppointment)
router.put('/update-periodicalAppointment/:id,',updateperiodicalAppointment)
router.delete('/delete-periodicalAppointment/:id',deleteperiodicalAppointment)


module.exports = router;
