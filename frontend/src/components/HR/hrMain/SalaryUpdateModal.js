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

  const isValidNumber = (value) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(value);
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
            <Form.Label>Basic Salary(Rs.)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter basic salary"
              name="basicSalary"
              value={updatedData.basicSalary}
              onChange={(e) => {
                if (isValidNumber(e.target.value)) {
                  handleInputChange(e);
                }
              }}
              isInvalid={
                validationError && !isValidNumber(updatedData.basicSalary)
              }
              isValid={
                updatedData.basicSalary &&
                !validationError &&
                isValidNumber(updatedData.basicSalary)
              }
            />
            {updatedData.basicSalary && !validationError && (
              <i className="bi bi-check-circle-fill text-success"></i>
            )}
            <Form.Control.Feedback type="invalid">
              Enter a valid positive float number with up to two decimal places.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicAllowance">
            <Form.Label>Allowance(Rs.)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter allowance"
              name="allowance"
              value={updatedData.allowance}
              onChange={(e) => {
                if (isValidNumber(e.target.value)) {
                  handleInputChange(e);
                }
              }}
              isInvalid={
                validationError && !isValidNumber(updatedData.allowance)
              }
              isValid={
                updatedData.allowance &&
                !validationError &&
                isValidNumber(updatedData.allowance)
              }
            />
            {updatedData.basicSalary &&
              !validationError &&
              isValidNumber(updatedData.basicSalary) && (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}
            <Form.Control.Feedback type="invalid">
              Enter a valid positive float number with up to two decimal places.
            </Form.Control.Feedback>
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
              isValid={updatedData.bank && !validationError}
            />
            {updatedData.bank && !validationError && (
              <i className="bi bi-check-circle-fill text-success"></i>
            )}
            <Form.Control.Feedback type="invalid">
              Enter a valid bank name with a minimum length of 3 characters and
              only letters.
            </Form.Control.Feedback>
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
              isValid={updatedData.branch && !validationError}
            />
            {updatedData.allowance &&
              !validationError &&
              isValidNumber(updatedData.allowance) && (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}
            <Form.Control.Feedback type="invalid">
              Enter a valid branch name with a minimum length of 3 characters
              and only letters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicAccount">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter account number"
              name="account"
              value={updatedData.account}
              onChange={(e) => {
                const { value } = e.target;
                // Truncate the input value if it exceeds the maximum length
                const truncatedValue = value.slice(0, 15);
                setUpdatedData({ ...updatedData, account: truncatedValue });
              }}
              isInvalid={
                validationError &&
                (!updatedData.account || updatedData.account.length < 6)
              }
              isValid={
                updatedData.account &&
                updatedData.account.length >= 6 &&
                updatedData.account.length <= 15 &&
                !validationError
              }
            />
            {/* Display green tick icon if the input is valid */}
            {updatedData.account &&
              updatedData.account.length >= 6 &&
              updatedData.account.length <= 15 &&
              !validationError && (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}
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
