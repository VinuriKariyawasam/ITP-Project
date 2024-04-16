import React, { useState, useEffect } from "react";
import DbCard from "./HrDbCard";
import { Row, Col, Button, Stack, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import BarChart from "../HrUtil/BarChart";

function HrDashboard() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [todayLeavesCount, setTodayLeavesCount] = useState(0);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [salaryReload, setSalaryReload] = useState(false);
  const [totalSalary, setTotalSalary] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/employees");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const employees = data.employees;

        setEmployeesCount(employees.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /*-----today leave count---*/
  // Function to check if a given date falls within a date range
  const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
  };

  useEffect(() => {
    // Fetch leave records from the backend when the component mounts
    const fetchLeaveRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/leaves");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLeaveRecords(data);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      }
    };

    fetchLeaveRecords();
  }, []);

  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Count the number of leaves for today
    const leavesForToday =
      Array.isArray(leaveRecords) &&
      leaveRecords.filter(
        (record) =>
          record.status === "Approved" &&
          isDateInRange(
            today,
            new Date(record.fromDate),
            new Date(record.toDate)
          )
      ).length;

    setTodayLeavesCount(leavesForToday);
  }, [leaveRecords]);

  /*-----total salary count---*/
  useEffect(() => {
    // Fetch salary records from the backend when the component mounts
    const fetchSalaryRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/salaries");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSalaryRecords(data);
        setSalaryReload(false);
      } catch (error) {
        console.error("Error fetching salary records:", error);
      }
    };
    fetchSalaryRecords();
  }, [salaryReload]);

  useEffect(() => {
    // Calculate total salary
    const total = salaryRecords.reduce(
      (acc, record) => acc + record.totalSal,
      0
    );
    setTotalSalary(total);
  }, [salaryRecords]);

  /*-----attendance data---*/
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
  useEffect(() => {
    fetchAttendance();
  }, []); // Empty dependency array to run only once on component mount

  //barchar
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/attendance");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setAttendanceRecords(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  // Filter the last 7 attendance records
  const last7Attendance = attendanceRecords.slice(-7);

  // Calculate percentage of attendance for each day
  const attendanceDataWithPercentage = last7Attendance.map((record) => {
    const totalAttendance = record.employeeAttendance.length;
    const presentCount = record.employeeAttendance.filter(
      (emp) => emp.value === true
    ).length;
    const percentage = (presentCount / totalAttendance) * 100;
    return {
      date: record.date,
      percentage: percentage.toFixed(2), // Round to 2 decimal places
    };
  });

  // Separate date and percentage into separate arrays
  const dates = attendanceDataWithPercentage.map((record) => {
    const dateObject = new Date(record.date);
    return dateObject.toISOString().split("T")[0];
  });
  const percentages = attendanceDataWithPercentage.map((record) =>
    parseFloat(record.percentage)
  );
  console.log(dates, percentages);

  return (
    <section>
      <div className="col">
        <div className="row">
          <DbCard
            title="Total Employees"
            value={employeesCount}
            iconClass="bi-people-fill"
          />
          <DbCard
            title="Total Leaves"
            value={todayLeavesCount}
            iconClass="bi-calendar-x"
            duration="Today"
          />
          <DbCard
            title="Total Salaries"
            value={totalSalary}
            iconClass="bi-coin"
            duration="Monthly"
          />
        </div>
      </div>
      <Row>
        <Col md={6}>
          {attendanceData.length > 0 ? (
            <Card>
              <Card.Header style={{ backgroundColor: "black", color: "white" }}>
                Today Attendance
                {/* Button to open modal */}
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
                          record.employeeAttendance.map((attendanceRecord) => (
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
                          ))
                        }
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Header style={{ backgroundColor: "black", color: "white" }}>
                Take Attendance
              </Card.Header>
              <Card.Body
                style={{
                  backgroundColor: "white",
                  border: "1px solid black",
                }}
              >
                <h5>Attendance not taken for today yet.</h5>
                <Link to="/staff/hr/attendance">
                  <button>Go to Destination</button>
                </Link>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={6}>
          <div>
            <h3>Attendance Percentage of last 7 days</h3>
            <BarChart label={dates} usedata={percentages} />
          </div>
          <br></br>
          <div>
            <h5>Quick Links</h5>
            <Stack direction="horizontal" gap={3}>
              <Link to="/staff/hr/employee">
                <Button variant="dark">Employees</Button>
              </Link>
              <Link to="/staff/hr/leaves">
                <Button variant="dark">Leaves</Button>
              </Link>
              <Link to="/staff/hr/salary">
                <Button variant="dark">Salaries</Button>
              </Link>
              <Link to="/staff/hr/attendance">
                <Button variant="dark">Attendance</Button>
              </Link>
            </Stack>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default HrDashboard;
