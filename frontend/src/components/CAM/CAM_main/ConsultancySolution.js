import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'

function ConsultancySolution({ toggleLoading }){
    const navigate = useNavigate();
    const { consultId } = useParams();
    const [consultation, setConsultation] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [solution, setSolution] = useState("");

useEffect(() => {
  const fetchConsultationById = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/get-consultid/${consultId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setConsultation(data);
    } catch (error) {
      console.error("Error fetching consultation:", error);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  fetchConsultationById();
}, [consultId]);

if (!consultation) {
  return <div>Loading...</div>;
}

  const handleSolutionChange = (event) => {
    setSolution(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/update-solutionbyid/${consultId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solution: solution }),
      },
      alert("Solution added Successfully!"),
      navigate("/staff/cam")
    );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the solution field after successful submission
      setSolution("");
    } catch (error) {
      console.error("Error updating solution:", error);
      // Handle error (e.g., display error message)
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

    return(
        <div>
         <main style={{marginLeft:"20px"}}>
          <Card style={{height:"100%"}}>
            <Card.Body>
            <Container>
             <Row>
              <Col>
              <div>
                {consultation.map((consult, index) => (
                <div key={index}>
               <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Vehicle Type:</strong> {consult.vehicleType}
                   </Col>
                 </Row>
                 <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Component where the issue is occuring:</strong> {consult.component}
                   </Col>
                 </Row>
                 <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Description of the issue:</strong> {consult.issue}
                   </Col>
                 </Row>
                 <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Attached Files:</strong> {consult.filesUrls}
                   </Col>
                 </Row>
                 </div>
                 ))}
                 </div>
                 <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="solutionToupdate" style={{marginTop:"5px"}}>
                 <Form.Label><strong>Solution from the Expert</strong></Form.Label>
                    <Form.Control
                    //placeholder="Solution..." 
                    value={solution}
                    onChange={handleSolutionChange}
                    />
               </Form.Group>
                </Row>
                 <Row className="mb-3">
                   <Button variant="success" type="submit" 
                   style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}>
                   Post Solution
                   </Button>
                 </Row>
               </Form>
             </Col> 
             </Row>   
    </Container>
    </Card.Body>
    </Card>
   </main>
</div>
    );

}
export default ConsultancySolution;