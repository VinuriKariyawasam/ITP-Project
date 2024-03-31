const { addReply,getReply,updateReply,deleteReply, getReplybyId } 
= require('../controllers/CAM/consult-controller')

const { addFeedback, getAllFeedback, updateFeedback, deleteFeedback, getFeedbackbyId} 
= require("../controllers/CAM/feedback-controller");

const router = require ('express').Router()


//OnlineConsultation Routes
router.post('/add-reply',addReply)
    .get('/get-reply',getReply)
    .put('/update-reply/:id',updateReply)
    .delete('/delete-reply/:id',deleteReply)
    .get('/get-onereply/:id',getReplybyId)


//Feedback Routes    
router.post('/add-feedback',addFeedback)
router.get('/get-feedbacks',getAllFeedback)
router.put('/update-feedback/:id',updateFeedback)
router.delete('/delete-feedback/:id',deleteFeedback)
router.get('/get-feedback/:id',getFeedbackbyId)
    


module.exports = router;