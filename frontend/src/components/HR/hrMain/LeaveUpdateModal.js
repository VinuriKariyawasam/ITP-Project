import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";

const UpdateLeaveModal = ({
  show,
  handleClose,
  leaveId,
  showToast,
  toggleLoading,
}) => {
  const navigate = useNavigate();

  const [leaveData, setLeaveData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    reason: "",
    name: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [futureDateError, setFutureDateError] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/leaves/${leaveId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLeaveData({
          fromDate: new Date(data.fromDate),
          toDate: new Date(data.toDate),
          reason: data.reason,
          name: data.name,
        });
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    };

    fetchLeaveData();
  }, [leaveId]);

  const handleDateChange = (item) => {
    if (new Date(item.selection.startDate) < new Date()) {
      setFutureDateError(true);
    } else {
      setFutureDateError(false);
    }
    const { startDate, endDate } = item.selection;
    setLeaveData((prevData) => ({
      ...prevData,
      fromDate: startDate,
      toDate: endDate,
    }));
  };

  const handleReasonChange = (e) => {
    setLeaveData({
      ...leaveData,
      reason: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!leaveData.fromDate || !leaveData.toDate) {
      errors.date = "Date range is required";
    }

    if (!leaveData.reason) {
      errors.reason = "Reason is required";
    }

    if (new Date(leaveData.fromDate) < new Date()) {
      errors.date = "From date should be the same as or after the current date";
    }

    setValidationErrors(errors);
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    console.log(leaveData);
    if (Object.keys(errors).length === 0) {
      try {
        toggleLoading(true); // Set loading to true before API call
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/hr/update-leave/${leaveId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(leaveData),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Leave updated successfully");
        showToast("success", "Update Successful", "Leave updated successfully");
        navigate("/staff/hr/leaves");
        handleClose();
      } catch (error) {
        console.error("Error updating leave:", error);
      } finally {
        toggleLoading(false); // Set loading to false after API call
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Leave Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Display name as a disabled field */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={leaveData.name} disabled />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFromDate">
              <Form.Label>From Date</Form.Label>
              <br />
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: leaveData.fromDate,
                    endDate: leaveData.toDate,
                    key: "selection",
                  },
                ]}
              />
              {validationErrors.date && (
                <div className="text-danger">{validationErrors.date}</div>
              )}
              {futureDateError && (
                <div className="text-danger">
                  From date should be the same as or after the current date
                </div>
              )}
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formReason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={leaveData.reason}
              onChange={handleReasonChange}
              isInvalid={!!validationErrors.reason}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.reason}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateLeaveModal;
