import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CusAuthContext } from "../../../../context/cus-authcontext";
import { useContext } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import FileUpload from "../CUS_CAM/CUS_CAM_util/FileUpload";

import "./StarRating.css";

function FeedbackUpdateModal({ show, onHide, feedback, onUpdate }) {
  const cusAuth = useContext(CusAuthContext);
  const id = cusAuth.userId;
  const fid = feedback.feedbackId;
  console.log(fid);
  const {feedbackId} = useParams();
  const navigate = useNavigate();
  const [updatedFeedback, setupdatedFeedback] = useState("");

  const { handleSubmit,register, setValue } = useForm();

  const [formData, setFormData] = useState({
    serviceType: "",
    employee: "",
    feedback: "",
    rating: 0,
    files: "",
  });

  // Initialize form data when feedback changes
  useEffect(() => {
    setValue("serviceType", feedback.serviceType || "");
    setValue("employee", feedback.employee || "");
    setValue("feedback", feedback.feedback || "");
    setValue("rating", feedback.rating || 0);
    setValue("files", feedback.files || "");
    setFormData({
      ...formData,
      serviceType: feedback.serviceType || "",
      employee: feedback.employee || "",
      feedback: feedback.feedback || "",
      rating: feedback.rating || 0,
      files: feedback.files || "",
    });
  }, [feedback, setValue]);

  const onSubmit = async (formData) => { //event
    //event.preventDefault();

    try {
      const response = await fetch(`${process.env.React_App_Backend_URL}/cam/feedback/update-feedback/${fid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
      //alert("Feedback updated Successfully!"),
      //navigate("/customer/cusaffairs/myfeedback")
    );

    if (response.ok) {
      const updatedData = await response.json();
      console.log(updatedData);
      
      onUpdate(updatedData); // Pass updated data to parent component
      onHide(); // Close the modal
    } else {
      throw new Error("Failed to update feedback");
    }
  } catch (error) {
    console.error("Error updating feedback:", error);
  }
};


  //file uplood functions
  // State to store the uploaded files
  const [uploadedFiles, setUploadedFile] = useState(null);

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

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "32px" }}>Update FeedBack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
            <h4>feedbackID : {feedback.feedbackId}</h4>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select
                    name="serviceType"
                    setValue={feedback.serviceType}
                    {...register("serviceType")}
                  >
                    <option>Choose...</option>
                    <option value="Periodical Services">Periodical Services</option>
                    <option value="Mechanical Repairs">Mechanical Repairs</option>
                    <option value="Mobile Services">Mobile Services</option>
                    <option value="Emergency Breakdowns">Emergency Breakdowns</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Service provided Employee</Form.Label>
                  <Form.Select
                    name="employee"
                    setValue={feedback.employee}
                    {...register("employee")}
                  >
            <option>Choose...</option>
            <option value="OnSite Technician">OnSite Technician</option>
            <option value="Mobile Service Technician">Mobile Service Technician</option>
            <option value="Service Manager">Service Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formFileDocuments">
                {feedback.fileUrls.map((fileUrl, i) => (
                      <img key={i} src={fileUrl} style={{ height: "100px",marginTop:"10px" }} alt="Feedback Image" />
                    ))}
                    <br></br>
                  <Form.Label>Attach Files 
                  (once you select a new file your currently attached files will be deleted!)
                  </Form.Label>
                  <FileUpload 
                    id="files"
                    name="files"
                    onInput={fileInputHandler}
                  />
                </Form.Group>
              </Row>
              <Row className="cam-mb-3">
                <Form.Group as={Col} controlId="formGridExtra">
                  <Form.Label>Your FeedBack</Form.Label>
                  <Form.Control
                    name="feedback"
                    setValue={feedback.feedback}
                    {...register("feedback")}
                  />
                </Form.Group>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)}>
          Update
        </Button>
        <Button variant="dark" onClick={onHide} className="mr-2">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedbackUpdateModal;
