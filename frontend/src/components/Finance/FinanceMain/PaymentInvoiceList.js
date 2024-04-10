import React, { useState } from 'react';
import { Table, Button, Tab, Tabs } from 'react-bootstrap';

const PaymentRecordPage = () => {
  const [key, setKey] = useState('onlinePayments'); // State to manage active tab

  const handleView = (id) => {
    // Handle view action
  };

  // Sample payment records data
  const onlinePayments = [
    { id: 1, invoiceId: "INV-001", name: "John Doe", date: "2024-04-01", amount: "$100.00" },
    { id: 2, invoiceId: "INV-002", name: "Jane Smith", date: "2024-04-05", amount: "$150.00" },
    // Add more online payment records as needed
  ];

  const inPersonPayments = [
    { id: 3, invoiceId: "INV-003", name: "Alice Johnson", date: "2024-04-08", amount: "$75.00" },
    { id: 4, invoiceId: "INV-004", name: "Bob Brown", date: "2024-04-10", amount: "$200.00" },
    // Add more in-person payment records as needed
  ];

  return (
    <main id="main" className="main">
      <div>
        <h1>Payment Records</h1>
        <br />
        <Tabs id="payment-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="onlinePayments" title="Online Payments">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {onlinePayments.map(record => (
                  <tr key={record.id}>
                    <td>{record.invoiceId}</td>
                    <td>{record.name}</td>
                    <td>{record.date}</td>
                    <td>{record.amount}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleView(record.id)}>View</Button>
                      {/* Add other action buttons as needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="inPersonPayments" title="InPerson Payments">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inPersonPayments.map(record => (
                  <tr key={record.id}>
                    <td>{record.invoiceId}</td>
                    <td>{record.name}</td>
                    <td>{record.date}</td>
                    <td>{record.amount}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleView(record.id)}>View</Button>
                      {/* Add other action buttons as needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
};

export default PaymentRecordPage;
