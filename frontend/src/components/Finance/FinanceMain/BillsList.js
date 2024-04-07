import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const BillsList = () => {
  const [bills, setBills] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchPaymentID, setSearchPaymentID] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const componentRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

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
      setBills(data.data);
    } catch (error) {
      console.error('Error fetching bills:', error.message);
    }
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchPaymentIDChange = (e) => {
    setSearchPaymentID(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const clearFilters = () => {
    setSearchName('');
    setSearchPaymentID('');
    setFilterStatus('');
    setFilterDate('');
  };

  const handleDownloadPDF = () => {
    setDownloadingPDF(true);
    const options = {
      filename: 'bills.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .set(options)
      .from(componentRef.current)
      .save()
      .then(() => {
        setDownloadingPDF(false);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const filteredBills = bills.filter((bill) => {
    return (
      (searchName === '' || bill.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchPaymentID === '' || bill.paymentInvoiceId.toLowerCase().includes(searchPaymentID.toLowerCase())) &&
      (filterStatus === '' || bill.status === filterStatus) &&
      (filterDate === '' || formatDate(bill.currentDate) === formatDate(filterDate))
    );
  });

  // Function to format date to match currentDate format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // CSV data
  const csvData = filteredBills.map((bill) => ({
    'Payment Invoice ID': bill.paymentInvoiceId,
    'Name': bill.name,
    'Created Date': bill.currentDate,
    'Total Price (Rs.)': parseFloat(bill.total).toFixed(2),
    'Payment Status': bill.status,
  }));

  return (
    <main id="main" className="main">
      <div>
      <h1 className="text-center my-4">
  All Bills
  <Button variant="primary" style={{ float: 'right' }} onClick={() => navigate('/staff/finance/billing/new')}>
    Create New Bill
  </Button>
</h1>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId="searchName">
                <Form.Control
                  type="text"
                  placeholder="Search by name..."
                  value={searchName}
                  onChange={handleSearchNameChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="searchPaymentID">
                <Form.Control
                  type="text"
                  placeholder="Search by payment ID..."
                  value={searchPaymentID}
                  onChange={handleSearchPaymentIDChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="filterStatus">
                <Form.Control as="select" value={filterStatus} onChange={handleFilterStatusChange}>
                  <option value="">Filter by Status</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="filterDate">
                <Form.Control
                  type="date"
                  value={filterDate}
                  onChange={handleFilterDateChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button variant="secondary" onClick={clearFilters}>Clear Search and Filters</Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleDownloadPDF} disabled={downloadingPDF}>
                {downloadingPDF ? 'Downloading...' : 'Download as PDF'}
              </Button>
            </Col>
            <Col>
              <Button variant="dark" onClick={handlePrint}>Print Report</Button>
            </Col>
            <Col>
              <CSVLink data={csvData} filename="bills.csv">
                <Button variant="success">Download as CSV</Button>
              </CSVLink>
            </Col>
          </Row>
        </Form>
        <br></br>
        <div ref={componentRef}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Payment Invoice ID</th>
                <th>Name</th>
                <th>Created Date</th>
                <th>Total Price (Rs.)</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.paymentInvoiceId}</td>
                  <td>{bill.name}</td>
                  <td>{bill.currentDate}</td>
                  <td>{parseFloat(bill.total).toFixed(2)}</td>
                  <td>{bill.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default BillsList;
