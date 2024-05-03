import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PageTitle from "./PageTitle";

const UpdateIncome = ({toggleLoading}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    serviceInvoiceId: "",
    amount: "",
    type: "",
    date: "",
    time: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        try {
            toggleLoading(true)
            const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes/get-income/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching income:", error);
        }
        finally{
          toggleLoading(false)
        }
    };

    fetchData();

}, [id]);


  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }
    // if (!formData.amount.trim()) {
    //   newErrors.amount = "Amount is required";
    //   valid = false;
    // } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
    //   newErrors.amount = "Amount must be a positive number";
    //   valid = false;
    // }
    if (!formData.type.trim()) {
      newErrors.type = "Type is required";
      valid = false;
    }
    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
      valid = false;
    }
    if (!formData.time.trim()) {
      newErrors.time = "Time is required";
      valid = false;
    }
    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${process.env.React_App_Backend_URL}/api/finance/incomes/update-income/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          console.log("Income updated successfully");
          navigate(-1);
        })
        .catch((error) => console.error("Error updating income:", error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Custom validation for amount field
    if (name === "amount") {
      if (isNaN(value) || Number(value) <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Amount must be a positive number",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const handleCancel = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Incomes & Funds / Edit" title="Edit-Income & Funds" />
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
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="serviceInvoiceId">
          <Form.Label>Reference</Form.Label>
          <Form.Control
            type="text"
            name="serviceInvoiceId"
            value={formData.serviceInvoiceId}
            onChange={handleChange}
            readOnly
          />
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
          <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            isInvalid={!!errors.status}
          />
          <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Update
        </Button>{" "}
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </main>
  );
};

export default UpdateIncome;
