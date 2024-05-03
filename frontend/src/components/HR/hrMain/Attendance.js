import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddAttend from "./AddAttend";
import TodayLeaves from "./TodayLeaves";
import { Row, Col, Button, Stack, Card, Badge } from "react-bootstrap";
import AttendanceRecords from "./AttendanceRecords";
import UpdateAttend from "./UpdateAttend";

function Attendance({ toggleLoading }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //to button navigates
  const navigate = useNavigate();
  const fetchAttendance = async () => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/attendance/date/${today}`
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
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, []); // Empty dependency array to run only once on component mount

  const handleOpenModal = () => {
    setShowUpdateModal(true);
  };
  const updateHandler = () => {
    setShowUpdateModal(false);
    fetchAttendance();
  };
  const handleAfterSubmit = () => {
    fetchAttendance();
  };

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
                    {/* Button to open modal */}
                    <Button
                      variant="primary"
                      onClick={handleOpenModal}
                      style={{ margin: "10px" }}
                    >
                      <i className="bi bi-pencil-square"></i>{" "}
                    </Button>
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
                    <AddAttend
                      afterSubmit={handleAfterSubmit}
                      toggleLoading={toggleLoading}
                    />
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={6}>
              <TodayLeaves toggleLoading={toggleLoading} />
            </Col>
          </Row>
          <Row>
            <AttendanceRecords toggleLoading={toggleLoading} />
          </Row>
        </Card.Body>
      </Card>
      {/* Modal for updating attendance */}
      {attendanceData.length > 0 && (
        <UpdateAttend
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
          updatedHandler={updateHandler}
          toggleLoading={toggleLoading}
        />
      )}
    </section>
  );
}

export default Attendance;
