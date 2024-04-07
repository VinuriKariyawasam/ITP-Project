import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PendingPayments = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [alert, setAlert] = useState(null); // State for alert message

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
        body: JSON.stringify({ status: 'completed' }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark payment as completed');
      }
      // Refresh pending payments after successful update
      fetchPendingPayments();
      setAlert('Payment marked as completed successfully'); // Set alert message
    } catch (error) {
      console.error('Error marking payment as completed:', error.message);
    }
  };


  const markAsCancelled = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/finance/billing/inpersonpayment/${paymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark payment as completed');
      }
      // Refresh pending payments after successful update
      fetchPendingPayments();
      setAlert('Payment marked as cancelled.'); // Set alert message
    } catch (error) {
      console.error('Error marking payment as completed:', error.message);
    }
  };

  return (
    <>
      <Container>
        <h4 className="mb-4">Pending Payments</h4>
        {alert && <Alert variant="success" onClose={() => setAlert(null)} dismissible>{alert}</Alert>} {/* Display alert */}
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
                 <td>
  <span className={`badge ${payment.status === 'pending' ? 'bg-warning' : payment.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
    {payment.status}
  </span>
</td>
                  <td>
                    {payment.status === 'pending' && (
                      <Button variant="outline-success" onClick={() => markAsCompleted(payment.paymentInvoiceId)}>Approve</Button>
                    )}
                    { `  `}

                      {payment.status === 'pending' && (
                      <Button variant="outline-danger" onClick={() => markAsCancelled(payment.paymentInvoiceId)}>Cancel</Button>
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
