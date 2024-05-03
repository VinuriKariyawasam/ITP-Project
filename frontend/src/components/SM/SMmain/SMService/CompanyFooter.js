import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CompanyFooter = () => {
  const footerStyle = {
    backgroundColor: 'white',
    padding: '20px 0',
    marginTop:'50px'
  };

  const leftColStyle = {
    textAlign: 'left',
  };

  const rightColStyle = {
    textAlign: 'right',
  };

  const signatureStyle = {
    marginTop: '20px', // Adjust spacing as needed
  };

  return (
    <footer style={footerStyle}>
      <Container fluid>
        <Row>
          {/* Left side */}
          <Col md={6} style={leftColStyle}>
            <div className="footer-data">
              {/* Date */}
              <h5>{new Date().toLocaleDateString()}</h5>
            </div>
          </Col>
          {/* Right side */}
          <Col md={6} style={rightColStyle}>
            <div className="finance-manager" style={signatureStyle}>
              {/* Signature */}
              <h4>.....................................</h4>
              <h4><b>Supervisor</b></h4>
              {/* Space */}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CompanyFooter;