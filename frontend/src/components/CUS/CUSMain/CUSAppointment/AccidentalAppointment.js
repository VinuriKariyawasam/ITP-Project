import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useForm } from "../../../../data/CUS/Appointment/apform-hook";

const AccidentalAppointment = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileError, setFileError] = useState("");
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      vType: {
        value: "",
        isValid: false,
      },
      vNo: {
        value: "",
        isValid: false,
      },
      dateAccidentaOccured: {
        value: "",
        isValid: false,
      },
      damagedOccured: {
        value: "",
        isValid: false,
      },
      contactNo: {
        value: "",
        isValid: false,
      },
      appointmentdate: {
        value: "",
        isValid: false,
      },
      appointmenttime: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  // When sending the date to the backend, format it in UTC to avoid timezone issues
const formatDateForBackend = (date) => {
  return date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString() : null;
};

  const appointmentSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("vType", formState.inputs.vType.value);
      formData.append("vNo", formState.inputs.vNo.value);
      formData.append("dateAccidentaOccured",formatDateForBackend(formState.inputs.dateAccidentaOccured.value));
      formData.append("damagedOccured", formState.inputs.damagedOccured.value);
      formData.append("contactNo", formState.inputs.contactNo.value);
      formData.append("appointmentdate", formatDateForBackend(formState.inputs.appointmentdate.value));
      formData.append("appointmenttime", formState.inputs.appointmenttime.value);
      formData.append("image", formState.inputs.image.value);
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/appointment/addaccidentalAppointment",
        formData
      );

      // navigate("");
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (formState.inputs.image.value instanceof Blob) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.onerror = () => {
        console.error("Error reading the file");
      };
      fileReader.readAsDataURL(formState.inputs.image.value);

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formState.inputs.image.value.type)) {
        setFileError("Please select a valid image file (JPEG, JPG, or PNG).");
      } else {
        setFileError("");
      }
    }
  }, [formState.inputs.image.value]);

  return (
    <div style={{ marginTop: "6%", marginLeft: "3%" }}>

      <Form onSubmit={appointmentSubmitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Enter Customer  name"
              onInput={(event) =>
                inputHandler("name", event.target.value, true)
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control
              id="vType"
              type="text"
              placeholder="Enter product brand"
              onInput={(event) =>
                inputHandler("vType", event.target.value, true)
              }
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              id="vNo"
              type="text"
              placeholder="Enter vNo"
              onInput={(event) =>
                inputHandler("vNo", event.target.value, true)
              }
              required
            />
          </Form.Group>

          <Row className="mb-3">
          <Form.Group as={Col} md='5'>
            <Form.Label>Date Accident Occurred</Form.Label>
            <DatePicker
              id="dateAccidentaOccured"
              placeholderText='Date accident occurred'
              selected={formState.inputs.dateAccidentaOccured.value} // Use state variable here
              onChange={(date) => inputHandler("dateAccidentaOccured", date, true)} // Update state with selected date
              dateFormat='MM/dd/yyyy'
              required
            />
          </Form.Group>

          </Row>

        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Damaged occured</Form.Label>
            <Form.Control
              id="damagedOccured"
              type="text"
              placeholder="Enter damagedOccured"
              onInput={(event) =>
                inputHandler("damagedOccured", event.target.value, true)
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              id="contactNo"
              type="Number"
              placeholder="Enter contact Number"
              onInput={(event) =>
                inputHandler("contactNo", event.target.value, true)
              }
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">

        <Form.Group as={Col} md='5'>
            <Form.Label>appointment date</Form.Label>
            <DatePicker
              id="appointmentdate"
              placeholderText='Appointment Date'
              selected={formState.inputs.appointmentdate.value} // Use state variable here
              onChange={(date) => inputHandler("appointmentdate", date, true)} // Update state with selected date
              dateFormat='MM/dd/yyyy'
              required
            />
          </Form.Group>


          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>appointment Time</Form.Label>
            <Form.Control
              id="appointmenttime"
              type="text"
              placeholder="Enter appointmenttime"
              onInput={(event) =>
                inputHandler("appointmenttime", event.target.value, true)
              }
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="5" controlId="validationCustom01">
            <Form.Label>Image</Form.Label>
            <Form.Control
              id="image"
              type="file"
              accept=".jpg,.png,.jpeg"
              placeholder="add image"
              onInput={(event) =>
                inputHandler("image", event.target.files[0], true)
              }
              required
            />
            {fileError && (
              <Form.Text className="text-danger">{fileError}</Form.Text>
            )}
          </Form.Group>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Accident image"
              style={{ marginTop: "3%", width: "20%", height: "20%" }}
            />
          )}
        </Row>
        <Form.Group className="mb-3" id="formGridCheckbox" rows='3' md='5' >
          <Form.Check type="checkbox" label="By scheduling your appointment you agree to accept our terms and regulations" id="invalidCheck" required />
          <div class="invalid-feedback">
            You must agree before submitting.
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </Form>
    </div>
  );
};



export default AccidentalAppointment;