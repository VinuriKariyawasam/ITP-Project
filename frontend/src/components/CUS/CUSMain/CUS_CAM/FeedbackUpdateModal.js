import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRating";
import {
 Button,
 Form,
 Modal,
 Col,
 Row,
 Card,
 Image,
} from "react-bootstrap";
import FileUpload from "../CUS_CAM/CUS_CAM_util/FileUpload";

import "./StarRating.css";

function FeedbackUpdateModal({show, onHide, Feedback, onUpdate}) {
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm({ defaultValues: Feedback });

//state to track selected service type and employee
const [selectedService, setSelectedService] = useState(Feedback.serviceType);
const [selectedEmployee, setSelectedEmployee] = useState(Feedback.employee);

const handleServiceChange = (e) => {
    setSelectedService(e.target.value);//update service type
}

const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);//update employee
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
        `http://localhost:5000/cam/feedback/update-feedback/${Feedback.id}`,
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
          Update FeedBack{" "}
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
      <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Service Type</Form.Label>
          <Controller
           name="serviceType"
           control={control}
           render={({ field }) => (
          <Form.Select
            defaultValue="Choose..."
            {...field}
            onChange={(e) => {
             field.onChange(e);
            }}
          >
            <option>Choose...</option>
            <option value="Periodical Services">Periodical Services</option>
            <option value="Mechanical Repairs">Mechanical Repairs</option>
            <option value="Mobile Services">Mobile Services</option>
            <option value="Finance Manager">Emergency Breakdowns</option>
            <option value="Supervisor">Other</option>
          </Form.Select>
          )}
          />
          <Form.Text className="text-danger">
            {errors.position?.message}
          </Form.Text>
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
      <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Service provided Employee</Form.Label>
          <Controller
            name="employee"
            control={control}
            render={({ field }) => (
          <Form.Select
            defaultValue="Choose..."
            {...field}
            onChange={(e) =>{
              field.onChange(e);
            }}
          >
            <option>Choose...</option>
            <option value="Emp1">Emp1</option>
            <option value="Emp2">Emp2</option>
            <option value="Emp3">Emp3</option>
            <option value="Emp4">Emp4</option>
            <option value="Supervisor">Other</option>
          </Form.Select>
          )}
          />
          <Form.Text className="text-danger">
            {errors.position?.message}
          </Form.Text>
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Attach Files</Form.Label>
          <FileUpload
            id="files"
            //onInput={fileInputHandler}
            errorText={errors.files?.message}
          />
        </Form.Group>
      </Row>
      <Row className="cam-mb-3">
        <Form.Group as={Col} controlId="formGridExtra">
          <Form.Label>Your FeedBack</Form.Label>
          <Controller
           name="feedback"
           control={control}
           rules={{required: "Feedback is required"}}
           render={({field}) => (
            <Form.Control  
            placeholder="add your feedback"  {...field}/>
           )}
           />
           <Form.Text className="text-danger">
             {errors.firstName?.message}
           </Form.Text>
        </Form.Group>
        <Row className="cam-mb-3">
        <Form.Group as={Col}>
          <h5 className="cam-h5">Rate us!!</h5>
          <StarRating />
        </Form.Group>
      </Row>
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

export default FeedbackUpdateModal;