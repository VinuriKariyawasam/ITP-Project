import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'

function ConsultancySolution(){
    const { consultId } = useParams();
    const navigate = useNavigate();
    const [Consultation , setFetchedConsultation] = useState([null]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    //validation and submit
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm();

//get consultation by Id
//const id = "661b58073ea6d30a9cf8d6e4";
const fetchConsultationById = async (consultId) => {
  try{
    const response = await fetch(
      `http://localhost:5000/cam/consultation/get-issue/${consultId}`
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
useEffect(() => {
  fetchConsultationById(consultId);   
}, [consultId]);

const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append regular form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Log FormData object
      console.log("FormData:", formData);

      console.log("FormData Entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.patch(
        `http://localhost:5000/cam/consultation/update-solution/${consultId}`,
        Object.fromEntries(formData.entries())
      );

      if (!response.status === 200) {
        throw new Error("Failed to update data");
      }

      // Optionally update the UI or perform any other actions after successful submission
     //onUpdate(response.data); // Assuming onUpdate is a function to update the UI with the updated data

      // Close the modal or redirect to another page after successful submission
      //onHide(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

 /*----Parts regarding rendering employee personal details-------*/
console.log("Rendering modal with consultation data:", Consultation);
if (!Consultation) return null;
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
} = Consultation

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

/*----Parts regarding updating consultation-------*/
//render update modal
const handleUpdateClick = () => {
setShowUpdateModal(true);
};
// Handle update consultation data
const handleUpdateConsultation = async (updatedData) => {
    // Logic to update employee data
    console.log("Updated consultation data:", updatedData);
    fetchConsultationById(consultId); //this used because of error
    //setEmployee(updatedData); // Update the employee data in the state
    setShowUpdateModal(false); // Close the update modal
  };

    return(
        <div>
         <main style={{marginLeft:"20px"}}>
          <Card style={{height:"100%"}}>
            <Card.Body>
            <Container>
             <Row>
              <Col>
               <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Vehicle Type:</strong> {vehicleType}
                   </Col>
                 </Row>
                 <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Component where the issue is occuring:</strong> {component}
                   </Col>
                 </Row>
                 <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Description of the issue:</strong> {issue}
                   </Col>
                 </Row>
                 <Row style={{marginBottom: "10px"}}>
                <Col>
                   <strong>Attached Files:</strong> {filesUrls}
                   </Col>
                 </Row>
                 <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="solutionToupdate" style={{marginTop:"5px"}}>
                 <Form.Label><strong>Solution from the Expert</strong></Form.Label>
                 <Controller
                  name="solution"
                  control={control}
                  rules={{required: "Solution is required"}}
                  render={({field}) => (
                    <Form.Control
                    placeholder="Solution..." {...field}/>
                  )}  
                  />
                  <Form.Text className="text-danger">
                    {errors.solution?.message}
                  </Form.Text>
               </Form.Group>
                </Row>
                 <Row className="mb-3">
                   <Button variant="success" type="submit" 
                   style={{marginTop:"10px",marginLeft:"30px", width:"90%"}}>
                   Post Solution
                   </Button>
                 </Row>
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
export default ConsultancySolution;