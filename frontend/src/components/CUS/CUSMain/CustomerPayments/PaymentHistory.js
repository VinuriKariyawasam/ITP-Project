import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { CusAuthContext } from '../../../../context/cus-authcontext';

const PaymentHistory = ({toggleLoading}) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const cusauth = useContext(CusAuthContext);

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Check if cusauth.email is defined before making the request
            if (cusauth.email) {
                // Fetch data from the provided URL
                toggleLoading(true)
                const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/paymenthistory/get/${cusauth.email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPaymentHistory(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // Any cleanup code can go here
            toggleLoading(false)
        }
    };

    fetchData();

}, [cusauth.email]);

  return (
   
      <div>
         <h1 className="text-center mb-5">Payment History</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Name</th>
              <th>Amount(Rs.)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map(payment => (
              <tr key={payment._id}>
                <td>{payment.invoice_id}</td>
                <td>{payment.name}</td>
                <td>{payment.amount}</td>
                <td>{payment.date}</td>
                <td>
                  <Button variant="primary" href={payment.url} target="_blank">
                    View Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
   
  );
};

export default PaymentHistory;
