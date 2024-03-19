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



exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, type, date, description } = req.body;

    try {
        if (!title || !amount || !type || !date || !description) {
            return res.status(400).json({ message: 'All Fields Required' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount should be a positive value' });
        }

        const expenseToUpdate = await ExpenseSchema.findById(id);
        if (!expenseToUpdate) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expenseToUpdate.title = title;
        expenseToUpdate.amount = amount;
        expenseToUpdate.type = type;
        expenseToUpdate.date = date;
        expenseToUpdate.description = description;

        await expenseToUpdate.save();
        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }



};


exports.getExpenseById = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

