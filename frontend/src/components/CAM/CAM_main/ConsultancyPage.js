import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function ConsultancyPage() {

  const navigate = useNavigate();
  const [Issues, setIssues] = useState([]);
  const [solution, setUpdatedSolution] = useState("");

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

  const fetchIssueById = async (consultationId) => {
    try{
      const response = await fetch(
        `http://localhost:5000/cam/consultation/get-issue/${consultationId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data from fetch:", data);
      return data;
    }catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const submitSolutionById = async () => {
    try{
      const id = "consultsbm4";
      const response = await 
      axios.put(`http://localhost:5000/cam/consultation/update-solution/${id}`, {solution});
      if (response.status === 200) {
        alert("Solution posted successfully");
        setUpdatedSolution("");
    } else {
        alert("Failed to post solution");
    }
} catch (error) {
    console.error("Error posting solution:", error);
    alert("Error posting solution");
}
  } 

  return(
    <main>
          <div>
              <h2><b>Issues</b></h2>
              <Form>
              <Accordion defaultActiveKey="0">
                  {Issues.map((issue, consultationId) => (
                      <Accordion.Item key={issue.consultationId} eventKey={consultationId.toString()} style={{marginTop:"5px"}}>
                        <Accordion.Header style={{fontWeight:"bold"}}>
                          Consultation ID : {issue.consultationId}<br></br>
                          Vehicle Type : {issue.vehicleType}<br></br>
                          Component :   {issue.component}<br></br>
                          Issue :       {issue.issue}<br></br>
                        </Accordion.Header>
                        <Accordion.Body>
                        <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra" style={{marginTop:"5px"}}>
                 <Form.Label>Solution from the Experts</Form.Label>
                 <Form.Control
                   as="textarea"
                   type="textarea"
                   placeholder="Answer Pending..."
                   rows={4}
                   value={solution}
                   onChange={(e) => setUpdatedSolution(e.target.value)}
                />
               </Form.Group>
          </Row>
          <Row className="mb-3">
               <Button variant="secondary" size='md' 
               style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}
               onClick={submitSolutionById}
               >
                 Post
               </Button>
             </Row>
          </Accordion.Body>
          </Accordion.Item>))}
            </Accordion>
            </Form>      
            </div>
    </main>
  );
};

export default ConsultancyPage;
