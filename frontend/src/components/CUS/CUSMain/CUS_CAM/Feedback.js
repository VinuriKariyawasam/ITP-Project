import React from "react";
import { useState } from "react";
import axios from "axios";

import StarRating from "./StarRating";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

import "./Feedback.css";
import "./StarRating.css";
import { Navigate } from "react-router";

function Feedback() {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    serviceType: "Choose...",
    feedback: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [files, setFiles] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  function sendFeedback(e) {
    e.preventDefault();

    const newFeedback = {
      firstName,
      lastName,
      email,
      contact,
      serviceType,
      files,
      feedback,
      rating,
    };

    axios
      .post("http://localhost:5000/CAM/add-feedback", newFeedback)
      .then(() => {
        alert("Feedback Added");
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setServiceType("");
        setFiles("");
        setFeedback("");
        setRating("");

        //Navigate("")
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleCancelClick = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      serviceType: "Choose...",
      feedback: "",
      StarRating: "",
    });
    setValidated(false);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to match Sri Lankan phone numbers with or without leading zero
    const phoneRegex = /^(0|94)?[7][0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <Form
      className="form"
      noValidate
      validated={validated}
      onSubmit={sendFeedback}
    >
      <h3>FeedBack</h3>
      <p className="cam-para1">
        At Neo Tech we value your feedback. Please take a moment to share your
        thoughts with us.
      </p>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Hansana"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Wijayarathna"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              required
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a valid email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridContact">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="0712345678"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            isInvalid={validated && !validatePhoneNumber(formData.contactNo)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Service Type</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option>Choose...</option>
            <option value="Periodical Services">Periodical Services</option>
            <option value="Mechanical Repairs">Mechanical Repairs</option>
            <option value="Mobile Services">Mobile Services</option>
            <option value="Finance Manager">Emergency Breakdowns</option>
            <option value="Supervisor">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Attach Files</Form.Label>
          <Form.Control
            type="file"
            multiple
            value={files}
            onChange={(e) => setFiles(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridExtra">
          <Form.Label>Your FeedBack</Form.Label>
          <Form.Control
            as="textarea"
            required
            type="textarea"
            placeholder="add your feedback"
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <h5 className="h5">Rate us!!</h5>
          <StarRating />
        </Form.Group>
      </Row>
      <Button variant="success" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={handleCancelClick}>
        Cancel
      </Button>{" "}
    </Form>
  );
}

export default Feedback;
