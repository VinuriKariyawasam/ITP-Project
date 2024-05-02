import React, { useState, useEffect } from 'react';
import { Table, Button, Tab, Tabs } from 'react-bootstrap';

const PaymentRecordPage = ({toggleLoading}) => {
  const [key, setKey] = useState('onlinePayments'); // State to manage active tab
  const [onlinePayments, setOnlinePayments] = useState([]);
  const [inPersonPayments, setInPersonPayments] = useState([]);

  useEffect(() => {
   
    const fetchOnlinePayments = async () => {
      try {
        toggleLoading(true)
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/invoices/online/all`);
        const data = await response.json();
        setOnlinePayments(data);
      } catch (error) {
        console.error('Error fetching online payments:', error.message);
      }finally {
        toggleLoading(false)
      }
    };

    const fetchInPersonPayments = async () => {
      try {
        toggleLoading(true)
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/invoices/inperson/all`);
        const data = await response.json();
        setInPersonPayments(data);
      } catch (error) {
        console.error('Error fetching in-person payments:', error.message);
      }
      finally { 
        toggleLoading(false)
      }
    };

    fetchOnlinePayments();
    fetchInPersonPayments();
  }, []);

  const handleView = (downloadURL) => {
    window.open(downloadURL);
  };

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
                  <tr key={record._id}>
                    <td>{record.paymentInvoiceId}</td>
                    <td>{record.name}</td>
                    <td>{record.date}</td>
                    <td>Rs.{record.amount.toFixed(2)}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleView(record.downloadURL)}>View</Button>
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
                  <tr key={record._id}>
                    <td>{record.paymentInvoiceId}</td>
                    <td>{record.name}</td>
                    <td>{record.date}</td>
                    <td>Rs.{record.amount.toFixed(2)}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleView(record.downloadURL)}>View</Button>
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