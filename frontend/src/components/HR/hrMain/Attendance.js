import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Stack,
  Card,
} from "react-bootstrap";
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
        <Stack direction="horizontal">
          <div className="p-2">
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("weekly")}
              style={{ margin: "10px" }}
            >
              Weekly Attendance
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              Monthly Attendance
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              All Records
            </Button>
          </div>
        </Stack>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Take Attendance</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
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
                  <ol>
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
                  </ol>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Today Leaves</Card.Header>
            <Card.Body>
              <table className="table table-rounded">
                <thead style={{ backgroundColor: "lightgray" }}>
                  <tr style={{ backgroundColor: "lightgray" }}>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default Attendance;
