import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import UpdateSolutionModal from './UpdateSolutionModal';

const ConsultancyPage = () => {
  const navigate = useNavigate();
  //const { id } = useParams();
  const [Consultation, setConsultation] = useState([]);
  const [consultation, setFetchedConsultation] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  //Get all the consultations from the db
  useEffect(() => {
    const fetchConsultations = async() => {
      try{
        const response = await fetch("http://localhost:5000/cam/consultation/get-issues");

        if(!response.ok){
          throw new Error(`HTTP error! Status:${response.status}`);
        }
        const data = await response.json();
        setConsultation(data.consultations);
      }catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchConsultations();
},  []);

//Get consultations by Id
const id = "661b58073ea6d30a9cf8d6e4";
const fetchConsultationById = async (id) => {
  try{
    const response = await fetch(
      `http://localhost:5000/cam/consultation/get-issue/${id}`
    );

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched consultation from fetch:", data);
    setFetchedConsultation(data);
  }catch (error) {
    console.error("Error fetching consultation:", error);
    return null;
  }
};
useEffect(() => {
  fetchConsultationById(id);   
}, [id]);


/*----Parts regarding rendering employee personal details-------*/
  console.log("Rendering modal with feedback data:", Consultation);
  if (!Consultation) return null;
  //destructure Feedback object
  const {
    _id,
    serviceType,
    employee,
    feedback,
    files,
    filesUrls,
    _v,
  } = Consultation

//when post button clicks
const handleMoreButtonClick = async (consultId) => {
  navigate(`consultDetails/${consultId}`);
};
//when update button clicks
const handleUpdateClick = () => {
  setShowUpdateModal(true);
};
// Handle update consultation
const handleUpdateConsultation = async (updatedData) => {
  // Logic to update employee data
  console.log("Updated consultation data:", updatedData);
  fetchConsultationById(id); //this used because of error
  setShowUpdateModal(false); // Close the update modal
};
//when delete button clicks
const handleDeleteClick = () => {
  // Show confirmation dialog box
  setShowConfirmDelete(true);
};

const handleConfirmDelete = async () => {
  try{
    await fetch(`http://localhost:5000/cam/feedback/delete-feedback/${_id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      // Optionally, include credentials if necessary
      // credentials: 'include',
    });

    // Close the modal
    setShowConfirmDelete(false);
    //relaod the feedback page after deletion
    navigate("customer/cusaffairs/allfeedback");
  }catch (error) {
    console.error("Error deleting feedback:", error);
    // Handle error (e.g., display error message)
  }
};

const handleCancelDelete = () => {
  // Close the confirmation dialog box
  setShowConfirmDelete(false);
};

  return(
    <main>
      <div>
        <h2><b>Issues</b></h2>
          <Form>
            <Accordion defaultActiveKey="0">
              {Consultation.map((consultation, index) => (
                <Accordion.Item key={index} eventKey={consultation._id.toString()} style={{marginTop:"5px"}}>
                  <Accordion.Header style={{fontWeight:"bold"}}>
                    Vehicle Type : {consultation.vehicleType}<br></br>
                    Component : {consultation.component}<br></br>
                    Issue : {consultation.issue}<br></br>
                  </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                <Button variant="success" size='md'
               onClick={() => handleMoreButtonClick(consultation._id)}
               >Post Solution</Button>
                <Form.Group as={Col} controlId="solutionToupdate" style={{marginTop:"5px"}}>
                 <Form.Label>Solution from the Experts</Form.Label>
                 <Form.Control
                   as="textarea"
                   type="textarea"
                   placeholder="Answer Pending..."
                   rows={4}
                   value={consultation.solution}/>
               </Form.Group>
               <Button
              variant="dark"
              onClick={handleUpdateClick}
              style={{margin: "10px"}}
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteClick}
              style={{margin: "10px"}}
            >
              Delete
            </Button>
                </Row>
             </Accordion.Body>
          </Accordion.Item>))}
        </Accordion>
       </Form> 
       {/* Render the FeedbackUpdateModal when showUpdateModal is true */}
   {showUpdateModal && (
    <UpdateSolutionModal
    show={showUpdateModal}
    onHide={() => setShowUpdateModal(false)}
    Consultation={Consultation}
    onUpdate={handleUpdateConsultation}
    />
   )}
   {/* confirmation dialog box */}
       <Modal
        show={showConfirmDelete}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Solution?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>     
    </div>
  </main>
  );
};

export default ConsultancyPage;
