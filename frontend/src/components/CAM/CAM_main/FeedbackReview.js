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


function FeedbackReview(){

    //const cusauth = useContext(CusAuthContext);
    const navigate = useNavigate();
    const [Feedback, setfeedback] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async() => {
          try{
            const response = await fetch("http://localhost:5000/cam/feedback/get-feedbacks");

            if(!response.ok){
              throw new Error(`HTTP error! Status:${response.status}`);
            }
            const data = await response.json();
            setfeedback(data.feedbacks);
          }catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchFeedbacks();
    },  []);

    /*----Parts regarding generate pdf from employee personal details-------*/
  const generatePDF = () => {
    const element = document.querySelector(".feedbackDetails"); // Select the container to convert to PDF
    const opt = {
      margin: 0.5,
      filename: "feedback_Details.pdf",
      //image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save(); // Generate and save the PDF
  };

    return(
        <main>
            <div>
                <Row>
                    <Col>
                    <Button
              variant="primary"
              onClick={generatePDF}
              style={{ margin: "10px" }}
            >
              Generate PDF
            </Button>
            <Container className="feedbackDetails">
              <h2>Customer FeedBack</h2>
                    {Feedback.map((feedback, index) => (
                    <div key={index}>
                    <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">
                      Customer UserId : {feedback.userId}<br></br> 
                      Service Type : {feedback.serviceType}<br></br>
                      Specific Employee mentioned : {feedback.employee}<br/><br/>
                      FeedBack : {feedback.feedback}<br></br>
                      </h5>
                    </div>
                    </div>
                    </div>
                    ))}
                   </Container>
                    </Col>
                    </Row> 
            </div>
        </main>
   
    
    );

}

export default FeedbackReview;