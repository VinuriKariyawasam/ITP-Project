import React, { useState, useEffect,useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";
import html2pdf from "html2pdf.js";
import logo from "../../../images/logoblack_trans.png";
import { StaffAuthContext } from "../../../context/StaffAuthContext";

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';

function FAQReview({ toggleLoading }){
  const [Issues, setIssues] = useState([]);
  const [consultation, setFetchedConsultation] = useState([]);
  const id = "661b58073ea6d30a9cf8d6e4";
  const { userId, userPosition } = useContext(StaffAuthContext);

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
      filename: "faq_Details.pdf",
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
        <>
         <div>
                <Row>
                    <Col>
            <Container className="faqDetails">
                    {Issues.map((consultation, index) => (
                    <div key={index}>
                    <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title"> 
                      Customer Name : {consultation.name}<br></br>
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
                     <Button
              variant="primary"
              onClick={generatePDF}
              style={{ margin: "10px" }}
            >
              Generate PDF
            </Button>
                    </Col>
                    </Row> 
            </div>
         </>
    );

}

export default FAQReview;