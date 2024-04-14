const ConsultationController = require("../controllers/CAM/consultation-controller");

const FeedbackController = require("../controllers/CAM/feedback-controller");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const router = require("express").Router();
router.use(bodyParser.json());


//OnlineConsultation Routes
router.post('/consultation/add-issue',ConsultationController.createConsultation)
router.get('/consultation/get-issues',ConsultationController.getConsultation)
router.patch('/consultation/update-solution/:id',ConsultationController.updateConsultationById)
//router.delete('/consultation/delete-solution/:id',deleteSolution)
router.get('/consultation/get-issue/:id',ConsultationController.getConsultationById)


//Feedback Routes    
router.post('/feedback/add-feedback',FeedbackController.createFeedback)
router.get('/feedback/get-feedbacks',FeedbackController.getFeedback)
router.patch('/feedback/update-feedback/:id',FeedbackController.updateFeedbackById)
router.delete('/feedback/delete-feedback/:id',FeedbackController.deleteFeedbackById)
router.get('/feedback/get-feedback/:id',FeedbackController.getFeedbackById)
    


module.exports = router;