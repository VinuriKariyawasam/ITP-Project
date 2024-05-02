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


function Addrecord({toggleLoading}) {

  //to redirect after success
  const navigate = useNavigate();

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
      toggleLoading(true);
      const response = await fetch(
        `${process.env.React_App_Backend_URL}/api/sm/records`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        // Record created successfully
        const result = await response.json();
        console.log("Data submitted successfully:", result);
        alert("Record Created Successfully!");
        // Redirect to the specified URL after successful submission
        navigate("/staff/sm/record");
      } else {
        // Handle other error cases
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Data submitted successfully:", result);
      alert("Record Created Succesfully!");
      // Redirect to the specified URL after successful submission
      navigate("/sm/record");
    } catch (error) {
      /*if (error.response && error.response.status === 422) {
        // Display error message using alert box
        setErrorMessage(error.response.data.error);
        alert(error.response.data.error); // Display error message in an alert box
      }  else */ 
        console.error("Error:", error.message);
      
    }
    finally{
      toggleLoading(false);
      }
  };

     /* if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Data submitted successfully:", result);

      // Redirect to the specified URL after successful submission
      navigate("/sm/records");
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };*/

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

       {/* Payment Invoice Number */}
      <Form.Group className="mb-3" controlId="formGridINo">
        <Row>
          <Form.Label>Payment Invoice Number</Form.Label>
        </Row>
        <Row>
          <Controller
            name="inumber"
            control={control}
            defaultValue="" // Set default value to empty string
            render={({ field }) => (
              <Form.Control placeholder="Enter Invoice Number" {...field} />
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
          <Form.Label>Add Service Report here *(.pdf only)</Form.Label>
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

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Addrecord;