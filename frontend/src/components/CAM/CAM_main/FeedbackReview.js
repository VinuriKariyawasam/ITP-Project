import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { CusAuthContext } from "../../../../context/cus-authcontext";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import html2pdf from "html2pdf.js";
import { Container } from "react-bootstrap";
import logo from "../../../images/logoblack_trans.png";
import { StaffAuthContext } from "../../../context/StaffAuthContext";
import FeedbackReviewModal from "./FeedbackReviewModal";

function FeedbackReview({ toggleLoading }){
  const { userId, userPosition } = useContext(StaffAuthContext);
    //const cusauth = useContext(CusAuthContext);
    const navigate = useNavigate();
    const [Feedback, setfeedback] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        const fetchFeedbacks = async() => {
          try{
            toggleLoading(true);
            const response = await fetch(`${process.env.React_App_Backend_URL}/cam/feedback/get-feedbacks`);

            if(!response.ok){
              throw new Error(`HTTP error! Status:${response.status}`);
            }
            const data = await response.json();
            setfeedback(data.feedbacks);
          }catch (error) {
            console.error("Error fetching data:", error);
          }finally {
            toggleLoading(false); // Set loading to false after API call
          }
        }
        fetchFeedbacks();
    },  []);

    // Function to handle update click
  const handleUpdateClick = () => {
    //console.log("Selected Feedback:", feedback);
    //setSelectedFeedback(feedback);
    setShowUpdateModal(true);
  };

  // Function to handle update feedback
  const handleUpdateFeedback = async (updatedData) => {
    // Logic to update feedback data
    //console.log("Updated feedback data:", updatedData);
    //fetchFeedbackById(Feedback.feedbackId);
    setShowUpdateModal(false); // Close the update modal
  };

    /*----Parts regarding generate pdf from employee personal details-------*/
  const generatePDF = () => {
    const element = document.querySelector(".feedbackDetails"); // Select the container to convert to PDF
    if (!element) {
      console.error("Container element not found");
      return;
    }

      // Add header content
      const headerContent = `
      <div >
        <h4 class="float-end font-size-15">Customer Affairs</h4>
        <div class="mb-4">
          <img src="${logo}" alt="Invoice Logo" width="200px" />
        </div>
        <div class="text-muted">
        <p class="mb-1"><i class="bi bi-geo-alt-fill"></i>323/1/A Main Street Battaramulla</p>
        <p class="mb-1">
        <i class="bi bi-envelope-fill me-1"></i> info@neotech.com
        </p>
        <p>
        <i class="bi bi-telephone-fill me-1"></i> 0112887998
        </p>
        <p>Authorized By: ${userPosition}</p>
        <p>Generated Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <hr/>
        </div>
      `;
      // Create wrapper div to contain both header, employee list, and footer
    const wrapper = document.createElement("div");
    wrapper.innerHTML = headerContent;
    wrapper.appendChild(element.cloneNode(true));

    const opt = {
      margin: 0.5,
      filename: "feedback_Details.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
    .from(wrapper)
    .set(opt)
    .save(); // Generate and save the PDF
  };

    return(
        <main>
            <div>
                <Row>
                    <Col>
            <Container className="feedbackDetails">
                    {Feedback.map((feedback, index) => (
                    <div key={index}>
                    <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">
                      Customer Name : {feedback.name}<br></br> 
                      Service Type : {feedback.serviceType}<br></br>
                      Specific Employee mentioned : {feedback.employee}<br/><br/>
                      FeedBack : {feedback.feedback}<br></br>
                      </h5>
                    </div>
                    </div>
                    </div>
                    ))}
                   </Container>
                   <Button
              variant="primary"
              onClick={generatePDF}
              style={{ margin: "10px" }}
            >
              Generate PDF
              <span
                    className="bi bi-file-pdf"
                    style={{ marginRight: "5px" }}
                  ></span>
            </Button>
                    </Col>
                    </Row> 
            </div>
             {/* Render the FeedbackUpdateModal when showUpdateModal is true */}
        {showUpdateModal && (
          <FeedbackReviewModal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
            //feedback={selectedFeedback}
            onUpdate={handleUpdateFeedback}
          />
        )}
        </main>
   
    
    );

}

export default FeedbackReview;