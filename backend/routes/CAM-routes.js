const router = require("express").Router();
let consult = require("../models/CAM/consultModel")

router.route("/add").post((req,res)=>{

    const reply = req.body.reply;

    const newConsult = new consult({
        reply
    })

    newConsult.save().then(()=>{
        res.json("Reply Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res) =>{
    consult.find().then((Consults) =>{
        res.json(Consults)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {reply} =req.body;

    const updateReply = {
        reply
    }

    const update = await consult.findByIdAndUpdate(userId,updateReply)
    .then(() =>{
        res.status(200).send({status:"Reply updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })

    
})

router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;
    await consult.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Reply deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res) =>{
    let userId = req.params.id;
    const user = await consult.findById(userId)
    .then((consult)=>{
        res.status(200).send({status:"Reply fetched", consult})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});

    })
})


module.exports = router;