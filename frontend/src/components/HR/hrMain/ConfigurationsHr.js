import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Stack,
  Tab,
  Tabs,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateDesignationModal from "./DesignationCreateModal";

import UpdateDesignationModal from "./DesignationUpdateModal";

function Designations({ toggleLoading }) {
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  //crete modal state
  const [showModal, setShowModal] = useState(false);
  //update modal state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDesignationId, setSelectedDesignationId] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [designationToDelete, setDesignationToDelete] = useState(null);
  const [reloadDesignations, setReloadDesignations] = useState(false);
  const [key, setKey] = useState("designations");
  // Define state variables for toast message
  const [toastHeader, setToastHeader] = useState("");
  const [toastBody, setToastBody] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [nopaylogs, setNopayLogs] = useState([]);

  useEffect(() => {
    // Fetch designation records from the backend when the component mounts
    const fetchDesignations = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/designations`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDesignations(data);
        setReloadDesignations(false); // Reset reloadDesignations state
      } catch (error) {
        console.error("Error fetching designation records:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };
    fetchDesignations();
  }, [reloadDesignations]);

  // Function to delete a designation record
  const deleteDesignation = async (designationId) => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/delete-designation/${designationId}`,
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
        setDesignations(
          designations.filter(
            (designation) => designation._id !== designationId
          )
        );
        // Set toast message for success
        setToastType("success");
        setToastHeader("Success");
        setToastBody("Designation deleted successfully");
        setShowToast(true);
      } else {
        throw new Error("Failed to delete designation");
      }
    } catch (error) {
      alert("Error deleting designation"); // Show error alert
      console.error("Error deleting designation:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
      setShowDeleteConfirmationModal(false);
    }
  };

  // Update related functions
  const handleUpdateClick = (designationId) => {
    setSelectedDesignationId(designationId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setReloadDesignations(true);
  };

  // Delete confirmation modal handling
  const handleDeleteConfirmation = (designationId) => {
    setDesignationToDelete(designationId);
    setShowDeleteConfirmationModal(true);
  };

  //Create designation part
  const handleCreateNewDesignation = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //function to get no pay logs
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/allnopaylogs`
      ); // Assuming this is the route you set up
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }
      const data = await response.json();
      setNopayLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
    <section style={{ position: "relative" }}>
      {/* Toast Component */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={6000}
        autohide
        className={`bg-${toastType}`}
        style={{
          position: "fixed",
          top: "70px", // Adjust top position as needed
          right: "20px", // Adjust right position as needed
          zIndex: 9999, // Ensure it overlays other content
        }}
      >
        <Toast.Header>
          <strong className="me-auto">{toastHeader}</strong>
        </Toast.Header>
        <Toast.Body>{toastBody}</Toast.Body>
      </Toast>
      <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "25px" }}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="designations" title="Designations List">
              <Row>
                <Stack direction="horizontal">
                  <div className="p-2">
                    <Button
                      variant="dark"
                      size="md"
                      onClick={handleCreateNewDesignation}
                      style={{ margin: "10px" }}
                    >
                      Create New Designation
                    </Button>
                  </div>
                </Stack>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <div className="table">
                    <table className="table table-rounded">
                      <thead>
                        <tr>
                          <th
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            #
                          </th>
                          <th
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            Designation
                          </th>
                          <th
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            Salary
                          </th>

                          <th
                            style={{ backgroundColor: "black", color: "white" }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(designations) &&
                          designations.map((designation, index) => {
                            return (
                              <tr key={designation._id}>
                                <td>{index + 1}</td>
                                <td>{designation.position}</td>
                                <td>
                                  Rs.
                                  {designation.basicSalary
                                    ? Number(designation.basicSalary).toFixed(2)
                                    : "0.00"}
                                </td>

                                <td>
                                  <Button
                                    variant="dark"
                                    size="sm"
                                    style={{ margin: "5px" }}
                                    onClick={() =>
                                      handleUpdateClick(designation._id)
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
                                      handleDeleteConfirmation(designation._id)
                                    }
                                  >
                                    <i className="bi bi-trash"></i>{" "}
                                    {/* Delete icon */}
                                  </Button>{" "}
                                </td>
                              </tr>
                            );
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
                        Are you sure you want to delete this designation?
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
                          onClick={() => deleteDesignation(designationToDelete)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Col>
              </Row>
              {/* Create Desigantion content here */}
              <CreateDesignationModal
                showModal={showModal}
                handleClose={handleCloseModal}
                setToastHeader={setToastHeader}
                setToastBody={setToastBody}
                setShowToast={setShowToast}
                setReloadDesignations={setReloadDesignations}
                setToastType={setToastType} // or "warning", "error", etc.
                toggleLoading={toggleLoading}
              />
              {/* Update Desigantion content here */}
              {showUpdateModal && (
                <UpdateDesignationModal
                  showModal={showUpdateModal}
                  handleClose={handleCloseUpdateModal}
                  setToastHeader={setToastHeader}
                  setToastBody={setToastBody}
                  setShowToast={setShowToast}
                  setReloadDesignations={setReloadDesignations}
                  setToastType={setToastType}
                  selectedDesignationId={selectedDesignationId}
                  position={
                    designations.find((d) => d._id === selectedDesignationId)
                      ?.position
                  }
                  basicSalary={
                    designations.find((d) => d._id === selectedDesignationId)
                      ?.basicSalary
                  }
                  toggleLoading={toggleLoading}
                />
              )}
            </Tab>
            <Tab eventKey="nopaylogs" title="No Pay Logs">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Date
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Status
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Absent Without Leave
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nopaylogs.map((log, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {new Date(log.date).toLocaleDateString()}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {log.status}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        <ul
                          style={{
                            listStyleType: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {log.absentWithoutLeave.map((emp, empIndex) => (
                            <li key={empIndex}>{emp.empDBId}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Designations;
