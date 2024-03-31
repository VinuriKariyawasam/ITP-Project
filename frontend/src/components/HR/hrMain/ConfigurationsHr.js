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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import DesignationUpdateModal from "./DesignationUpdateModal";

function Designations() {
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDesignationId, setSelectedDesignationId] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [designationToDelete, setDesignationToDelete] = useState(null);
  const [reloadDesignations, setReloadDesignations] = useState(false);
  const [key, setKey] = useState("pending");

  useEffect(() => {
    // Fetch designation records from the backend when the component mounts
    const fetchDesignations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/hr/designations"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDesignations(data);
      } catch (error) {
        console.error("Error fetching designation records:", error);
      }
    };
    fetchDesignations();
  }, [reloadDesignations]);

  // Function to delete a designation record
  const deleteDesignation = async (designationId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/delete-designation/${designationId}`,
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
        alert("Designation deleted successfully"); // Show success alert
      } else {
        throw new Error("Failed to delete designation");
      }
    } catch (error) {
      alert("Error deleting designation"); // Show error alert
      console.error("Error deleting designation:", error);
    }
    setShowDeleteConfirmationModal(false);
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

  return (
    <section>
      <Card>
        <Card.Body style={{ backgroundColor: "white", padding: "25px" }}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="pending" title="Designations List">
              <Row>
                <Stack direction="horizontal">
                  <div className="p-2">
                    <Button
                      variant="dark"
                      size="md"
                      onClick={() => navigate("add")}
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
                                <td>Rs.{designation.basicSalary}</td>

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
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Designations;
