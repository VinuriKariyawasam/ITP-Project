import React, { useEffect, useState ,useContext} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CusAuthContext } from '../../../context/cus-authcontext';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

import customerlogo from '../../../images/customerlogo.png'

const CusProfile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [formData, setFormData] = useState({
      Name: '',
      contact: '',
      email: '',
      password: '',
      address: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
    const id = "6616d414dadd3f1fd0cca11b"
          fetch(`http://localhost:5000/api/customer/signup/get-customer/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setFormData(data);
          })
          .catch ((error) =>
          console.error('Error fetching customer:', error));
    },[id]);

const handleFormSubmit = (e) => {
  e.preventDefault();
  const id = "6616d414dadd3f1fd0cca11b";
  fetch(`http://localhost:5000/api/customer/signup/update-customer/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
  })
  .then(() => {
    console.log("Details updated successfully");
    alert("Details updated successfully")
    navigate(-1);
  })
  .catch((error) => console.error("Error updating details:",error));
};

const handleDeleteCustomer = () => {
  const id = "6616d414dadd3f1fd0cca11b";
   setCustomerToDelete(id);
}

const deleteCustomer = () => {
  const id = "6616d414dadd3f1fd0cca11b";
  const shouldDelete = window.confirm("Confirm Delete");
  if(shouldDelete){
  fetch(
    `http://localhost:5000/api/customer/signup/delete-customer/${id}`,
    {
      method: "DELETE",
    }
  )
  .then((response) => response.json())
  .then((data) => {
    alert("Account deleted successfully");
    console.log("Account deleted successfully");
  })
  .catch((error) => console.error("Error deleting Account:", error));
}};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleCancel = () => {
  // Navigate back to the previous page
  navigate(-3);
};
    return(
        <div>
        <main id="main" style={{marginLeft:"20px",marginTop:"1px"}}>
           <Container>
            <Row>
             <Col>
              <Form onSubmit={handleFormSubmit}>
                <Card>
                <Card.Body>
                <h1>PROFILE</h1>
                <img src={customerlogo} alt="Profile" 
                className="rounded-circle" 
                style={{marginLeft:"0px",width:"100px",height:"100px"}}/>
                <h4 style={{marginRight:"100px"}}>Welcome! {formData.Name}</h4>
                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridExtra1">  
                     <Form.Label>Name</Form.Label>   
                     <Form.Control
                        type="text"
                        rows={1}  
                        value={formData.Name} 
                        onChange={handleChange}             
                    />
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridExtra2">
                     <Form.Label>Contact No</Form.Label>
                     <Form.Control
                        required
                        type="tel"
                        rows={1}
                        value={formData.contact}
                    />
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Email"
                    value={formData.email}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                 <Form.Label>Password</Form.Label>
                 <Form.Control 
                  type="password" 
                  placeholder="Password"
                  value={formData.password} 
                  />
                </Form.Group>
                </Row>
                <Row className="mb-3">
                 <Form.Group as={Col}>
                 <Form.Label>Address</Form.Label>
                 <Form.Control 
                  placeholder="1234 Main St"
                  value={formData.address}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                <a href="#" className="link-success">change password</a>
                </Form.Group>
                 </Row>
                 <Row>
                  <Col>
                 <Card>
                  <Card.Body style={{height:"100px"}}>
                  
                  </Card.Body>
                  </Card>
                 </Col>
                 <Col>
                 <Card>
                  <Card.Body style={{height:"100px"}}>
                  
                  </Card.Body>
                  </Card>
                 </Col>
                 </Row>
                  <br></br>
                  <Button variant="warning" 
                  style={{marginLeft:"400px"}}
                  type='submit'
                  //onClick={handleFormSubmit}
                  >
                   Update Profile</Button>{' '}
                  <button type="button" 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  >
                   Cancel</button>
                  <Button variant="danger"
                  style={{marginLeft:"50px"}}
                  onClick={deleteCustomer}
                  >
                   Delete Profile</Button>{' '}
            </Card.Body>
             </Card>
              </Form>
              </Col>
              </Row>
    </Container>
   </main>
</div>
    );

}
export default CusProfile;