import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function UpdateSalaryModal({ show, handleClose, salaryDetails, handleUpdate }) {
  const [updatedData, setUpdatedData] = useState({ ...salaryDetails });
  const [validationError, setValidationError] = useState("");

  // Update updatedData when salaryDetails prop changes
  useEffect(() => {
    setUpdatedData({ ...salaryDetails });
  }, [salaryDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate data before submitting
    if (
      !updatedData.basicSalary ||
      isNaN(parseFloat(updatedData.basicSalary))
    ) {
      setValidationError("Please enter a valid basic salary.");
    } else if (!updatedData.bank) {
      setValidationError("Please enter the bank name.");
    } else if (!updatedData.branch) {
      setValidationError("Please enter the branch name.");
    } else if (!updatedData.account || isNaN(parseInt(updatedData.account))) {
      setValidationError("Please enter a valid account number.");
    } else if (
      !updatedData.allowance ||
      isNaN(parseFloat(updatedData.allowance))
    ) {
      setValidationError("Please enter a valid allowance.");
    } else {
      handleUpdate(updatedData);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Salary Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicBasicSalary">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter basic salary"
              name="basicSalary"
              value={updatedData.basicSalary}
              onChange={handleInputChange}
              isInvalid={validationError && !updatedData.basicSalary}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAllowance">
            <Form.Label>Allowance</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter allowance"
              name="allowance"
              value={updatedData.allowance}
              onChange={handleInputChange}
              isInvalid={validationError && !updatedData.allowance}
            />
          </Form.Group>

          <Form.Group controlId="formBasicBank">
            <Form.Label>Bank</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bank name"
              name="bank"
              value={updatedData.bank}
              onChange={handleInputChange}
              isInvalid={validationError && !updatedData.bank}
            />
          </Form.Group>
          <Form.Group controlId="formBasicBranch">
            <Form.Label>Branch</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter branch name"
              name="branch"
              value={updatedData.branch}
              onChange={handleInputChange}
              isInvalid={validationError && !updatedData.branch}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAccount">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter account number"
              name="account"
              value={updatedData.account}
              onChange={handleInputChange}
              isInvalid={validationError && !updatedData.account}
            />
          </Form.Group>
        </Form>
        {validationError && <Alert variant="danger">{validationError}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateSalaryModal;
