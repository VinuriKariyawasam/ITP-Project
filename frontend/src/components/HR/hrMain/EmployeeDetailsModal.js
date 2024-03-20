import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Image from "react-bootstrap/Image";
import EmployeeUpdateModal from "./EmployeeUpdateModal";

function EmployeeDetailsModal({ show, onHide, employee, onUpdate }) {
  //------------------------------------------
  //code snippets for  archiving employees(delete)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // State for showing the update form modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // State to track whether data has been updated
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  // Helper function to check if data has been updated
  const checkDataUpdate = () => {
    // Logic to check if data has been updated
    // For demonstration purposes, we'll use a simple condition here
    setIsDataUpdated(true); // Set to true when data is updated
  };

  //for update part
  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  // Handle update employee data
  const handleUpdateEmployee = async (updatedData) => {
    // Logic to update employee data
    console.log("Updated employee data:", updatedData);
    // Call the onUpdate prop to trigger refresh in EmpDash
    onUpdate(updatedData);
  };

  // Function to refresh the modal with updated data
  const handleRefreshModal = () => {
    setIsDataUpdated(false); // Reset data updated flag
  };

  // Effect to re-render modal when data is updated
  useEffect(() => {
    if (isDataUpdated) {
      // Data has been updated, trigger re-render
      console.log("Data updated, re-rendering modal...");
    }
  }, [isDataUpdated]);

  const handleDeleteClick = () => {
    // Show confirmation dialog box
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Send DELETE request to backend API using fetch
      await fetch(`http://localhost:5000/api/hr/archive-employee/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if required
        },
        // Optionally, include credentials if necessary
        // credentials: 'include',
      });

      // Close the modal
      onHide();
      // Show success dialog
      setShowSuccessDialog(true);
      // Reload the employee page after deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog box
    setShowConfirmDelete(false);
  };

  //---------------------------------
  //Parts regarding rendering details
  console.log("Rendering modal with employee data:", employee);
  if (!employee) return null;

  const {
    _id,
    empId,
    firstName,
    lastName,
    birthDate,
    nic,
    address,
    gender,
    contact,
    startDate,
    position,
    otherDetails,
    email,
    password,
    _v,
    photo,
    documents,
    photoUrl,
    documentUrls,
  } = employee;

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={6} md={4}>
              <Image
                src={photoUrl}
                roundedCircle
                style={{ width: "200px", height: "150px" }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Employee Id:</strong> {empId}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>First Name:</strong> {firstName}
            </Col>
            <Col xs={6} md={4}>
              <strong>Last Name:</strong> {lastName}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Birth Date:</strong> {formatDate(birthDate)}
            </Col>
            <Col xs={6} md={4}>
              <strong>NIC:</strong> {nic}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Address:</strong> {address}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Gender:</strong> {gender}
            </Col>
            <Col xs={6} md={4}>
              <strong>Contact:</strong> {contact}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Start Date:</strong> {formatDate(startDate)}
            </Col>
            <Col xs={6} md={4}>
              <strong>Position:</strong> {position}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Email:</strong> {email}
            </Col>
            <Col xs={6} md={4}>
              <strong>Password:</strong> {password}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Other Details:</strong> {otherDetails}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Documents:</strong>
              <ul>
                {documentUrls.map((docUrl) => {
                  // Extract the file name from the URL
                  const fileName = docUrl.substring(
                    docUrl.lastIndexOf("/") + 1
                  );

                  return (
                    <li key={docUrl}>
                      <a href={docUrl} target="_blank">
                        {fileName}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdateClick}>
          Update
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
        <Button
          variant="success"
          onClick={() => console.log("Evaluate clicked")}
        >
          Evaluate
        </Button>
        <Button variant="dark" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>

      {/* Confirmation dialog box */}
      <Modal
        show={showConfirmDelete}
        onHide={handleCancelDelete}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the EmployeeUpdateModal when showUpdateModal is true */}
      {showUpdateModal && (
        <EmployeeUpdateModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          employee={employee}
          onUpdate={handleUpdateEmployee}
        />
      )}

      {/* Success dialog box */}
      <Modal
        show={showSuccessDialog}
        onHide={() => setShowSuccessDialog(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee deleted successfully!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessDialog(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
}

export default EmployeeDetailsModal;
