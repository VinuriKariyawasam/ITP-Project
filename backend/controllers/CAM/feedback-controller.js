const {config} = require("dotenv");
const feedbackSchema = require("../../models/CAM/feedbackModel"); //import feedback model

exports.addFeedback = async (req, res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contact = req.body.contact;
    const serviceType = req.body.serviceType;
    const files = req.body.files;
    const feedback = req.body.feedback;
    const rating = req.body.rating;

    const newFeedback = feedbackSchema ({
        firstName,
        lastName,
        email,
        contact,
        serviceType,
        files,
        feedback,
        rating,
    });

    newFeedback
      .save()
      .then(() => {
        res.json("Feedback added to DB");
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.getAllFeedback = async (req,res) =>{
  try{
    const Feedbacks = await feedbackSchema.find().sort({createdAt: -1});
    res.json(Feedbacks);
  }
  catch(err){
    console.log(err);
  }
};

exports.updateFeedback = async (req,res) =>{
  const {id} = req.params;

  feedbackSchema.findByIdAndUpdate(id).then(() => {
    res.status(200).send({status: "Feedback updated"});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ status: "error with updating"});
  });
};

exports.deleteFeedback = async (req,res) =>{
  const {id} = req.params;

  feedbackSchema.findByIdAndDelete(id).then(() => {
    res.status(200).send({ status: "Feedback deleted"});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ status: "error with deleting"})
  });
};

exports.getFeedbackbyId = async (req,res) =>{
  const {id} = req.params;

  try{
    const feedback = await feedbackSchema.find({id}).sort({ createdAt: -1});
    res.json(feedback);
  }
  catch(err){
    console.log(err);
  }
};
