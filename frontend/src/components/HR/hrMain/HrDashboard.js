import React, { useState, useEffect } from "react";
import DbCard from "./HrDbCard";
import { Row, Col, Button, Stack, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import BarChart from "../HrUtil/BarChart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function HrDashboard({ toggleLoading }) {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [todayLeavesCount, setTodayLeavesCount] = useState(0);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [salaryReload, setSalaryReload] = useState(false);
  const [totalSalary, setTotalSalary] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  // State to hold total salaries for each position
  const [positionSalaries, setPositionSalaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/employees`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const employees = data.employees;

        setEmployeesCount(employees.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
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
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/leaves`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLeaveRecords(data);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
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
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/salaries`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSalaryRecords(data);
        setSalaryReload(false);
      } catch (error) {
        console.error("Error fetching salary records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
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

  /*--salary pie chart--*/
  useEffect(() => {
    // Categorize salary records by position
    const positionMap = {};

    salaryRecords.forEach((record) => {
      if (!positionMap[record.position]) {
        positionMap[record.position] = 0;
      }
      positionMap[record.position] += record.totalSal;
    });

    // Convert positionMap to array of objects for Recharts
    const pieChartData = Object.keys(positionMap).map((position) => ({
      name: position,
      value: positionMap[position],
    }));

    setPositionSalaries(pieChartData);
  }, [salaryRecords]);

  // Function to generate random dark colors
  const generateRandomDarkColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 6) + 8]; // Start from index 8 to get darker colors
    }
    return color;
  };

  /*-----attendance data---*/
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

  //barchar
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/attendance`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setAttendanceRecords(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
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
            link="/staff/hr/employee"
          />
          <DbCard
            title="Total Leaves"
            value={todayLeavesCount}
            iconClass="bi-calendar-x"
            duration="Today"
            link="/staff/hr/leaves"
          />
          <DbCard
            title="Total Salaries"
            value={totalSalary}
            iconClass="bi-coin"
            duration="Monthly"
            link="/staff/hr/salary"
          />
        </div>
      </div>

      {attendanceData.length > 0 ? null : (
        <Row>
          <div className="d-flex align-items-center">
            <h4 style={{ marginRight: "1%" }}>
              <Badge bg="warning">Attendance</Badge>
            </h4>

            <h4 style={{ color: "blue" }}>
              Today attendance is not taken yet.Please take the attendance.
            </h4>
            <Link to="/staff/hr/attendance" style={{ marginLeft: "1%" }}>
              <Button variant="dark" size="sm">
                Take Attendance
              </Button>
            </Link>
          </div>
        </Row>
      )}

      <Row style={{ marginTop: "3%" }}>
        <Col md={6}>
          <div>
            <h3>Attendance Percentage of last 7 days</h3>
            <BarChart label={dates} usedata={percentages} />
          </div>
          <br />
          <div>
            <h4>Quick Links</h4>
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
        <Col md={6}>
          <h3>Salary Variation Among Positions</h3>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={positionSalaries}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {positionSalaries.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
      </Row>
      <Row style={{ padding: "5%" }}>
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
              <div className="d-flex align-items-center">
                <h4 style={{ marginRight: "1%" }}>
                  <Badge bg="warning">Attendance</Badge>
                </h4>

                <h4 style={{ color: "blue" }}>
                  No attendance today.Visit the attendance page to take
                  attendance.
                </h4>
                <Link to="/staff/hr/attendance" style={{ marginLeft: "1%" }}>
                  <Button variant="dark" size="sm">
                    Attendance
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        )}
      </Row>
    </section>
  );
}

export default HrDashboard;
