import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";
import html2pdf from "html2pdf.js";

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';

function FAQReview(){
  const [Issues, setIssues] = useState([]);
  const [consultation, setFetchedConsultation] = useState([]);
  const id = "661b58073ea6d30a9cf8d6e4";

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

//destructure Feedback object
const {
  _id,
  vehicleType,
  component,
  issue,
  solution,
  files,
  filesUrls,
  _v,
} = consultation

 /*----Parts regarding generate pdf from employee personal details-------*/
 const generatePDF = () => {
  const element = document.querySelector(".faqDetails"); // Select the container to convert to PDF
  const opt = {
    margin: 0.5,
    filename: "faq_Details.pdf",
    //image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(element).set(opt).save(); // Generate and save the PDF
};

    return(
        <>
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
            <Container className="faqDetails">
            <h2>Frequently Asked Questions</h2>
                    {Issues.map((consultation, index) => (
                    <div key={index}>
                    <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title"> 
                      Vehicle Type : {consultation.vehicleType}<br></br>
                      Component : {consultation.component}<br></br>
                      Issue : {consultation.issue}<br></br>
                      Solution : {consultation.solution}
                      </h5>
                    </div>
                    </div>
                    </div>
                    ))}
                     </Container>
                    </Col>
                    </Row> 
            </div>
         </>
    );

}

export default FAQReview;