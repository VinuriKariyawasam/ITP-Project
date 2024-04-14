import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import lock from "../../images/allogin.png";

const RestrictedPage = () => {
  const navigate = useNavigate(); // Create a navigate object

  const lockStyle = {
    width: "300px",
    height: "200px",
    animation: "dip 1s",
    animationDelay: "1.5s",
  };

  const messageStyle = {
    fontFamily: "Lato, sans-serif",
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "20px",
  };

  const goBack = () => {
    navigate(-1); // This function will take the user back to the previous page
  };

  return (
    <Container
      fluid
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #EEE, #AAA)",
      }}
    >
      <Row>
        <Col>
          <img src={lock} alt="Lock" style={lockStyle} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={messageStyle}>
            <h1>You are already logged in</h1>
            <p>
              Feel free to go back to the previous page or log out to access
              this page.
            </p>
            <Button variant="primary" onClick={goBack}>
              Go Back
            </Button>{" "}
            {/* Add the goBack function to the onClick event of the Button */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RestrictedPage;
