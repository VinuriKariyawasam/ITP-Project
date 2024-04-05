import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CusnavItem() {
    return (
        <>

<Navbar bg="#212121" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/customer">Home</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="/customer/products">Product</NavDropdown.Item>
              <NavDropdown.Item href="/customer/Periodical">
                Our Services
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
            <NavDropdown title="Customer Care" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Consultation</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Feedback
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      </>
  );
}


export default CusnavItem;