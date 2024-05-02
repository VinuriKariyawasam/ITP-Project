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
import feedbackimg6 from "../../../../../src/images/cam/feedbackimg6.jpg";

function FAQ({ toggleLoading }){

    const [Issues, setIssues] = useState([]);
    const [consultation, setFetchedConsultation] = useState([]);

    //get all consultations
  useEffect(() => {
    const fetchConsultations = async() => {
      try{
        toggleLoading(true);
        const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/get-issues`);

        if(!response.ok){
          throw new Error(`HTTP error! Status:${response.status}`);
        }
        const data = await response.json();
        setIssues(data.consultations);
      }catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        toggleLoading(false); // Set loading to false after API call
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
           <div
      style={{
        backgroundImage: `url(${feedbackimg6})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px', // Adjust padding as needed
        opacity:'1.5'
      }}
    >
            <div>
            <h2 style={{fontFamily:"sans-serif",color:"white",marginLeft:"20px",marginTop:"20px"}}>
              <b>Frequently Asked Questions</b></h2>
                    <div className="card mb-3" style={{marginLeft:"20px",marginRight:"20px",width:"96%"}}>
                    {Issues.map((faq,index) =>(
                      <div key={index}>
                        {faq.fileUrls.map((fileUrl, i) => (
                      <img key={i} src={fileUrl} style={{ height: "100px",marginLeft:"10px",marginTop:"10px" }} alt="Feedback Image" />
                    ))}
                     <p className="card-text" style={{marginLeft:"10px"}}><small class="text-muted"><b>{faq.name}</b></small></p>
                      <h5 className="card-title" style={{marginTop:"-30px",marginLeft:"10px"}}> 
                      Issue :       {faq.issue}<br></br>
                      Solution: {faq.solution}
                      </h5>
                     </div>
                    ))}
                    </div>
          </div>
          </div>
        </main>
    );
}

export default FAQ;