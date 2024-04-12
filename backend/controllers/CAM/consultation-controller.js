const { config } = require("dotenv")
const consultationSchema = require("../../models/CAM/consultationModel")

exports.addIssue = async (req,res)=>{
    const vehicleType = req.body.vehicleType;
    const component = req.body.component;
    const issue = req.body.issue;
    const files = req.body.files;
    //const solution = req.body.solution;

    //Generate an unique ConsultationId

    const initialId = "consult";
    const timestamp = Date.now().toString(36).substring(0, 4);
    const consultationId = `consult${timestamp}`;

    const newConsultation = consultationSchema ({
        consultationId,
        vehicleType,
        component,
        issue,
        files,
        //solution,
    });
   
    newConsultation
     .save()
     .then(() => {
        res.json("Issue added to DB");
     })
     .catch((err) => {
        console.log(err);
     });                
};

exports.getAllIssues = async (req,res)=>{
    try {
        const Issues = await consultationSchema.find().sort({createdAt:-1})
        res.status(200).json(Issues)
    }
    catch (err) {
        console.log(err);
    }
};
/*
exports.addSolution = async (req,res)=>{
    const solution = req.body.solution;

    const newConsultation = consultationSchema ({
        solution,
    });
   
    newConsultation
     .save()
     .then(() => {
        res.json("Solution added to DB");
     })
     .catch((err) => {
        console.log(err);
     });                
};*/

exports.updateSolution = async (req,res) =>{
    const consultationId = req.params.id;
    const { solution } =req.body;

    let solutionToUpdate;
    try{
         solutionToUpdate = await consultationSchema.findById(consultationId);
         if (!solutionToUpdate) {
            return res.status(404).json({ error: "Consultation not found" });
        }

        solutionToUpdate.solution = solution;
        await solutionToUpdate.save();
        res.status(200).send({status: "Solution added to DB"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
     //update solution field with values from req.body
      //solutionToUpdate.solution = solution;
/*
      try{
        const setUpdatedSolution = await solutionToUpdate.save();
        res.status(200).json(setUpdatedSolution)
      } catch(err){
        console.log(err);
      }*/
};

exports.deleteSolution = async (req,res) =>{
    const {id}= req.params;

    consultationSchema.findByIdAndDelete(id).then((solution)=>{
        res.status(200).json({message :'Solution Deleted Sucessfully'})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({ status: "error with deleting"})
    });
}; 

exports.getIssuebyId = async (req,res) =>{
    const consultationId = req.params.id;

  try{
    const issue = await consultationSchema.findById(consultationId);
    res.json(issue);
  }
  catch(err){
    console.log(err);
  }
}; 