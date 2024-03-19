import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";

function Attendance() {
  //to button navigates
  const navigate = useNavigate();

  //to all emplyees
  const [tableData, setTableData] = useState([]);

  //attendance part
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState({});

  //to all employee details fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/employees");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setTableData(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs once on component mount

  // Handle checkbox change
  const handleCheckboxChange = (employeeId) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [employeeId]: !attendanceRecords[employeeId],
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setAttendanceDate(date);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Attendance Records:", attendanceRecords);
    // You can send attendance records to backend here for processing
  };

  return (
    <section>
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-input"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </div>
          <div className="p-2 ms-auto">
            <Button variant="dark" size="md" onClick={() => navigate("add")}>
              Create Employee
            </Button>
          </div>
        </Stack>
      </Row>

      <Row>
        <Col md={12}>
          <div>
            <h2>Attendance</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Date:</Form.Label>
                <DatePicker
                  selected={attendanceDate}
                  onChange={handleDateChange}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Employees:</Form.Label>
                <ul>
                  {tableData.map((employee) => (
                    <li key={employee._id}>
                      <Form.Check
                        type="checkbox"
                        label={employee.firstName + " " + employee.lastName}
                        checked={attendanceRecords[employee.id] || false}
                        onChange={() => handleCheckboxChange(employee.id)}
                      />
                    </li>
                  ))}
                </ul>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Attendance;
