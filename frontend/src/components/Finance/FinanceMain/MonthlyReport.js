import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Badge } from "react-bootstrap";
import PageTitle from "./PageTitle";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // Adjust locale as needed
}

function MonthlyReport() {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    // Fetch credit data
    fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes`)
      .then((response) => response.json())
      .then((data) => {
        setCreditData(data);
      })
      .catch((error) => console.error("Error fetching credit data:", error));

    // Fetch debit data
    fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses`)
      .then((response) => response.json())
      .then((data) => {
        setDebitData(data);
      })
      .catch((error) => console.error("Error fetching debit data:", error));
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredCreditData = creditData.filter((credit) => {
    const creditDate = new Date(credit.date);
    return (
      (!selectedMonth || creditDate.getMonth() + 1 === parseInt(selectedMonth)) &&
      (!selectedYear || creditDate.getFullYear() === parseInt(selectedYear))
    );
  });

  const filteredDebitData = debitData.filter((debit) => {
    const debitDate = new Date(debit.date);
    return (
      (!selectedMonth || debitDate.getMonth() + 1 === parseInt(selectedMonth)) &&
      (!selectedYear || debitDate.getFullYear() === parseInt(selectedYear))
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
          <h1 className="text-center">Monthly Financial Reports</h1>
          <br />
          <Row>
            <Col>
              <label>Select Month:</label>
              <select value={selectedMonth} onChange={handleMonthChange}>
                <option value="">All Months</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <label>Select Year:</label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <br />
          <br />
          <Table style={{ marginBottom: "0" }}>
            <Row>
              <Col>
                <h3>Credits</h3>
              </Col>
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
                  <td>
                    {filteredDebitData[index]
                      ? filteredDebitData[index].title
                      : ""}
                  </td>
                  <td>
                    {filteredDebitData[index]
                      ? formatDate(filteredDebitData[index].date)
                      : ""}
                  </td>
                  <td>
                    {filteredDebitData[index]
                      ? filteredDebitData[index].amount
                      : ""}
                  </td>
                </tr>
              ))}
              {/* Render additional credit rows if there are more credit entries */}
              {filteredDebitData.length < filteredCreditData.length &&
                filteredCreditData
                  .slice(filteredDebitData.length)
                  .map((credit, index) => (
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
              {filteredCreditData.length < filteredDebitData.length &&
                filteredDebitData
                  .slice(filteredCreditData.length)
                  .map((debit, index) => (
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
      <Row className="justify-content-center mt-3">
        <Col xs={6}>
          <h4 className="text-center">Total Credit: Rs.{totalCredit}</h4>
          <h4 className="text-center">Total Debit: Rs.{totalDebit}</h4>
          <h4 className="text-center">Difference: Rs.{difference}</h4>
          <h4 className="text-center">
            Status: {status === "Profit" ? <Badge bg="success">Profit</Badge> : <Badge bg="danger">Loss</Badge>}
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default MonthlyReport;
