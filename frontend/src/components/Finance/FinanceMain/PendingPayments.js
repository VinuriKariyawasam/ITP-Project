import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PendingPayments = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/finance/billing/pendingpayments');
      if (!response.ok) {
        throw new Error('Failed to fetch pending payments');
      }
      const data = await response.json();
      setPayments(data.data); // Adjusted to set only the data array
    } catch (error) {
      console.error('Error fetching pending payments:', error.message);
      //alert('Failed to fetch pending payments. Please try again later.');
    }
  };

  const handlePaymentClick = (paymentId) => {
    // navigate(`/staff/finance/payments/${paymentId}`);
  };

  return (
    <>
      <Container>
        <h4 className="mb-4">Pending Payments</h4>
        {payments.length === 0 ? (
          <p>No Pending Payments</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Customer Name</th>
                <th>Amount (Rs.)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.paymentInvoiceId}</td>
                  <td>{payment.name}</td>
                  <td>Rs.{payment.total}</td> 
                  <td>{payment.status}</td>
                  <td>
                    <button onClick={() => handlePaymentClick(payment._id)}>View Details</button> {/* Adjusted to use _id */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default PendingPayments;
