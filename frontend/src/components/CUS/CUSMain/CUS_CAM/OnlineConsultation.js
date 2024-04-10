import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';

import axios from 'axios';

function OnlineConsultation(){

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      vehicleType: "",
      component: "",
      issue: "",
      solution: "",
  });

  const [vehicleType, setvehicleType] = useState("");
  const [component, setcomponent] = useState("");
  const [issue, setIssue] = useState("");
  const [files, setFiles] = useState("");
  const [solution, setUpdatedSolution] = useState("");

  const [Issues, setIssues] = useState([]);

  function sendIssue(e){
    e.preventDefault();

    const newConsultation = {
      vehicleType,
      component,
      issue,
      files,
      solution
    };

    axios
      .post("http://localhost:5000/cam/consultation/add-issue", newConsultation)
      .then(() => {
        alert("Issue Added");
        console.log(newConsultation);
        window.location.reload()
        //setIssue("");
        //setFiles("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    function getIssues() {
      axios.get("http://localhost:5000/cam/consultation/get-issues")
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => {
        alert("error");
      });
    }
    getIssues();
  }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

    return(
    <div>
     <main id="main" style={{marginLeft:"20px"}}>
      <Card style={{height:"100%"}}>
        <Card.Body style={{alignContent:"center"}}>
        <h2 style={{marginTop:"5px"}}>Have a Question? Ask Us!</h2>
        <Container>
         <Row>
          <Col>
           <Form onSubmit={sendIssue}>
           <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra">  
                  <Form.Label>Type of the Vehicle</Form.Label>   
                  <Form.Control
                     as="textarea"
                     required
                     type="textarea"
                     placeholder="Model/Type"
                     rows={1}
                     value={vehicleType}
                     onChange={(e) => setvehicleType(e.target.value)} //one person can have more than 1 car                    
                 />
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra">
                  <Form.Label>Component where the issue is occuring</Form.Label>
                  <Form.Control
                     as="textarea"
                     required
                     type="textarea"
                     placeholder="ex:Engine/ Tires/ BreakSystem/ GearBox"
                     rows={1}
                     value={component}
                     onChange={(e) => setcomponent(e.target.value)}
                 />
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra">
                  <Form.Label>Description of the issue</Form.Label>
                  <Form.Control
                     as="textarea"
                     required
                     type="textarea"
                     placeholder="your issue"
                     rows={3}
                     value={issue}
                     onChange={(e) => setIssue(e.target.value)}
                 />
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group style={{marginTop: "3px"}} controlId="formFileDocuments">
                 <Form.Label>Attach Files</Form.Label>
                 <Form.Control
                    type="file"
                    multiple
                    value={files}
                    onChange={(e) => setFiles(e.target.value)}
                 />
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Button variant="success" type="submit" 
               style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}>
               Ask from the Expert
               </Button>
             </Row>
           </Form>
         </Col>
         <Col> 
         <Form>
          <Accordion defaultActiveKey="0">
                  {Issues.map((issue, id) => (
                      <Accordion.Item key={issue.id} eventKey={id.toString()} style={{marginTop:"5px"}}>
                        <Accordion.Header style={{fontWeight:"bold"}}>
                          Vehicle Type : {issue.vehicleType}<br></br>
                          Component :   {issue.component}<br></br>
                          Issue :       {issue.issue}<br></br>
                        </Accordion.Header>
                        <Accordion.Body>
                        <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra" style={{marginTop:"5px"}}>
                 <Form.Label>Solution from our Experts</Form.Label>
                 <Form.Control
                   as="textarea"
                   type="textarea"
                   placeholder="Answer Pending..."
                   rows={4}
                   readOnly
                />
               </Form.Group>
          </Row>
          </Accordion.Body>
          </Accordion.Item>))}
            </Accordion>
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

export default OnlineConsultation;