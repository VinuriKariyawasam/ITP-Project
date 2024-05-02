import React, { useState, useEffect } from "react";
import { Card, Button, Toast, Modal } from "react-bootstrap";

function TodayLeaves({ toggleLoading }) {
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastBody, setToastBody] = useState("");
  const [toastType, setToastType] = useState("");

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
        console.log(response);
        const data = await response.json();
        console.log(data);

        setLeaveRecords(data);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchLeaveRecords();
  }, []);

  // Function to check if a given date falls within a date range
  const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
  };

  // Get today's date
  const today = new Date();

  // Check if there are any leaves for today
  const leavesForToday =
    Array.isArray(leaveRecords) &&
    leaveRecords.some(
      (record) =>
        record.status === "Approved" &&
        isDateInRange(today, new Date(record.fromDate), new Date(record.toDate))
    );
  console.log(leavesForToday);

  // Function to handle delete confirmation
  //delete confirm modal handeling
  const handleDeleteConfirmation = (recordId) => {
    setRecordToDelete(recordId);
    setShowDeleteConfirmationModal(true);
  };

  // Function to delete a leave record
  const deleteLeaveRecord = async (recordId) => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/delete-leave/${recordId}`,
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
        setToastType("success");
        setToastHeader("Success");
        setToastBody("Leave request deleted successfully");
        setShowToast(true);
      } else {
        throw new Error("Failed to delete leave record");
      }
    } catch (error) {
      alert("Error deleting leave record"); // Show error alert
      console.error("Error deleting leave record:", error);
      setToastType("error");
      setToastHeader("Error");
      setToastBody("Error deleting leave record");
      setShowToast(true);
    } finally {
      toggleLoading(false); // Set loading to false after API call
      setShowDeleteConfirmationModal(false);
    }
  };

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 90,
          right: 20,
          minWidth: 300,
          zIndex: 9999,
        }}
      >
        <Toast.Header closeButton={false} className={`bg-${toastType}`}>
          <strong className="me-auto">{toastHeader}</strong>
        </Toast.Header>
        <Toast.Body>{toastBody}</Toast.Body>
      </Toast>
      <Card>
        <Card.Header style={{ backgroundColor: "black", color: "white" }}>
          Today Leaves
        </Card.Header>
        <Card.Body
          style={{ backgroundColor: "white", border: "1px solid black" }}
        >
          {leavesForToday ? (
            <table className="table table-rounded">
              <thead style={{ backgroundColor: "lightgray" }}>
                <tr style={{ backgroundColor: "lightgray" }}>
                  <th>EmpId</th>
                  <th>Name</th>
                  <th>Date Range</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(leaveRecords) ? (
                  leaveRecords.map((record) => {
                    if (
                      record &&
                      record.status === "Approved" &&
                      isDateInRange(
                        today,
                        new Date(record.fromDate),
                        new Date(record.toDate)
                      )
                    ) {
                      return (
                        <tr key={record._id}>
                          <td>{record.empId}</td>
                          <td>{record.name}</td>
                          <td>{`${new Date(
                            record.fromDate
                          ).toLocaleDateString()} - ${new Date(
                            record.toDate
                          ).toLocaleDateString()}`}</td>
                          <td>
                            <Button
                              variant="dark"
                              size="sm"
                              style={{ margin: "5px" }}
                              onClick={() =>
                                handleDeleteConfirmation(record._id)
                              }
                            >
                              <i className="bi bi-trash"></i>{" "}
                              {/* Delete icon */}
                            </Button>{" "}
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <h4>No leave records found</h4>
                )}
              </tbody>
            </table>
          ) : (
            <h4>No leave records found</h4>
          )}
        </Card.Body>
      </Card>
      {/* Delete confirmation modal */}
      <Modal
        show={showDeleteConfirmationModal}
        onHide={() => setShowDeleteConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this approved leave?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteLeaveRecord(recordToDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodayLeaves;
