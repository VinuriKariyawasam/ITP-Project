const ConsultationController = require("../controllers/CAM/consultation-controller");

const FeedbackController = require("../controllers/CAM/feedback-controller");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const router = require("express").Router();
router.use(bodyParser.json());


//OnlineConsultation Routes
router.post('/consultation/add-issue',ConsultationController.createConsultation)
router.get('/consultation/get-issues',ConsultationController.getConsultation)
router.put('/consultation/update-solutionbyid/:consultId',ConsultationController.updateConsultationSolution)
router.put('/consultation/delete-solutionbyid/:consultId',ConsultationController.deleteSolution)
router.put('/consultation/update-newsolution/:consultId',ConsultationController.updateNewSolution)
router.get('/consultation/get-issue/:userId',ConsultationController.getConsultationById)
router.get('/consultation/get-consultid/:consultId',ConsultationController.getConsultationByconsultId)



//Feedback Routes   
router.post('/feedback/add-feedback',FeedbackController.createFeedback)
router.get('/feedback/get-feedbacks',FeedbackController.getFeedback)
router.patch('/feedback/update-feedback/:userId',FeedbackController.updateFeedbackByUserId)
router.delete('/feedback/delete-feedback/:userId',FeedbackController.deleteFeedbackById)
router.get('/feedback/get-feedback/:userId',FeedbackController.getFeedbackById)

    


module.exports = router;