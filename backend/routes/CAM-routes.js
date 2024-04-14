const { addIssue, getAllIssues, updateSolution, deleteSolution, getIssuebyId} 
= require('../controllers/CAM/consultation-controller')

const { addFeedback, getAllFeedback, updateFeedback, deleteFeedback, getFeedbackbyId} 
= require("../controllers/CAM/feedback-controller");

const router = require ('express').Router()


//OnlineConsultation Routes
router.post('/consultation/add-issue',addIssue)
router.get('/consultation/get-issues',getAllIssues)
router.put('/consultation/update-solution/:consultationId',updateSolution)
router.delete('/consultation/delete-solution/:id',deleteSolution)
router.get('/consultation/get-issue/:consultationId',getIssuebyId)


//Feedback Routes  
router.post('/feedback/add-feedback',addFeedback)
router.get('/feedback/get-feedbacks',getAllFeedback)
router.put('/feedback/update-feedback/:id',updateFeedback)
router.delete('/feedback/delete-feedback/:id',deleteFeedback)
router.get('/feedback/get-feedback/:id',getFeedbackbyId)
    


module.exports = router;