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

exports.getIncomes = async (req,res)=>{
    try {
        const incomes= await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message :'Server Error'})
    }
}

exports.deleteIncome = async (req,res)=>{
    const {id}= req.params;
    IncomeSchema.findByIdAndDelete(id).then((income)=>{
        res.status(200).json({message :'Income Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 