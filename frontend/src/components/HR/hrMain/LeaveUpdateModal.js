import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const UpdateLeaveModal = ({ show, handleClose, leaveId, handleSubmit }) => {
  const [leaveData, setLeaveData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    reason: "",
  });

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/hr/leaves/${leaveId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLeaveData({
          fromDate: new Date(data.fromDate),
          toDate: new Date(data.toDate),
          reason: data.reason,
        });
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, [leaveId]);

  const handleDateChange = (item) => {
    setLeaveData({
      ...leaveData,
      fromDate: item.selection.startDate,
      toDate: item.selection.endDate,
    });
  };

  const handleReasonChange = (e) => {
    setLeaveData({
      ...leaveData,
      reason: e.target.value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Leave Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, leaveData)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFromDate">
              <Form.Label>From Date</Form.Label>
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
            </Form.Group>
            <Form.Group as={Col} controlId="formToDate">
              <Form.Label>To Date</Form.Label>
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
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formReason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={leaveData.reason}
              onChange={handleReasonChange}
            />
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
