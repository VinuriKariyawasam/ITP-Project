// Frontend: ReportDash.js

import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { pdf, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CompanyHeader from './CompanyHeader';
import CompanyFooter from './CompanyFooter';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const ReportDash = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const componentRef = useRef();

  const fetchReports = async () => {
    try {
      const response = await fetch("${process.env.React_App_Backend_URL}/api/sm/reports");
      if (response.ok) {
        const data = await response.json();
        setReports(data);
        setFilteredReports(data);
      } else {
        throw new Error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const filteredResults = reports.filter((report) => {
      const vehicleNumber = report.vehicleNumber.toLowerCase();
      const serviceReportId = report.serviceReportId.toLowerCase();
      const query = searchQuery.toLowerCase();

      return vehicleNumber.includes(query) || serviceReportId.includes(query);
    });

    setFilteredReports(filteredResults);
  }, [reports, searchQuery]);

  const handleCreateReport = () => {
    navigate("/staff/sm/report/add");
  };

  const handleSearch = () => {
    // Search functionality is now handled in useEffect
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const handleDownloadReport = async (mongodbId) => {
    console.log("Downloading report:", mongodbId);
    try {
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/reports/${mongodbId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }
      const report = await response.json();
  
      const blob = await pdf((
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <CompanyHeader />
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
                  <tr>
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
                </tbody>
              </Table>
              <CompanyFooter />
            </View>
          </Page>
        </Document>
      )).toBlob();
  
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mongodbId}_report.pdf`;
      a.click();
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  const handleBackButtonClick = () => {
    navigate(-1);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report._id}>
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
              <td>
                <Button 
                  variant="success" 
                  onClick={() => handleDownloadReport(report._id)} // Pass MongoDB ID
                >
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportDash;
