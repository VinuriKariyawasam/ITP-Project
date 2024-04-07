// backend/paymentsController.js
const onlinePaymentSchema = require('../../models/finance/onlinepaymentModel')


const md5 = require('md5');
require('dotenv').config();

exports.paymentinitiate = async (req, res) => {
    try {
        // Extract payment data from the request body
        const {
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            country,
            order_id,
            items,
            currency,
            amount
        } = req.body;

        // Fetch merchant details from environment variables
        const merchant_id = process.env.MERCHANT_ID;
        const return_url = process.env.RETURN_URL;
        const cancel_url = process.env.CANCEL_URL;
        const notify_url = process.env.NOTIFY_URL;
        const merchant_secret = process.env.MS;

        // Generate hash for payment security
        const hashms = md5(merchant_secret).toUpperCase();
        const hashString = `${merchant_id}${order_id}${amount}${currency}${hashms}`;
        const hash = md5(hashString).toUpperCase();

        // Construct the payment portal URL
        const paymentUrl = `https://sandbox.payhere.lk/pay/checkout`;

        // Construct a form with hidden inputs for redirection
        const form = `
            <form id="paymentForm" action="${paymentUrl}" method="post">
                <input type="hidden" name="merchant_id" value="${merchant_id}">
                <input type="hidden" name="return_url" value="${return_url}">
                <input type="hidden" name="cancel_url" value="${cancel_url}">
                <input type="hidden" name="notify_url" value="${notify_url}">
                <input type="hidden" name="first_name" value="${first_name}">
                <input type="hidden" name="last_name" value="${last_name}">
                <input type="hidden" name="email" value="${email}">
                <input type="hidden" name="phone" value="${phone}">
                <input type="hidden" name="address" value="${address}">
                <input type="hidden" name="city" value="${city}">
                <input type="hidden" name="country" value="${country}">
                <input type="hidden" name="order_id" value="${order_id}">
                <input type="hidden" name="items" value="${items}">
                <input type="hidden" name="currency" value="${currency}">
                <input type="hidden" name="amount" value="${amount}">
                <input type="hidden" name="hash" value="${hash}">
            </form>
            <script>
                document.getElementById("paymentForm").submit();
            </script>
        `;

        // Send the form back to the client
        res.send(form);
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.handlePaymentNotification = (req, res) => {
    const {
        merchant_id,
        order_id,
        payment_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig, // Get the md5sig from the request
        custom_1,
        custom_2,
        method,
        status_message,
        card_holder_name,
        card_no,
        card_expiry
    } = req.body;

  
    mid=process.env.MERCHANT_ID;

    // Generate the local md5sig for verification
    const merchant_secret = process.env.MS;
    const hashms = md5(merchant_secret).toUpperCase();
    const hashString = `${mid}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashms}`;
    const local_md5sig = md5(hashString).toUpperCase();

    // Create a new OnlinePayment instance
    const onlinePayment = new onlinePaymentSchema({
        merchant_id,
        order_id,
        payment_id,
        payhere_amount,
        payhere_currency,
        status_code,
        custom_1,
        custom_2,
        method,
        status_message,
        card_holder_name,
        card_no,
        card_expiry,
        sv: local_md5sig === md5sig 
    });

    // Save the payment data to the database
    onlinePayment.save()
        .then(savedPayment => {
            

            // Respond to PayHere to acknowledge the notification
            res.status(200).end();
        })
        .catch(error => {
            console.error('Error saving payment:', error);
            res.status(500).json({ error: 'Error saving payment data' });
        });
};




exports.getPaymentbyOrderID = async (req, res) => {
    try {
        const { order_id } = req.params;

        const payment = await onlinePaymentSchema.findOne({ order_id });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.json(payment);
    } catch (error) {
        console.error('Error retrieving payment by order ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
