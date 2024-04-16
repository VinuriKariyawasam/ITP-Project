import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext";
import { useContext } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import FileUpload from "../CUS_CAM/CUS_CAM_util/FileUpload";

import "./StarRating.css";

function FeedbackUpdateModal({ show, onHide, feedback, onUpdate }) {
  const cusAuth = useContext(CusAuthContext);
  const id = cusAuth.userId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceType: feedback.serviceType || "",
    employee: feedback.employee || "",
    feedback: feedback.feedback || "",
    rating: feedback.rating || 0,
  });

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: formData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      
      [name]: value,
    }));
    
    console.log(formData);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/cam/feedback/update-feedback/${id}`,
        data
      );

      if (response.status === 200) {
        onUpdate(formData); // Pass updated form data to the onUpdate function
        onHide(); // Close the modal
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "32px" }}>Update FeedBack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    {...register("serviceType")}
                  >
                    <option>Choose...</option>
                    <option value="Periodical Services">Periodical Services</option>
                    <option value="Mechanical Repairs">Mechanical Repairs</option>
                    <option value="Mobile Services">Mobile Services</option>
                    <option value="Emergency Breakdowns">Emergency Breakdowns</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Service provided Employee</Form.Label>
                  <Form.Select
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                    {...register("employee")}
                  >
                    <option>Choose...</option>
                    <option value="Emp1">Emp1</option>
                    <option value="Emp2">Emp2</option>
                    <option value="Emp3">Emp3</option>
                    <option value="Emp4">Emp4</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formFileDocuments">
                  <Form.Label>Attach Files</Form.Label>
                  <FileUpload id="files" />
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formGridExtra">
                  <Form.Label>Your FeedBack</Form.Label>
                  <Form.Control
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    {...register("feedback")}
                  />
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col}>
                  <h5 className="cam-h5">Rate us!!</h5>
                  <StarRating
                    value={formData.rating}
                    onChange={(value) => setFormData({ ...formData, rating: value })}
                  />
                </Form.Group>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit">
          Update
        </Button>
        <Button variant="dark" onClick={onHide} className="mr-2">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedbackUpdateModal;
