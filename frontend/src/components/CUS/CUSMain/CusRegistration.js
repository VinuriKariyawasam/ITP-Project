import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

import cusimage1 from '../../../../src/images/CUS/CustomerImg/cusimage1.png';
import cusimage2 from '../../../../src/images/CUS/CustomerImg/cusimage2.jpg';
import cusimage3 from '../../../../src/images/CUS/CustomerImg/cusimage3.jpg';


function CusRegistration(){
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    contact: "",
    email: "",
    password: "",
    address: ""
  });

  const [Name, setName] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");

  function sendCusDetails(e){
    e.preventDefault();

    const newCustomer = {
      Name,
      contact,
      email,
      password,
      address
    };

    axios
      .post("http://localhost:5000/api/customer/signup/add-customer", newCustomer)
      .then(() => {
        alert("Registration Successfull");
        console.log(newCustomer);
        navigate("/customer/cuslogin")
      })
      .catch((err) => {
        alert(err);
      });
  }

    return(
        <div>
        <main id="main" style={{marginLeft:"20px",marginTop:"1px"}}>
         <Card>
           <Card.Body style={{alignContent:"center"}}>
           <Container>
            <Row>
             <Col>
              <Form onSubmit={sendCusDetails}>
                <Card style={{marginTop:"40px"}}>
                <Card.Body>
                <h1>Sign Up</h1>
              
              <Form.Group as={Col} controlId="formGridExtra">  
                     <Form.Label>Name*</Form.Label>   
                     <Form.Control
                        as="textarea"
                        required
                        type="textarea"
                        placeholder="Abby Jones"
                        rows={1}
                        value={Name}
                        onChange={(e) => setName(e.target.value)}                   
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridExtra">
                     <Form.Label>Contact No*</Form.Label>
                     <Form.Control
                        as="textarea"
                        required
                        type="tel"
                        placeholder="xxx xx xx xxx"
                        rows={1}
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    />
                </Form.Group>
                 <Form.Label>Password *</Form.Label>
                 <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  />
                 <Form.Label>Confirm Password *</Form.Label>
                 <Form.Control type="password" placeholder="Password"/>
                 <Form.Label>Address</Form.Label>
                 <Form.Control 
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  /><br></br>
                <div class="form-check">
                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                  <label class="form-check-label" for="flexCheckDefault" required>
                  I agree to all <a href="#" class="link-info"> Terms & Conditions</a>
                  </label>
                </div>  
            <Button variant="success" type="submit" 
                style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}
                onClick={() => navigate("cuslogin")}>
                  Sign Up
            </Button>
            <p style={{marginTop:"20px"}}><center>Already have an account? 
            <a href="http://localhost:3000/customer/cuslogin" class="link-info"> Sign in</a></center></p>
            </Card.Body>
             </Card>
              </Form>
              </Col>
            <Col>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel" 
              style={{marginTop:"60px"}}>
              <div class="carousel-inner">
               <div class="carousel-item active" data-bs-interval="10000">
                <img src={cusimage2} class="d-block w-300" alt="..."/>
               </div>
               <div class="carousel-item" data-bs-interval="2000">
                <img src={cusimage1} class="d-block w-300" alt="..."/>
               </div>
               <div class="carousel-item">
                <img src={cusimage3} class="d-block w-300" alt="..."/>
               </div>
              </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
             </div>
            </Col>
       </Row>
    </Container>
    </Card.Body>
    </Card>
   </main>
</div>
    );
}

export default CusRegistration;