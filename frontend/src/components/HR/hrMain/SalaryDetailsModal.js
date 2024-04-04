import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function SalaryDetailsModal({ show, handleClose, id }) {
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [updatedSalary, setUpdatedSalary] = useState(null);
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
        setSalaryDetails(data);
      } catch (error) {
        console.error("Error fetching salary details:", error);
      }
    };

    fetchSalaryDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSalary((prevSalary) => ({
      ...prevSalary,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/salaries/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSalary),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the backend returns the updated salary details
      const updatedData = await response.json();
      setSalaryDetails(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hr/salaries/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      handleClose();
    } catch (error) {
      console.error("Error deleting salary:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Salary Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Employee Id:</strong> {empId}
            </Col>
            <Col xs={6} md={4}>
              <strong>Position:</strong> {position}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Name:</strong> {name}
            </Col>
          </Row>
          <br />
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Birth Date:</strong> {formatDate(birthDate)}
            </Col>
            <Col xs={6} md={4}>
              <strong>NIC:</strong> {nic}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Address:</strong> {address}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Gender:</strong> {gender}
            </Col>
            <Col xs={6} md={4}>
              <strong>Contact:</strong> {contact}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Start Date:</strong> {formatDate(startDate)}
            </Col>
            <Col xs={6} md={4}>
              <strong>Position:</strong> {position}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={8}>
              <strong>Email:</strong> {email}
            </Col>
            <Col xs={6} md={4}>
              <strong>Password:</strong> {password}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Other Details:</strong> {otherDetails}
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <strong>Documents:</strong>
              <ul>
                {documentUrls.map((docUrl) => {
                  // Extract the file name from the URL
                  const fileName = docUrl.substring(
                    docUrl.lastIndexOf("/") + 1
                  );

                  return (
                    <li key={docUrl}>
                      <a href={docUrl} target="_blank">
                        {fileName}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SalaryDetailsModal;
