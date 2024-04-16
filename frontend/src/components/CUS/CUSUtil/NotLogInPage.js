import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import lock from "../../../images/cus403.jpg";

const NotLogInPage = (props) => {
  const navigate = useNavigate(); // Create a navigate object

  const lockStyle = {
    width: "75px",
    height: "75px",
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
    navigate(props.link); // This function will take the user back to the previous page
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
            <h1>To access this page you have to sign in</h1>
            <p>Please sign in to access this page.</p>
            <Button variant="primary" onClick={goBack}>
              Sign In
            </Button>{" "}
            {/* Add the goBack function to the onClick event of the Button */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotLogInPage;
