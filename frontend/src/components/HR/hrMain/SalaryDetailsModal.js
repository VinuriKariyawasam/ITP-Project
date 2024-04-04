import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import UpdateSalaryModal from "./SalaryUpdateModal";

function SalaryDetailsModal({ show, handleClose, id }) {
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/hr/salaries/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setSalaryDetails(data);
      } catch (error) {
        console.error("Error fetching salary details:", error);
      }
    };

    fetchSalaryDetails();
  }, [id, show]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/update-salaries/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedDetails = await response.json();
      if (!updatedDetails) {
        throw new Error("Invalid response from server");
      }
      setSalaryDetails(updatedDetails);
      setUpdateModalShow(false); // Close the update modal
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Salary Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {salaryDetails && (
          <Container>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Employee Id:</strong>
                {salaryDetails.empId}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Position:</strong> {salaryDetails.position}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Name:</strong>
                {salaryDetails.name}
              </Col>
            </Row>
            <br />
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Basic Salary:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>Rs.{salaryDetails.basicSalary.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Allowance:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>Rs.{salaryDetails.allowance.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Total Salary:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>Rs.{salaryDetails.totalSal.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Nopay deductions:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>Rs.{salaryDetails.noPay.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>EPF-8%:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>Rs.{salaryDetails.EPFE.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>ETF-3%:</strong>
              </Col>
              <Col
                xs={6}
                md={4}
                className="text-end"
                style={{ borderBottom: "1px solid black" }}
              >
                <strong>Rs.{salaryDetails.ETF.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>Net Salary:</strong>
              </Col>
              <Col
                xs={6}
                md={4}
                className="text-end"
                style={{ borderBottom: "3px double black" }}
              >
                <strong>Rs.{salaryDetails.netSal.toFixed(2)}</strong>
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col xs={12} md={8}>
                <strong>EPF-12%:</strong>
              </Col>
              <Col xs={6} md={4} className="text-end">
                <strong>Rs.{salaryDetails.EPFC.toFixed(2)}</strong>
              </Col>
            </Row>

            <br />
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Bank:</strong>
                {salaryDetails.bank}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Branch:</strong>
                {salaryDetails.branch}
              </Col>
            </Row>

            <Row style={{ marginBottom: "10px" }}>
              <Col>
                <strong>Account No:</strong>
                {salaryDetails.account}
              </Col>
            </Row>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setUpdateModalShow(true)}>
          Edit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {/* Update Salary Modal */}
      <UpdateSalaryModal
        show={updateModalShow}
        handleClose={() => setUpdateModalShow(false)}
        salaryDetails={salaryDetails}
        handleUpdate={handleUpdate}
      />
    </Modal>
  );
}

export default SalaryDetailsModal;
