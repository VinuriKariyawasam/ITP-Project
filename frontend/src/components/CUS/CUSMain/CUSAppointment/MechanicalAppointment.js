import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import mechanicalrepairs from '../../../../images/CUS/Appointment/mechanical repairs.jpg'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MechanicalAppointment() { // Corrected function name

  const { } = useForm();

  const [name, setname] = useState("");
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [issue, setissue] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");

  function sendata(e) {
    e.preventDefault();
    const dateOnly = appointmentdate ? appointmentdate.toDateString() : null;
    //create javascript object
    const newmechanicalAppointment = {
      name,
      vType,
      vNo,
      issue,
      contactNo,
      appointmentdate: dateOnly,
      appointmenttime,
    };

    axios.post("http://localhost:5000/appointment/addmechanicalAppointment", newmechanicalAppointment)
      .then(() => {
        alert("Your Appointment Success")
        setname(""); // Corrected assignment, use function instead of assignment
        setvType("");
        setvNo("");
        setissue("");
        setcontactNo("");
        setappointmentdate("");
        setappointmenttime("");
      })
      .catch((err) => {
        alert(err)
      });
  }
  return (

    <div style={{ marginTop: "10%", marginLeft: "3%" }}>

      <div style={{ flex: "1", marginRight: "6%" }}>
        <h2 className='Appheading'>Make an Appointment for Mechanical Repairs</h2>
        <Row>
          <Col md={7}>
            <Form onSubmit={sendata}>
              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridEmail" md='5'>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setname(e.target.value)} required />
                  <div class="invalid-feedback">
                    Please choose a username.
                  </div>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" md='5'>
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control type="text" placeholder="Enter vehicle type" value={vType} onChange={(e) => setvType(e.target.value)} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md='5'>
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control type='text' placeholder="Enter Vehicle Number" value={vNo} onChange={(e) => setvNo(e.target.value)} required />
                </Form.Group>

                <Form.Group as={Col} md='5'>
                  <Form.Label>What is the issue with your vehicle?</Form.Label>
                  <Form.Control type="text" placeholder="Enter issue" value={issue} onChange={(e) => setissue(e.target.value)} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md='5'>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="phone" maxLength={10} placeholder="Enter Contact Number" value={contactNo} onChange={(e) => setcontactNo(e.target.value)} required />
                </Form.Group>


                <Form.Group as={Col} md='5'>
                  <Form.Label>Appointment Date</Form.Label>
                  <DatePicker
                    placeholderText='Appointment Date'
                    selected={appointmentdate} // Use state variable here
                    onChange={(date) => setappointmentdate(date)} // Set state with selected date
                    dateFormat='MM/dd/yyyy'
                    required
                  />
                  =
                </Form.Group>
              </Row>

              <Form.Group as={Col} md='5'>
            <Form.Label>select a time</Form.Label>

            <select class="form-select" id="validationCustom04" value={appointmenttime} onChange={(e) => setappointmenttime(e.target.value)} required>
              <option value="">Choose</option>
              <option value="9.00am">9.00am</option>
              <option value="10.30am">10.30am</option>
              <option value="12.00pm">12.00pm</option>
              <option value="1.30pm">1.30pm</option>
              <option value="3.00pm">3.00pm</option>
              <option value="4.30pm">4.30pm</option>
            </select>

          </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox" rows='3' md='5' >
                <Form.Check type="checkbox" label="By scheduling your appointment you agree to accept our terms and regulations" id="invalidCheck" required />
                <div class="invalid-feedback">
                  You must agree before submitting.
                </div>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>

            </Form>
          </Col>
          <Col md={4}>
            <img className='periodicalA-img' src={mechanicalrepairs} alt="Periodical Appointment" style={{ borderRadius: "3%" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default MechanicalAppointment;
