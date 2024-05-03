import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { CusAuthContext } from "../../../context/cus-authcontext";
import { useContext } from "react";


import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import FeedbackReviewModal from './FeedbackReviewModal';

const ConsultancyPage = ({ toggleLoading }) => {
  const navigate = useNavigate();

  const cusAuth = useContext(CusAuthContext);
  const id = cusAuth.userId;

  const [Consultation, setConsultation] = useState([]);
  const [consultation, setFetchedConsultation] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [consultIdToDelete, setConsultIdToDelete] = useState('');
  const [newsolution, setnewSolution] = useState("");

  //Get all the consultations from the db
  useEffect(() => {
    const fetchConsultations = async() => {
      try{
        toggleLoading(true);
        const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/get-issues`);

        if(!response.ok){
          throw new Error(`HTTP error! Status:${response.status}`);
        }
        const data = await response.json();
        setConsultation(data.consultations);
        console.log(consultation);
        // Calculate the count of feedback
        const consultationCount = data.consultations.length;
        console.log("Feedback count:", consultationCount);
      }catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        toggleLoading(false); // Set loading to false after API call
      }
    }
    fetchConsultations();
},  []);


//Get consultations by Id

const fetchConsultationById = async () => {
  try{
    toggleLoading(true);
    const response = await fetch(
      `${process.env.React_App_Backend_URL}/cam/consultation/get-consultid/${id}`
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
  }finally {
    toggleLoading(false); // Set loading to false after API call
  }
};

/*----Parts regarding rendering employee personal details-------*/
  console.log("Rendering modal with feedback data:", Consultation);
  if (!Consultation) return null;

  const {
    _id,
    userId,
    consultId,
    vehicleType,
    component,
    issue,
    filesUrls,
    solution
  } = consultation;
  
//when post button clicks
const handleMoreButtonClick = async (consultId) => {
  navigate(`consultDetails/${consultId}`);
};
//when update button clicks
const handleUpdateClick = (consultId) => {
  //setConsultIdToDelete(consultId);
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

const handleConfirmDelete = async (consultId) => {
  try{
    toggleLoading(true);
    const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/delete-solutionbyid/${consultId}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Solution Deleted successfully!")
    console.log("Solution Deleted successfully!")
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Close the modal
    setShowConfirmDelete(false);
    window.location.reload();
    //navigate("customer/cusaffairs/allfeedback");
  }catch (error) {
    console.error("Error deleting feedback:", error);
    // Handle error (e.g., display error message)
  }finally {
    toggleLoading(false); // Set loading to false after API call
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
                    Customer Name : {consultation.name}<br></br>
                    Vehicle Type : {consultation.vehicleType}<br></br>
                    Component : {consultation.component}<br></br>
                    Issue : {consultation.issue}<br></br>
                  </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                <Button variant="success" size='md'
               onClick={() => handleMoreButtonClick(consultation.consultId)}
               >Post Solution</Button>
                <Form.Group as={Col} controlId="solutionToupdate" style={{marginTop:"5px"}}>
                 <Form.Label>Solution from the Experts</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Answer Pending..."
                   rows={4}
                   value={consultation.solution}/>
               </Form.Group>
               <Button
              variant="danger"
              //onClick={() => handleDeleteClick(consultation.consultId)}
              onClick={() => handleConfirmDelete(consultation.consultId)}
              style={{marginTop: "10px"}}
            >
              Delete Solution
            </Button>
                </Row>
             </Accordion.Body>
          </Accordion.Item>))}
        </Accordion>
       </Form> 
       {/* Render the FeedbackUpdateModal when showUpdateModal is true */}
   {showUpdateModal && (
    <FeedbackReviewModal
    show={showUpdateModal}
    onHide={() => setShowUpdateModal(false)}
    Consultation={Consultation}
    onUpdate={handleUpdateConsultation}
    />
   )}
   {/* confirmation dialog box */}
       <Modal
        show={showConfirmDelete}
        onHide={handleCancelDelete}
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
