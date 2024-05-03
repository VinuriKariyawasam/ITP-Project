import React, { useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useForm } from "../../../../data/CUS/Appointment/apform-hook";
import accidentalrepairs from '../../../../images/CUS/Appointment/accidental repairs.jpg'
import './AccidentalAppointment.css'
import { CusAuthContext } from "../../../../context/cus-authcontext";


const AccidentalAppointment = ({ toggleLoading }) => {
  const navigate = useNavigate();
  const [vno, setvNo] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileError, setFileError] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const cusauth = useContext(CusAuthContext)


  const [formState, inputHandler] = useForm(
    {
      cusType: {
        value: "",
        isValid: false,
      },
      vType: {
        value: "",
        isValid: false,
      },
      vNo: {
        value: "",
        isValid: true,
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
        value: "",
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
    const accidtentimage = new FormData();
    accidtentimage.append("image", formState.inputs.image.value);
    toggleLoading(true);
    axios.post(`${process.env.React_App_Backend_URL}/appointment/accidentalImageupload`, accidtentimage)
      .then((res) => {
        const ImgUrl = res.data.downloadURL
        console.log(ImgUrl)

        // Check if the contact number has exactly 9 digits
        if (formState.inputs.contactNo.value.length !== 9) {
          alert("Please enter a valid  contact number.");
          return; // Exit the function if the contact number is not valid
        }

        try {
          const formData = {
            userId: cusauth.userId,
            name: cusauth.name,
            email: cusauth.email,
            cusType: formState.inputs.cusType.value,
            vType: formState.inputs.vType.value,
            vNo: vno,
            dateAccidentaOccured: formatDateForBackend(formState.inputs.dateAccidentaOccured.value),
            damagedOccured: formState.inputs.damagedOccured.value,
            contactNo: formState.inputs.contactNo.value,
            appointmentdate: formatDateForBackend(formState.inputs.appointmentdate.value),
            appointmenttime: formState.inputs.appointmenttime.value,
            image: ImgUrl
          }
          console.log(formData)
          const response = axios.post(
            `${process.env.React_App_Backend_URL}/appointment/addaccidentalAppointment`,
            formData)

          alert('Appointment Submitted Succesfully');
          navigate('/customer/appointment/myappointment');


        } catch (err) {
          console.log(err);
          alert(err)
        }
      }).catch((err) => {
        alert("error");
      }).finally(() => {
        toggleLoading(false);
      });

  };
  const handleAddSri = () => {
    if (/^\d+/.test(vno)) {
      setvNo((prevVNo) => {
        return prevVNo + "ශ්‍රී";
      });
    } else {
      alert("Please enter a valid format of vehicle number.");
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
  // Function to get tomorrow's date
  const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  // Function to format the date correctly
  const changedatetoformet = (date) => {
    const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    return formattedDate;
  };

  useEffect(() => {
    if (formState.inputs.appointmentdate.value) {
      fetchAvailableTimes(formState.inputs.appointmentdate.value);
    }
  }, [formState.inputs.appointmentdate.value]);


  const fetchAvailableTimes = async (date) => {
    try {
      const formattedDate = changedatetoformet(date);
      const response = await axios.get(`${process.env.React_App_Backend_URL}/appointment/get-acceptedaccidentalappointmentbyDate/${formattedDate}`);
      const appointments = response.data.data;
      console.log(appointments);
      const allTimes = ["9.00am", "10.30am", "12.00pm", "1.30pm", "3.00pm", "4.30pm"]; // Define allTimes here
      if (appointments.length === 0) { // If no appointments found for the selected date
        setAvailableTimes(allTimes); // Set available times to all available times
      } else {
        const bookedTimes = appointments.map(appointment => appointment.appointmenttime);
        const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));
        setAvailableTimes(availableTimes);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (no appointments found for the date)
        const allTimes = ["9.00am", "10.30am", "12.00pm", "1.30pm", "3.00pm", "4.30pm"]; // Define allTimes here
        setAvailableTimes(allTimes); // Set available times to all available times
      } else {
        // Handle other errors
        console.error("Error fetching available times:", error);
      }
    }
  };

  return (
    <div style={{ marginTop: "2%", marginLeft: "3%" }}>

      <div style={{ flex: "1", marginRight: "6%" }}>
        <h2 className='Appheading'>Make an Appointment for Accidental Repairs</h2>
        <Row>
          <Col md={7}>

            <Form onSubmit={appointmentSubmitHandler}>
              <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom01">
                  <Form.Label>Customer Type</Form.Label>
                  <select class="form-select" id="validationCustom04" onChange={(event) => inputHandler("cusType", event.target.value, true)} required>
                    <option value="">choose</option>
                    <option value="Government">Government</option>
                    <option value="Non-Government">Non-Government</option>
                  </select>
                </Form.Group>

                <Form.Group as={Col} md="5" controlId="validationCustom01">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control
                    id="vType"
                    type="text"
                    placeholder="Enter Vehicle Type"
                    onInput={(event) =>
                      inputHandler("vType", event.target.value, true)
                    }
                    maxLength={10}
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
                    value={vno}
                    placeholder="Enter vNo"
                    onChange={(event) => setvNo(event.target.value)}
                    maxLength={10}
                    required
                  />
                  <Button variant="secondary" onClick={handleAddSri}>
                    Add ශ්‍රී
                  </Button>
                </Form.Group>


                <Form.Group as={Col} md='5'>
                  <Form.Label >Date Accident Occurred</Form.Label>
                  <br />
                  <DatePicker
                    id="dateAccidentaOccured"
                    placeholderText='Date accident occurred'
                    selected={formState.inputs.dateAccidentaOccured.value} // Use state variable here
                    onChange={(date) => inputHandler("dateAccidentaOccured", date, true)} // Update state with selected date
                    dateFormat='MM/dd/yyyy'
                    maxDate={new Date()}
                    required
                  />
                </Form.Group>
              </Row>


              <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom01">
                  <Form.Label>Damaged occured</Form.Label>
                  <Form.Control
                    id="damagedOccured"
                    type="textarea" rows={2}
                    placeholder="Enter damagedOccured"
                    onInput={(event) =>
                      inputHandler("damagedOccured", event.target.value, true)
                    }
                    maxLength={30}
                    required
                  />

                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationCustom01">
                  <Form.Label>Contact Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>+94</InputGroup.Text>
                    <Form.Control
                      id="contactNo"
                      type="phone"
                      pattern="[0-9]*" // Set the pattern to allow only numeric input
                      placeholder="Enter contact Number"
                      maxLength={9}
                      onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                        inputHandler("contactNo", value, true); // Update form state
                      }}
                      value={formState.inputs.contactNo.value} // Use form state value to ensure controlled input
                      required
                    />

                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">


                <Form.Group as={Col} md='5'>
                  <Form.Label>appointment date</Form.Label>
                  <br /><DatePicker
                    id="appointmentdate"
                    placeholderText='Date accident occurred'
                    selected={formState.inputs.appointmentdate.value}// Use state variable here
                    onChange={(date) => inputHandler("appointmentdate", date, true)}// Update state with selected date
                    dateFormat='MM/dd/yyyy'
                    minDate={getTomorrow()}  // Set minimum date to today

                    required
                  />
                </Form.Group>


                <Form.Group as={Col} md="5" controlId="validationCustom01">
                  <Form.Label>appointment Time</Form.Label>

                  <select
                    className="form-select"

                    id="appointmenttime"
                    placeholder="Enter appointmenttime"
                    onInput={(event) =>
                      inputHandler("appointmenttime", event.target.value, true)
                    }
                    required>
                    <option value="">Choose</option>
                    {availableTimes.length > 0 ? (
                      availableTimes.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))
                    ) : (
                      <option value="" disabled>No available times</option>
                    )}

                  </select>

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
          </Col>
          <Col md={5}>
            <img className="Appointmentimg" src={accidentalrepairs} style={{ width: "100%", height: "100%", borderRadius: "3%" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
};



export default AccidentalAppointment;