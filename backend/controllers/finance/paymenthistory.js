// paymentHistoryController.js

const PaymentHistory = require('../../models/finance/paymenthistory')

// Controller function to get payment history by email
exports.getPaymentByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const paymentHistory = await PaymentHistory.find({ email });
    res.status(200).json(paymentHistory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to add a new payment history record
exports.addPaymentHistory = async (req, res) => {
  try {
    const { invoice_id, name, email, amount,date,url } = req.body;
    const newPayment = new PaymentHistory({ invoice_id, name, email, amount,date,url });
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};
