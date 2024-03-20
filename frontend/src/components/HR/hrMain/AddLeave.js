import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
//import { DateRangePicker } from 'react-date-range';
import axios from "axios";
//import 'react-date-range/dist/styles.css'; // Main style file
//import 'react-date-range/dist/theme/default.css'; // Theme CSS file

const AddLeave = ({ show, onHide, onCreateLeave }) => {
  const [leaveData, setLeaveData] = useState({
    empId: "", // You may need to fetch or set employee ID dynamically
    name: "", // You may need to fetch or set employee name dynamically
    fromDate: new Date(),
    toDate: new Date(),
    reason: "",
    status: "Pending",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the backend when the component mounts
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hr/employees"
      ); // Adjust endpoint URL accordingly
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setLeaveData({ ...leaveData, fromDate: startDate, toDate: endDate });
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployee = employees.find(
      (emp) => emp.name === e.target.value
    );
    setLeaveData({
      ...leaveData,
      empId: selectedEmployee ? selectedEmployee.empId : "",
    });
    setLeaveData({ ...leaveData, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateLeave(leaveData);
  };

  return (
    <main>
      <Card>
        <Card.Header>Create Leave</Card.Header>
        <Card.Body style={{ padding: "20px" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group
                  controlId="formEmpName"
                  style={{ marginBottom: "15px" }}
                >
                  <Form.Label>Select Employee</Form.Label>
                  <Form.Control as="select" onChange={handleEmployeeChange}>
                    <option value="">Select Employee</option>
                    {Array.isArray(employees) &&
                      employees.map((emp, index) => (
                        <option key={index} value={emp.name}>
                          {emp.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="formReason"
                  style={{ marginBottom: "15px" }}
                >
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter reason"
                    name="reason"
                    value={leaveData.reason}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="formDateRange"
                  style={{ marginBottom: "15px" }}
                >
                  <Form.Label>Date Range</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formStatus" style={{ display: "none" }}>
              <Form.Control
                type="hidden"
                name="status"
                value={leaveData.status}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default AddLeave;
