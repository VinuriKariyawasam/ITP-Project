import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const NotFoundPage = (props) => {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
    >
      <Row>
        <Col xs={12} className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <Button href={props.page} variant="primary">
            Go Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
