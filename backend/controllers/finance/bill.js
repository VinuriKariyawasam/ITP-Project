
const BillingSchema = require('../../models/finance/billing')


exports.createBilling = async (req, res) => {
    const { serviceRecordId, paymentInvoiceId, name, address, email, phone, partsPrice, partsDiscount, servicePrice, serviceDiscount, taxRate, total ,currentDate,currentTime} = req.body;
  
    const newBilling = new BillingSchema({
      serviceRecordId,
      paymentInvoiceId,
      name,
      address,
      email,
      phone,
      partsPrice,
      partsDiscount,
      servicePrice,
      serviceDiscount,
      taxRate,
      total,
      currentDate,
      currentTime
    });
  
    try {
      if (!serviceRecordId || !paymentInvoiceId || !name || !address || !email || !phone || !partsPrice || !partsDiscount || !servicePrice || !serviceDiscount || !taxRate || !total) {
        return res.status(400).json({ message: 'All Fields Required' });
      }
      if (isNaN(partsPrice) || isNaN(partsDiscount) || isNaN(servicePrice) || isNaN(serviceDiscount) || isNaN(taxRate) || isNaN(total) || partsPrice < 0 || partsDiscount < 0 || servicePrice < 0 || serviceDiscount < 0 || taxRate < 0 || total < 0) {
        return res.status(400).json({ message: 'All numerical values should be positive' });
      }
  
      await newBilling.save();
      res.status(200).json({ message: 'Billing entry added to DB'});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  


exports.getAllBillings = async (req, res) => {
  try {
    const billings = await BillingSchema.find();
    res.status(200).json({ success: true, data: billings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




exports.getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await  BillingSchema.find({ status: 'pending' });
    res.status(200).json({ success: true, data: pendingPayments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.getPaymentByInvoiceId = async (req, res) => {
    const { paymentInvoiceId } = req.params;
    try {
        const payment = await BillingSchema.findOne({ paymentInvoiceId });
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteBill = async (req, res) => {
    const { paymentInvoiceId } = req.params;
    try {
        const deletedRecord = await BillingSchema.findOneAndDelete({ paymentInvoiceId });
        if (!deletedRecord) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }
        res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.updatePaymentStatusToCompleted = async (req, res) => {
    const { paymentInvoiceId } = req.params;
  
    try {
     
      const payment = await BillingSchema.findOne({ paymentInvoiceId });
  
      
      if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment not found' });
      }
  
     
      payment.status = 'completed';
  
      
      await payment.save();
  
      // Return success response
      res.status(200).json({ success: true, message: 'Payment status updated to completed' });
    } catch (error) {
      // Return error response if any error occurs
      res.status(500).json({ success: false, error: error.message });
    }
  };