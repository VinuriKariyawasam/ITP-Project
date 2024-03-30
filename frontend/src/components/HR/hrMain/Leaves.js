import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Stack,
  Badge,
  Modal,
  Card,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeaveUpdateModal from "./LeaveUpdateModal";

function Leaves() {
  const navigate = useNavigate();
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [reloadLeaves, setReloadLeaves] = useState(false);
  const [showApproveConfirmationModal, setShowApproveConfirmationModal] =
    useState(false);
  const [showRejectConfirmationModal, setShowRejectConfirmationModal] =
    useState(false);

  const [key, setKey] = useState("pending");

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
  }, [reloadLeaves]);

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
        alert("Leave request deleted successfully"); // Show success alert
      } else {
        throw new Error("Failed to delete leave record");
      }
    } catch (error) {
      alert("Error deleting leave record"); // Show error alert
      console.error("Error deleting leave record:", error);
    }
    setShowDeleteConfirmationModal(false);
  };

  //update related things
  const handleUpdateClick = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setReloadLeaves(true);
  };

  //delete confirm modal handeling
  const handleDeleteConfirmation = (recordId) => {
    setRecordToDelete(recordId);
    setShowDeleteConfirmationModal(true);
  };

  // Function to approve a leave record
  const approveLeaveRecord = async (recordId) => {
    setSelectedLeaveId(recordId);
    setShowApproveConfirmationModal(true);
  };

  // Function to reject a leave record
  const rejectLeaveRecord = async (recordId) => {
    setSelectedLeaveId(recordId);
    setShowRejectConfirmationModal(true);
  };

  // Function to handle confirmation of approval
  const handleConfirmApprove = async () => {
    // Make API call to approve leave
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/update-leave-status/${selectedLeaveId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );
      if (response.ok) {
        // Update the status of the approved record in the local state
        setLeaveRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === selectedLeaveId
              ? { ...record, status: "Approved" }
              : record
          )
        );
      } else {
        throw new Error("Failed to approve leave record");
      }
    } catch (error) {
      alert("Error approving leave record");
      console.error("Error approving leave record:", error);
    }
    setShowApproveConfirmationModal(false);
  };

  // Function to handle confirmation of rejection
  const handleConfirmReject = async () => {
    // Make API call to reject leave
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/update-leave-status/${selectedLeaveId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Rejected" }),
        }
      );
      if (response.ok) {
        // Update the status of the rejected record in the local state
        setLeaveRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === selectedLeaveId
              ? { ...record, status: "Rejected" }
              : record
          )
        );
      } else {
        throw new Error("Failed to reject leave record");
      }
    } catch (error) {
      alert("Error rejecting leave record");
      console.error("Error rejecting leave record:", error);
    }
    setShowRejectConfirmationModal(false);
  };

  return (
    <section>
      <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "25px" }}>
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
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="pending" title="Pending Requests">
              <div className="table">
                <table className="table table-rounded">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Id
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Name
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Days
                      </th>
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
                      <th
                        style={{ backgroundColor: "black", color: "white" }}
                      ></th>
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
                              <td>
                                <Badge bg="warning" text="dark">
                                  {record.status}
                                </Badge>
                              </td>
                              <td>
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  style={{ margin: "5px" }}
                                  onClick={() => approveLeaveRecord(record._id)}
                                >
                                  Approve
                                </Button>{" "}
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  style={{ margin: "5px" }}
                                  onClick={() => rejectLeaveRecord(record._id)}
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
                      })}
                  </tbody>
                </table>
                <LeaveUpdateModal
                  show={showUpdateModal}
                  handleClose={handleCloseUpdateModal}
                  leaveId={selectedLeaveId}
                />
                {/* Delete confirmation modal */}
                <Modal
                  show={showDeleteConfirmationModal}
                  onHide={() => setShowDeleteConfirmationModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete this leave request?
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

                {/* Your component JSX */}
                {/* Approve Confirmation Modal */}
                <Modal
                  show={showApproveConfirmationModal}
                  onHide={() => setShowApproveConfirmationModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Approve Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to approve this leave request?This
                    process cannot undo.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowApproveConfirmationModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="success" onClick={handleConfirmApprove}>
                      Approve
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Reject Confirmation Modal */}
                <Modal
                  show={showRejectConfirmationModal}
                  onHide={() => setShowRejectConfirmationModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Reject Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to reject this leave request? This
                    process cannot undo.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowRejectConfirmationModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmReject}>
                      Reject
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Tab>
            <Tab eventKey="approved" title="Approved">
              <div className="table">
                <table className="table table-rounded">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Id
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Name
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Days
                      </th>
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
                  <tbody>
                    {Array.isArray(leaveRecords) &&
                      leaveRecords.map((record) => {
                        if (record && record.status === "Approved") {
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
                                <Badge bg="success">{record.status}</Badge>
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
            </Tab>
            <Tab eventKey="rejected" title="Rejected">
              <div className="table">
                <table className="table table-rounded">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Id
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Name
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Days
                      </th>
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
                  <tbody>
                    {Array.isArray(leaveRecords) &&
                      leaveRecords.map((record) => {
                        if (record && record.status === "Rejected") {
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
                                <Badge bg="danger">{record.status}</Badge>
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
            </Tab>
            <Tab eventKey="all" title="All Records">
              <div className="table">
                <table className="table table-rounded">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Id
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Name
                      </th>
                      <th style={{ backgroundColor: "black", color: "white" }}>
                        Days
                      </th>
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
                  <tbody>
                    {Array.isArray(leaveRecords) &&
                      leaveRecords.map((record) => {
                        if (
                          record &&
                          (record.status === "Rejected" ||
                            record.status === "Approved")
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
                                <Badge
                                  bg={
                                    record.status === "Approved"
                                      ? "success"
                                      : "danger"
                                  }
                                >
                                  {record.status}
                                </Badge>
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
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Leaves;
