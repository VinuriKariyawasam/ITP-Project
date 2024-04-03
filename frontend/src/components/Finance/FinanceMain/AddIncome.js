import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PageTitle from "./PageTitle";

const AddIncome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    serviceInvoiceId: "",
    amount: "",
    type: "",
    date: "",
    time: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    serviceInvoiceId: "",
    amount: "",
    type: "",
    date: "",
    time: "",
    status: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch("http://localhost:5000/api/finance/incomes/add-income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          console.log("Income added successfully");
          navigate(-1);
        })
        .catch((error) => console.error("Error adding income:", error));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      serviceInvoiceId: "",
      amount: "",
      type: "",
      date: "",
      time: "",
      status: "",
    };

    // Title validation
    if (formData.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    }

    // Service Invoice ID validation
    if (formData.serviceInvoiceId.trim() === "") {
      newErrors.serviceInvoiceId = "Service Invoice ID is required";
      valid = false;
    }

    // Amount validation
    if (formData.amount.trim() === "") {
      newErrors.amount = "Amount is required";
      valid = false;
    } else if (isNaN(parseFloat(formData.amount))) {
      newErrors.amount = "Amount must be a number";
      valid = false;
    }

    // Type validation
    if (formData.type.trim() === "") {
      newErrors.type = "Type is required";
      valid = false;
    }

    // Date validation
    if (formData.date.trim() === "") {
      newErrors.date = "Date is required";
      valid = false;
    }

    // Time validation
    if (formData.time.trim() === "") {
      newErrors.time = "Time is required";
      valid = false;
    }

    // Status validation
    if (formData.status.trim() === "") {
      newErrors.status = "Status is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Incomes / Add-Income" title="Add-Income" />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="serviceInvoiceId">
          <Form.Label>Service Invoice ID</Form.Label>
          <Form.Control
            type="text"
            name="serviceInvoiceId"
            value={formData.serviceInvoiceId}
            onChange={handleChange}
            isInvalid={!!errors.serviceInvoiceId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.serviceInvoiceId}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            isInvalid={!!errors.amount}
          />
          <Form.Control.Feedback type="invalid">
            {errors.amount}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            isInvalid={!!errors.type}
          />
          <Form.Control.Feedback type="invalid">
            {errors.type}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type="invalid">
            {errors.date}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            isInvalid={!!errors.time}
          />
          <Form.Control.Feedback type="invalid">
            {errors.time}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select" 
            name="status"
            value={formData.status}
            onChange={handleChange}
            isInvalid={!!errors.status}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.status}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </main>
  );
};

export default AddIncome;
