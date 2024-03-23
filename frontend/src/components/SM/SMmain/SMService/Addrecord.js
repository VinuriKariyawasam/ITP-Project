import React, { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import ImageUpload from "../../SMUtil/ImageUpload";
import FileUpload from "../../SMUtil/FileUpload";


function Addrecord() {

  //to redirect after success
  const navigate = useNavigate();

  // State to track selected position
  const [selectedPosition, setSelectedPosition] = useState("");



  //for date picker
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //validation and submit
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  //New Set
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append regular form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (uploadedFile) {
        formData.append("documents", uploadedFile);
      }

      // Log FormData object
      console.log("FormData:", formData);

      console.log("FormData Entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        "http://localhost:5000/api/sm/records",
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
      navigate("/sm/records");
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // Update selected position
  };

  //file uplood funxtions
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
//New ended


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Create Record</h3>

 {/* Vehicle Number */}
 <Form.Group className="mb-3" controlId="formVehiNumber">
        <Row>
        <Form.Label>Vehicle Number</Form.Label>
        </Row>
        <Row>
        <Controller
          name="vnumber"
          control={control}
          rules={{ required: "Vnumber is required" }}
          render={({ field }) => (
            <Form.Control placeholder="ANC8754" {...field} />
          )}
        />
        </Row>
        <Form.Text className="text-danger">{errors.vnumber?.message}</Form.Text>
      </Form.Group>
     


      {/* Start Date */}
       
        <Form.Group className="mb-3" controlId="formGridSDate">
          <Row>
            <Form.Label>Start Date</Form.Label>
          </Row>
          <Row>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="form-control mx-2"
                />
              )}
            />
          </Row>
          <Form.Text className="text-danger">
            {errors.startDate?.message}
          </Form.Text>
        </Form.Group>

        {/* Invoice number*/}
        <Form.Group className="mb-3" controlId="formGridINo">
          <Row>
          <Form.Label>Invoice Number</Form.Label>
          </Row>
          <Row>
          <Controller
            name="inumber"
            control={control}
            rules={{ required: "Invoice number is required" }}
            render={({ field }) => (
              <Form.Control placeholder="1123" {...field} />
            )}
          />
          </Row>
          <Form.Text className="text-danger">{errors.inumber?.message}</Form.Text>
        </Form.Group>
      

      
      {/* End Date */}
        <Form.Group className="mb-3" controlId="formGridEdate">
          <Row>
            <Form.Label>End date</Form.Label>
          </Row>
          <Row>
            <Controller
              name="EndDate"
              control={control}
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="form-control mx-2"
                />
              )}
            />
          </Row>
          <Form.Text className="text-danger">
            {errors.EndDate?.message}
          </Form.Text>
        </Form.Group>

       

      {/* Add a quotation and service reports */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formImage">
          <Form.Label>Add the quotation *(.jpg, .jpeg, .png only)</Form.Label>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                id="photo" // Pass the ID for the ImageUpload component
                onInput={(id, file, isValid) => {
                  field.onChange(file); // Trigger the onChange event for the photo field
                  field.onBlur(); // Trigger the onBlur event for validation
                }}
                errorText={errors.photo?.message}
              />
            )}
          />
        </Form.Group>
        {/* Documents */}
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Add other documents *(.pdf only)</Form.Label>
          <FileUpload
            id="documents"
            accept=".pdf"
            onInput={fileInputHandler}
            errorText={errors.documents?.message}
          />
        </Form.Group>
      </Row>
      {/* Other Details */}
      <Form.Group className="mb-3" controlId="formGridExtra">
        <Row>
        <Form.Label>Other Details</Form.Label>
        </Row>



        <Row>
        <Controller
          name="otherDetails"
          control={control}
          render={({ field }) => (
            <Form.Control as="textarea" rows={3} {...field} />
          )}
        />
        </Row>
        <Form.Text className="text-danger">
          {errors.otherDetails?.message}
        </Form.Text>
      </Form.Group>

      {/* System Credentials */}
      {/* Email */}
      <Row className="mb-3">
        <h5 className="text-dark">System Credentials</h5>
        <h6 className="text-primary">*Only need for manager or supervisor</h6>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Form.Control type="email" placeholder="Enter email" {...field} />
            )}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>

        {/* Password */}
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Form.Control type="password" placeholder="Password" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
      </Row>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Addrecord;