import React, { useEffect, useState, useRef } from "react";
import { Table, Container, Row, Col, Badge, Button } from "react-bootstrap";
import html2pdf from "html2pdf.js"; // Import html2pdf library
import PageTitle from "./PageTitle";
import CompanyHeader from "./CompanyHeader";
import ReactToPrint from "react-to-print"; // Import ReactToPrint
import CompanyFooter from "./CompanyFooter";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // Adjust locale as needed
}

function MonthlyReport({toggleLoading}) {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch credit data
            toggleLoading(true)
            const creditResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes`);
            if (!creditResponse.ok) {
                throw new Error('Network response was not ok for credit data');
            }
            const creditData = await creditResponse.json();
            setCreditData(creditData);

            // Fetch debit data
            const debitResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses`);
            if (!debitResponse.ok) {
                throw new Error('Network response was not ok for debit data');
            }
            const debitData = await debitResponse.json();
            setDebitData(debitData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally {
          toggleLoading(false)
        }
    };

    fetchData();

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

  const printableRef = useRef(null); // Create a ref for the printable component

  const handleDownloadPDF = () => {
    const element = document.getElementById("printable-content");
    if (!element) {
      console.error("Element with ID 'printable-content' not found");
      return;
    }
  
    const opt = {
      margin: 0.5,
      filename: 'monthly_report.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    try {
      html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <main >
      <div className="text-center mt-3" style={{marginBottom:"0"}}>
        <Button variant="primary" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>{" "}
        {/* ReactToPrint component */}
        <ReactToPrint
          trigger={() => (
            <Button variant="success">
              Print
            </Button>
          )}
          content={() => printableRef.current} // Pass the ref to the content prop
        />
      </div>

      <div>
        <br />
        <div id="printable-content" ref={printableRef}> {/* Assign the ref to the printable content */}
          <CompanyHeader />
          <Container>
            <Row>
              <Col>
                <h1 className="text-center">Monthly Financial Report</h1>
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
              </Col>
            </Row>
          </Container>
          
          <Container>
            <Row>
              <Col>
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
                <Table striped bordered hover style={{ marginTop: "0", background: "none" }}>
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
                          {filteredDebitData[index] ? filteredDebitData[index].title : ""}
                        </td>
                        <td>
                          {filteredDebitData[index]
                            ? formatDate(filteredDebitData[index].date)
                            : ""}
                        </td>
                        <td>
                          {filteredDebitData[index] ? filteredDebitData[index].amount : ""}
                        </td>
                      </tr>
                    ))}
                    {filteredDebitData.length < filteredCreditData.length &&
                      filteredCreditData
                        .slice(filteredDebitData.length)
                        .map((credit, index) => (
                          <tr key={index + filteredDebitData.length}>
                            <td>{credit.title}</td>
                            <td>{formatDate(credit.date)}</td>
                            <td>{credit.amount}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        ))}
                    {filteredCreditData.length < filteredDebitData.length &&
                      filteredDebitData
                        .slice(filteredCreditData.length)
                        .map((debit, index) => (
                          <tr key={index + filteredCreditData.length}>
                            <td></td>
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
                  Status:{" "}
                  {status === "Profit" ? (
                    <Badge bg="success">Profit</Badge>
                  ) : (
                    <Badge bg="danger">Loss</Badge>
                  )}
                </h4>
              </Col>
            </Row>
            <Row>
              <CompanyFooter/>
            </Row>
          </Container>
        </div>
      </div>
    </main>
  );
}

export default MonthlyReport;
