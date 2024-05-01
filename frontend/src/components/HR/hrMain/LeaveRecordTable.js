import React, { useEffect, useState, useContext } from "react";
import { Badge, Button, Form, Col, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";
import html2pdf from "html2pdf.js";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import logo from "../../../images/logoblack_trans.png";
import { StaffAuthContext } from "../../../context/StaffAuthContext";

const LeaveRecordsTable = ({
  leaveRecords,
  statusFilter,
  dateFilter,
  tableName,
}) => {
  const { userId, userPosition } = useContext(StaffAuthContext);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmployeeID, setSearchEmployeeID] = useState("");
  const [searchDateRange, setSearchDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility

  useEffect(() => {
    const filteredData = leaveRecords.filter((record) => {
      const nameMatches = record.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const employeeIDMatches = record.empId
        .toLowerCase()
        .includes(searchEmployeeID.toLowerCase());

      const leaveStartDate = new Date(record.fromDate);
      const leaveEndDate = new Date(record.toDate);

      // Check if the leave date range intersects with the searched date range
      const startDateInRange =
        !searchDateRange[0].startDate ||
        leaveEndDate >= searchDateRange[0].startDate;
      const endDateInRange =
        !searchDateRange[0].endDate ||
        leaveStartDate <= searchDateRange[0].endDate;
      return (
        nameMatches && employeeIDMatches && startDateInRange && endDateInRange
      );
    });

    setFilteredTableData(filteredData);
  }, [leaveRecords, searchName, searchEmployeeID, searchDateRange]);

  const clearFilters = () => {
    setSearchName("");
    setSearchEmployeeID("");
    setSearchDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const filteredRecords = filteredTableData.filter(
    (record) =>
      record &&
      (statusFilter === "all" || record.status === statusFilter) &&
      dateFilter(record.fromDate, record.toDate)
  );

  const renderTableRows = () => {
    return filteredTableData.map((record) => {
      if (
        record &&
        (statusFilter === "all" || record.status === statusFilter) &&
        dateFilter(record.fromDate, record.toDate)
      ) {
        let badgeVariant;
        if (record.status === "Approved") {
          badgeVariant = "success";
        } else if (record.status === "Pending") {
          badgeVariant = "warning";
        } else if (record.status === "Rejected") {
          badgeVariant = "danger";
        } else {
          badgeVariant = "primary"; // Default to primary for other statuses
        }
        return (
          <tr key={record._id}>
            <td>{record.empId}</td>
            <td>{record.name}</td>
            <td>{record.days}</td>
            <td>{`${new Date(
              record.fromDate
            ).toLocaleDateString()} - ${new Date(
              record.toDate
            ).toLocaleDateString()}`}</td>
            <td>{record.reason}</td>
            <td>
              <Badge bg={badgeVariant}>{record.status}</Badge>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  const csvData = filteredTableData
    .filter((record) => {
      return (
        record &&
        (statusFilter === "all" || record.status === statusFilter) &&
        dateFilter(record.fromDate, record.toDate)
      );
    })
    .map((record) => ({
      Id: record.empId,
      Name: record.name,
      Days: record.days,
      DateRange: `${new Date(
        record.fromDate
      ).toLocaleDateString()} - ${new Date(
        record.toDate
      ).toLocaleDateString()}`,
      Reason: record.reason,
      Status: record.status,
    }));

  const currentDate = new Date().toLocaleDateString();

  csvData.unshift({ Id: tableName }, { Id: `Generated Date: ${currentDate}` });

  const generatePDF = () => {
    const currentDate = new Date().toLocaleDateString();
    const opt = {
      margin: 1,
      filename: `leave_records_${currentDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const tableRows = filteredTableData
      .filter((record) => {
        return (
          record &&
          (statusFilter === "all" || record.status === statusFilter) &&
          dateFilter(record.fromDate, record.toDate)
        );
      })
      .map((record) => {
        return `
          <tr>
            <td>${record.empId}</td>
            <td>${record.name}</td>
            <td>${record.days}</td>
            <td>${`${new Date(
              record.fromDate
            ).toLocaleDateString()} - ${new Date(
              record.toDate
            ).toLocaleDateString()}`}</td>
            <td>${record.reason}</td>
            <td>${record.status}</td>
          </tr>
        `;
      })
      .join("");

    const content = `
    <div style="margin: 20px;">
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
          <th style="border: 1px solid white; padding: 10px;">Id</th>
          <th style="border: 1px solid white; padding: 10px;">Name</th>
          <th style="border: 1px solid white; padding: 10px;">Days</th>
          <th style="border: 1px solid white; padding: 10px;">Date Range</th>
          <th style="border: 1px solid white; padding: 10px;">Reason</th>
          <th style="border: 1px solid white; padding: 10px;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <p style="text-align: right; margin-top: 20px;">Authorized By: ${userPosition}</p>
    <p style="text-align: right; margin-top: 20px;">Generated Date: ${currentDate}</p>
  </div>
    `;

    html2pdf()
      .from(content)
      .toPdf()
      .output("dataurlnewwindow")
      .save(`${tableName}_generated_${currentDate}.pdf`);
  };

  return (
    <div className="table">
      <Button variant="success" style={{ margin: "10px" }}>
        <CSVLink
          data={csvData}
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

      <br />
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by employee ID..."
            value={searchEmployeeID}
            onChange={(e) => setSearchEmployeeID(e.target.value)}
          />
        </Col>
        <Col>
          <Button
            variant="primary"
            style={{ marginLeft: "10px" }}
            onClick={toggleCalendar}
          >
            {showCalendar ? "Hide Calendar" : "Search by Date Range"}
          </Button>
          {showCalendar && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setSearchDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={searchDateRange}
            />
          )}
        </Col>
        <Col>
          <Button variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Col>
      </Row>
      <div id="leaveRecordsTable" className="table">
        <h3>{tableName}</h3>
        <table className="table table-rounded">
          <thead>
            <tr>
              <th style={{ backgroundColor: "black", color: "white" }}>Id</th>
              <th style={{ backgroundColor: "black", color: "white" }}>Name</th>
              <th style={{ backgroundColor: "black", color: "white" }}>Days</th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Date Range
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Reason
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        {filteredRecords.length === 0 && <p>No records found</p>}
      </div>
    </div>
  );
};

export default LeaveRecordsTable;
