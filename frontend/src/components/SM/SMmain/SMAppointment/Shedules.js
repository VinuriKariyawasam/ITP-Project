import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Shedules = ({ toggleLoading }) => {
  const [value, onChange] = useState(new Date());

  // to handle card display after select a date
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State to hold the details of the selected appointment
  const [name, setname] = useState("");
  const[cusType,setcusType]=useState("");
  const [vNo, setvNo] = useState("");
  const [issue, setissue] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [userId, setuserId] = useState("");
  const [vType, setvType] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");
  const [serviceType, setserviceType] = useState("");

  function sendata(e) {
    const request = "pending"
    const quotation = "pending"
   

    e.preventDefault();

    const newservicerequest = {
      vehicleNo: vNo,
      date: appointmentdate,
      name: name,
      issue: issue,
      quotation,
      request
      

    };
    toggleLoading(true); 
    axios.post(`${process.env.React_App_Backend_URL}/api/vehicle/add-serviceReqApp`, newservicerequest)
      .then(() => {
        alert("Service request added ")
        sendataToCompletedHistort(selectedAppointment);
      })
      .catch((err) => {
        alert(err)
      }).finally(()=>{
        toggleLoading(false); 
      });
  }

  function sendataToCompletedHistort() {
   
    const newcompletedAppointment = {
      userId,
      name,
      cusType,
      vType,
      vNo,
      serviceType,
      issue,
      contactNo,
      appointmentdate,
      appointmenttime,


    };
    toggleLoading(true); 

    axios.post(`${process.env.React_App_Backend_URL}/appointment/addcompletedappointment`, newcompletedAppointment)
      .then(() => {
        alert("Completed Appointment added ")
      })
      .catch((err) => {
        alert(err)
      }).finally(()=>{
        toggleLoading(false); 
      });
  }



  const handleTableRowClick = (appointment) => {
    console.log("Selected Appointment:", appointment);
    setvNo(appointment.vNo);
    setappointmentdate(appointment.appointmentdate);
    setname(appointment.name);
    setissue(appointment.issue);
    setSelectedAppointment(appointment);
    setuserId(appointment.userId);
    setcusType(appointment.cusType)
    setvType(appointment.vType);
    setserviceType(appointment.serviceType);
    setcontactNo(appointment.contactNo);
    setappointmenttime(appointment.appointmenttime);

    // Update selectedDate based on the appointment date
    setSelectedDate(new Date(appointment.appointmentdate));
  };



  // Function to format the date correctly
  const changedatetoformet = (date) => {
    const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    return formattedDate;
  };


  // Function to handle date selection
  const handleDateClick = async (date) => {
    try {
      setAppointments("");
      const formattedDate = changedatetoformet(date);
      toggleLoading(true); 
      const response = await axios.get(`${process.env.React_App_Backend_URL}/appointment/get-acceptedappointmentbyDate/${formattedDate}`);
      setAppointments(response.data.data);
      setSelectedDate(date);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }finally {
      toggleLoading(false); // Set loading to false after API call
    }
  };
  // Function to handle opening the card with appointment details
  const handleMoreClick = (appointment) => {
    setSelectedAppointment(appointment);
  };


  // Function to close the card
  const handleCardClose = () => {
    setSelectedAppointment(null);
  };



  // Function to render the board component based on selected date
  const renderBoard = () => {
    console.log("Selected Date:", selectedDate);
    console.log("Appointments:", appointments);
    if (selectedDate && appointments.length > 0) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Customer Name</th>
              <th>Service Type</th>
              <th>Issue</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id} onClick={() => handleTableRowClick(appointment)}>
                <td>{appointment.name}</td>
                <td>{appointment.serviceType}</td>
                <td>{appointment.issue}</td>
                <td>{appointment.appointmenttime}</td>
                <td> <Button variant="secondary" style={{ marginLeft: "35%" }} onClick={() => handleMoreClick(appointment)}>
                  More
                </Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return (
        <div style={{ marginLeft: '20%', marginBottom: '0.5%' }} ><h2>No appointments for the selected date.</h2></div>
      );
    }
  };


  return (

    <main id="main" className="main">

      {selectedAppointment && ( // Render card if selectedAppointment is not null
        <Card style={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Card.Body>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCardClose}></button>
            <Card.Title>Selected Appointment Details</Card.Title>
            <Card.Text>
              <strong>Vehicle No: </strong>{selectedAppointment.vNo}<br />
              <strong>Customer Name: </strong>{selectedAppointment.name}<br />
              <strong>Customer Type: </strong>{selectedAppointment.cusType}<br />
              <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
              <strong>Service type: </strong>{selectedAppointment.serviceType}<br />
              <strong>Requesting service: </strong>{selectedAppointment.issue}<br />
              <strong>Date and Time: </strong>{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}<br />
              <strong>Contact No: </strong>{selectedAppointment.contactNo}<br />
              <Button variant="primary" onClick={sendata} >Genarate service request</Button>

            </Card.Text>

          </Card.Body>
        </Card>
      )}
      <div style={{ marginLeft: '17%' }}>
        <h1 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Appointment Scheduling Calendar</h1>
        {/*<h3 style={{fontSize: '24px', color: 'darkblue',marginRight:'150px',marginLeft:'12px'}}>Here comes the schedule of Appointments in Upcoming days</h3>*/}

        
      </div>
      {/* Render the board component */}
      <div style={{ marginTop: '50px' }}>{renderBoard()}</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', marginLeft: '50px', marginRight: '170px', marginTop: '0px' }}>
        <Calendar onChange={handleDateClick} value={value} minDate={new Date()} />
      </div>
    

    </main>
  );
}

export default Shedules;
