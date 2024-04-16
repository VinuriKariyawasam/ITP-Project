import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";
import {CusAuthContext} from "../../../../context/cus-authcontext";
import { useContext } from "react";

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

function OnlineConsultation(){

  const cusAuth = useContext(CusAuthContext);
  let id = cusAuth.userId;
  const navigate = useNavigate();
 // const { id } = useParams();
  const [Issues, setIssues] = useState([]);
  const [consultation, setFetchedConsultation] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //validation and submit
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

       // Append regular form data
       Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("userId",cusAuth.userId);

      if (uploadedFile) {
        formData.append("files", uploadedFile);
      }
      // Log FormData object
      console.log("FormData:", formData);

      console.log("FormData Entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        "http://localhost:5000/cam/consultation/add-issue",
        {
          method: "POST",
          body: formData,
        },
        alert("Consultation created Successfully!"),
        navigate("/customer")
        //window.location.reload()
      );
      if (response.status === 201) {
        // Feedback created successfully
        const result = await response.json();
        console.log("Data submitted successfully:", result);
        alert("Consultation created Successfully!");
        // Redirect to the specified URL after successful submission
        navigate("/customer");
      }else {
        // Handle other error cases
        throw new Error("Failed to submit data");
      }
      //const result = await response.json();
      //console.log("Data submitted successfully:", result);
      //alert("Feedback created Successfully!");
      // Redirect to the specified URL after successful submission
      navigate("/customer");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Display error message using alert box
        setErrorMessage(error.response.data.error);
        alert(error.response.data.error); // Display error message in an alert box
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  //file uplood functions
  // State to store the uploaded files
  // State to store the uploaded files
  const [uploadedFile, setUploadedFile] = useState(null);

  // File input handler for SingleFileUpload component
  const fileInputHandler = (id, file, isValid) => {
    if (isValid) {
      // Set the uploaded file in state
      setUploadedFile(file);
    } else {
      // Handle invalid files if needed
      console.log("Invalid file:", file);
    }
  };

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

useEffect(() => {
  if(cusAuth.userId){
    fetchConsultationById(cusAuth.userId);
  }
},[cusAuth.userId]);
//get consultation by Id
//let userId = cusAuth.userId;
    const fetchConsultationById = async (id) => {
      try{
        const response = await fetch(
          `http://localhost:5000/cam/consultation/get-issue/${id}`
        );

        if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched consultation from fetch:", data);
        setFetchedConsultation(data);
      }catch (error) {
        console.error("Error fetching consultation:", error);
        return null;
      }
    };

     /*----Parts regarding rendering employee personal details-------*/
  console.log("Rendering modal with consultation data:", consultation);
  if (!consultation) return null;
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

    return(
    <div>
     <main style={{marginLeft:"50px",marginTop:"20px"}}>
      <Card style={{height:"100%",width:"96%"}}>
        <Card.Body>
        <PageTitle_cam path="consultation" title="Have a Question? Ask Us!" />
        <Container>
         <Row>
          <Col>
           <Form onSubmit={handleSubmit(onSubmit)}>
           <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra">  
                  <Form.Label>Type of the Vehicle</Form.Label> 
                  <Controller
                  name="vehicleType"
                  control={control}
                  rules={{required: "Vehicle type is required"}}
                  render={({field}) => (
                    <Form.Control
                    placeholder="Model/Type" {...field}/>
                  )}  
                  />
                  <Form.Text className="text-danger">
                    {errors.vehicleType?.message}
                  </Form.Text>    
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra">
                  <Form.Label>Component where the issue is occuring</Form.Label>
                  <Controller
                  name="component"
                  control={control}
                  rules={{required: "Component type is required"}}
                  render={({field}) => (
                    <Form.Control
                    placeholder="Engine / Breaks / GearBox" {...field}/>
                  )}  
                  />
                  <Form.Text className="text-danger">
                    {errors.component?.message}
                  </Form.Text>    
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra">
                  <Form.Label>Description of the issue</Form.Label>
                  <Controller
                  name="issue"
                  control={control}
                  rules={{required: "Issue is required"}}
                  render={({field}) => (
                    <Form.Control
                    placeholder="Issue" {...field}/>
                  )}  
                  />
                  <Form.Text className="text-danger">
                    {errors.issue?.message}
                  </Form.Text>   
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group style={{marginTop: "3px"}} controlId="formFileDocuments">
                 <Form.Label>Attach Files</Form.Label>
          <FileUpload
            id="files"
            onInput={fileInputHandler}
            errorText={errors.files?.message}
          />
               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Button variant="success" type="submit" 
               style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}>
               Ask from the Expert
               </Button>
             </Row>
           </Form>
         </Col>
         <Col> 
         <Form>
         <Accordion defaultActiveKey="0">
          {consultation.map((consultation,index) =>(
                      <Accordion.Item key={index} eventKey={index.toString()} style={{marginTop:"5px"}}>
                        <Accordion.Header style={{fontWeight:"bold"}}>
                          Vehicle Type : {consultation.vehicleType}<br></br>
                          Component :   {consultation.component}<br></br>
                          Issue :       {consultation.issue}<br></br>
                        </Accordion.Header>
                        <Accordion.Body>
                        <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridExtra" style={{marginTop:"5px"}}>
                 <Form.Label>Solution from our Experts</Form.Label>
                 <Form.Control
                   as="textarea"
                   type="textarea"
                   placeholder="Answer Pending..."
                   rows={4}
                   value={consultation.solution}
                   readOnly
                />
               </Form.Group>
          </Row>
          </Accordion.Body>
          </Accordion.Item>
          ))}
            </Accordion>
          </Form> 
        </Col>
       </Row>
    </Container>
    </Card.Body>
    </Card>
   </main>
</div>
    );
}

export default OnlineConsultation;