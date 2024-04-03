import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import periodicalAppointment from '../../../../images/CUS/Appointment/periodicalAppointment.jpg'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function PeriodicalAppointment() {

  const { } = useForm();


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

    axios.post("http://localhost:5000/appointment/addperiodicalAppointment", newPeriodicalAppointment).then(() => {
      alert("Your Appointment Success")
      setname("");
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

    <div style={{marginTop:"6%", marginLeft:"3%"}}>

      <div style={{flex:"1" ,marginRight:"6%"}}>
      <h2 className='Appheading'>Make an Appointment for Your Periodical Services</h2>
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
            <Form.Label>What kind of service you want?</Form.Label>
            <Form.Control type="text" placeholder="Enter Service type" value={sType} onChange={(e) => setsType(e.target.value)} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md='5'>
            <Form.Label>Last service year</Form.Label>

            <select class="form-select" id="validationCustom04" value={lastServiceYear} onChange={(e) => setlastServiceYear(e.target.value)} required>
              <option value="">Choose</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="before 2018">before 2018</option>
            </select>

          </Form.Group>

          <Form.Group as={Col} md='5'>
            <Form.Label>Last service Month</Form.Label>
            <select class="form-select" id="validationCustom04" value={lastServiceMonth} onChange={(e) => setlastServiceMonth(e.target.value)} required>
              <option value="">Choose</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>


          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md='5'>
            <Form.Label>Enter Mileage</Form.Label>
            <Form.Control type="number" placeholder="Enter LMileage" value={mileage} onChange={(e) => setmileage(e.target.value)} required />
          </Form.Group>

          <Form.Group as={Col} md='5'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="phone" maxLength={10} placeholder="Enter Contact Number" value={phone} onChange={(e) => setphone(e.target.value)} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md='5'>
            <Form.Label>Appointment date</Form.Label>
            <Form.Control placeholder="Enter Appointment Date" value={appointmentdate} onChange={(e) => setappointmentdate(e.target.value)} required />
          </Form.Group>

          <Form.Group as={Col} md='5'>
            <Form.Label>Appointment Time</Form.Label>
            <Form.Control placeholder="Enter Appointment Time" value={appointmenttime} onChange={(e) => setappointmenttime(e.target.value)} required />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" md='6'>
          <Form.Label>Anything else?</Form.Label>
          <Form.Control as="textarea" rows={1} value={msg} onChange={(e) => setmsg(e.target.value)} ></Form.Control>
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
          <img className='periodicalA-img' src={periodicalAppointment} alt="Periodical Appointment" style={{marginTop:"7%",borderRadius:"3%"}}/>
        </Col>
        </Row>
        </div>
        </div>
  );
}
export default PeriodicalAppointment;
