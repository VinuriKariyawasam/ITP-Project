import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BillingForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceRecordId: "",
    paymentInvoiceId: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    partsPrice: "",
    partsDiscount: "",
    servicePrice: "",
    serviceDiscount: "",
    taxRate: "",
    total: "",
    currentDate: "",
    currentTime: "",
  });

  const [errors, setErrors] = useState({});

  const [invoiceType, setInvoiceType] = useState("");

  useEffect(() => {
    showConfirmationBox();
  }, []);

  const showConfirmationBox = () => {
    const result = window.confirm(
      "Please select Invoice Type:\n1. Product\n2. Spare Parts\n3. Service"
    );
    if (result) {
      const type = parseInt(
        prompt(
          "Enter the option number (1 for Product, 2 for Spare Parts, 3 for Service):"
        )
      );
      if (type === 1) {
        setInvoiceType("PA");
      } else if (type === 2) {
        setInvoiceType("PB");
      } else if (type === 3) {
        setInvoiceType("PC");
      } else {
        alert("Invalid option selected. Defaulting to Product.");
        setInvoiceType("PA");
      }
    } else {
      alert("Invoice type not selected. Defaulting to Product.");
      setInvoiceType("PA");
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
  }, [
    formData.partsPrice,
    formData.partsDiscount,
    formData.servicePrice,
    formData.serviceDiscount,
    formData.taxRate,
  ]);

  const calculateTotal = () => {
    const partsPrice = parseFloat(formData.partsPrice);
    const partsDiscount = parseFloat(formData.partsDiscount);
    const servicePrice = parseFloat(formData.servicePrice);
    const serviceDiscount = parseFloat(formData.serviceDiscount);
    const taxRate = parseFloat(formData.taxRate);

    if (
      isNaN(partsPrice) ||
      isNaN(partsDiscount) ||
      isNaN(servicePrice) ||
      isNaN(serviceDiscount) ||
      isNaN(taxRate)
    ) {
      return;
    }

    if (
      partsPrice < 0 ||
      partsDiscount < 0 ||
      servicePrice < 0 ||
      serviceDiscount < 0 ||
      taxRate < 0
    ) {
      return;
    }

    if (partsDiscount > 100 || serviceDiscount > 100 || taxRate > 100) {
      return;
    }

    const subtotal = partsPrice + servicePrice;
    const totalAfterDiscount =
      subtotal -
      (partsPrice * partsDiscount) / 100 -
      (servicePrice * serviceDiscount) / 100;
    const taxAmount = (totalAfterDiscount * taxRate) / 100;
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

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "serviceRecordId":
        error =
          value.length === 0 ? "Service Record ID/Vehicle No is required" : "";
        break;
      case "name":
        error = value.length === 0 ? "Name is required" : "";
        break;
      case "address":
        error = value.length === 0 ? "Address is required" : "";
        break;
      case "email":
        error =
          value.length === 0
            ? "Email is required"
            : !isValidEmail(value)
            ? "Invalid email format"
            : "";
        break;
      case "phone":
        error =
          value.length === 0
            ? "Phone is required"
            : !isValidPhone(value)
            ? "Invalid phone number"
            : "";
        break;
      case "partsPrice":
      case "servicePrice":
        error =
          isNaN(value) || parseFloat(value) < 0
            ? "Amount should be a positive number"
            : "";
        break;
      case "partsDiscount":
      case "serviceDiscount":
        error =
          isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100
            ? "Discount should be a positive number less than 100"
            : "";
        break;
      case "taxRate":
        error =
          isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100
            ? "Tax rate should be a positive number less than 100"
            : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Phone number should start with 0 and be 10 digits long
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    //send email to customer regarding the bill

    try {
      const emailOptions = {
        to: `${formData.email}`, // Replace with recipient email address
        subject: `Your Bill is Ready for Payment - ${formData.paymentInvoiceId}`,
        html: `<p><b>Dear Valued Customer</b></p>
          <p>We're reaching out to you regarding an invoice. Your bill is now ready for payment. You can now make the payment for the order using our online payment portal or by visiting our center in person.</p>
          <p>Please find the details of the invoice below:</p>
          <p>Bill Number: ${formData.paymentInvoiceId}</p>
          <p>Amount: Rs.${formData.total}</p>
          <p>Date: ${formData.currentDate}</p>
          <p>Should you have any questions or require further assistance, please don't hesitate to reach out to our team. We're always here to help.</p>
          <p>Thank you for choosing us as your trusted partner. We appreciate your business.</p>
          <p>Warm regards,</p>
          <p><b><i>Finance Division- Neo Tech Motors</i></b></p>`,
      };

      // Send a fetch request to the backend controller for sending email
      await fetch(`${process.env.React_App_Backend_URL}/api/finance/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailOptions.to,
          subject: emailOptions.subject,
          text: emailOptions.text,
          html: emailOptions.html,
        }),
      });
      console.log("Email sent to backend controller successfully");
    } catch (error) {
      console.error("Error sending email:", error.message);
    }

    try {
      // Check if paymentId starts with 'PA' or 'PB'
      if (formData.paymentInvoiceId.substring(0, 2) === "PB") {
        // Send a PATCH request to add SP payment ID
        await fetch(
          `${process.env.React_App_Backend_URL}/api/finance/addsppaymentid/${formData.serviceRecordId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentId: formData.paymentInvoiceId }), // Corrected here
          }
        );
      } else if (formData.paymentInvoiceId.substring(0, 2) === "PA") {
        // Send a PATCH request to add product payment ID
        await fetch(
          `${process.env.React_App_Backend_URL}/api/finance/addproductpaymentid/${formData.serviceRecordId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentId: formData.paymentInvoiceId }), // Corrected here
          }
        );
      } else {
        alert("Not PA or PB");
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/finance/billing/createbill`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create bill");
      }
      alert("Bill created successfully!");
      navigate("/staff/finance/billing/all");
    } catch (error) {
      console.error("Error creating bill:", error.message);
      alert("Failed to create bill. Please try again later.");
    }
  };

  const validateForm = () => {
    const {
      serviceRecordId,
      name,
      address,
      email,
      phone,
      partsPrice,
      partsDiscount,
      servicePrice,
      serviceDiscount,
      taxRate,
    } = formData;

    let isValid = true;

    if (
      !serviceRecordId ||
      !name ||
      !address ||
      !email ||
      !phone ||
      !partsPrice ||
      !partsDiscount ||
      !servicePrice ||
      !serviceDiscount ||
      !taxRate
    ) {
      alert("All fields are required");
      isValid = false;
    }

    if (
      parseFloat(partsPrice) < 0 ||
      parseFloat(partsDiscount) < 0 ||
      parseFloat(servicePrice) < 0 ||
      parseFloat(serviceDiscount) < 0 ||
      parseFloat(taxRate) < 0
    ) {
      alert("Amounts should be positive");
      isValid = false;
    }

    if (
      parseFloat(partsDiscount) > 100 ||
      parseFloat(serviceDiscount) > 100 ||
      parseFloat(taxRate) > 100
    ) {
      alert("Discount and tax rate should be less than 100");
      isValid = false;
    }

    return isValid;
  };

  const handleCancel = () => {
    navigate("/staff/finance/billing/all");
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
                  isInvalid={!!errors.serviceRecordId}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.serviceRecordId}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.name}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.address}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.email}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.phone}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.partsPrice}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.partsPrice}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.partsDiscount}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.partsDiscount}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.servicePrice}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.servicePrice}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.serviceDiscount}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.serviceDiscount}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.taxRate}
                />
                <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                  {errors.taxRate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="taxAmount">
                <Form.Label>Tax Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tax Amount"
                  name="taxAmount"
                  value={`Rs.${(
                    ((parseFloat(formData.partsPrice) +
                      parseFloat(formData.servicePrice)) *
                      parseFloat(formData.taxRate)) /
                    100
                  ).toFixed(2)}`}
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
