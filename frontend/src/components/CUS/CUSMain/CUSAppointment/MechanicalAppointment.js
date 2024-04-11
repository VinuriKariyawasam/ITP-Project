import React, { useState, useEffect } from 'react';
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

  const { register, handleSubmit } = useForm();
  const [availableTimes, setAvailableTimes] = useState([]);



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

    //create javascript object
    const newmechanicalAppointment = {
      name,
      vType,
      vNo,
      issue,
      contactNo,
      appointmentdate,
      appointmenttime,
    };

    axios.post("http://localhost:5000/appointment/addmechanicalAppointment", {
      ...newmechanicalAppointment,
      appointmentdate: new Date(appointmentdate.getTime() + (24 * 60 * 60 * 1000)) // Adding one day
    }).then(() => {

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
    if (appointmentdate) {
      fetchAvailableTimes(appointmentdate);
    }
  }, [appointmentdate]);

  
  const fetchAvailableTimes = async (date) => {
    try {
      const formattedDate = changedatetoformet(date);
      const response = await axios.get(`http://localhost:5000/appointment/get-acceptedmechanicalappointmentbyDate/${formattedDate}`);
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
                    onChange={(date) => setappointmentdate(date)}// Set state with selected date
                    dateFormat='MM/dd/yyyy'
                    minDate={getTomorrow()} // Set minimum selectable date to tomorrow's date
                    required
                  />

                </Form.Group>
              </Row>


              <Form.Group as={Col} md='5'>
                <Form.Label>Select a time</Form.Label>
                <select
                  className="form-select"
                  value={appointmenttime}
                  onChange={(e) => setappointmenttime(e.target.value)}
                  required
                >
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
