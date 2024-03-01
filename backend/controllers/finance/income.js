const { config } = require("dotenv")
const IncomeSchema = require("../../models/finance/incomeModel")

exports.addIncome = async (req,res)=>{
    const {title,amount,serviceInvoiceId,type,date,time,status}= req.body


    const newIncome=IncomeSchema({
        title,
        amount,
        serviceInvoiceId,
        type,
        date,
        time,
        status
    })
    try {
        if(!title||!amount||!serviceInvoiceId||!type||!date||!time||!status){
            return res.status(400).json({message:'All Fields Required'})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:'Amount should be a positive value'})
        }
        await newIncome.save()
         res.status(200).json({message:'income added to DB'})
    } catch (error) {
        
    }
}