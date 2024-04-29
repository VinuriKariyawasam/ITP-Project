import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Badge } from "react-bootstrap";
import PageTitle from "./PageTitle";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // Adjust locale as needed
}

function DailyReport() {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [totalCreditAmount, setTotalCreditAmount] = useState(0);
  const [totalDebitAmount, setTotalDebitAmount] = useState(0);
  const [financialStatus, setFinancialStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Fetch credit data
    fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes`)
      .then((response) => response.json())
      .then((data) => {
        setCreditData(data);
        calculateTotalCredit(data);
      })
      .catch((error) => console.error("Error fetching credit data:", error));

    // Fetch debit data
    fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses`)
      .then((response) => response.json())
      .then((data) => {
        setDebitData(data);
        calculateTotalDebit(data);
      })
      .catch((error) => console.error("Error fetching debit data:", error));
  }, []);

  const calculateTotalCredit = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalCreditAmount(total);
  };

  const calculateTotalDebit = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalDebitAmount(total);
  };

  useEffect(() => {
    // Calculate financial status (Profit or Loss)
    if (totalCreditAmount > totalDebitAmount) {
      setFinancialStatus("Profit");
    } else if (totalDebitAmount > totalCreditAmount) {
      setFinancialStatus("Loss");
    } else {
      setFinancialStatus("");
    }
  }, [totalCreditAmount, totalDebitAmount]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredCreditData = creditData.filter((credit) => {
    const creditDate = new Date(credit.date);
    return (
      (!startDate || creditDate >= new Date(startDate)) &&
      (!endDate || creditDate <= new Date(endDate))
    );
  });

  const filteredDebitData = debitData.filter((debit) => {
    const debitDate = new Date(debit.date);
    return (
      (!startDate || debitDate >= new Date(startDate)) &&
      (!endDate || debitDate <= new Date(endDate))
    );
  });

  const calculateTotalsAndStatus = (filteredCreditData, filteredDebitData) => {
    const totalCredit = filteredCreditData.reduce((acc, curr) => acc + curr.amount, 0);
    const totalDebit = filteredDebitData.reduce((acc, curr) => acc + curr.amount, 0);
    const difference = totalCredit - totalDebit;
    let status = "";
    if (difference > 0) {
      status = "Profit";
    } else if (difference < 0) {
      status = "Loss";
    }
    return { totalCredit, totalDebit, difference, status };
  };

  const { totalCredit, totalDebit, difference, status } = calculateTotalsAndStatus(
    filteredCreditData,
    filteredDebitData
  );

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Daily Financial Report</h1>
          <br />
          <Row>
            <Col>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Col>
            <Col>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Table style={{ marginBottom: "0" }}>
                <Row>
                  <Col>
                    <h3>Credits</h3>
                  </Col>
                </Row>
              </Table>
              <Table
                striped
                bordered
                hover
                style={{ marginTop: "0", background: "none" }}
              >
                <thead>
                  <tr>
                    <th>Credit ID</th>
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table style={{ marginBottom: "0" }}>
                <Row>
                  <Col style={{ textAlign: "right" }}>
                    <h3>Debits</h3>
                  </Col>
                </Row>
              </Table>
              <Table
                striped
                bordered
                hover
                style={{ marginTop: "0", background: "none" }}
              >
                <thead>
                  <tr>
                    <th>Debit ID</th>
                    <th>Date</th>
                    <th>Amount(Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDebitData.map((debit, index) => (
                    <tr key={index}>
                      <td>{debit.title}</td>
                      <td>{formatDate(debit.date)}</td>
                      <td>{debit.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={6}>
          <h4 className="text-center">
            Total Credit: Rs.{totalCredit}
          </h4>
          <h4 className="text-center">
            Total Debit: Rs.{totalDebit}
          </h4>
          <h4 className="text-center">
            Difference: Rs.{difference}
          </h4>
          <h4 className="text-center">
            Status: {status === 'Profit' ? <Badge bg="success">Profit</Badge> : <Badge bg="danger">Loss</Badge>}
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyReport;
