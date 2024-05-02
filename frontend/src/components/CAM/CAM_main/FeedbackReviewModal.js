import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
 Button,
 Form,
 Modal,
 Col,
 Row,
 Card,
 Image,
} from "react-bootstrap";


function FeedbackReviewModal({show, onHide, consultation, onUpdate}) {
    const navigate = useNavigate();
    const [newsolution, setnewSolution] = useState("");

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm({ defaultValues: consultation });

//state to track selected service type and employee
//const [selectedSolution, setSelectedSolution] = useState(Consultation.solution);

const handleSolutionChange = (e) => {
  //setSelectedSolution(e.target.value);//update solution
}

const newhandleSubmit = async (consultId) => {
  try {
    const response = await fetch(`${process.env.React_App_Backend_URL}/cam/consultation/update-newsolution/${consultId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newsolution: newsolution }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Clear the solution field after successful submission
    setnewSolution("");
  } catch (error) {
    console.error("Error updating solution:", error);
    // Handle error (e.g., display error message)
  }
};

  return(
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
    <Modal.Header closeButton>
        <Modal.Title style={{fontSize:"32px"}}>
          Review FeedBack{" "}
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form
      style={{marginTop:"5px",marginLeft:"20px",marginRight:"20px"}}
      onSubmit={newhandleSubmit}
    >
    <Row>
      <Col>
      <Row className="cam-mb-3">
      <Form.Group as={Col} controlId="solutionToupdate" style={{marginTop:"5px"}}>
                 <Form.Label><strong>Enter Reviews for the week</strong></Form.Label>
                    <Form.Control
                    //style={{ height: '100px' }}
                    //value={newsolution}
                    //onChange={handleSolutionChange}
                    />
               </Form.Group>     
      </Row>
      </Col>
      </Row>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" type="submit">
                      Post Review
                    </Button>
                    <Button variant="dark" onClick={onHide} className="mr-2">
                      Cancel
                    </Button>
      </Modal.Footer>
      </Modal>
  )
}

export default FeedbackReviewModal;