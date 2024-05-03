import React, { useState, useContext } from "react";
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
import { StaffAuthContext } from "../../context/StaffAuthContext"; // Import AuthContext

const StaffLogin = ({ toggleLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  //const { login } = useContext(StaffAuthContext); // Access login function from StaffAuthContext
  const auth = useContext(StaffAuthContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toggleLoading(true); // Set loading to true before API call
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/hr/emp-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Call login function with user data received from backend
      //login(data.userId, data.email, data.empId, data.position, data.token);
      auth.login(data.userId, data.token, data.position); // This should update the context value
      console.log("Auth Result:", auth);

      // Handle successful login, such as redirecting to another page
      // Redirect based on employee position
      if (data.position === "General Manager") {
        navigate("/staff/gm");
      } else if (data.position === "HR Manager") {
        navigate("/staff/hr");
      } else if (data.position === "Service Manager") {
        navigate("/staff/sm");
      } else if (data.position === "Finance Manager") {
        navigate("/staff/finance");
      } else if (data.position === "Supervisor") {
        navigate("/staff/supervisor");
      } else if (data.position === "Inventory Manager") {
        navigate("/staff/im");
      } else if (data.position === "Customer Service Agent") {
        navigate("/staff/cam");
      } else {
        setError("Invalid position. Please contact administrator.");
      }

      console.log("Auth Result:", auth);
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login error, display error message, etc.
      alert("Login failed. Please check your username and password.");
    } finally {
      toggleLoading(false); // Set loading to false after API call
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
                <a href="mailto:hr.neotechmotorssl@gmail.com">
                  Forgot password?
                </a>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffLogin;
