const { config } = require("dotenv")
const IncomeSchema = require("../../models/finance/incomeModel")

exports.addIncome = async (req,res)=>{
    const {title,serviceInvoiceId,amount,type,date,time,status}= req.body


    const newIncome=IncomeSchema({
        title,
        serviceInvoiceId,
        amount,
        type,
        date,
        time,
        status
    })
    try {
        if(!title||!serviceInvoiceId||!amount||!type||!date||!time||!status){
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


exports.getIncomeById = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await IncomeSchema.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (error) {
        console.error('Error fetching income by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, serviceInvoiceId, amount, type, date, time, status } = req.body;

    try {
        
        const existingIncome = await IncomeSchema.findById(id);
        if (!existingIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }
 
        if (title) existingIncome.title = title;
        if (serviceInvoiceId) existingIncome.serviceInvoiceId = serviceInvoiceId;
        if (amount) existingIncome.amount = amount;
        if (type) existingIncome.type = type;
        if (date) existingIncome.date = date;
        if (time) existingIncome.time = time;
        if (status) existingIncome.status = status;

       
        await existingIncome.save();

        res.status(200).json({ message: 'Income updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
