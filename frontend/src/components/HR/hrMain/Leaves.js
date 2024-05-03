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
  Toast,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeaveUpdateModal from "./LeaveUpdateModal";
import LeaveRecordsTable from "./LeaveRecordTable";
import TodayLeaves from "./TodayLeaves";
import LeaveCancelling from "./LeaveCancelling";
import HRConfirmModal from "./HRConfirmModal";

function Leaves({ toggleLoading }) {
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
  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastBody, setToastBody] = useState("");
  const [toastType, setToastType] = useState("");
  const [showArchiveConfirmationModal, setShowArchiveConfirmationModal] =
    useState(false);
  const [archiveLeaveRecords, setarchiveLeaveRecords] = useState([]);
  const [key, setKey] = useState("pending");
  const [showArchiveTab, setShowArchiveTab] = useState(false);

  // Function to toggle the archive tab
  const toggleArchiveTab = () => {
    setShowArchiveTab(!showArchiveTab);
  };

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
        setReloadLeaves(false);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchLeaveRecords();
  }, [reloadLeaves]);

  useEffect(() => {
    // Fetch leave records from the backend when the component mounts
    const fetchArchiveLeaveRecords = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/getall-archive-leaves`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);

        setarchiveLeaveRecords(data);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchArchiveLeaveRecords();
  }, []);

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
        setToastType("error");
        setToastHeader("Error");
        setToastBody("Error deleting leave record");
        setShowToast(true);
      }
    } catch (error) {
      alert("Error deleting leave record"); // Show error alert
      console.error("Error deleting leave record:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
      setShowDeleteConfirmationModal(false);
    }
  };

  //update related things
  const handleUpdateClick = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setShowUpdateModal(true);
  };
  // Function to show toast notification
  const showToastNotification = (type, header, body) => {
    setToastType(type);
    setToastHeader(header);
    setToastBody(body);
    setShowToast(true);
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
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/update-leave-status/${selectedLeaveId}`,
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
        setToastType("success");
        setToastHeader("Success");
        setToastBody("Leave request approved successfully");
        setShowToast(true);
      } else {
        throw new Error("Failed to approve leave record");
      }
    } catch (error) {
      console.error("Error approving leave record:", error);
      setToastType("error");
      setToastHeader("Error");
      setToastBody("Error approving leave record");
      setShowToast(true);
    } finally {
      toggleLoading(false); // Set loading to false after API call
      setShowApproveConfirmationModal(false);
    }
  };

  // Function to handle confirmation of rejection
  const handleConfirmReject = async () => {
    // Make API call to reject leave
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/update-leave-status/${selectedLeaveId}`,
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
        setToastType("success");
        setToastHeader("Success");
        setToastBody("Leave request rejected successfully");
        setShowToast(true);
      } else {
        throw new Error("Failed to reject leave record");
      }
    } catch (error) {
      setToastType("error");
      setToastHeader("Error");
      setToastBody("Error rejecting leave record");
      setShowToast(true);
      console.error("Error rejecting leave record:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
      setShowRejectConfirmationModal(false);
    }
  };

  // Function to check if a date range falls within the current week
  const isWithinThisWeek = (fromDate, toDate) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Get the starting date of the current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Get the ending date of the current week (Saturday)

    fromDate = new Date(fromDate);
    toDate = new Date(toDate);

    return fromDate >= startOfWeek && toDate <= endOfWeek;
  };
  // Function to get the week range
  const getWeekRange = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const lastDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    return `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}`;
  };

  // Function to check if a date range falls within the current month
  const isWithinThisMonth = (fromDate, toDate) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Get the starting date of the current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Get the ending date of the current month

    fromDate = new Date(fromDate);
    toDate = new Date(toDate);

    return fromDate >= startOfMonth && toDate <= endOfMonth;
  };
  // Function to get the month and year
  const getMonthYear = () => {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    return `${month} ${year}`;
  };

  //Archive records
  // Function to handle a leave records
  const archiveLeaveRecord = async (recordId) => {
    setShowArchiveConfirmationModal(true);
  };

  const handleArchiveLeaves = async () => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/archive-leaves`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to archive leaves");
      }

      const data = await response.json();
      console.log(data); // Log the response from the backend
      // Optionally, display a success message to the user
      setShowArchiveConfirmationModal(false);
      setToastType("success");
      setToastHeader("Success");
      setToastBody("Leave records archived succesfully successfully");
      setShowToast(true);
    } catch (error) {
      console.error("Error archiving leaves:", error.message);
      // Optionally, display an error message to the user
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
    <section>
      {/* Toast Notification */}
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
        <Card.Body style={{ backgroundColor: "white", padding: "25px" }}>
          <Row>
            <Col md={6}>
              <TodayLeaves
                leaveRecords={leaveRecords}
                toggleLoading={toggleLoading}
              />
            </Col>
          </Row>
          <hr></hr>
          <Row className="justify-content-between">
            <Col xs={6}>
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
                    onClick={archiveLeaveRecord}
                    style={{ margin: "10px" }}
                  >
                    Archive Old Records
                  </Button>
                </div>
              </Stack>
            </Col>
            <Col xs={6}>
              <div className="text-end">
                <Button
                  variant="dark"
                  size="md"
                  onClick={toggleArchiveTab}
                  style={{ margin: "10px" }}
                  id="archiveButton"
                >
                  <i className="bi bi-archive-fill archiveButton"></i>
                </Button>
              </div>
            </Col>
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
                    {Array.isArray(leaveRecords) ? (
                      leaveRecords.filter(
                        (record) => record && record.status === "Pending"
                      ).length > 0 ? (
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
                                    onClick={() =>
                                      approveLeaveRecord(record._id)
                                    }
                                  >
                                    Approve
                                  </Button>{" "}
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    style={{ margin: "5px" }}
                                    onClick={() =>
                                      rejectLeaveRecord(record._id)
                                    }
                                  >
                                    Reject
                                  </Button>{" "}
                                </td>
                                <td>
                                  <Button
                                    variant="dark"
                                    size="sm"
                                    style={{ margin: "5px" }}
                                    onClick={() =>
                                      handleUpdateClick(record._id)
                                    }
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
                        })
                      ) : (
                        <tr>
                          <td colSpan="8">No Pending Requests</td>
                        </tr>
                      )
                    ) : null}
                  </tbody>
                </table>
                <LeaveUpdateModal
                  show={showUpdateModal}
                  handleClose={handleCloseUpdateModal}
                  leaveId={selectedLeaveId}
                  showToast={showToastNotification}
                  toggleLoading={toggleLoading}
                />
                {/* Delete confirmation modal */}
                <HRConfirmModal
                  show={showDeleteConfirmationModal}
                  onHide={() => setShowDeleteConfirmationModal(false)}
                  title="Delete Confirmation"
                  message="Are you sure you want to delete this leave request? This process cannot be undone."
                  onConfirm={() => deleteLeaveRecord(recordToDelete)}
                  btnColor={"danger"}
                  btnName={"Delete"}
                />

                {/* Your component JSX */}
                {/* Approve Confirmation Modal */}
                <HRConfirmModal
                  show={showApproveConfirmationModal}
                  onHide={() => setShowApproveConfirmationModal(false)}
                  title="Approve Confirmation"
                  message="Are you sure you want to approve this leave request?This process cannot undo."
                  onConfirm={handleConfirmApprove}
                  btnColor={"success"}
                  btnName={"Approve"}
                />

                {/* Reject Confirmation Modal */}
                <HRConfirmModal
                  show={showRejectConfirmationModal}
                  onHide={() => setShowRejectConfirmationModal(false)}
                  title="Reject Confirmation"
                  message="Are you sure you want to reject this leave request? This process cannot undo."
                  onConfirm={handleConfirmReject}
                  btnColor={"danger"}
                  btnName={"Reject"}
                />
                {/* Archive confirmation modal */}
                <HRConfirmModal
                  show={showArchiveConfirmationModal}
                  onHide={() => setShowArchiveConfirmationModal(false)}
                  title="Archive Leaves Confirmation"
                  message="Are you sure you want to archive leave requests older than 6 months? This process cannot be undone.*Archiive process only apply for approved leaves."
                  onConfirm={handleArchiveLeaves}
                  btnColor={"warning"}
                  btnName={"Archive"}
                />
              </div>
            </Tab>
            <Tab eventKey="approved" title="Approved">
              <div className="table">
                <Tabs defaultActiveKey="all" id="approved-subtabs">
                  {/* All Records Subtab */}
                  <Tab eventKey="all" title="All Records">
                    {/* Table to display all approved records */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="Approved"
                      dateFilter={() => true}
                      tableName={`All Approved Leave Records`}
                      toggleLoading={toggleLoading}
                    />
                  </Tab>
                  {/* This Week Subtab */}
                  <Tab eventKey="thisWeek" title="This Week">
                    {/* Table to display approved records within the current week */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="Approved"
                      dateFilter={isWithinThisWeek}
                      tableName={`Approved Leave Records for ${getWeekRange()}`}
                    />
                  </Tab>
                  {/* This Month Subtab */}
                  <Tab eventKey="thisMonth" title="This Month">
                    {/* Table to display approved records within the current month */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="Approved"
                      dateFilter={isWithinThisMonth}
                      tableName={`Approved Leave Records for ${getMonthYear()}`}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="rejected" title="Rejected">
              <div className="table">
                <Tabs defaultActiveKey="all" id="rejected-subtabs">
                  {/* All Records Subtab */}
                  <Tab eventKey="all" title="All Records">
                    {/* Table to display all rejected records */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="Rejected"
                      dateFilter={() => true}
                      tableName={`All RejectedLeave Records`}
                    />
                  </Tab>
                  {/* This Week Subtab */}
                  <Tab eventKey="thisWeek" title="This Week">
                    {/* Table to display rejected records within the current week */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="Rejected"
                      dateFilter={isWithinThisWeek}
                      tableName={`Rejected Leave Records for ${getWeekRange()}`}
                    />
                  </Tab>
                  {/* This Month Subtab */}
                  <Tab eventKey="thisMonth" title="This Month">
                    {/* Table to display rejected records within the current month */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="Rejected"
                      dateFilter={isWithinThisMonth}
                      tableName={`Rejected Records for ${getMonthYear()}`}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="all" title="All Records">
              <div className="table">
                <Tabs defaultActiveKey="all" id="allrecords-subtabs">
                  {/* All Records Subtab */}
                  <Tab eventKey="all" title="All Records">
                    {/* Table to display all rejected records */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="all"
                      dateFilter={() => true}
                      tableName={`All Leave Records`}
                    />
                  </Tab>
                  {/* This Week Subtab */}
                  <Tab eventKey="thisWeek" title="This Week">
                    {/* Table to display all records within the current week */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="all"
                      dateFilter={isWithinThisWeek}
                      tableName={`All Leave Records for ${getWeekRange()}`}
                    />
                  </Tab>
                  {/* This Month Subtab */}
                  <Tab eventKey="thisMonth" title="This Month">
                    {/* Table to display all records within the current month */}
                    <LeaveRecordsTable
                      leaveRecords={leaveRecords}
                      statusFilter="all"
                      dateFilter={isWithinThisMonth}
                      tableName={`All Leave Records for ${getMonthYear()}`}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="cancelling" title="Cancel Leave">
              <LeaveCancelling toggleLoading={toggleLoading} />
            </Tab>
            {showArchiveTab && (
              <Tab eventKey="archives" title="Archives">
                <LeaveRecordsTable
                  leaveRecords={archiveLeaveRecords}
                  statusFilter="all"
                  dateFilter={() => true}
                  tableName={`Archived Leave Records`}
                />
              </Tab>
            )}
          </Tabs>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Leaves;
