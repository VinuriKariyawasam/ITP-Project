import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';

import axios from 'axios';
import PageTitle_cam from './PageTitle_cam';
import FileUpload from "../CUS_CAM/CUS_CAM_util/FileUpload";

import feedbackimg1 from "../../../../../src/images/cam/feedbackimg1.jpeg";
import feedbackimg2 from "../../../../../src/images/cam/feedbackimg2.jpeg";
import feedbackimg3 from "../../../../../src/images/cam/feedbackimg3.jpeg";
import cusimage3 from "../../../../../src/images/cam/cusimage3.jpg";
import cusimage2 from "../../../../../src/images/cam/cusimage2.jpg";

function FAQ(){

    const [Issues, setIssues] = useState([]);
    const [consultation, setFetchedConsultation] = useState([]);

    

    //get all consultations
  useEffect(() => {
    const fetchConsultations = async() => {
      try{
        const response = await fetch("http://localhost:5000/cam/consultation/get-issues");

        if(!response.ok){
          throw new Error(`HTTP error! Status:${response.status}`);
        }
        const data = await response.json();
        setIssues(data.consultations);
      }catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchConsultations();
},  []);

//destructure Issues object
const{
  vehicleType,
  component,
  issue,
  solution,
  filesUrls,
} = Issues

    return(
        <main>
            <div>
            <Card style={{marginTop:"20px",marginLeft:"20px",marginRight:"20px"}}>  
                    <Card.Body>
                    <PageTitle_cam path="faq" title="Frequently Asked Questions!" />
                    <Row>
                    <Col>
                    <div className="card-body">
                      <h5 className="card-title"> 
                      Issue :       {consultation.issue}<br></br>
                      Solution: {consultation.solution}
                      </h5>
             </div>
            </Col>
            <Col>
            <div className="card mb-3">
                    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={cusimage2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={cusimage3} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={cusimage2} className="d-block w-100" alt="..."/>
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

export default FAQ;