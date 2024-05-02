import React, { useEffect, useState } from 'react';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailure from './PaymentFailure';


const PaymentVerification = ({toggleLoading}) => {
   
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null); // State to store orderId

    useEffect(() => {
        const fetchData = async () => {
            try {

                const urlParams = new URLSearchParams(window.location.search);
                const orderIdParam = urlParams.get('order_id'); // Storing orderId in a variable
                setOrderId(orderIdParam);
                toggleLoading(true) // Setting orderId state
                const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/payments/verifypayment/${orderIdParam}`);
                const data = await response.json();
                setPaymentData(data);
                
            } catch (error) {
                setError(error);
                
            }
            finally{
                toggleLoading(false)
            }
        };

        fetchData();
    }, []);

    const markPaymentCompleted = async (paymentId) => {
        try {
            const response = await fetch(
                `${process.env.React_App_Backend_URL}/api/finance/billing/inpersonpayment/${paymentId}`,
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



    const sendUpdatetoInventory = async (paymentId) => {
        try {
          
            
            // Send a PATCH request to update inventory
            await fetch(`${process.env.React_App_Backend_URL}/api/finance/updateinventory/${paymentId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
            });
          } catch (error) {
            console.error('Error:', error.message);
          }

    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (paymentData && paymentData.status_code === 2 && paymentData.sv) {
        sendUpdatetoInventory(orderId)
        markPaymentCompleted(orderId); // Using orderId from state
        return <PaymentSuccess paymentId={orderId}   />;
    } else {
        return <PaymentFailure paymentData={paymentData} />;
    }
};

export default PaymentVerification;
