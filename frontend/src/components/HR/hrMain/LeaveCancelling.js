import React, { useEffect, useState } from "react";
import { Button, Badge, Modal } from "react-bootstrap";

function LeaveCancelling({ toggleLoading }) {
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

  // Function to check if a date is tomorrow or later
  const isTomorrowOrLater = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set tomorrow's date
    return new Date(date) >= tomorrow;
  };

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
      setShowDeleteConfirmationModal(false);
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
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
            <th style={{ backgroundColor: "black", color: "white" }}>Reason</th>
            <th style={{ backgroundColor: "black", color: "white" }}>Status</th>
            <th style={{ backgroundColor: "black", color: "white" }}>
              Actions
            </th>
            <th style={{ backgroundColor: "black", color: "white" }}></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaveRecords) &&
            leaveRecords.map((record) => {
              if (
                record &&
                record.status === "Approved" &&
                isTomorrowOrLater(record.fromDate)
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
                      <Badge bg="success" text="dark">
                        {record.status}
                      </Badge>
                    </td>

                    <td>
                      <Button
                        variant="dark"
                        size="sm"
                        style={{ margin: "5px" }}
                        onClick={() => handleDeleteConfirmation(record._id)}
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
    </div>
  );
}

export default LeaveCancelling;
