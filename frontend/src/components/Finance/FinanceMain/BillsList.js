import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Row, Col, Button, Modal, Badge } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle';

const BillsList = ({toggleLoading}) => {
  const [bills, setBills] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchPaymentID, setSearchPaymentID] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [downloadingCSV, setDownloadingCSV] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const componentRef = useRef(null);
  const navigate = useNavigate();

  // Moved formatDate function declaration here
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      toggleLoading(true)
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/billing/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch bills');
      }
      const data = await response.json();
      setBills(data.data);
    } catch (error) {
      console.error('Error fetching bills:', error.message);
    }
    finally{
      toggleLoading(false)
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
    onBeforeGetContent: () => {
      setPrinting(true);
      setTimeout(() => {
        setPrinting(false);
      }, 1500);
    },
  });

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/billing/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete bill');
        }
        
        // Update the bills state to remove the deleted bill
        setBills(bills.filter((bill) => bill.paymentInvoiceId !== id));
        
        alert('Bill deleted successfully!');
      } catch (error) {
        console.error('Error deleting bill:', error.message);
        alert('Failed to delete bill. Please try again later.');
      }
    }
  };

  const handleViewDetails = async (bill) => {
    setSelectedBill(bill);
    try {
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/billing/${bill.paymentInvoiceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }
      const data = await response.json();
      setPaymentDetails(data);
    } catch (error) {
      console.error('Error fetching payment details:', error.message);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBill(null);
    setPaymentDetails(null);
  };

  const filteredBills = bills.filter((bill) => {
    return (
      (searchName === '' || bill.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchPaymentID === '' || bill.paymentInvoiceId.toLowerCase().includes(searchPaymentID.toLowerCase())) &&
      (filterStatus === '' || bill.status === filterStatus) &&
      (filterDate === '' || formatDate(bill.currentDate) === formatDate(filterDate))
    );
  });

  const csvData = filteredBills.map((bill) => ({
    'Payment Invoice ID': bill.paymentInvoiceId,
    'Name': bill.name,
    'Created Date': bill.currentDate,
    'Total Price (Rs.)': parseFloat(bill.total).toFixed(2),
    'Payment Status': bill.status,
  }));

  return (
    <main id="main" className="main">
      <PageTitle path="Finance /Service-Bills" title="All Bills" />
      <div>
        <h1 className="text-center my-4">Service Bills
          <Button variant="primary" style={{ float: 'right' }} onClick={() => navigate('/staff/finance/billing/new')}>
            Create New Bill
          </Button>
        </h1>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId="searchName">
                <Form.Control type="text" placeholder="Search by name..." value={searchName} onChange={handleSearchNameChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="searchPaymentID">
                <Form.Control type="text" placeholder="Search by payment ID..." value={searchPaymentID} onChange={handleSearchPaymentIDChange} />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="filterStatus">
                <Form.Control as="select" value={filterStatus} onChange={handleFilterStatusChange}>
                  <option value="">Filter by Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="filterDate">
                <Form.Control type="date" value={filterDate} onChange={handleFilterDateChange} />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button variant="secondary" onClick={clearFilters}>Clear Search and Filters</Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleDownloadPDF} disabled={downloadingPDF || printing}>
                {downloadingPDF ? 'Downloading...' : 'Download as PDF'}
              </Button>
            </Col>
            <Col>
              <Button variant="dark" onClick={handlePrint} disabled={downloadingPDF || printing}>
                Print Report
              </Button>
            </Col>
            <Col>
              <CSVLink data={csvData} filename="bills.csv" onClick={() => setDownloadingCSV(true)} onMouseLeave={() => setDownloadingCSV(false)}>
                <Button variant="success" disabled={downloadingPDF || printing}>
                  Download as CSV
                </Button>
              </CSVLink>
            </Col>
          </Row>
        </Form>
        <br />
        <div ref={componentRef}>
          <style>
            {`
              @media print {
                th:last-child,
                td:last-child {
                  display: none;
                }
              }
            `}
          </style>s
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Name</th>
                <th>Created Date</th>
                <th>Total Price (Rs.)</th>
                <th>Payment Status</th>
                {!downloadingPDF && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.paymentInvoiceId}</td>
                  <td>{bill.name}</td>
                  <td>{bill.currentDate}</td>
                  <td>{parseFloat(bill.total).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${bill.status === 'pending' ? 'bg-warning' : bill.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                      {bill.status}
                    </span>
                  </td>
                  {!downloadingPDF &&
                    <td>
                      {bill.status === 'pending' &&
                        <>
                          {/* <Button variant="dark" size="sm" onClick={() => handleEdit(bill.paymentInvoiceId)}>Edit</Button>{' '} */}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(bill.paymentInvoiceId)}>Delete</Button>{' '}
                        </>
                      }
                      <Button variant="primary" size="sm" onClick={() => handleViewDetails(bill)}>View</Button>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Bill Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBill && paymentDetails && (
              <div>
                <p><strong>Invoice ID:</strong> {selectedBill.paymentInvoiceId}</p>
                <p><strong>Service Record ID:</strong> {paymentDetails.serviceRecordId}</p>
                <p><strong>Name:</strong> {selectedBill.name}</p>
                <p><strong>Address:</strong> {selectedBill.address}</p>
                <p><strong>Email:</strong> {selectedBill.email}</p>
                <p><strong>Phone:</strong> {selectedBill.phone}</p>
                <p><strong>Parts & Accessories Price (Rs.):</strong> {selectedBill.partsPrice}</p>
                <p><strong>Parts & Accessories Discount(%):</strong> {selectedBill.partsDiscount}</p>
                <p><strong>Service & Repair Price (Rs.):</strong> {selectedBill.servicePrice}</p>
                <p><strong>Service & Repair Discount(%):</strong> {selectedBill.serviceDiscount}</p>
                <p><strong>Tax Rate (%):</strong> {selectedBill.taxRate}</p>
                <p><strong>Total (Rs.):</strong> {selectedBill.total}</p>
                <p><strong>Status:</strong> {selectedBill.status}</p>
                <p><strong> Date:</strong> {selectedBill.currentDate}</p>
                <p><strong>Time:</strong> {selectedBill.currentTime}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default BillsList;
