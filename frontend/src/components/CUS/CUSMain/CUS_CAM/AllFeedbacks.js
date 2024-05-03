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

import feedbackimg7 from "../../../../../src/images/cam/feedbackimg7.jpg";
import feedbackimg6 from "../../../../../src/images/cam/feedbackimg6.jpg";
import feedbackimg5 from "../../../../../src/images/cam/feedbackimg5.jpeg";
import feedbackimg8 from "../../../../../src/images/cam/feedbackimg8.jpg";
import cusimage3 from "../../../../../src/images/cam/cusimage3.jpg";
import cusimage2 from "../../../../../src/images/cam/cusimage2.jpg";

import './Feedback.css';
function AllFeedbacks({ toggleLoading }){

    const cusauth = useContext(CusAuthContext);
    const navigate = useNavigate();
    const [Feedback, setfeedback] = useState([]);
    const myfeedback_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusaffairs/myfeedback`;
    const feedback_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusaffairs/feedback`;

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

    const scrollDown = (amount) => {
      window.scrollBy({
        top: amount,
        behavior: "smooth",
      });
    };

    return(
        <main>
            <div>
                <Card style={{marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}>  
                    <Card.Body>
                <Row>
                    <div className="card mb-3">
                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={feedbackimg6} className="d-block w-100" alt="..." style={{opacity:"0.9",height:"500px"}}/>
      <div class="carousel-caption d-none d-md-block">
        <Card style={{opacity:"0.9",height:"450px",marginBottom:"0.00001px"}}>
        <h1 style={{marginTop:"20px",fontFamily:"sans-serif"}}>Your FeedBack is valued!</h1>
        <p><b> At Neo Tech we value your feedback. Please take a moment to share your
        thoughts with us.</b></p>
        <Row className="cam-mb-3">
      <Col>
      <div className="card" style={{width:"18rem",marginLeft:"100px"}}>
  <img src={cusimage2} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href={feedback_frontendurl} 
    class="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>Give a FeedBack</a>
  </div>
</div>
</Col>
        <Col>
      <div className="card" style={{width:"18rem"}}>
  <img src={cusimage3} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href={myfeedback_frontendurl} 
    className="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>My FeedBack</a>
  </div>
</div>      
</Col>
      </Row>
      <button
            type="button"
            class="btn btn-dark btn-lg"
            onClick={() => scrollDown(600)}
            style={{marginLeft:"250px",marginRight:"300px",marginBottom:"10px"}}>
              Explore FeedBack<span class="bi bi-arrow-down"></span>
          </button>
        </Card>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={feedbackimg7} className="d-block w-100" alt="..." style={{opacity:"0.9",height:"500px"}}/>
      <div class="carousel-caption d-none d-md-block">
        <Card style={{opacity:"0.9",height:"450px",marginBottom:"0.00001px"}}>
        <h1 style={{marginTop:"20px",fontFamily:"sans-serif"}}>Your FeedBack is valued!</h1>
        <p><b> At Neo Tech we value your feedback. Please take a moment to share your
        thoughts with us.</b></p>
        <Row className="cam-mb-3">
      <Col>
      <div className="card" style={{width:"18rem",marginLeft:"100px"}}>
  <img src={cusimage2} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href={feedback_frontendurl} 
    class="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>Give a FeedBack</a>
  </div>
</div>
</Col>
        <Col>
      <div className="card" style={{width:"18rem"}}>
  <img src={cusimage3} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href={myfeedback_frontendurl} 
    className="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>My FeedBack</a>
  </div>
</div>      
</Col>
      </Row>
      <button
            type="button"
            class="btn btn-dark btn-lg"
            onClick={() => scrollDown(600)}
            style={{marginLeft:"250px",marginRight:"300px",marginBottom:"10px"}}>
              Explore FeedBack<span class="bi bi-arrow-down"></span>
          </button>
        </Card>
      </div>
    </div>
    <div className="carousel-item">
      <img src={feedbackimg8} className="d-block w-100" alt="..." style={{opacity:"0.9",height:"500px"}}/>
      <div class="carousel-caption d-none d-md-block">
        <Card style={{opacity:"0.9",height:"450px",marginBottom:"0.00001px"}}>
        <h1 style={{marginTop:"20px",fontFamily:"sans-serif"}}>Your FeedBack is valued!</h1>
        <p><b> At Neo Tech we value your feedback. Please take a moment to share your
        thoughts with us.</b></p>
        <Row className="cam-mb-3">
      <Col>
      <div className="card" style={{width:"18rem",marginLeft:"100px"}}>
  <img src={cusimage2} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href={feedback_frontendurl} 
    class="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>Give a FeedBack</a>
  </div>
</div>
</Col>
        <Col>
      <div className="card" style={{width:"18rem"}}>
  <img src={cusimage3} className="card-img-top" alt="..."/>
  <div className="card-body">
    <a href={myfeedback_frontendurl}
    className="btn btn-dark" style={{width:"200px",marginTop:"5px"}}>My FeedBack</a>
  </div>
</div>      
</Col>
      </Row>
      <button
            type="button"
            class="btn btn-dark btn-lg"
            onClick={() => scrollDown(600)}
            style={{marginLeft:"250px",marginRight:"300px",marginBottom:"10px"}}>
              Explore FeedBack<span class="bi bi-arrow-down"></span>
          </button>
        </Card>
      </div>
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
                    <div className="row">
                    {Feedback.map((feedback, index) => (
                    <div key={index} className="col-md-6 mb-3">
                    <div className="card mb-3" >
                    {feedback.fileUrls.map((fileUrl, i) => (
                      <img key={i} src={fileUrl} style={{ height: "200px" }} alt="Feedback Image" />
                    ))}
                    <div className="card-body">
                    <p className="card-text"><small class="text-muted"><b>{feedback.name}</b></small></p>
                      <h5 className="card-title"> 
                      Service Type : {feedback.serviceType}<br></br>
                      Specific Employee mentioned : {feedback.employee}<br/><br/>
                      FeedBack : {feedback.feedback}<br></br>
                      </h5>
                    </div>
                    </div>
                    </div>
                    ))}
                    </div>
                    
                    </Row> 
                </Card.Body>
                </Card>
            </div>
        </main>
   
    
    );

}

export default AllFeedbacks;