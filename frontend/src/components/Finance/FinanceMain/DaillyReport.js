import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
import PageTitle from './PageTitle';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US'); // Adjust locale as needed
}

function DailyReport() {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredCreditData = creditData.filter(credit => {
    const creditDate = new Date(credit.date);
    return (!startDate || creditDate >= new Date(startDate)) && (!endDate || creditDate <= new Date(endDate));
  });

  const filteredDebitData = debitData.filter(debit => {
    const debitDate = new Date(debit.date);
    return (!startDate || debitDate >= new Date(startDate)) && (!endDate || debitDate <= new Date(endDate));
  });

  return (
    
      <Container>
        <Row>
          <Col>
            <h1>Financial Reports</h1>
            <br></br>
            <Row>
              <Col>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={handleStartDateChange} />
              </Col>
              <Col>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={handleEndDateChange} />
              </Col>
            </Row>
            <br></br><br></br>
            <Table style={{ marginBottom: '0' }} >
              <Row>
              <Col><h3>Credits</h3></Col>
              <Col style={{ textAlign: 'right' }}><h3>Debits</h3></Col>
              </Row>
            </Table>
            <Table striped bordered hover style={{ marginTop: '0' ,background: 'none' }}>
              <thead>
                <tr>
                  <th>Credit ID</th>
                  <th>Date</th>
                  <th>Amount(Rs.)</th>
                  <th>Debit ID</th>
                  <th>Date</th>
                  <th>Amount(Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreditData.map((credit, index) => (
                  <tr key={index}>
                    <td>{credit.title}</td>
                    <td>{formatDate(credit.date)}</td>
                    <td>{credit.amount}</td>
                    <td>{filteredDebitData[index] ? filteredDebitData[index].title : ''}</td>
                    <td>{filteredDebitData[index] ? formatDate(filteredDebitData[index].date) : ''}</td>
                    <td>{filteredDebitData[index] ? filteredDebitData[index].amount : ''}</td>
                  </tr>
                ))}
                {/* Render additional credit rows if there are more credit entries */}
                {filteredDebitData.length < filteredCreditData.length && filteredCreditData.slice(filteredDebitData.length).map((credit, index) => (
                  <tr key={index + filteredDebitData.length}>
                    <td>{credit.title}</td>
                    <td>{formatDate(credit.date)}</td>
                    <td>{credit.amount}</td>
                    <td></td> {/* Leave the debit fields blank */}
                    <td></td>
                    <td></td>
                  </tr>
                ))}
                {/* Render additional debit rows if there are more debit entries */}
                {filteredCreditData.length < filteredDebitData.length && filteredDebitData.slice(filteredCreditData.length).map((debit, index) => (
                  <tr key={index + filteredCreditData.length}>
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
   
  );
}

export default DailyReport;
