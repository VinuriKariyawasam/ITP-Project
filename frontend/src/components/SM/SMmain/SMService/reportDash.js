import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReportPDFGenerator from "./ReportGenerator"; // Import the new component

const ReportDash = ({toggleLoading}) => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/reports`);
      if (response.ok) {
        const data = await response.json();
        setReports(data);
        setFilteredReports(data); // Initialize filtered reports with all reports
      } else {
        throw new Error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
    finally{
      toggleLoading(false);
      }
  };

  useEffect(() => {
    // Fetch reports data from the backend
    fetchReports();
  }, []);

  const handleCreateReport = () => {
    navigate("/staff/sm/report/add"); // Navigate to AddReport component
  };

  const handleSearch = () => {
    const filteredResults = reports.filter((report) => {
      const vehicleNumber = report.vehicleNumber.toLowerCase();
      const serviceReportId = report.serviceReportId.toLowerCase();
      const query = searchQuery.toLowerCase();

      return vehicleNumber.includes(query) || serviceReportId.includes(query);
    });

    setFilteredReports(filteredResults);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Format date as MM/DD/YYYY
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="my-4">
      <Row className="mb-3">
        <Col>
          <h2>Service Reports Dashboard</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleCreateReport}>
            Create Report
          </Button>
        </Col>
      </Row>

      <Button variant="dark" onClick={handleBackButtonClick} className="mb-3">
        Back
      </Button>

      <Form className="mb-3">
        <Form.Group as={Row} controlId="searchReport">
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Search by Vehicle Number or Service Report ID"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col>
            <Button variant="info" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Vehicle Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Service Price (Rs.)</th>
            <th>Services Done</th>
            <th>Inventory Used</th>
            <th>Borrowed Items</th>
            <th>Inventory Total Price (Rs.)</th>
            <th>Test Run Done</th>
            <th>Test Run Details</th>
            <th>Service Done Technician ID</th>
            <th>Test Done Technician ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.serviceReportId}>
              <td>{report.serviceReportId}</td>
              <td>{report.vehicleNumber}</td>
              <td>{formatDate(report.selectedStartDate)}</td>
              <td>{formatDate(report.selectedEndDate)}</td>
              <td>{report.totalServicePrice}</td>
              <td>
                <ul>
                  {report.services
                    .filter((service) => service.completed)
                    .map((service) => (
                      <li key={service.id}>
                        {service.name}
                      </li>
                    ))}
                </ul>
              </td>
              <td>{report.inventoryUsed ? "Yes" : "No"}</td>
              <td>{report.borrowedItems}</td>
              <td>{report.inventoryTotalPrice}</td>
              <td>{report.testRunDone ? "Yes" : "No"}</td>
              <td>{report.testRunDetails}</td>
              <td>{report.serviceDoneTechnicianId}</td>
              <td>{report.testDoneTechnicianId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReportPDFGenerator reports={filteredReports} /> {/* Add the ReportPDFGenerator component */}
    </div>
  );
};

export default ReportDash;