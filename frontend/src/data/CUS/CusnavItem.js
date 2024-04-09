import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function CusnavItem() {
  return (
    <>
      <Navbar>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="products">Product</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Our Services
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
            <NavDropdown title="Customer Care" id="basic-nav-dropdown">
              <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/consultation">
                Consultation
              </NavDropdown.Item>
              <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/allfeedback">Feedback</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CusnavItem;
