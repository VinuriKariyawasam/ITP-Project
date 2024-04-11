import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddAttend from "./AddAttend";
import TodayLeaves from "./TodayLeaves";
import { Row, Col, Button, Stack, Card, Badge } from "react-bootstrap";
import AttendanceRecords from "./AttendanceRecords";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  //to button navigates
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:5000/api/hr/attendance/date/${today}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setAttendanceData(data);
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendance();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <section>
      <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "15px" }}>
          <Row>
            <Col md={6}>
              {attendanceData.length > 0 ? (
                <Card>
                  <Card.Header
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Today Attendance
                  </Card.Header>
                  <Card.Body
                    style={{
                      backgroundColor: "white",
                      border: "1px solid black",
                    }}
                  >
                    <table className="table table-rounded">
                      <thead style={{ backgroundColor: "lightgray" }}>
                        <tr>
                          <th>EMPID</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceData.map((record) => (
                          <React.Fragment key={record._id}>
                            {
                              // Loop through the employeeAttendance array inside each record
                              record.employeeAttendance.map(
                                (attendanceRecord) => (
                                  <tr key={attendanceRecord._id}>
                                    <td>{attendanceRecord.empId}</td>
                                    <td>{attendanceRecord.name}</td>
                                    <td>
                                      {attendanceRecord.value ? (
                                        <Badge bg="success">Present</Badge>
                                      ) : (
                                        <Badge bg="danger">Absent</Badge>
                                      )}
                                    </td>
                                  </tr>
                                )
                              )
                            }
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              ) : (
                <Card>
                  <Card.Header
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Take Attendance
                  </Card.Header>
                  <Card.Body
                    style={{
                      backgroundColor: "white",
                      border: "1px solid black",
                    }}
                  >
                    <AddAttend />
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={6}>
              <TodayLeaves />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <AttendanceRecords />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Attendance;
