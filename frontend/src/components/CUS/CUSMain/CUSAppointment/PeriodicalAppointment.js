import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form';
import periodicalAppointment from '../../../../images/CUS/Appointment/periodicalAppointment.jpg'
import axios from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import { CusAuthContext } from "../../../../context/cus-authcontext";
import { useNavigate } from "react-router-dom";

function PeriodicalAppointment({ toggleLoading }) {

  const [availableTimes, setAvailableTimes] = useState([]);
  const cusauth = useContext(CusAuthContext)
  const { } = useForm();
  const navigate = useNavigate();

  const [cusType,setcusType]=useState("");
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

  const handleAddSri = () => {
    if (/^\d+/.test(vNo)) {
      setvNo(prevVNo => {
        return prevVNo + "ශ්‍රී";
      });
    } else {
      alert("Please enter a valid format of vehicle number.");
    }
  };
  function sendata(e) {
    e.preventDefault();

    // Check if the phone number has exactly 9 digits
    if (phone.length !== 9) {
      alert("Please enter a valid phone number.");
      return; // Exit the function if the phone number is not valid
    }

    //create javascript object
    const newPeriodicalAppointment = {
      userId: cusauth.userId,
      name:cusauth.name,
      email:cusauth.email,
      cusType,
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
    toggleLoading(true);
    axios.post(`${process.env.React_App_Backend_URL}/appointment/addperiodicalAppointment`, {
      ...newPeriodicalAppointment,
      appointmentdate: new Date(appointmentdate.getTime() + (24 * 60 * 60 * 1000)) // Adding one day
    }).then(() => {
      alert("Your Appointment Success")
      navigate('/customer/appointment/myappointment');
      setvType("");
      setcusType("")
      setvNo("");
      setsType("");
      setlastServiceYear("");
      setlastServiceMonth("");
      setmileage("");
      setphone("");
      setappointmentdate(null);
      setappointmenttime("");
      setmsg("");

    }).catch((err) => {
      alert(err)
    }).finally(()=>{
      toggleLoading(false); 
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
      const response = await axios.get(`${process.env.React_App_Backend_URL}/appointment/get-acceptedperiodicalappointmentbyDate/${formattedDate}`);
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
        <h2 className='Appheading'>Make an Appointment for Your Periodical Services</h2>
        <Row>
          <Col md={7}>
            <Form onSubmit={sendata}>
              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridEmail" md='5'>
                  <Form.Label>Customer Type</Form.Label>
                  <select class="form-select" id="validationCustom04" value={cusType} onChange={(e) => setcusType(e.target.value)} required>
              <option value="">choose</option>
              <option value="Government">Government</option>
              <option value="Non-Government">Non-Government</option>
              </select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" md='5'>
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control type="text" placeholder="Enter vehicle type" value={vType} onChange={(e) => setvType(e.target.value)} maxLength={10} required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md='5'>
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control type='text' placeholder="Enter Vehicle Number" value={vNo} onChange={(e) => setvNo(e.target.value)} maxLength={16} required />
                  <Button variant="secondary" onClick={handleAddSri}>Add ශ්‍රී</Button>
                </Form.Group>

                <Form.Group as={Col} md='5'>
                  <Form.Label>What kind of service you want?</Form.Label>
                  <Form.Control type="text" placeholder="Enter Service type" value={sType} onChange={(e) => setsType(e.target.value)} maxLength={30} required />
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
                    <option value="first time">first time</option>
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
                    <option value="Fisrt time">Fisrt time</option>
                  </select>


                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md='5'>
                  <Form.Label>Mileage</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Mileage"
                    value={mileage}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value < 0) {
                        // If entered value is negative, set mileage to 0
                        setmileage(0);
                      } else {
                        // Otherwise, update the mileage state with the entered value
                        setmileage(value);
                      }
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md='5'>
                  <Form.Label>Contact Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>+94</InputGroup.Text>
                    <Form.Control
                      type="phone"
                      maxLength={9} // Allow for the length of "+94" and 10 digits
                      placeholder="Enter Contact Number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        const filteredValue = value.replace(/[^\d]/g, ''); // Filter out non-numeric characters
                        setphone(filteredValue); // Update state with the filtered value
                      }}
                      required
                    />
                  </InputGroup>
                </Form.Group>

              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md='5'>
                  <Form.Label>Appointment Date</Form.Label>
                  <DatePicker
                    placeholderText='Appointment Date'
                    selected={appointmentdate} // Use state variable here
                    onChange={(date) => setappointmentdate(date)} // Set state with selected date
                    dateFormat='MM/dd/yyyy'
                    minDate={getTomorrow()} // Set minimum selectable date to tomorrow's date
                    required
                  />
                </Form.Group>


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
              </Row>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" md='6'>
                <Form.Label>Anything else?</Form.Label>
                <Form.Control as="textarea" rows={1} value={msg} onChange={(e) => setmsg(e.target.value)} maxLength={50}></Form.Control>
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
            <img className='periodicalA-img' src={periodicalAppointment} alt="Periodical Appointment" style={{ marginTop: "7%", borderRadius: "3%" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default PeriodicalAppointment;
