import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function CreateDesignationModal({
  showModal,
  handleClose,
  setToastHeader,
  setToastBody,
  setShowToast,
  setReloadDesignations,
  setToastType,
}) {
  const [position, setPosition] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [validated, setValidated] = useState(false);

  // Reset state when showModal prop changes
  useEffect(() => {
    setPosition("");
    setBasicSalary("");
    setValidated(false);
  }, [showModal]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const response = await fetch(
          "http://localhost:5000/api/hr/add-designation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ position, basicSalary }),
          }
        );

        if (response.status === 422) {
          // Designation already exists
          setToastType("warning");
          setToastHeader("Warning");
          setToastBody("Designation already exists.");
          setShowToast(true);
        } else if (!response.ok) {
          // Other HTTP errors
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          // Success
          // Show success toast message
          setToastType("success");
          setToastHeader("Success");
          setToastBody("Designation created successfully");
          setShowToast(true);

          // Close the modal after successful submission
          handleClose();
          // Trigger reload of the parent component to fetch updated data
          setReloadDesignations(true);
        }
      } catch (error) {
        console.error("Error adding designation:", error);
        // Show warning toast message for other HTTP errors
        setToastType("warning");
        setToastHeader("Warning");
        setToastBody(error.message);
        setShowToast(true);
        console.error("Error adding designation:", error);
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Designation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a position.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="basicSalary" style={{ marginTop: "10px" }}>
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter basic salary"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a basic salary.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ margin: "10px" }}>
            Create
          </Button>
          <Button
            variant="dark"
            onClick={handleClose}
            style={{ margin: "10px" }}
          >
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateDesignationModal;
