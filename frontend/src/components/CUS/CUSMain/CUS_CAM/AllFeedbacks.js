import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CusAuthContext } from "../../../../context/cus-authcontext";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

import feedbackimg1 from "../../../../../src/images/cam/feedbackimg1.jpeg";
import feedbackimg2 from "../../../../../src/images/cam/feedbackimg2.jpeg";
import feedbackimg3 from "../../../../../src/images/cam/feedbackimg3.jpeg";
import cusimage3 from "../../../../../src/images/cam/cusimage3.jpg";
import cusimage2 from "../../../../../src/images/cam/cusimage2.jpg";

import './Feedback.css';
import PageTitle_cam from "./PageTitle_cam";

function AllFeedbacks(){

    const cusauth = useContext(CusAuthContext);
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

    return(
        <main>
            <div>
                <Card style={{marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}>  
                    <Card.Body>
                    <PageTitle_cam path="feedback" title="FeedBack" />
                <Button  variant="dark" size="md" style={{marginBottom:"10px",marginRight:"10px"}}
                onClick={() => navigate("/customer/cusaffairs/feedback")}>Give a Feedback</Button>
                <Button  variant="dark" size="md" style={{marginBottom:"10px"}}
                onClick={() => navigate("/customer/cusaffairs/myfeedback")}>Go to My Feedback</Button>
                <Row>
                    <Col>
                    {Feedback.map((feedback, index) => (
                    <div key={index}>
                    <div className="card mb-3">
                      <img src={feedbackimg1} style={{height:"200px"}} alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title"> 
                      Service Type : {feedback.serviceType}<br></br>
                      Specific Employee mentioned : {feedback.employee}<br/><br/>
                      FeedBack : {feedback.feedback}<br></br>
                      </h5>
                      <p className="card-text"><small class="text-muted">userId@{feedback.userId}</small></p>
                    </div>
                    </div>
                    </div>
                    ))}
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
                    <div className="card-body">
                      <h5 className="card-title">
                        1000+ Services Year Along<br></br>
                        Over 50+ Mobile Services Monthly<br></br>
                        </h5>
                    </div>
                    </div>
                    </Col>
                    </Row> 
                </Card.Body>
                </Card>
            </div>
        </main>
   
    
    );

}

export default AllFeedbacks;