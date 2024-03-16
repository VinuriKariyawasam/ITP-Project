import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function VehicleDetailsModal({ show, onHide, vehicle }) {
  console.log("Rendering modal with vehicle data:", vehicle);
  if (!vehicle) return null;

  const {
    _id,
    vehicleNo,
    brand,
    model,
    year,
    name,
    contact,
    records,
  } = vehicle;

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Vehicle Registration Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <strong>Brand:</strong> {brand}
            </Col>
            <Col xs={6} md={4}>
              <strong>Model:</strong> {model}
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
            <strong>Year:</strong> {year}
            </Col>
            <Col xs={6} md={4}>
              <strong>Vehicle owner's name:</strong> {name}
            </Col>
          </Row>

          <Row>
            <Col>
              <strong>Vehicle No:</strong> {vehicleNo}
            </Col>
          </Row>

          <Row>

            <Col xs={6} md={4}>
              <strong>Contact:</strong> {contact}
            </Col>
          </Row>


          <Row>
            <Col>
              <strong>Records:</strong> {records}
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

export default VehicleDetailsModal;