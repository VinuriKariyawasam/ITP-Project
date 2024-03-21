import React, { useState, useEffect } from "react";
import { Button, Form, Row, Stack, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Leaves() {
  const navigate = useNavigate();
  const [leaveRecords, setLeaveRecords] = useState([]);

  useEffect(() => {
    // Fetch leave records from the backend when the component mounts
    const fetchLeaveRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/leaves");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);

        setLeaveRecords(data);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      }
    };
    fetchLeaveRecords();
  }, []);

  return (
    <section>
      <Row>
        <Stack direction="horizontal">
          <div className="p-2">
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              Create New Leave
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              Create Report
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              Archive Records
            </Button>
          </div>
        </Stack>
      </Row>

      <div className="table">
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
              <th style={{ backgroundColor: "black", color: "white" }}>
                Actions
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(leaveRecords) &&
              leaveRecords.map((record) => {
                if (record && record.status === "Pending") {
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
                      <td>{record.status}</td>
                      <td>
                        <Button variant="outline-success" size="sm">
                          Approve
                        </Button>{" "}
                        <Button variant="outline-danger" size="sm">
                          Reject
                        </Button>{" "}
                      </td>
                      <td>
                        <Button variant="dark" size="sm">
                          <i className="bi bi-pencil-square"></i>{" "}
                          {/* Update icon */}
                        </Button>{" "}
                        <Button variant="dark" size="sm">
                          <i className="bi bi-trash"></i> {/* Delete icon */}
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaves;
