import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function UpdateDesignationModal({
  showModal,
  handleClose,
  setToastHeader,
  setToastBody,
  setShowToast,
  setReloadDesignations,
  setToastType,
  selectedDesignationId,
  position,
  basicSalary,
  toggleLoading,
}) {
  const [designationData, setDesignationData] = useState({
    position: position || "",
    basicSalary: basicSalary || "",
  });
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignationData({
      ...designationData,
      [name]: value,
    });
  };

  // Inside handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidated(true); // Trigger validation

    // Check if form is valid
    if (event.currentTarget.checkValidity() === false) {
      return; // Exit function if form is not valid
    }
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/update-designation/${selectedDesignationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(designationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Show success toast message
      setToastType("success");
      setToastHeader("Success");
      setToastBody("Designation updated successfully");
      setShowToast(true);

      // Close the modal after successful submission
      handleClose();
      // Trigger reload of the parent component to fetch updated data
      setReloadDesignations(true);
    } catch (error) {
      console.error("Error updating designation:", error);
      // Show warning toast message for other HTTP errors
      setToastType("warning");
      setToastHeader("Warning");
      setToastBody(error.message);
      setShowToast(true);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Designation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position"
              name="position"
              value={designationData.position}
              onChange={handleInputChange}
              required
              disabled
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
              name="basicSalary"
              value={designationData.basicSalary}
              onChange={handleInputChange}
              required
              min="16000.00"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid basic salary.*Minimum wage Rs.16,000.00
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ margin: "10px" }}>
            Update
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

export default UpdateDesignationModal;
