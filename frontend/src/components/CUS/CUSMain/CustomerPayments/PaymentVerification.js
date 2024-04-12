import React, { useEffect, useState } from 'react';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailure from './PaymentFailure';


const PaymentVerification = () => {
   
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null); // State to store orderId

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const orderIdParam = urlParams.get('order_id'); // Storing orderId in a variable
                setOrderId(orderIdParam); // Setting orderId state
                const response = await fetch(`http://localhost:5000/api/finance/payments/verifypayment/${orderIdParam}`);
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

    const markPaymentCompleted = async (paymentId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/finance/billing/inpersonpayment/${paymentId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "completed" }),
                }


              
            );
            if (!response.ok) {
                throw new Error("Failed to mark payment as completed");
            }

            
        } catch (error) {
            console.error("Error marking payment as completed:", error.message);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (paymentData && paymentData.status_code === 2 && paymentData.sv) {
        markPaymentCompleted(orderId); // Using orderId from state
        return <PaymentSuccess paymentId={orderId}   />;
    } else {
        return <PaymentFailure paymentData={paymentData} />;
    }
};

export default PaymentVerification;
