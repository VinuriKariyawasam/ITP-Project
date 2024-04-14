import React, {useEffect,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

import feedbackimg1 from "../../../../../src/images/cam/feedbackimg1.jpeg";
import cusimage3 from "../../../../../src/images/cam/cusimage3.jpg";
import cusimage2 from "../../../../../src/images/cam/cusimage2.jpg";
import PageTitle_cam from "./PageTitle_cam";

import FeedbackUpdateModal from "./FeedbackUpdateModal";

function MyFeedback(){
    const navigate = useNavigate();
    //const {id} = useParams();
    const [Feedback, setFetchedFeedback] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //Function to fetch feedback by db
    const id = "661acdabdf700d23ad34d0ad";
    const fetchFeedbackById = async (id) => {
      try{
        const response = await fetch(
          `http://localhost:5000/cam/feedback/get-feedback/${id}`
        );

        if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched feedback from fetch:", data);
        setFetchedFeedback(data);
      }catch (error) {
        console.error("Error fetching feedback:", error);
        return null;
      }
    };
    useEffect(() => {
       fetchFeedbackById(id);   
    }, [id]);

     /*----Parts regarding rendering employee personal details-------*/
  console.log("Rendering modal with feedback data:", Feedback);
  if (!Feedback) return null;
  //destructure Feedback object
  const {
    _id,
    serviceType,
    employee,
    feedback,
    files,
    filesUrls,
    _v,
  } = Feedback

 /*----Parts regarding updating feedback-------*/
  //render update modal
  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };
  // Handle update feedback
  const handleUpdateFeedback = async (updatedData) => {
    // Logic to update employee data
    console.log("Updated employee data:", updatedData);
    fetchFeedbackById(id); //this used because of error
    setShowUpdateModal(false); // Close the update modal
  };

   /*------parts regarding feedback delete-----*/
   const handleDeleteClick = () =>{
    //show confirmation dialog box
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
        <Card style={{marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}>
            <Card.Body>
            <PageTitle_cam path="feedback / Myfeedback" title="My FeedBack" />
            <Row>
                    <Col>
                    <div className="card mb-3">
                      <img src={feedbackimg1} style={{height:"200px"}} alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title"> 
                      Service Type:{serviceType}  <br></br>
                      FeedBack:{feedback} <br></br>
                      Ratings:
                      </h5>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                    <Button 
                    variant="dark" 
                    size="md" 
                    onClick={handleUpdateClick}>
                    Update</Button>
                    <Button 
                    variant="dark" 
                    size="md"
                    style={{marginLeft:"5px"}}
                    onClick={handleDeleteClick}>
                    Delete</Button>
                    </Col>
                    <Col>
                    <div className="card mb-3">
                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={cusimage3} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={cusimage2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={cusimage3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
  </div>
    </Col>
     </Row>
   </Card.Body>
   {/* Render the FeedbackUpdateModal when showUpdateModal is true */}
   {showUpdateModal && (
    <FeedbackUpdateModal
    show={showUpdateModal}
    onHide={() => setShowUpdateModal(false)}
    Feedback={Feedback}
    onUpdate={handleUpdateFeedback}
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
        <Modal.Body>Are you sure you want to delete this FeedBack?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
   </Card>
    </main>
    );
}

export default MyFeedback;