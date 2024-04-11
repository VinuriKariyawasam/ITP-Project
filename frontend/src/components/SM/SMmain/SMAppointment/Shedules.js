import React, { useState, useRef  } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';


const Shedules = () => {
  const [value, onChange] = useState(new Date());

  // to handle card display after select a date
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State to hold the details of the selected appointment
  const [name, setname] = useState("");
  const [vNo, setvNo] = useState("");
  const [issue,setissue]=useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const pdfRef = useRef(null);

  /*function sendata(e) {
    e.preventDefault();

    const newservicerequest = {
      vNo,
      appointmentdate,
      name, 
      issue,
       
    }

    axios.post("http://localhost:5000/api/vehicle/add-serviceReq", newservicerequest).then(() => {
      alert("Service request added ") 
      
    }).catch((err) => {
      alert(err)
    })

  }*/
  const handleTableRowClick = (appointment) => {
    console.log("Selected Appointment:", appointment);
    setvNo(appointment.vNo);
    setappointmentdate(appointment.appointmentdate);
    setname(appointment.name);
    setissue(appointment.issue);
    
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
        <div><h1>No appointments for the selected date.</h1></div>
      );
    }
  };
  
  // Function to generate PDF
 
const generatePDF = () => {
  console.log("Generating PDF...");
  if (!selectedAppointment) {
    // Handle the case where selectedAppointment is null
    console.error("No appointment selected.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("helvetica");
  doc.setFontSize(16); // Increase font size for the topic
  doc.setTextColor(0, 0, 255); // Set text color to blue

  doc.text("Shedule report", 10, 10);

  // Reset font size and color for the rest of the content
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Set text color to black

  const startY = 20;
  const lineHeight = 10;
  const xOffset = 10;
  let yOffset = startY;

  // Assuming 'selectedAppointment' contains the appointment details
  doc.text(`VehicleNo: ${selectedAppointment.vNo}`, xOffset + 5, yOffset);
  doc.text(`Customer Name: ${selectedAppointment.name}`, xOffset + 45, yOffset);
  doc.text(`Vehicle Type: ${selectedAppointment.vType}`, xOffset + 85, yOffset);
  doc.text(`Service Type: ${selectedAppointment.serviceType}`, xOffset + 120, yOffset);
  doc.text(`Requesting Service: ${selectedAppointment.issue}`, xOffset + 155, yOffset);
  doc.text(`Date and Time: ${selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}`, xOffset + 10, yOffset + lineHeight);
  doc.text(`Contact No: ${selectedAppointment.contactNo}`, xOffset + 10, yOffset + 2 * lineHeight);

  // Convert the PDF to a blob
  doc.output("blob", function (blob) {
    // Save the blob as a file using FileSaver.js
    saveAs(blob, `appointment_${new Date().toISOString()}.pdf`);
  });
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
              <Button variant="primary"  style={{marginLeft:"20%",width:"100px"}}>Genarate service request</Button>
                
            </Card.Text>

          </Card.Body>
        </Card>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', marginLeft: '50px', marginRight: '170px' }}>
        <Calendar onChange={handleDateClick} value={value} minDate={new Date()} />
      </div>
      {selectedDate && (
        <Button variant="success" onClick={generatePDF}>Download PDF</Button>
      )}
    </main>
  );
}

export default Shedules;
