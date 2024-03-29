import React, { useState, useEffect } from "react";
import { Button, Form, Row, Stack, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeaveUpdateModal from "./LeaveUpdateModal";

function Leaves() {
  const navigate = useNavigate();
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

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

  // Function to delete a leave record
  const deleteLeaveRecord = async (recordId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/delete-leave/${recordId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
        }
      );
      if (response.ok) {
        // Remove the deleted record from the local state
        setLeaveRecords(
          leaveRecords.filter((record) => record._id !== recordId)
        );
        window.alert("Leave request deleted successfully");
        console.log("Leave record deleted successfully");
      } else {
        throw new Error("Failed to delete leave record");
      }
    } catch (error) {
      window.alert("Error deleting leave record");
      console.error("Error deleting leave record:", error);
    }
  };

  //update related things
  const handleUpdateClick = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateSubmit = (e, updatedLeave) => {
    e.preventDefault();
    // Handle the submission of updated leave data
    console.log("Updated leave data:", updatedLeave);
    // Close the modal
    setShowUpdateModal(false);
  };

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
                        <Button
                          variant="outline-success"
                          size="sm"
                          style={{ margin: "5px" }}
                        >
                          Approve
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{ margin: "5px" }}
                        >
                          Reject
                        </Button>{" "}
                      </td>
                      <td>
                        <Button
                          variant="dark"
                          size="sm"
                          style={{ margin: "5px" }}
                          onClick={() => handleUpdateClick(record._id)}
                        >
                          <i className="bi bi-pencil-square"></i>{" "}
                          {/* Update icon */}
                        </Button>{" "}
                        <Button
                          variant="dark"
                          size="sm"
                          style={{ margin: "5px" }}
                          onClick={() => deleteLeaveRecord(record._id)}
                        >
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
        <LeaveUpdateModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          leaveId={selectedLeaveId}
          handleSubmit={handleUpdateSubmit}
        />
      </div>
    </section>
  );
}

export default Leaves;
