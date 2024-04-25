import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
import PageTitle from './PageTitle';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US'); // Adjust locale as needed
}

function App() {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch credit data
    fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes`)
      .then(response => response.json())
      .then(data => {
        setCreditData(data);
        calculateTotalCredit(data);
      })
      .catch(error => console.error('Error fetching credit data:', error));

    // Fetch debit data
    fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses`)
      .then(response => response.json())
      .then(data => {
        setDebitData(data);
        calculateTotalDebit(data);
      })
      .catch(error => console.error('Error fetching debit data:', error));
  }, []);

  const calculateTotalCredit = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalCredit(total);
  };

  const calculateTotalDebit = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalDebit(total);
  };

  useEffect(() => {
    // Calculate status (Profit or Loss)
    if (totalCredit > totalDebit) {
      setStatus('Profit');
    } else if (totalDebit > totalCredit) {
      setStatus('Loss');
    } else {
      setStatus('');
    }
  }, [totalCredit, totalDebit]);

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Incomes & Funds" title="Incomes & Funds " />
     
      
    <Container>
      <Row>
        <Col>
          <h1>Finance Report</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Credit ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Debit ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {creditData.map((credit, index) => (
                <tr key={index}>
                  <td>{credit.title}</td>
                  <td>{formatDate(credit.date)}</td>
                  <td>{credit.amount}</td>
                  <td>{debitData[index] ? debitData[index].title : ''}</td>
                  <td>{debitData[index] ? formatDate(debitData[index].date) : ''}</td>
                  <td>{debitData[index] ? debitData[index].amount : ''}</td>
                </tr>
              ))}
              {/* Render additional credit rows if there are more credit entries */}
              {debitData.length < creditData.length && creditData.slice(debitData.length).map((credit, index) => (
                <tr key={index + debitData.length}>
                  <td>{credit.title}</td>
                  <td>{formatDate(credit.date)}</td>
                  <td>{credit.amount}</td>
                  <td></td> {/* Leave the debit fields blank */}
                  <td></td>
                  <td></td>
                </tr>
              ))}
              {/* Render additional debit rows if there are more debit entries */}
              {creditData.length < debitData.length && debitData.slice(creditData.length).map((debit, index) => (
                <tr key={index + creditData.length}>
                  <td></td> {/* Leave the credit fields blank */}
                  <td></td>
                  <td></td>
                  <td>{debit.title}</td>
                  <td>{formatDate(debit.date)}</td>
                  <td>{debit.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant={status === 'Profit' ? 'success' : 'danger'}>
            Total Credit: {totalCredit} | Total Debit: {totalDebit} | Status: {status}
          </Alert>
        </Col>
      </Row>
    </Container>
    </main>
  );
}

export default App;
