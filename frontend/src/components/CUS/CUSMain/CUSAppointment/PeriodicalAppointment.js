import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import axios from "axios"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function PeriodicalAppointment() {

  const { register, handleSubmit, formState: { errors } } = useForm();


  const [name, setname] = useState("");
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [sType, setsType] = useState("");
  const [lastServiceYear, setlastServiceYear] = useState("");
  const [lastServiceMonth, setlastServiceMonth] = useState("");
  const [mileage, setmileage] = useState("");
  const [phone, setphone] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");
  const [msg, setmsg] = useState("");

  function sendata(e) {
    e.preventDefault();

    //create javascript object
    const newPeriodicalAppointment = {
      name,
      vType,
      vNo,
      sType,
      lastServiceYear,
      lastServiceMonth,
      mileage,
      phone,
      appointmentdate,
      appointmenttime,
      msg
    }

    axios.post("http://localhost:5000/appointment/add", newPeriodicalAppointment).then(() => {
      alert("Your Appointment Success")
      setname = ("");
      setvType("");
      setvNo("");
      setsType("");
      setlastServiceYear("");
      setlastServiceMonth("");
      setmileage("");
      setphone("");
      setappointmentdate("");
      setappointmenttime("");
      setmsg("");

    }).catch((err) => {
      alert(err)
    })

  }
  return (

    <main id="main" className="main">
      <h2 className='Appheading'>Make an Appointment for Your Periodical Services</h2>
      <Form onSubmit={sendata}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail" md='5'>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control placeholder="Enter Your Name" value={name} onChange={(e) => setname(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword" md='5'>
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control placeholder="Enter vehicle type" value={vType} onChange={(e) => setvType(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail" md='5'>
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control placeholder="Enter Vehicle Number" value={vNo} onChange={(e) => setvNo(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword" md='5'>
            <Form.Label>What kind of service you want?</Form.Label>
            <Form.Control placeholder="Enter Service type" value={sType} onChange={(e) => setsType(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail" md='5'>
            <Form.Label>Last service year</Form.Label>
            <Form.Control placeholder="Enter Last service year" value={lastServiceYear} onChange={(e) => setlastServiceYear(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword" md='5'>
            <Form.Label>Last service Month</Form.Label>
            <Form.Control placeholder="Enter Last service month" value={lastServiceMonth} onChange={(e) => setlastServiceMonth(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail" md='5'>
            <Form.Label>Enter Mileage</Form.Label>
            <Form.Control placeholder="Enter LMileage" value={mileage} onChange={(e) => setmileage(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword" md='5'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control placeholder="Enter Contact Number" value={phone} onChange={(e) => setphone(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail" md='5'>
            <Form.Label>Appointment date</Form.Label>
            <Form.Control placeholder="Enter Appointment Date" value={appointmentdate} onChange={(e) => setappointmentdate(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword" md='5'>
            <Form.Label>Appointment Time</Form.Label>
            <Form.Control placeholder="Enter Appointment Time" value={appointmenttime} onChange={(e) => setappointmenttime(e.target.value)} />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" md='5'>
          <Form.Label>Anything else?</Form.Label>
          <Form.Control as="textarea" rows={3} value={msg} onChange={(e) => setmsg(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox" rows='3' md='5' >
          <Form.Check type="checkbox" label="By scheduling your appointment you agree to accept our terms and regulations" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>
    </main>
  );
}
export default PeriodicalAppointment;
