import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Stack,
  Card,
} from "react-bootstrap";

function AddAttend({ afterSubmit, toggleLoading }) {
  //to all emplyees
  const [tableData, setTableData] = useState([]);

  //attendance part
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState({});

  //to all employee details fetch
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

        setTableData(data.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get current date and time
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format attendance data
    const formattedAttendanceRecords = tableData.map((employee) => ({
      empDBId: employee._id, // Assuming empDBId is the MongoDB ID of the employee
      empId: employee.empId, // Assuming empId is a unique identifier for the employee
      name: employee.firstName + " " + employee.lastName,
      value: !!attendanceRecords[employee._id], // Convert to boolean
    }));

    const formData = {
      date: currentDate.toISOString(),
      time: currentTime,
      employeeAttendance: formattedAttendanceRecords,
    };
    console.log("Form data:", formData);
    try {
      toggleLoading(true); // Set loading to true before API call

      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/add-attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      afterSubmit();
      alert("Attendance recorded successfully!");
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert("Failed to record attendance. Please try again.");
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
      <Form.Group>
        <Form.Label>Date:</Form.Label>
        <DatePicker
          selected={attendanceDate}
          onChange={handleDateChange}
          className="form-control"
          disabled
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Employees:</Form.Label>
        <ol>
          {tableData.map((employee) => (
            <li key={employee._id}>
              <Form.Check
                type="checkbox"
                label={
                  employee.firstName +
                  " " +
                  employee.lastName +
                  " " +
                  employee.empId
                }
                checked={attendanceRecords[employee.id] || false}
                onChange={() => handleCheckboxChange(employee.id)}
              />
            </li>
          ))}
        </ol>
      </Form.Group>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddAttend;
