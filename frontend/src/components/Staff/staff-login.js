import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import logo from "../../images/logoblack_trans.png";
import { useNavigate } from "react-router-dom";
import { StaffAuthContext } from "../../Context/Staff/StaffAuthContext"; // Import AuthContext

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useContext(StaffAuthContext); // Access login function from StaffAuthContext

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/hr/emp-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle successful login, such as redirecting to another page
      // Redirect based on employee position
      if (data.position === "General Manager") {
        navigate("gm");
      } else if (data.position === "HR Manager") {
        navigate("hr");
      } else if (data.position === "Service Manager") {
        navigate("sm");
      } else if (data.position === "Finance Manager") {
        navigate("finance");
      } else if (data.position === "Supervisor") {
        navigate("supervisor");
      } else if (data.position === "Inventory Manager") {
        navigate("im");
      } else if (data.position === "Customer Service Agent") {
        navigate("cam");
      } else {
        setError("Invalid position. Please contact administrator.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login error, display error message, etc.
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card
            style={{
              marginTop: "200px",
              marginBottom: "200px",
              padding: "30px",
            }}
          >
            <Card.Body>
              <Image
                src={logo}
                alt="logo"
                fluid
                className="w-50 mx-auto d-block"
              />
              <h2 className="text-center mb-4">Staff Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username (Email or EmpID):</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  block
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <p className="forgot-password text-right">
                <a href="#">Forgot password?</a>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffLogin;
