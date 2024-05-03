import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import '../CUSMobileReq/Mechanicalreq.css';
import axios from "axios";
import { Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import BreakdownImg from '../../../../images/MobileServices/EmergencyBreakdownIMG.jpg';

function EmBreakdownReq({ toggleLoading }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = data => {
    // Append current location to the form data
    data.location = currentLocation;
    // Perform form submission logic here
      toggleLoading(true);
      axios.post(`${process.env.React_App_Backend_URL}/api/mobile/add-breakdown`, data)
        .then(() => {
          alert("Your Emergency Breakdown Request was successfully completed");
          navigate("/customer/mobservices/mobilemain");
          reset();
        })
        .catch(error => {
          console.error("Error submitting request:", error);
          alert("Error submitting request. Please try again later.");
        })
        .finally(() => {
          toggleLoading(false); // Set loading to false after API call
        });
  };

  // Custom validation function for email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Custom validation function for phone number
  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
    return phoneRegex.test(phone);
  };

  // Trigger validation on input change or blur
  const validateField = async (fieldName) => {
    await trigger(fieldName);
  };

  return (
    <main>
      <div className="mobbody">
        <div style={{ flex: "1", marginTop: "3%" }}>
          <h2 className='mobheading'>Emergency Breakdown Service Requests</h2><br />
          <Row>
            <Col>
              <container className=''>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>
                      <div className="mobform-element">
                        <Form.Label htmlFor="cusName" className='mobL1'>Customer Name</Form.Label><br />
                        <Form.Control {...register("cusName", {
                          required: true, pattern: {
                            value: /^[A-Za-z\s]+$/i,
                            message: "Please enter a valid name without numeric values"
                          }
                        })}
                          className="mobinput-styles" type="text" id="cusName" placeholder="Supun Kularathne"
                          onBlur={() => validateField("cusName")} />
                        {errors.cusName && <span style={{ color: "red" }}>{errors.cusName.message}</span>}
                      </div>
                    </Col>
                    <Col>
                      <div className="mobform-element">
                        <Form.Group controlId="contactNo">
                          <Form.Label htmlFor="cusEmail" className='mobL1'>Email Address</Form.Label><br />
                          <Form.Control {...register("cusEmail", {
                            required: true,
                            validate: (value) => isValidEmail(value) || "Invalid email address"
                          })}
                            className="mobinput-styles" type="text" id="cusEmail" placeholder="supunkul@gmail.com"
                            onBlur={() => validateField("cusEmail")} />
                          {errors.cusEmail && <span style={{ color: "red" }}>{errors.cusEmail.message}</span>}
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mobform-element">
                        <Form.Label htmlFor="vehicleNo" className='mobL1'>Vehicle Number</Form.Label><br />
                        <Form.Control {...register("vehicleNo", {
                          required: true, pattern: {
                            value: /^[A-Z0-9]+(-[0-9]+)*$/, //vehicle number validation
                            message: "Invalid vehicle number"
                          }
                        })}
                          className="mobinput-styles" type="text" id="vehicleNo" placeholder="XXX-5555 / 61-4353 / SRI-5132"
                          onBlur={() => validateField("vehicleNo")} />
                        {errors.vehicleNo && <span style={{ color: "red" }}>{errors.vehicleNo.message}</span>}
                      </div>
                    </Col>
                    <Col>
                      <div className="mobform-element">
                        <Form.Label htmlFor="reqLocation" className='mobL1'>Location</Form.Label><br />
                        <Form.Control {...register("reqLocation", { required: true, readOnly: true })} className="mobinput-styles" type="text" id="reqLocation" placeholder="Your Location" value={`${currentLocation ? currentLocation.latitude + ', ' + currentLocation.longitude : ''}`} />
                        {errors.reqLocation && <span style={{ color: "red" }}>{errors.reqLocation.message}</span>}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mobform-element">
                        <Form.Label htmlFor="issue" className='mobL1'>Issue</Form.Label><br />
                        <Form.Control {...register("issue", { required: true })} className="mobinput-styles" type="text" id="issue" placeholder="Vehicle Issue" />
                        {errors.issue && <span style={{ color: "red" }}>Vehicle issue is required</span>}
                      </div>
                    </Col>
                    <Col>
                      <div className="mobform-element">
                        <Form.Label htmlFor="contactNo" className='L1'>Contact Number</Form.Label><br />
                        <Form.Control  {...register("contactNo", {
                          required: true,
                          validate: (value) => isValidPhone(value) || "Invalid contact number"
                        })}
                          className="mobinput-styles" type="text" id="contactNo" placeholder="07XXXXXXXX"
                          onBlur={() => validateField("contactNo")} />
                        {errors.contactNo && <span style={{ color: "red" }}>{errors.contactNo.message}</span>}
                      </div>
                    </Col>
                  </Row>

                  <div className="mobcheckbox-container">
                    <input type="checkbox" className="mobform-check-input" id="mobexampleCheck1" required />
                    <Form.Label className="mobform-check-label" htmlFor="mobexampleCheck1">Accept the terms and conditions</Form.Label><br /><br />
                  </div>
                  <Button variant="primary" type="submit">Submit</Button>

                </Form>
              </container>
            </Col>
            <Col>
              <img className='' src={BreakdownImg} alt="Breakdown Requests Img" style={{ marginTop: "4%", borderRadius: "2%", marginBottom: "2%", marginRight: "1%" }} />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
}

export default EmBreakdownReq;