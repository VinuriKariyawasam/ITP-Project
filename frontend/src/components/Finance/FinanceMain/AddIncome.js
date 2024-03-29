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
    status: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/finance/incomes/add-income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(() => {
        console.log("Income added successfully");
        navigate(-1);
      })
      .catch((error) => console.error("Error adding income:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <main id="main" className="main">
       <PageTitle path="Finance / Incomes / Add-Income"  title="Add-Income"/>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="serviceInvoiceId">
          <Form.Label>Service Invoice ID</Form.Label>
          <Form.Control
            type="text"
            name="serviceInvoiceId"
            value={formData.serviceInvoiceId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </main>
  );
};

export default AddIncome;
