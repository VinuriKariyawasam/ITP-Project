import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BillingForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceRecordId: '',
    paymentInvoiceId: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    partsPrice: 0,
    partsDiscount: 0,
    servicePrice: 0,
    serviceDiscount: 0,
    taxRate: 0,
    total: 0,
    currentDate: '',
    currentTime: '',
  });

  const [invoiceType, setInvoiceType] = useState('');

  useEffect(() => {
    showConfirmationBox();
  }, []);

  const showConfirmationBox = () => {
    const result = window.confirm('Please select Invoice Type:\n1. Product\n2. Spare Parts\n3. Service');
    if (result) {
      const type = parseInt(prompt('Enter the option number (1 for Product, 2 for Spare Parts, 3 for Service):'));
      if (type === 1) {
        setInvoiceType('PA');
      } else if (type === 2) {
        setInvoiceType('PB');
      } else if (type === 3) {
        setInvoiceType('PC');
      } else {
        alert('Invalid option selected. Defaulting to Product.');
        setInvoiceType('PA');
      }
    } else {
      alert('Invoice type not selected. Defaulting to Product.');
      setInvoiceType('PA');
    }
  };

  useEffect(() => {
    if (invoiceType) {
      const paymentInvoiceId = generatePaymentInvoiceId(invoiceType);
      setFormData((prevData) => ({
        ...prevData,
        paymentInvoiceId,
      }));
    }
  }, [invoiceType]);

  const generatePaymentInvoiceId = (type) => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 900000) + 100000; // Generates a 6-digit random number
    return `${type}-${timestamp}-${randomNum}`.slice(0, 12); // Limiting to 12 characters
  };

  useEffect(() => {
    calculateTotal();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    setFormData((prevData) => ({
      ...prevData,
      currentDate,
      currentTime,
    }));
  }, [formData.partsPrice, formData.partsDiscount, formData.servicePrice, formData.serviceDiscount, formData.taxRate]);

  const calculateTotal = () => {
    const subtotal = parseFloat(formData.partsPrice) + parseFloat(formData.servicePrice);
    const totalAfterDiscount =
      subtotal -
      (formData.partsPrice * parseFloat(formData.partsDiscount) / 100) -
      (formData.servicePrice * parseFloat(formData.serviceDiscount) / 100);
    const taxAmount = (totalAfterDiscount * parseFloat(formData.taxRate)) / 100;
    const finalTotal = totalAfterDiscount + taxAmount;
    setFormData((prevData) => ({
      ...prevData,
      total: finalTotal.toFixed(2),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/finance/billing/createbill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create bill');
      }
      alert('Bill created successfully!');
      navigate('/staff/finance/billing/all');
    } catch (error) {
      console.error('Error creating bill:', error.message);
      alert('Failed to create bill. Please try again later.');
    }
  };

  const handleCancel = () => {
    navigate('/staff/finance/billing/all')
  };

  return (
    <main id="main" className="main">
      <Container>
        <h1 className="text-center mb-4">Billing Form</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="serviceRecordId">
                <Form.Label>Service Record ID/Vehicle No</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Service Record ID or Vehicle Number"
                  name="serviceRecordId"
                  value={formData.serviceRecordId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paymentInvoiceId">
                <Form.Label>Payment Invoice ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Payment Invoice ID"
                  name="paymentInvoiceId"
                  value={formData.paymentInvoiceId}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <h2>Parts and Accessories</h2>
          <Row>
            <Col md={6}>
              <Form.Group controlId="partsPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  name="partsPrice"
                  value={formData.partsPrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="partsDiscount">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter Discount"
                  name="partsDiscount"
                  value={formData.partsDiscount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <h2>Service/Repair Charges</h2>
          <Row>
            <Col md={6}>
              <Form.Group controlId="servicePrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  name="servicePrice"
                  value={formData.servicePrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="serviceDiscount">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter Discount"
                  name="serviceDiscount"
                  value={formData.serviceDiscount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="taxRate">
                <Form.Label>Tax (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Tax Rate"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="taxAmount">
                <Form.Label>Tax Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tax Amount"
                  name="taxAmount"
                  value={`Rs.${((parseFloat(formData.partsPrice) + parseFloat(formData.servicePrice)) * parseFloat(formData.taxRate) / 100).toFixed(2)}`}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="total">
                <Form.Label>Total (Rs.)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Total"
                  name="total"
                  value={`${parseFloat(formData.total).toFixed(2)}`}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="currentDate">
                <Form.Control
                  type="hidden"
                  name="currentDate"
                  value={formData.currentDate}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="currentTime">
                <Form.Control
                  type="hidden"
                  name="currentTime"
                  value={formData.currentTime}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2}>
              <Button variant="primary" type="submit">
                Create Bill
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default BillingForm;
