const { config } = require("dotenv")
const consultSchema = require("../../models/CAM/consultModel")

exports.addReply = async (req,res)=>{
    const {reply}= req.body


    const newReply = consultSchema({
        reply
    })
    try {
        /*if(!title||!amount||!type||!date||!description){
            return res.status(400).json({message:'All Fields Required'})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:'Amount should be a positive value'})
        }*/
        await newReply.save()
         res.status(200).json({message:'Reply added to DB'})
    } catch (error) {
        
    }
}

exports.getReply = async (req,res)=>{
    try {
        const replies= await consultSchema.find().sort({createdAt:-1})
        res.status(200).json(replies)
    } catch (error) {
        res.status(500).json({message :'Server Error'})
    }
}

exports.updateReply = async (req,res)=>{
    const {id}= req.params;
    consultSchema.findByIdAndUpdate(id).then((reply)=>{
        res.status(200).json({message :'Reply Updated Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
}

exports.deleteReply = async (req,res)=>{
    const {id}= req.params;
    consultSchema.findByIdAndDelete(id).then((reply)=>{
        res.status(200).json({message :'Reply Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 

exports.getReplybyId = async (req,res)=>{
    try{
        const {id}= req.params;
        const reply = await consultSchema.findById(id);

        if (!reply) {
            return res.status(404).json({ message: "Reply not found" });
          }
          res.status(200).json(reply);
    }catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
} 