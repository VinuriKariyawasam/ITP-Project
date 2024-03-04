const { config } = require("dotenv")
const ExpenseSchema = require("../../models/finance/expenseModel")

exports.addExpense = async (req,res)=>{
    const {title,amount,type,date,description}= req.body


    const newExpense=ExpenseSchema({
        title,
        amount,
        type,
        date,
        description
    })
    try {
        if(!title||!amount||!type||!date||!description){
            return res.status(400).json({message:'All Fields Required'})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:'Amount should be a positive value'})
        }
        await newExpense.save()
         res.status(200).json({message:'Expense added to DB'})
    } catch (error) {
        
    }
}

exports.getExpenses = async (req,res)=>{
    try {
        const expenses= await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message :'Server Error'})
    }
}

exports.deleteExpense = async (req,res)=>{
    const {id}= req.params;
    ExpenseSchema.findByIdAndDelete(id).then((expense)=>{
        res.status(200).json({message :'Expense Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 