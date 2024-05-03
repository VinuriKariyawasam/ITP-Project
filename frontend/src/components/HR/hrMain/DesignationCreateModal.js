import React, { useState, useEffect } from "react";
import { Button, Modal, Form, FormControl, InputGroup } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

function CreateDesignationModal({
  showModal,
  handleClose,
  setToastHeader,
  setToastBody,
  setShowToast,
  setReloadDesignations,
  setToastType,
  toggleLoading,
}) {
  const [position, setPosition] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [validated, setValidated] = useState(false);
  const [positionValid, setPositionValid] = useState(false);
  const [basicSalaryValid, setBasicSalaryValid] = useState(false);
  const [positionTouched, setPositionTouched] = useState(false);
  const [basicSalaryTouched, setBasicSalaryTouched] = useState(false);

  // Reset state when showModal prop changes
  useEffect(() => {
    setPosition("");
    setBasicSalary("");
    setValidated(false);
    setPositionValid(false);
    setBasicSalaryValid(false);
    setPositionTouched(false);
    setBasicSalaryTouched(false);
  }, [showModal]);

  // Validate position field onBlur
  const handlePositionBlur = () => {
    setPositionTouched(true);
    setPositionValid(position.trim() !== "");
  };

  // Validate basicSalary field onBlur
  const handleBasicSalaryBlur = () => {
    setBasicSalaryTouched(true);
    const isValid = basicSalary.trim() !== "" && parseFloat(basicSalary) !== 0; // Check if the value is not empty and not zero
    setBasicSalaryValid(basicSalary.trim() !== "");
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || !positionValid || !basicSalaryValid) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/add-designation`,
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
      } finally {
        toggleLoading(false); // Set loading to false after API call
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
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Enter position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                onBlur={handlePositionBlur}
                isInvalid={!positionValid && positionTouched}
                required
              />
              <InputGroup.Text>
                {positionValid ? (
                  <BsCheckCircle style={{ color: "green" }} />
                ) : (
                  <BsXCircle style={{ color: "red" }} />
                )}
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a position.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="basicSalary" style={{ marginTop: "10px" }}>
            <Form.Label>Basic Salary</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                placeholder="Enter basic salary"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                onBlur={handleBasicSalaryBlur}
                isInvalid={!basicSalaryValid && basicSalaryTouched}
                required
                min="16000.00"
                step="0.01"
              />
              <InputGroup.Text>
                {basicSalaryValid ? (
                  <BsCheckCircle style={{ color: "green" }} />
                ) : (
                  <BsXCircle style={{ color: "red" }} />
                )}
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid basic salary.*Minimum wage Rs.16,000.00
              </Form.Control.Feedback>
            </InputGroup>
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
