// LeaveRecordsTable.js
import React, { useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import html2pdf from "html2pdf.js";

const LeaveRecordsTable = ({
  leaveRecords,
  statusFilter,
  dateFilter,
  tableName,
}) => {
  const renderTableRows = () => {
    return leaveRecords.map((record) => {
      if (
        record &&
        (statusFilter === "all" || record.status === statusFilter) &&
        dateFilter(record.fromDate, record.toDate)
      ) {
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
              <Badge bg={record.status === "Approved" ? "success" : "danger"}>
                {record.status}
              </Badge>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  // Convert table data to CSV format with filtering
  const csvData = leaveRecords
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

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Add table name and generated date as the first two rows in CSV data
  csvData.unshift({ Id: tableName }, { Id: `Generated Date: ${currentDate}` });

  // Generate PDF from the table
  const generatePDF = () => {
    const currentDate = new Date().toLocaleDateString();
    const opt = {
      margin: 1,
      filename: `leave_records_${currentDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate table rows dynamically based on the current state of table data
    const tableRows = leaveRecords
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

    // Generate PDF content with table rows and other details
    const content = `
    <div style="margin: 20px;">
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
    <p style="text-align: right; margin-top: 20px;">Generated Date: ${currentDate}</p>
  </div>
    `;

    // Generate PDF from the content
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
      </div>
    </div>
  );
};

export default LeaveRecordsTable;
