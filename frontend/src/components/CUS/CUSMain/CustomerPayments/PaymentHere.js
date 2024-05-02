import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Carousel, Card, Spinner } from "react-bootstrap";
import neotechpay from "../../../../images/Payment/neotechpay.png";
import payhere from "../../../../images/Payment/payhere.png";
import payheremobile from "../../../../images/Payment/payhere_mobile.png";
import PaymentHistory from "./PaymentHistory";
import { CusAuthContext } from "../../../../context/cus-authcontext";

const PayHereIntegration = ({toggleLoading}) => {
  const cusauth = useContext(CusAuthContext);
  const [isMobile, setIsMobile] = useState(false);
  const [paymentData, setPaymentData] = useState({
    first_name: "Neo",
    last_name: "Tech",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
    order_id: "",
    items: "",
    currency: "LKR",
    amount: "",
  });

  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValid, setSearchValid] = useState(false);

  const handleSearch = async () => {
    
    setError(null);
    try {
      toggleLoading(true)
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/finance/billing/pendingpayment/${paymentId}`
      );
      if (!response.ok) {
        throw new Error("Payment not found");
      }
      const data = await response.json();

      // Update form variables with data received from the API
      setPaymentData({
        first_name: data.data.name,
        last_name: "none",
        email: data.data.email,
        phone: data.data.phone,
        address: data.data.address,
        city: "default",
        country: "Sri Lanka",
        order_id: data.data.paymentInvoiceId,
        items: data.data.paymentInvoiceId,
        currency: "LKR",
        amount: data.data.total.toFixed(2),
      });
      setSearchValid(true); // Set search validity to true
    } catch (error) {
      setError(error.message);
      setSearchValid(false); // Set search validity to false
    } finally {
      toggleLoading(false)
    }
  };

  const handleClear = () => {
    setPaymentId("");
    setPaymentData({
      first_name: "Neo",
      last_name: "Tech",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "Sri Lanka",
      order_id: "",
      items: "",
      currency: "LKR",
      amount: "",
    });
    setError(null);
    setSearchValid(false); // Set search validity to false
  };

  const handleChange = (e) => {
    if (error) {
      setError(null);
    }
    setPaymentId(e.target.value);
    // Clear payment data and search validity when the search field is edited
    setPaymentData({
      first_name: "Neo",
      last_name: "Tech",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "Sri Lanka",
      order_id: "",
      items: "",
      currency: "LKR",
      amount: "",
    });
    setSearchValid(false);
  };

  const handlePayment = async () => {
    try {
      if (!paymentData) {
        throw new Error("No payment data available");
      }

      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/finance/payments/initiatepayment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (response.ok) {
        const responseData = await response.text();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = responseData;
        const form = tempDiv.querySelector("form");
        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      alert("Error initiating payment. Please try again later.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main id="cusmain" className="cusmain">
      <div className="container">
        <h1 className="text-center mb-5">Pay Online</h1>
        <div className="row">
          <div className="col-md-6">
            {isMobile ? (
              <img
                src={payheremobile}
                alt="PayHere Mobile"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={neotechpay}
                    alt="First slide"
                    style={{
                      height: "520px",
                      maxHeight: "550px",
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={payhere}
                    alt="Second slide"
                    style={{
                      maxHeight: "550px",
                      objectFit: "cover",
                      height: "520px",
                    }}
                  />
                </Carousel.Item>
              </Carousel>
            )}
          </div>
          <div className="col-md-6">
            <div>
              <Form>
                <Form.Control
                  type="hidden"
                  name="first_name"
                  value={paymentData.first_name}
                />
                <Form.Control
                  type="hidden"
                  name="last_name"
                  value={paymentData.last_name}
                />
                <Form.Control
                  type="hidden"
                  name="email"
                  value={paymentData.email}
                />
                <Form.Control
                  type="hidden"
                  name="phone"
                  value={paymentData.phone}
                />
                <Form.Control
                  type="hidden"
                  name="address"
                  value={paymentData.address}
                />
                <Form.Control
                  type="hidden"
                  name="city"
                  value={paymentData.city}
                />
                <Form.Control
                  type="hidden"
                  name="country"
                  value={paymentData.country}
                />
                <Form.Control
                  type="hidden"
                  name="order_id"
                  value={paymentData.order_id}
                />
                <Form.Control
                  type="hidden"
                  name="items"
                  value={paymentData.items}
                />
                <Form.Control
                  type="hidden"
                  name="currency"
                  value={paymentData.currency}
                />
                <Form.Control
                  type="hidden"
                  name="amount"
                  value={paymentData.amount}
                />

                <Form.Group controlId="paymentId">
                  <Form.Label>Enter Payment ID:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter payment ID"
                    value={paymentId}
                    onChange={handleChange}
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  onClick={handleSearch}
                  disabled={loading || paymentId.trim() === ""}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Search"
                  )}
                </Button>
                {` `}
                <Button
                  variant="secondary"
                  onClick={handleClear}
                  disabled={loading}
                >
                  Clear
                </Button>
                <br />

                {paymentData.order_id && searchValid && (
                  <Card style={{ width: "25rem", marginTop: "20px" }}>
                    <Card.Body>
                      <Card.Title>Payment Details</Card.Title>
                      <Card.Text>
                        <h5>
                          Payment Invoice ID: <b>{paymentData.order_id}</b>
                        </h5>
                        <h5>
                          Total to Pay: <b>Rs.{paymentData.amount}</b>
                        </h5>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
                {error && (
                  <p style={{ color: "red", fontSize: "1.05em" }}>{error}</p>
                )}

                <br />
                <Button onClick={handlePayment} disabled={!searchValid}>
                  Pay with PayHere
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      {cusauth.isLoggedIn && <PaymentHistory toggleLoading={toggleLoading} style={{ marginTop: "4cm" }} />}
      <div style={{ marginBottom: "2cm" }}></div>
    </main>
  );
};

export default PayHereIntegration;
