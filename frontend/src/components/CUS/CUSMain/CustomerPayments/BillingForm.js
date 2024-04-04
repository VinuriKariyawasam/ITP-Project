import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const BillingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    partsPrice: 0,
    partsDiscount: 0,
    servicePrice: 0,
    serviceDiscount: 0,
    tax: 0,
    total: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate subtotal
    const subtotal = parseFloat(formData.partsPrice) + parseFloat(formData.servicePrice);

    // Calculate total after discount
    const totalAfterDiscount =
      subtotal -
      (parseFloat(formData.partsDiscount) + parseFloat(formData.serviceDiscount));

    // Calculate final total after tax
    const finalTotal = totalAfterDiscount + parseFloat(formData.tax);

    setFormData({
      ...formData,
      total: finalTotal.toFixed(2), // Round to 2 decimal places
    });
  };

  return (
    <main id="cusmain" className="cusmain">
    <Container>
      <h1 className="text-center mb-4">Billing Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
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
                placeholder="Enter address"
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
                placeholder="Enter email"
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
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h2 className="mt-4">Parts and Accessories</h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="partsPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="partsPrice"
                value={formData.partsPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="partsDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount"
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
                placeholder="Enter price"
                name="servicePrice"
                value={formData.servicePrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="serviceDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount"
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
            <Form.Group controlId="tax">
              <Form.Label>Tax</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter tax"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="total">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                placeholder="Total"
                name="total"
                value={`$${formData.total}`}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Calculate Total
        </Button>
      </Form>
    </Container>
    </main>
  );
};

export default BillingForm;
