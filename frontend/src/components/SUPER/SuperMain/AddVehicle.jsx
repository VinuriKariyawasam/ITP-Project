import React, { useState,useNavigate } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";

function AddVehicle() {
  //to redirect after success
  const navigate = useNavigate();

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

      // Append file data
      formData.append("photo", data.photo[0]); // Assuming only one file is selected
      if (data.documents) {
        for (let i = 0; i < data.documents.length; i++) {
          formData.append(`documents[${i}]`, data.documents[i]);
        }
      }

      // Log FormData object
      console.log("FormData:", formData);

      const response = await fetch(
        "http://localhost:5000/api/super/add-vehicle",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Data submitted successfully:", result);

      // Redirect to the specified URL after successful submission
      navigate("/super/vehicle");
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Vehicle</h3>

      {/* Vehicle No */}
      <Form.Group as={Col} controlId="formGridNic">
          <Form.Label>Vehicle No.</Form.Label>
          <Controller
            name="vehicleNo"
            control={control}
            rules={{ required: "NIC is required" }}
            render={({ field }) => (
              <Form.Control
                placeholder="AFD2541"
                {...field}
                maxLength="7"
              />
            )}
          />
          <Form.Text className="text-danger">{errors.nic?.message}</Form.Text>
        </Form.Group>

      {/* Brand */}
        <Form.Group as={Col} controlId="formGridFname">
          <Form.Label>Brand</Form.Label>
          <Controller
            name="brand"
            control={control}
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <Form.Control placeholder="Toyota" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.firstName?.message}
          </Form.Text>
        </Form.Group>

      {/* Model */}
      <Form.Group as={Col} controlId="formGridFname">
          <Form.Label>Model</Form.Label>
          <Controller
            name="model"
            control={control}
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <Form.Control placeholder="Toyota" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.firstName?.message}
          </Form.Text>
        </Form.Group>

      {/* Year */}
      <Form.Group as={Col} controlId="formGridContact">
          <Form.Label>Year</Form.Label>
          <Controller
            name="year"
            control={control}
            rules={{ required: "Contact No. is required" }}
            render={({ field }) => (
              <Form.Control
                type="tel"
                placeholder="0715897598"
                {...field}
                maxLength="4"
              />
            )}
          />
          <Form.Text className="text-danger">
            {errors.contact?.message}
          </Form.Text>
        </Form.Group>

      {/* Name */}
      <Form.Group as={Col} controlId="formGridFname">
          <Form.Label>Vehicle Owner's name</Form.Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Form.Control placeholder="Saman Perera" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.firstName?.message}
          </Form.Text>
        </Form.Group>

      {/* Contact No. */}
      <Form.Group as={Col} controlId="formGridContact">
          <Form.Label>Contact No.</Form.Label>
          <Controller
            name="contact"
            control={control}
            rules={{ required: "Contact No. is required" }}
            render={({ field }) => (
              <Form.Control
                type="tel"
                placeholder="0715897598"
                {...field}
                pattern="[0-9]{10}"
                maxLength="10"
              />
            )}
          />
          <Form.Text className="text-danger">
            {errors.contact?.message}
          </Form.Text>
        </Form.Group>

      {/* Current records */}
      <Form.Group className="mb-3" controlId="formGridExtra">
        <Form.Label>Current Records</Form.Label>
        <Controller
          name="records"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
        <Form.Text className="text-danger">
          {errors.otherDetails?.message}
        </Form.Text>
      </Form.Group>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddVehicle;