import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function EmployeeDetailsModal({ show, onHide, employee }) {
  console.log("Rendering modal with employee data:", employee);
  if (!employee) return null;

  const {
    _id,
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
          <Row>
            <Col xs={12} md={8}>
              <strong>First Name:</strong> {firstName}
            </Col>
            <Col xs={6} md={4}>
              <strong>Last Name:</strong> {lastName}
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
              <strong>Birth Date:</strong> {formatDate(birthDate)}
            </Col>
            <Col xs={6} md={4}>
              <strong>NIC:</strong> {nic}
            </Col>
          </Row>

          <Row>
            <Col>
              <strong>Address:</strong> {address}
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
              <strong>Gender:</strong> {gender}
            </Col>
            <Col xs={6} md={4}>
              <strong>Contact:</strong> {contact}
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
              <strong>Start Date:</strong> {formatDate(startDate)}
            </Col>
            <Col xs={6} md={4}>
              <strong>Position:</strong> {position}
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
              <strong>Email:</strong> {email}
            </Col>
            <Col xs={6} md={4}>
              <strong>Password:</strong> {password}
            </Col>
          </Row>

          <Row>
            <Col>
              <strong>Other Details:</strong> {otherDetails}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => console.log("Update clicked")}>
          Update
        </Button>
        <Button variant="danger" onClick={() => console.log("Delete clicked")}>
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
    </Modal>
  );
}

export default EmployeeDetailsModal;
