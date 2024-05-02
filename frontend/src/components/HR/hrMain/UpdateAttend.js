import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form, Button, Modal } from "react-bootstrap";

function UpdateAttend({
  showModal,
  setShowModal,
  updatedHandler,
  toggleLoading,
}) {
  const [attendData, setAttendData] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState({});
  console.log("Update Data:", attendData);

  useEffect(() => {
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
          setAttendData(data);
          // Set attendance date based on fetched data
          setAttendanceDate(new Date(data[0].date)); // Assuming date exists in the first record
          // Initialize attendance records based on fetched data
          const initialAttendanceRecords = {};
          data[0].employeeAttendance.forEach((record) => {
            initialAttendanceRecords[record.empDBId] = record.value;
          });
          setAttendanceRecords(initialAttendanceRecords);
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };

    fetchAttendance();
  }, []);

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

  // Inside the handleSubmit function in UpdateAttend.js
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get current date and time
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format attendance data
    const formattedAttendanceRecords = Object.entries(attendanceRecords).map(
      ([empId, value]) => ({
        empDBId: empId,
        empId: attendData[0].employeeAttendance.find(
          (record) => record.empDBId === empId
        ).empId, // Get empId from the attendData based on empDBId
        name: attendData[0].employeeAttendance.find(
          (record) => record.empDBId === empId
        ).name, // Get name from the attendData based on empDBId
        value,
      })
    );

    const formData = {
      date: attendanceDate.toISOString(),
      time: currentTime,
      employeeAttendance: formattedAttendanceRecords,
    };
    try {
      toggleLoading(true); // Set loading to true before API call

      const attendanceId = attendData.length > 0 ? attendData[0]._id : null;

      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/updateAttendance/${attendanceId}`,
        {
          method: "PATCH", // Change method to PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Attendance updated successfully!");
      updatedHandler(); // Call the updatedHandler to refresh the attendance data
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance. Please try again.");
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Attendance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              {Array.isArray(attendData) &&
                attendData[0] &&
                attendData[0].employeeAttendance &&
                attendData[0].employeeAttendance.map((record) => (
                  <li key={record.empDBId}>
                    <Form.Check
                      type="checkbox"
                      label={record.name}
                      checked={attendanceRecords[record.empDBId] || false}
                      onChange={() => handleCheckboxChange(record.empDBId)}
                    />
                    {/* Hidden input fields to store empId and name */}
                    <input
                      type="hidden"
                      name={`empId[${record.empDBId}]`}
                      value={record.empId}
                    />
                    <input
                      type="hidden"
                      name={`name[${record.empDBId}]`}
                      value={record.name}
                    />
                  </li>
                ))}
            </ol>
          </Form.Group>
          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAttend;
