import React, { useEffect, useState, useRef } from "react";
import { Table, Container, Row, Col, Badge, Button } from "react-bootstrap";
import html2pdf from "html2pdf.js"; // Import html2pdf library
import CompanyHeader from "./CompanyHeader";
import ReactToPrint from "react-to-print"; // Import ReactToPrint
import CompanyFooter from "./CompanyFooter";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // Adjust locale as needed
}

function YearlyReport({toggleLoading}) {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
             toggleLoading(true)
            const creditResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes`);
            const creditData = await creditResponse.json();
            setCreditData(creditData);
            calculateTotalCredit(creditData);
            extractYears(creditData);

            const debitResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses`);
            const debitData = await debitResponse.json();
            setDebitData(debitData);
            calculateTotalDebit(debitData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally{
          toggleLoading(false)
        }
    };

    fetchData();

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
      setStatus("Profit");
    } else if (totalDebit > totalCredit) {
      setStatus("Loss");
    } else {
      setStatus("");
    }
  }, [totalCredit, totalDebit]);

  const extractYears = (data) => {
    const yearsArray = data.map((entry) => new Date(entry.date).getFullYear());
    const uniqueYears = Array.from(new Set(yearsArray));
    setYears(uniqueYears);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredCreditData = creditData.filter((credit) => {
    const creditYear = new Date(credit.date).getFullYear();
    return selectedYear === "" || creditYear.toString() === selectedYear;
  });

  const filteredDebitData = debitData.filter((debit) => {
    const debitYear = new Date(debit.date).getFullYear();
    return selectedYear === "" || debitYear.toString() === selectedYear;
  });

  const printableRef = useRef(null); // Create a ref for the printable component

  const handleDownloadPDF = () => {
    const element = document.getElementById("printable-content");
    if (!element) {
      console.error("Element with ID 'printable-content' not found");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: "yearly_report.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <main>
        <div className="text-center mt-3" style={{ marginBottom: "0" }}>
          <Button variant="primary" onClick={handleDownloadPDF}>
            Download as PDF
          </Button>{" "}
          {/* ReactToPrint component */}
          <ReactToPrint
            trigger={() => <Button variant="success">Print</Button>}
            content={() => printableRef.current} // Pass the ref to the content prop
          />
        </div>

        <div>
          <br />
          <div id="printable-content" ref={printableRef}>
            <CompanyHeader />
            <Container>
              <Row>
                <Col>
                  <h1 className="text-center">Yearly Financial Report</h1>
                  <br />
                  <Row>
                    <Col>
                      <label>Select Year:</label>
                      <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">All Years</option>
                        {years.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
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
                  <h4 className="text-center">Total Debit: Rs.{totalDebit}</h4>
                  <h4 className="text-center">
                    Difference: Rs.{totalCredit - totalDebit}
                  </h4>
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
    </>
  );
}

export default YearlyReport;
