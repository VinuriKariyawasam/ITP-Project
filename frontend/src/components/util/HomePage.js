import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logoblack_trans.png";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCardClick = (url) => {
    navigate(url); // Navigate to the specified URL
  };
  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center h-100"
      >
        {/* Logo */}
        <img src={logo} alt="Logo" className="mb-4" />

        {/* Middle Card */}
        {/* Middle Card */}
        <Card
          bg="light"
          text="dark"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <Card.Body>
            <h3 className="text-center mb-4">Middle Card</h3>
            <Row className="justify-content-center">
              <Col xs={10} md={6} className="mb-3">
                <Card
                  className="h-100"
                  onClick={() => handleCardClick("/url1")}
                >
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    <h5>Clickable Card 1</h5>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={10} md={6} className="mb-3">
                <Card
                  className="h-100"
                  onClick={() => handleCardClick("/url2")}
                >
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    <h5>Clickable Card 2</h5>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default HomePage;
