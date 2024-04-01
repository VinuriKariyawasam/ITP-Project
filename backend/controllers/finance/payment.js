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

        // Arrange payment data in the required order
        const paymentData = {
            merchant_id,
            return_url,
            cancel_url,
            notify_url,
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
            amount,
            hash
        };

        // Send a POST request to PayHere's checkout endpoint
       

        // Extract HTML content from the response
       

        // Send the HTML content back to the client
        res.send(paymentData);
    } catch (error) {
       
        res.status(500).json({ error: 'Internal server error' });
    }
};
