import React, { useEffect, useState } from 'react';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailure from './PaymentFailure';

const PaymentVerification = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const orderId = urlParams.get('order_id');
                const response = await fetch(`http://localhost:5000/api/finance/payments/verifypayment/${orderId}`);
                const data = await response.json();
                setPaymentData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

   

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (paymentData && paymentData.status_code === 2 && paymentData.sv) {
        return <PaymentSuccess paymentData={paymentData} />;
    } else {
        return <PaymentFailure paymentData={paymentData} />;
    }
};

export default PaymentVerification;
