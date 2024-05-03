import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

import feedbackimg1 from "../../../../../src/images/cam/feedbackimg1.jpeg";
import cusimage3 from "../../../../../src/images/cam/cusimage3.jpg";
import cusimage2 from "../../../../../src/images/cam/cusimage2.jpg";
import PageTitle_cam from "./PageTitle_cam";

import FeedbackUpdateModal from "./FeedbackUpdateModal";

function MyFeedback({ toggleLoading }) {
  const navigate = useNavigate();
  const cusAuth = useContext(CusAuthContext);
  const id = cusAuth.userId;
  

  // State to store the selected feedback for update
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [Feedback, setFetchedFeedback] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (cusAuth.userId) {
      fetchFeedbackById(cusAuth.userId);
    }
  }, [cusAuth.userId]);



  // Function to fetch feedback from the database
  const fetchFeedbackById = async () => {
    try {
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/cam/feedback/get-feedback/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched feedback from fetch:", data);
      setFetchedFeedback(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };

  // Function to handle update click
  const handleUpdateClick = (feedback) => {
    console.log("Selected Feedback:", feedback);
    setSelectedFeedback(feedback);
    setShowUpdateModal(true);
  };

  // Function to handle update feedback
  const handleUpdateFeedback = async (updatedData) => {
    // Logic to update feedback data
    console.log("Updated feedback data:", updatedData);
    fetchFeedbackById(Feedback.feedbackId);
    setShowUpdateModal(false); // Close the update modal
  };

  //Deletion of feedback
  const handleDeleteClick = () => {
    // Show confirmation dialog box
    setShowConfirmDelete(true);
  };

  const handleDelete = async (feedbackId) => {
    try {
      toggleLoading(true);
      // Send DELETE request to backend API using fetch
      await fetch(`${process.env.React_App_Backend_URL}/cam/feedback/delete-feedback/${feedbackId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
        },
      },
      alert("Feedback Deleted successfully!"),
      navigate("/customer/cusaffairs/allfeedback")
    );

      // Close the modal
      setShowConfirmDelete(false);

      // Reload the employee page after deletion
      //navigate("/customer/cusaffairs/feedback");
    } catch (error) {
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

  return (
    <main>
     
         <h2 style={{fontFamily:"sans-serif",color:"darkslateblue",marginLeft:"20px"}}><b>My FeedBack</b></h2>
          <Row>
            <Col>
              <div className="card mb-3" style={{marginLeft:"20px"}}>
                {Feedback.map((feedback, index) => (
                  <div key={index}>
                   {feedback.fileUrls.map((fileUrl, i) => (
                      <img key={i} src={fileUrl} style={{ height: "150px",marginLeft:"10px",marginTop:"10px" }} alt="Feedback Image" />
                    ))}
                    <div className="card-body">
                      <h5 className="card-title">
                        Service Type: {feedback.serviceType}<br></br>
                        Specific Employee mentioned: {feedback.employee} <br></br><br></br>
                        Feedback: {feedback.feedback} <br></br>
                      </h5>
                      <Button variant="dark" size="md" style={{marginRight:"10px"}} onClick={() => handleUpdateClick(feedback)}>
                    Update
                    </Button>
                      <Button variant="dark" size="md" onClick={() => handleDelete(feedback.feedbackId)}>
                    Delete
                    </Button>
                    </div>
                  </div>
                ))}
              </div>
              
            </Col>
            <Col>
              <div className="card mb-3">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                      <img src={cusimage3} className="d-block w-100" alt="..." style={{height:"450px"}}/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img src={cusimage2} className="d-block w-100" alt="..." style={{height:"450px"}}/>
                    </div>
                    <div className="carousel-item">
                      <img src={cusimage3} className="d-block w-100" alt="..." style={{height:"450px"}}/>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        
        {/* Render the FeedbackUpdateModal when showUpdateModal is true */}
        {showUpdateModal && (
          <FeedbackUpdateModal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
            feedback={selectedFeedback}
            onUpdate={handleUpdateFeedback}
          />
        )}
        {/* confirmation dialog box */}
        <Modal 
        show={showConfirmDelete} 
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this Feedback?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="danger">Delete</Button>
          </Modal.Footer>
        </Modal>
     
    </main>
  );
}

export default MyFeedback;
