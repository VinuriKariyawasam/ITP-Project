import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext";
import { useContext } from "react";

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

function MyFeedback() {
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
  const fetchFeedbackById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cam/feedback/get-feedback/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched feedback from fetch:", data);
      setFetchedFeedback(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Function to handle update click
  const handleUpdateClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowUpdateModal(true);
  };

  // Function to handle update feedback
  const handleUpdateFeedback = async (updatedData) => {
    // Logic to update feedback data
    console.log("Updated feedback data:", updatedData);
    fetchFeedbackById(id);
    setShowUpdateModal(false); // Close the update modal
  };

  //Deletion of feedback
  
  const handleDeleteClick = () => {
    // Show confirmation dialog box
    setShowConfirmDelete(true);
  };

  const handleDelete = async (userId) => {
    try {
      // Send DELETE request to backend API using fetch
      await fetch(`http://localhost:5000/cam/feedback/delete-feedback/${userId}`, {
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
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog box
    setShowConfirmDelete(false);
  };

  return (
    <main>
      <Card style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        <Card.Body>
          <PageTitle_cam path="feedback / Myfeedback" title="My Feedback" />
          <Row>
            <Col>
              <div className="card mb-3">
                {Feedback.map((feedback, index) => (
                  <div key={index}>
                    <img src={feedbackimg1} style={{ height: "200px" }} alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">
                        Service Type: {feedback.serviceType} <br /><br/>
                        Specific Employee mentioned: {feedback.employee} <br/><br/>
                        Feedback: {feedback.feedback} <br />
                      </h5>
                      <p className="card-text">
                        <small className="text-muted">You can only delete your FeedBack</small>
                      </p>
                      <Button variant="dark" size="md" onClick={() => handleDelete(feedback.userId)}>
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
                      <img src={cusimage3} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img src={cusimage2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={cusimage3} className="d-block w-100" alt="..." />
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
        </Card.Body>
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
      </Card>
    </main>
  );
}

export default MyFeedback;
