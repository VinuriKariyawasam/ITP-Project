import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateReviewModal = ({
  show,
  handleClose,
  handleSubmit,
  empId,
  empDBId,
  name,
  toggleLoading,
}) => {
  const initialFormData = {
    empId: empId || "",
    empDBId: empDBId || "",
    type: "",
    review: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/reviews/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create review");
      }
      const data = await response.json();
      console.log("Review created:", data);
      //handleClose(); // Close the modal after successful submission
      handleSubmit();
    } catch (error) {
      console.error("Error creating review:", error.message);
    } finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  useEffect(() => {
    // Reset form data when modal is opened or empId/empDBId/name props change
    setFormData(initialFormData);
  }, [show, empId, empDBId, name]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Evaluate </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Add review about {name.firstName} {name.lastName} to evaluate
        </h5>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="empId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              required
              readOnly={!!empId} // Make the input readonly if empId is passed as prop
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="review">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea" // Use textarea instead of input
              rows={4} // Set the number of visible rows
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" style={{ margin: "20px" }}>
            Create Review
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateReviewModal;
