import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logoblack_trans.png";
import backgroundImage from "../../images/home-back2.webp"; // Import your background image
import cardImage1 from "../../images/customer.png"; // Import image for card 1
import cardImage2 from "../../images/staff1.jpg"; // Import image for card 2

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCardClick = (url) => {
    navigate(url); // Navigate to the specified URL
  };

  return (
    <div
      className="bg-dark d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="mb-4">
            <Card
              style={{
                margin: "30px",
                padding: "30px",
                maxWidth: "1200px",
                textAlign: "center",
              }}
            >
              <Row className="mb-4">
                <Col xs={12} className="text-center">
                  {/* Logo */}
                  <img src={logo} alt="Logo" style={{ maxWidth: "150px" }} />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={10} md={6} className="mb-3">
                  <Card
                    className="h-100 bg-dark text-white"
                    onClick={() => handleCardClick("/customer")}
                  >
                    <Card.Img src={cardImage1} alt="Card Image 1" />
                    <Card.Body className="d-flex justify-content-center align-items-center">
                      <h5>Customer</h5>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={10} md={6} className="mb-3">
                  <Card
                    className="h-100 bg-dark text-white"
                    onClick={() => handleCardClick("/staff/login")}
                  >
                    <Card.Img src={cardImage2} alt="Card Image 2" />
                    <Card.Body className="d-flex justify-content-center align-items-center">
                      <h5>Staff</h5>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
