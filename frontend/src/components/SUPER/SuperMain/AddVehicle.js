import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import "./AddVehicle.css"; // Import CSS file for styling

function AddVehicle() {
  const navigate = useNavigate(); // Hook for navigation

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Your form submission logic here

      // Redirect to the specified URL after successful submission
      navigate("/super/vehicle");
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <div className="form-container"> {/* Apply container class */}
      <Form onSubmit={handleSubmit(onSubmit)} className="form-frame"> {/* Apply frame class */}
        <center><h3>Vehicle</h3></center>

        {/* Vehicle No */}
        <Form.Group as={Col} controlId="formGridNic">
          <Form.Label>Vehicle No.</Form.Label>
          <Controller
            name="vehicleNo"
            control={control}
            rules={{ required: "Vehicle No is required" }}
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
            rules={{ required: "Brand is required" }}
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
            rules={{ required: "Model is required" }}
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
            rules={{ required: "Year is required" }}
            render={({ field }) => (
              <Form.Control
                type="tel"
                placeholder="2020"
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
            <Form.Control as="textarea" rows={1} {...field} />
          )}
        />
        <Form.Text className="text-danger">
          {errors.otherDetails?.message}
        </Form.Text>
      </Form.Group>


      <div className="button-group">
        <Button variant="dark" type="back" href="/supervisor/vehicle" style={{ marginLeft: '30px' }}>
          Back
        </Button>

          <Button variant="dark" type="submit" className="register-button">
            Register
          </Button>
        </div>
     
      </Form>
    </div>
  );
}

export default AddVehicle;
