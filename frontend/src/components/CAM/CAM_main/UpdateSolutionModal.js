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


function UpdateSolutionModal({show, onHide, Consultation, onUpdate}) {
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm({ defaultValues: Consultation });

//state to track selected service type and employee
const [selectedSolution, setSelectedSolution] = useState(Consultation.solution);

const handleSolutionChange = (e) => {
  setSelectedSolution(e.target.value);//update solution
}

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
        `http://localhost:5000/cam/consultation/update-solution/${Consultation.id}`,
        Object.fromEntries(formData.entries())
      );

      if (!response.status === 200) {
        throw new Error("Failed to update data");
      }

      // Optionally update the UI or perform any other actions after successful submission
      onUpdate(response.data); // Assuming onUpdate is a function to update the UI with the updated data

      // Close the modal or redirect to another page after successful submission
      onHide(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error.message);
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
          Update Solution{" "}
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form
      style={{marginTop:"5px",marginLeft:"20px",marginRight:"20px"}}
      onSubmit={handleSubmit(onSubmit)}
    >
    <Row>
      <Col>
      <Row className="cam-mb-3">
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
      </Col>
      </Row>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" type="submit">
            Update
          </Button>
        <Button variant="dark" onClick={onHide} className="mr-2">
          Cancel
        </Button>
      </Modal.Footer>
      </Modal>
  )
}

export default UpdateSolutionModal;