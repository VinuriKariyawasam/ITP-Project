import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Image from "react-bootstrap/Image";
import RecordUpdateModal from "./RecordUpdateModal";

function RecordDetailsModal({ show, onHide, record }) {
  //------------------------------------------
  //code snippets for  archiving records(delete)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  //for update part
  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleUpdateRecord = (updatedData) => {
    // Logic to update record data
    console.log("Updated record data:", updatedData);
  };

  const handleDeleteClick = () => {
    // Show confirmation dialog box
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
       //newline
       // Access _id from the record object
            const { _id } = record;

      // Send DELETE request to backend API
      await axios.delete(
        `http://localhost:5000/api/sm/archive-record/${_id}`
      ); // Adjust the endpoint URL accordingly
      // Close the modal
      onHide();
      // Show success dialog
      setShowSuccessDialog(true);
      // Reload the record page after deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting record:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog box
    setShowConfirmDelete(false);
  };

  //---------------------------------
  //Parts regarding rendering details
  console.log("Rendering modal with record data:", record);
  if (!record) return null;

  const {
    _id,
    vnumber,
    startDate,
    inumber,
    EndDate,
    otherDetails,
    email,
    password,
    _v,
    photo,
    documents,
    photoUrl,
    documentUrls,
  } = record;

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Record Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={6} md={4}>
              <Image
                src={photoUrl}
                rounded
                style={{ width: "150px", height: "150px" }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Vehicle Number:</strong> {vnumber}
            </Col>
            <Col xs={6} md={4}>
              <strong>Service Start Date:</strong> {formatDate(startDate)}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Invoice Number:</strong> {inumber}
            </Col>
            <Col xs={6} md={4}>
              <strong>Service End Date</strong> {formatDate(EndDate)}
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
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the RecordUpdateModal when showUpdateModal is true */}
      {showUpdateModal && (
        <RecordUpdateModal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          record={record}
          onUpdate={handleUpdateRecord}
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
        <Modal.Body>Record deleted successfully!</Modal.Body>
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

export default RecordDetailsModal;