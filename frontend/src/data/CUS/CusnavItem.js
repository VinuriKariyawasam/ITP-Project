import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CusAuthContext } from "../../context/cus-authcontext";

function CusnavItem() {
  const CusAuth = useContext(CusAuthContext);
  const cushome_frontendurl = `${process.env.React_App_Frontend_URL}/customer`;

  return (
    <>
      <Navbar bg="#212121" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href={cushome_frontendurl}>Home</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              {CusAuth.isLoggedIn && (
                <NavDropdown.Item
                  href={`${process.env.React_App_Frontend_URL}/customer/products`}
                >
                  Product
                </NavDropdown.Item>
              )}
              <NavDropdown.Item
                href={`${process.env.React_App_Frontend_URL}/customer/mobservices/mobilemain`}
              >
                Mobile Services
              </NavDropdown.Item>

              {CusAuth.isLoggedIn && (
                <NavDropdown.Item
                  href={`${process.env.React_App_Frontend_URL}/customer/appointment/appointnmentMain`}
                >
                  Appointment
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <Nav.Link
              href={`${process.env.React_App_Frontend_URL}/customer/contactus`}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              href={`${process.env.React_App_Frontend_URL}/customer/aboutus`}
            >
              About Us
            </Nav.Link>
            <NavDropdown title="Customer Care" id="basic-nav-dropdown">
              <NavDropdown.Item
                href={`${process.env.React_App_Frontend_URL}/customer/cusaffairs/consultation`}
              >
                Consultation
              </NavDropdown.Item>
              {CusAuth.isLoggedIn && (
                <NavDropdown.Item
                  href={`${process.env.React_App_Frontend_URL}/customer/cusaffairs/allfeedback`}
                >
                  Feedback
                </NavDropdown.Item>
              )}
              <NavDropdown.Item
                href={
                  CusAuth.isLoggedIn
                    ? `${process.env.React_App_Frontend_URL}/customer/payments/payonline`
                    : `${process.env.React_App_Frontend_URL}/customer/payments/payonline`
                }
              >
                {CusAuth.isLoggedIn ? "My Payments" : "Pay Online"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CusnavItem;
