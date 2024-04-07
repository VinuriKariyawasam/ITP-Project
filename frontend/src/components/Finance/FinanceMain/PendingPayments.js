import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
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
      setPayments(data.data);
    } catch (error) {
      console.error('Error fetching pending payments:', error.message);
    }
  };

  const markAsCompleted = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/finance/billing/inpersonpayment/${paymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }), // Assuming the field name for status update is 'status'
      });
      if (!response.ok) {
        throw new Error('Failed to mark payment as completed');
      }
      // Refresh pending payments after successful update
      fetchPendingPayments();
    } catch (error) {
      console.error('Error marking payment as completed:', error.message);
    }
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
                    {payment.status === 'pending' && (
                      <Button onClick={() => markAsCompleted(payment.paymentInvoiceId)}>Mark as Completed</Button>
                    )}
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
