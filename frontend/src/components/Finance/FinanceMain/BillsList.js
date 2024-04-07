import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const BillsList = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/finance/billing/all');
      if (!response.ok) {
        throw new Error('Failed to fetch bills');
      }
      const data = await response.json();
      setBills(data.data); // Extracting 'data' array from server response
    } catch (error) {
      console.error('Error fetching bills:', error.message);
    }
  };

  return (
    <main id="main" className="main">
    <div>
      <h1 className="text-center my-4">All Bills</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Payment Invoice ID</th>
            <th>Name</th>
            <th>Total Price (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.paymentInvoiceId}</td>
              <td>{bill.name}</td>
              <td>{parseFloat(bill.total).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </main>
  );
};

export default BillsList;
