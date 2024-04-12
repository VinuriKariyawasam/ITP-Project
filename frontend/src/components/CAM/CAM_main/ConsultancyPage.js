import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

const ConsultancyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Issues, setIssues] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [consultToDelete, setconsultToDelete] = useState(null);
  const [solution, setUpdatedSolution] = useState("");
  const [formData, setFormData] = useState({
    //vehicleType: "",
    //component: "",
    //issue: "",
    solution: "",
  });

  function sendSolution(e){
    e.preventdefault();

  }

  useEffect(() => {
      fetch("http://localhost:5000/cam/consultation/get-issues")
      .then((response) => response.json())
      .then((data) => setIssues(data))  
      .catch((error) => console.error("Error fetching issues:", error));   
  }, []);

  const handleEditIssue = (id) => {
    navigate(`edit-solution/${id}`);
  };

  const handleDeleteIssue = (id) => {
    setconsultToDelete(id);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/cam/consultation/update-solution/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(() => {
      console.log("Solution updated successfully");
      navigate(-1);
    })
    .catch((error) => console.error("Error updating solution:",error));
  };

  const confirmDeleteIssue = () => {
    fetch(
      `http://localhost:5000/cam/consultation/delete-solution/${consultToDelete}`,
      {
        method: "DELETE",
      }
    )
    .then((response) => response.json())
    .then((data) => {
      console.log("Consultation deleted successfully");
      //update the state by removing the deleted consultation
      setIssues(Issues.filter((inc) => inc._id !== consultToDelete));
      //close the modal after deletion
      setShowDeleteModal(false);
    })
    .catch((error) => console.error("Error deleting income:", error));
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return(
    <main>
      <div>
        <h2><b>Issues</b></h2>
          <Form>
            <Accordion defaultActiveKey="0">
              {Issues.map((issue, index) => (
                <Accordion.Item key={issue._id} eventKey={issue._id.toString()} style={{marginTop:"5px"}}>
                  <Accordion.Header style={{fontWeight:"bold"}}>
                    Vehicle Type : {issue.vehicleType}<br></br>
                    Component : {issue.component}<br></br>
                    Issue : {issue.issue}<br></br>
                  </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                <Button variant="success" size='md'
               onClick={() => handleDeleteIssue(issue._id)}>
                  Post Solution</Button>
                <Form.Group as={Col} controlId="solutionToupdate" style={{marginTop:"5px"}}>
                 <Form.Label>Solution from the Experts</Form.Label>
                 <Form.Control
                   as="textarea"
                   type="textarea"
                   placeholder="Answer Pending..."
                   rows={4}/>
               </Form.Group>
                </Row>
             </Accordion.Body>
          </Accordion.Item>))}
        </Accordion>
       </Form>      
    </div>
    {/*update modal*/}
    <Modal show={showDeleteModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Solution</Modal.Title>
      </Modal.Header>
      <Modal.Body>update solution
      <Form onSubmit={handleFormSubmit}>
   <Form.Group as={Col} controlId="solution" style={{marginTop:"5px"}}>
      <Form.Label>Solution from the Experts</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Answer Pending..."
          rows={4}
          value={formData.solution}
          //onChange={handleChange}
          />
    </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button className='cam-editbtn' variant="dark" size="md" type="submit">Update</Button>
     <Button className='cam-deletebtn' variant="dark" size="md" onClick={confirmDeleteIssue}>Delete</Button>
     <Button className='cam-gotobtn' variant="dark" size="md" onClick={handleCloseModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  </main>
  );
};

export default ConsultancyPage;
