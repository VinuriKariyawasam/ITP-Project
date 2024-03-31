import React, { useState, useEffect } from 'react';
import md5 from 'md5'; // Import the md5 library
import { Button } from 'react-bootstrap';

const PayHereIntegration = () => {
    const [paymentData, setPaymentData] = useState({
        merchant_id: '1226324',
        return_url: 'http://localhost:3000/customer',
        cancel_url: 'http://localhost:3000/staff',
        notify_url: 'http://localhost:3000/customer',
        first_name: 'John',
        last_name: 'Smith',
        email: 'john@john.com',
        phone: '0714804203',
        address: 'SLT',
        city: 'Kandy',
        country: 'Sri Lanka',
        order_id: 'M01',
        items: 'M01',
        currency: 'LKR',
        amount: '1000.00',
        hash: ''
    });

    useEffect(() => {
        // Include PayHere script
        const script = document.createElement('script');
        script.src = 'https://www.payhere.lk/lib/payhere.js';
        script.async = true;
        script.onload = () => {
            console.log('PayHere script loaded');
        };
        document.body.appendChild(script);

        return () => {
            // Clean up script
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        // Generate hash value
        const merchant_secret = 'MjgyNTg0MDA0NDI0NDgwNjczNTYzOTQwNjA4OTQwMjgzMzMyMDc4Nw==';
        const hashms = md5(merchant_secret).toUpperCase(); // Replace with your actual Merchant Secret
        const { merchant_id, order_id, amount, currency } = paymentData;
        const hashString = `${merchant_id}${order_id}${amount}${currency}${hashms}`;
        const hash = md5(hashString).toUpperCase();

        // Prepare payment payload
        const paymentPayload = {
            ...paymentData,
            hash: hash
        };

        // Initiate payment
        if (window.payhere) {
            window.payhere.startPayment(paymentPayload);
        } else {
            console.error('PayHere script not loaded');
        }
    };

    return (
        <main id="main" className="main">
            <div>
                {/* Payment form */}
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                {/* Add more input fields as needed */}

                {/* Button to initiate payment */}
                <Button onClick={handlePayment}>Pay with PayHere</Button>
            </div>
        </main>
    );
};

export default PayHereIntegration;
