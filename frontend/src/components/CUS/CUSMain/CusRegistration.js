import React, { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CusAuthContext } from "../../../context/cus-authcontext";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import { Form, Col, Alert ,InputGroup} from 'react-bootstrap';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import {BsFillEyeSlashFill} from 'react-icons/bs';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import cusimage1 from '../../../../src/images/CUS/CustomerImg/cusimage1.png';
import cusimage2 from '../../../../src/images/CUS/CustomerImg/cusimage2.jpg';
import cusimage3 from '../../../../src/images/CUS/CustomerImg/cusimage3.jpg';


function CusRegistration({ toggleLoading }){
  const navigate = useNavigate();
  const cusauth = useContext(CusAuthContext);
  const cuslogin_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cuslogin`;

  const [formData, setFormData] = useState({
    Name: "",
    contact: "",
    email: "",
    password: "",
    address: ""
  });

  const [Name, setName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [contact, setContact] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [warnings, setWarnings] = useState({
    capitalLetter: false,
    simpleLetter: false,
    specialCharacter: false,
    number: false,
    minLength: false
});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [address, setaddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  //validations
  const handleChangeName = (e) => {
    const enteredValue = e.target.value;
    // Regular expression to check if the entered value contains any numbers
    const containsNumbers = /\d/.test(enteredValue);
    if (!containsNumbers) {
        // If the entered value does not contain numbers, update the state
        setName(enteredValue);
    }
};

  const handleChangeEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    // Regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(enteredEmail);
    setIsValidEmail(isValid);
};

const handleChangeContact = (e) => {
  const enteredContact = e.target.value;
  // Remove non-numeric characters from enteredContact
  const numericValue = enteredContact.replace(/\D/g, '');
  // Check if numericValue has exactly 10 digits
  const isValidFormat = numericValue.length === 10;
  // Update contact state with formatted value
  setContact(numericValue);
  // Update validation state
  setIsValid(isValidFormat);
};

const handleChangePassword = (e) => {
  const newPassword = e.target.value;
  setPassword(newPassword);
  
  // Check for capital letter
  const hasCapital = /[A-Z]/.test(newPassword);
  // Check for simple letter
  const hasSimple = /[a-z]/.test(newPassword);
  // Check for special character
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword);
  // Check for number
  const hasNumber = /[0-9]/.test(newPassword);
  // Check for minimum length
  const hasMinLength = newPassword.length >= 8;

  // Update warning state
  setWarnings({
      capitalLetter: !hasCapital,
      simpleLetter: !hasSimple,
      specialCharacter: !hasSpecial,
      number: !hasNumber,
      minLength: !hasMinLength
  });
  // Check if passwords match
  setPasswordMismatch(newPassword !== confirmPassword);
};

const handleChangeConfirmPassword = (e) => {
  const enteredConfirmPassword = e.target.value;
  setConfirmPassword(enteredConfirmPassword);
  // Check if passwords match
  setPasswordMismatch(password !== enteredConfirmPassword);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
  if (passwordMismatch) {
      setPasswordMismatch(false); // Reset password mismatch error when password changes
  }
};

const handleConfirmPasswordChange = (e) => {
  const enteredConfirmPassword = e.target.value;
  setConfirmPassword(enteredConfirmPassword);
  // Check if passwords match
  setPasswordMismatch(password !== enteredConfirmPassword);
};

  function sendCusDetails(e){
    e.preventDefault();
    try{
      toggleLoading(true);

    // Check if the phone number has exactly 9 digits
  if (contact.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return; // Exit the function if the phone number is not valid
  }
   
    const newCustomer = {
      Name,
      contact,
      email,
      password,
      address
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer)
    };
    
   
    fetch(`${process.env.React_App_Backend_URL}/api/customer/signup/add-customer`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert("Registration Successfull");
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
              <Form onSubmit={sendCusDetails}>
                <Card style={{marginTop:"40px"}}>
                <Card.Body>
                <h1>Sign Up</h1>
              
                <Form.Group as={Col} controlId="formGridExtra1">
                <Form.Label>Name*</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Abby Jones"
                        rows={1}
                        value={Name}
                        onChange={handleChangeName}
                        isInvalid={/\d/.test(Name)} // Check if the value contains numbers
                    />
                    {/* Display warning icon if contains numbers */}
                    {/\d/.test(Name) && (
                        <InputGroup.Text>
                            <BsExclamationTriangleFill color="red" />
                        </InputGroup.Text>
                    )}
                    {/* Display feedback message if contains numbers */}
                    <Form.Control.Feedback type="invalid">
                        Cannot enter numbers
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

               <Form.Group as={Col} controlId="formGridExtra2">
                <Form.Label>Contact No*</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="xxx xx xx xxx"
                    rows={1}
                    value={contact}
                    onChange={handleChangeContact}
                    isInvalid={!isValid}
                    maxLength={10}
                />
                {/* Display feedback message based on validation */}
                <Form.Control.Feedback type="invalid">
                    {isValid ? null : "Please enter exactly 10 digits."}
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email *</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChangeEmail}
                        isInvalid={!isValidEmail}
                    />
                    {/* Display feedback message based on email validity */}
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                </InputGroup>
               </Form.Group>

               <Form.Group as={Col} controlId="formGridExtra3">
                <Form.Label>Password *</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        value={password}
                        onChange={handleChangePassword}
                        isInvalid={
                            warnings.capitalLetter ||
                            warnings.simpleLetter ||
                            warnings.specialCharacter ||
                            warnings.number ||
                            warnings.minLength
                        }
                    />
                    {/* Display feedback message based on validation */}
                    <Form.Control.Feedback type="invalid">
                        {warnings.capitalLetter && "Password must contain at least one capital letter."}<br />
                        {warnings.simpleLetter && "Password must contain at least one simple letter."}<br />
                        {warnings.specialCharacter && "Password must contain at least one special character."}<br />
                        {warnings.number && "Password must contain at least one number."}<br />
                        {warnings.minLength && "Password must be at least 8 characters long."}
                    </Form.Control.Feedback>
                      {/* Toggle password visibility */}
        <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            {showPassword ? <BsFillEyeSlashFill color="green" /> : <BsFillEyeFill color="green" />}
        </InputGroup.Text>
    </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password *</Form.Label>
                <div className="d-flex align-items-center"> {/* Wrap label and input with flex */}
                <Form.Control 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    isInvalid={passwordMismatch}
                />
                 {/* Toggle button for password visibility */}
        <Button variant="light" onClick={() => setConfirmShowPassword(!showConfirmPassword)} className="toggle-password-button">
            {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
        </Button>
        </div>
                {/* Display password mismatch error */}
                <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                </Form.Control.Feedback>
                </Form.Group>

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
            <a href={cuslogin_frontendurl} class="link-info"> Sign in</a></center></p>
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