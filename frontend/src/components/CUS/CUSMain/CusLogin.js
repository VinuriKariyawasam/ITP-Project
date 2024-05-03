import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CusAuthContext } from "../../../context/cus-authcontext";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

import cusimage1 from '../../../../src/images/CUS/CustomerImg/cusimage1.png';
import cusimage2 from '../../../../src/images/CUS/CustomerImg/cusimage2.jpg';
import cusimage3 from '../../../../src/images/CUS/CustomerImg/cusimage3.jpg';

function CusLogin({ toggleLoading }){
  const navigate = useNavigate();
  const cusauth = useContext(CusAuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const cusreg_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusreg`;
 
  function CustomerLogin(e){
    e.preventDefault();
    try{
      toggleLoading(true);

    const loginCustomer = {
      email,
      password,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginCustomer)
    };
   
    fetch(`${process.env.React_App_Backend_URL}/api/customer/cus-login`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert("Login Successfull");
      console.log(data);
      cusauth.login(data.userId,data.email,data.name,data.token);
      navigate("/customer");
    })
  .catch(error => {
      alert('Error:', error.message);
    })
  .finally (() => {
    toggleLoading(false); // Set loading to false after API call completes
  });
}catch (error) {
    alert('Error:', error.message);
    toggleLoading(false); // Set loading to false in case of an error
  }
}
    return(
        <div>
        <main id="main" style={{marginLeft:"20px",marginTop:"1px"}}>
         <Card>
           <Card.Body style={{alignContent:"center"}}>
           <Container>
            <Row>
             <Col>
              <Form onSubmit={CustomerLogin}>
                <Card style={{marginTop:"40px"}}>
                <Card.Body>
                <h1>Sign In</h1>
              
              <Form.Group as={Col} controlId="formGridExtra">  
                     <Form.Label>Email*</Form.Label>   
                     <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        rows={1}
                        value={email}
                        onChange={(e) => setemail(e.target.value)}                   
                    />
                </Form.Group>
                 <Form.Label>Password*</Form.Label>
                 <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  /><br></br>
                 <a href="#" class="link-info">Forgot password?</a>
            <Button variant="success" type="submit" 
                style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}>
                  Sign In
            </Button>
            <p style={{marginTop:"30px"}}><center>Don't have an account? 
            <a href= {cusreg_frontendurl} class="link-info"> Sign up</a></center></p>
            </Card.Body>
             </Card>
              </Form>
              </Col>
            <Col>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel" 
              style={{marginTop:"60px"}}>
              <div class="carousel-inner">
               <div class="carousel-item active" data-bs-interval="10000">
                <img src={cusimage1} class="d-block w-300" alt="..."/>
               </div>
               <div class="carousel-item" data-bs-interval="2000">
                <img src={cusimage2} class="d-block w-300" alt="..."/>
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

export default CusLogin;