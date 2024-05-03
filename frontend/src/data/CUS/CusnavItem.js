// import { useContext } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { CusAuthContext } from "../../context/cus-authcontext";

// function CusnavItem() {
//   const CusAuth = useContext(CusAuthContext);

//   return (
//     <>
//       <Navbar bg="#212121" data-bs-theme="dark">
//         <Container>
//           <Nav className="me-auto">
//             <Nav.Link href="http://localhost:3000/customer">Home</Nav.Link>
//             <NavDropdown title="Service" id="basic-nav-dropdown">
//               {CusAuth.isLoggedIn && (
//                 <NavDropdown.Item href="http://localhost:3000/customer/products">
//                   Product
//                 </NavDropdown.Item>
//               )}
//               <NavDropdown.Item href="http://localhost:3000/customer/mobservices/mobilemain">
//                 Mobile Services
//               </NavDropdown.Item>
//               <NavDropdown.Item href="http://localhost:3000/customer/appointment/appointnmentMain">
//                 Appointment
//               </NavDropdown.Item>
//               <NavDropdown.Item>Our Services</NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="http://localhost:3000/customer/contactus">Contact Us</Nav.Link>
//             <Nav.Link href="#pricing">About Us</Nav.Link>
//             <NavDropdown title="Customer Care" id="basic-nav-dropdown">
//               <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/consultation">
//                 Consultation
//               </NavDropdown.Item>


//             <Nav.Link href="http://localhost:3000/customer/contactus">
//               Contact Us
//             </Nav.Link>
//             <Nav.Link href="http://localhost:3000/customer/aboutus">
//               About Us
//             </Nav.Link>

//             <NavDropdown title="Customer Care" id="basic-nav-dropdown">
//               {CusAuth.isLoggedIn && (
//                 <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/consultation">
//                   Consultation
//                 </NavDropdown.Item>
//               )}
//               <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/allfeedback">
//                 Feedback
//               </NavDropdown.Item>

//               {CusAuth.isLoggedIn ? (
//                 <NavDropdown.Item href="http://localhost:3000/customer/payments/payonline">
//                   My Payments
//                 </NavDropdown.Item>
//               ) : (
//                 <NavDropdown.Item href="http://localhost:3000/customer/payments/payonline">
//                   Pay Online
//                 </NavDropdown.Item>
//               )}
//             </NavDropdown>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default CusnavItem;



import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CusAuthContext } from "../../context/cus-authcontext";

function CusnavItem() {
  const CusAuth = useContext(CusAuthContext);

  return (
    <>
      <Navbar bg="#212121" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="http://localhost:3000/customer">Home</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              {CusAuth.isLoggedIn && (
                <NavDropdown.Item href={`${process.env.React_App_Frontend_URL}/customer/products`}>
                  Product
                </NavDropdown.Item>
              )}
              <NavDropdown.Item href="http://localhost:3000/customer/mobservices/mobilemain">
                Mobile Services
              </NavDropdown.Item>


              {CusAuth.isLoggedIn && (
              
              <NavDropdown.Item href={`${process.env.React_App_Frontend_URL}/customer/appointment/appointnmentMain`}>


                Appointment
              </NavDropdown.Item>
              )}
              <NavDropdown.Item>Our Services</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="http://localhost:3000/customer/contactus">Contact Us</Nav.Link>
            <Nav.Link href="http://localhost:3000/customer/aboutus">About Us</Nav.Link>
            <NavDropdown title="Customer Care" id="basic-nav-dropdown">
              <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/consultation">
                Consultation
              </NavDropdown.Item>
              {CusAuth.isLoggedIn && (
                <NavDropdown.Item href="http://localhost:3000/customer/cusaffairs/allfeedback">
                  Feedback
                </NavDropdown.Item>
              )}
              <NavDropdown.Item href={CusAuth.isLoggedIn ? `${process.env.React_App_Frontend_URL}/customer/payments/payonline` : `${process.env.React_App_Frontend_URL}/customer/payments/payonline`}>
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

