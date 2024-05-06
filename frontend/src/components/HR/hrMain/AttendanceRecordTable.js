// LeaveRecordsTable.js
import React, { useEffect, useState, useContext } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import { CSVLink } from "react-csv";
import html2pdf from "html2pdf.js";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles
import { set } from "date-fns";
import { StaffAuthContext } from "../../../context/StaffAuthContext";
import logo from "../../../images/logoblack_trans.png";

const AttendanceRecordsTable = ({
  attendRecords,
  dateFilter,
  tableName,
  toggleLoading,
}) => {
  const { userId, userPosition } = useContext(StaffAuthContext);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [selectedAttendance, setSelectedAttendance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [date, setDate] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const clearDateSelection = () => {
    setSelectedDate(null);
  };

  useEffect(() => {
    const filteredData = attendRecords.filter((record) => {
      if (!selectedDate) return true; // Render all records if no date is selected
      const recordDate = new Date(record.date);
      return recordDate.toDateString() === selectedDate.toDateString();
    });

    // Calculate present and absent counts for the selected date
    let present = 0;
    let absent = 0;
    filteredData.forEach((record) => {
      record.employeeAttendance.forEach((emp) => {
        if (emp.value) present++;
        else absent++;
      });
    });
    setPresentCount(present);
    setAbsentCount(absent);

    setFilteredTableData(filteredData);
  }, [attendRecords, selectedDate]);

  //render table rows with data
  const renderTableRows = () => {
    return filteredTableData
      .filter((record) => dateFilter(record.date))
      .map((record) => {
        return (
          <tr key={record._id}>
            <td>
              <div>Date: {new Date(record.date).toLocaleDateString()}</div>
              <div>Time: {new Date(record.date).toLocaleTimeString()}</div>
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              {record.employeeAttendance.filter((emp) => emp.value).length}
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              {record.employeeAttendance.filter((emp) => !emp.value).length}
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              <Button
                onClick={() => handleShowAttendance(record.employeeAttendance)}
              >
                View
              </Button>
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              {calculateAttendancePercentage(record.employeeAttendance)}
            </td>
          </tr>
        );
      });
  };
  const calculateAttendancePercentage = (employeeAttendance) => {
    const totalCount = employeeAttendance.length;
    const presentCount = employeeAttendance.filter((emp) => emp.value).length;
    return ((presentCount / totalCount) * 100).toFixed(2) + "%";
  };

  const handleShowAttendance = (attendance) => {
    setSelectedAttendance(attendance);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  //generate CSV data
  const csvData = filteredTableData.map((record) => {
    const presentCount = record.employeeAttendance.filter(
      (emp) => emp.value
    ).length;
    const absentCount = record.employeeAttendance.length - presentCount;
    const attendanceData = record.employeeAttendance
      .map(
        (emp) => `${emp.empId}:${emp.name}: ${emp.value ? "Present" : "Absent"}`
      )
      .join("\n");

    return {
      "Date & Time": `${new Date(record.date).toLocaleDateString()} ${new Date(
        record.date
      ).toLocaleTimeString()}`,
      Presents: presentCount,
      Absents: absentCount,
      "Employee Attendance": attendanceData || "N/A",
      Percentage: (presentCount / (presentCount + absentCount)) * 100,
    };
  });

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Create an array for the table name and generated date
  const headerData = [
    { "Table Name": tableName, "Generated Date": currentDate },
  ];

  // Create an array for the column headers
  const columnHeaders = [
    {
      "Date & Time": "",
      Presents: "",
      Absents: "",
      "Employee Attendance": "",
      Percentage: "",
    },
  ];

  // Concatenate headerData, columnHeaders, and csvData
  const finalCsvData = headerData.concat(columnHeaders).concat(csvData);

  // Generate table rows dynamically based on the current state of table data
  const tableRows = filteredTableData
    .filter((record) => dateFilter(record.date))
    .map((record) => {
      const attendanceRows = record.employeeAttendance
        .map((emp) => {
          return `
          <tr>
            <td>${emp.empId}</td>
            <td>${emp.name}</td>
            <td>${emp.value ? "Present" : "Absent"}</td>
          </tr>
        `;
        })
        .join("");

      return `
        <tr>
          <td>${new Date(record.date).toLocaleDateString()}</td>
          <td>${new Date(record.date).toLocaleTimeString()}</td>
          <td>${presentCount}</td>
          <td>${absentCount}</td>
          <td>${calculateAttendancePercentage(record.employeeAttendance)}</td>
          <td>
            <table>
              <thead>
                <tr>
                  <th>EmpId</th>
                  <th>Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                ${attendanceRows}
              </tbody>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");

  // Generate PDF from the table
  const generatePDF = () => {
    const currentDate = new Date().toLocaleDateString();
    const opt = {
      margin: 1,
      filename: `attendance_records_${currentDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" }, // Set orientation to landscape
    };

    // Generate PDF content with table rows and other details
    const content = `
    <div style="margin: 5px;">
    <div >
      <h4 class="float-end font-size-15">Human Resources</h4>
      <div class="mb-4">
        <img src="${logo}" alt="Invoice Logo" width="200px" />
      </div>
      <div class="text-muted">
        <p class="mb-1"><i class="bi bi-geo-alt-fill"></i>323/1/A Main Street Battaramulla</p>
        <p class="mb-1">
        <i class="bi bi-envelope-fill me-1"></i> info@neotech.com
        </p>
        <p>
        <i class="bi bi-telephone-fill me-1"></i> 0112887998
        </p>
      </div>
      <hr/>
    </div>
      <h3 style="background-color: black; color: white; padding: 10px;">${tableName}</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: black; color: white;">
            <th style="border: 1px solid white; padding: 10px;">Date</th>
            <th style="border: 1px solid white; padding: 10px;">Time</th>
            <th style="border: 1px solid white; padding: 10px;">Presents</th>
            <th style="border: 1px solid white; padding: 10px;">Absents</th>
            <th style="border: 1px solid white; padding: 10px;">Percentage</th>
            <th style="border: 1px solid white; padding: 10px;">Employee Attendance</th>
          </tr>
        </thead>
        <tbody>
        ${tableRows}
        </tbody>
      </table>
      <p style="text-align: right; margin-top: 20px;">Authorized By: ${userPosition}</p>
        
      <p style="text-align: right; margin-top: 20px;">Generated Date: ${currentDate}</p>
      <p style="text-align: right; margin-top: 20px;">Neo Tech Motors & Services</p>
    </div>
  `;

    // Generate PDF from the content
    html2pdf().from(content).set(opt).save();
  };

  return (
    <div className="table">
      <Button variant="success" style={{ margin: "10px" }}>
        <CSVLink
          data={finalCsvData}
          filename={`${tableName}_generated_${currentDate}.csv`}
        >
          Create Report(.CSV)
        </CSVLink>
        <span
          className="bi bi-file-excel"
          style={{ marginRight: "5px" }}
        ></span>
      </Button>
      <Button
        variant="danger"
        style={{ marginLeft: "10px" }}
        onClick={generatePDF}
      >
        Create Report(.PDF)
        <span className="bi bi-file-pdf" style={{ marginRight: "5px" }}></span>
      </Button>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Date"
        />
        <Button onClick={clearDateSelection}>Clear Selection</Button>
        {/* Rest of the component JSX */}
      </div>

      <div id="attendRecordsTable" className="table">
        <h3>{tableName}</h3>
        <table className="table table-rounded">
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Date & Time
              </th>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Presents
              </th>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Absents
              </th>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Employee Attendance
              </th>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="tablebody">{renderTableRows()}</tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>EmpId</th>
                <th>Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {selectedAttendance.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.value ? "Present" : "Absent"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AttendanceRecordsTable;
