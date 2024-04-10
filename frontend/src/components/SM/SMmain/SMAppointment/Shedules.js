import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Shedules = () => {
  const [value, onChange] = useState(new Date());
  // to handle card display after select a date
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State to hold the details of the selected appointment

  // Function to format the date correctly
  const changedatetoformet = (date) => {
    const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    return formattedDate;
  };

  // Function to handle date selection
  const handleDateClick = async (date) => {
    try {
      const formattedDate = changedatetoformet(date);
      const response = await axios.get(`http://localhost:5000/appointment/get-acceptedappointmentbyDate/${formattedDate}`);
      setAppointments(response.data.data);
      setSelectedDate(date);
    } catch (error) {
      console.error('Error fetching appointments:', error);
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
              <tr key={appointment._id}>
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
        <div><h1>No appointments for the selected date.</h1></div>
      );
    }
  };
  return (

    <main id="main" className="main">
      {renderBoard()} {/* Render the board component */}
      {selectedAppointment && ( // Render card if selectedAppointment is not null
        <Card style={{ width: "50%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Card.Body>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCardClose}></button>
            <Card.Title>Selected Appointment Details</Card.Title>
            <Card.Text>
              <strong>Vehicle No: </strong>{selectedAppointment.vNo}<br />
              <strong>Customer Name: </strong>{selectedAppointment.name}<br />
              <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
              <strong>Service type: </strong>{selectedAppointment.serviceType}<br />
              <strong>Requesting service: </strong>{selectedAppointment.issue}<br />
              <strong>Date and Time: </strong>{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}<br />
              <strong>Contact No: </strong>{selectedAppointment.contactNo}<br />
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', marginLeft: '50px', marginRight: '170px' }}>
        <Calendar onChange={handleDateClick} value={value} minDate={new Date()} />
      </div>
    </main>
  );
}

export default Shedules;
