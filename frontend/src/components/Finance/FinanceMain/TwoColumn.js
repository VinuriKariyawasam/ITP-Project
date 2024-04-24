import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
import PageTitle from './PageTitle';

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
                <th>Amount</th>
                <th>Debit ID</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {creditData.map((credit, index) => (
                <tr key={index}>
                  <td>{credit.title}</td>
                  <td>{credit.amount}</td>
                  <td>{debitData[index] ? debitData[index].title : ''}</td>
                  <td>{debitData[index] ? debitData[index].amount : ''}</td>
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
