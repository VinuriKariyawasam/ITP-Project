import React, { useState } from "react";
import { Button, Form, Carousel } from "react-bootstrap";
import neotechpay from "../../../../images/Payment/neotechpay.png";
import payhere from "../../../../images/Payment/payhere.png";

const PayHereIntegration = () => {
  const [paymentData, setPaymentData] = useState({
    first_name: "John",
    last_name: "Smith",
    email: "john@john.com",
    phone: "0714804203",
    address: "Kandy",
    city: "Kandy",
    country: "Sri Lanka",
    order_id: "S01",
    items: "S01",
    currency: "LKR",
    amount: "1200.00",
    // Add other necessary payment data fields here
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      // Send payment data to backend
      const response = await fetch(
        "http://localhost:5000/api/finance/payments/initiatepayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (response.ok) {
        // Payment data sent successfully, handle response
        const responseData = await response.json();

        // Create a form element
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://sandbox.payhere.lk/pay/checkout"; // PayHere checkout URL

        // Append each key-value pair in responseData as a hidden input field in the form
        Object.keys(responseData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = responseData[key];
          form.appendChild(input);
        });

        // Append the form to the document body and submit it
        document.body.appendChild(form);
        form.submit();
      } else {
        // Handle errors if any
        console.error("Failed to send payment data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending payment data:", error.message);
    }
  };

  return (
    <main id="cusmain" className="cusmain">
      <div className="container">
        <h1 className="text-center mb-5">Pay Online</h1>
        <div className="row">
          <div className="col-md-6">
            <Carousel>
              <Carousel.Item style={{ height: "500px" }}>
                <img
                  className="d-block w-100"
                  src={neotechpay}
                  alt="First slide"
                  style={{ height: "450px" }}
                />
              </Carousel.Item>
              <Carousel.Item style={{ height: "500px" }}>
                <img
                  className="d-block w-100"
                  src={payhere}
                  alt="Second slide"
                  style={{ height: "450px" }}
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6">
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  placeholder="Enter the amount"
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
              <Button onClick={handlePayment}>Pay with PayHere</Button>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PayHereIntegration;
