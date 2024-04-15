import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const Mechanicalhistory = props => {

  //create an empty array to store details
  const [mechanicalAppointment, setmechanicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {

    function getmechanicalAppointment() {
      axios.get("http://localhost:5000/appointment/get-acceptedmechanicalAppointment").then((res) => {
        const sortedAppointments = res.data.sort((a, b) => new Date(b.appointmentdate) - new Date(a.appointmentdate));
        setmechanicalAppointment(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getmechanicalAppointment();

  }, [])

  useEffect(() => {
    handleSearch();
  }, [searchDate]);


  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };
  const handleSearch = () => {
    const filteredAppointments = mechanicalAppointment.filter(appointment => {
      return appointment.appointmentdate.includes(searchDate);
    });
    setFilteredAppointments(filteredAppointments);
  };
  function generatePDF() {
    const pdf = new jsPDF();

    // Starting y position for the first appointment
    let yPos = 10;

    // Function to add a new page if needed and return the updated y position
    const checkPageBreak = (currentY, lineHeight, pageHeight) => {
      if (currentY + lineHeight > pageHeight - 10) {
        pdf.addPage();
        return 10; // Starting position for new page
      }
      return currentY;
    };

    // Iterate through filteredAppointments and add details to the PDF
    filteredAppointments.forEach(appointment => {
      // Render appointment details as text
      const appointmentDetails = `
        Vehicle No: ${appointment.vNo}
        Customer Name: ${appointment.name}
        Vehicle Type: ${appointment.vType}
        Requesting service: ${appointment.issue}
        Description: ${appointment.msg}
        Date and Time: ${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}
        Contact No: ${appointment.phone}
      `;

      // Split appointment details into lines
      const lines = pdf.splitTextToSize(appointmentDetails, 180);

      // Calculate height for each line
      const lineHeight = 6; // Adjust as needed
      const totalHeight = lines.length * lineHeight;

      // Check for page break and update yPos if needed
      yPos = checkPageBreak(yPos, totalHeight, pdf.internal.pageSize.height);

      // Add appointment details to the PDF
      pdf.text(lines, 10, yPos);

      // Update yPos for the next appointment
      yPos += totalHeight;
    });

    // Save the PDF
    pdf.save('mechanical_history.pdf');
  }

  return (
    <main id="main" className="main">
      <div>
        <h2 className="SMAppheading">History of Accepted Mechanical Repairs</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
        {selectedAppointment && (
          <div className="SmCard">
            <Card style={{ width: "50%" }}>
              <Card.Body>
                <button type="button" class="btn-close" aria-label="Close" onClick={handleCardClose}></button>
                <Card.Title>Selected Appointment Details</Card.Title>
                <Row>
                  <Card.Text  >
                    <strong >Vehicle No: </strong>{selectedAppointment.vNo}<br />
                    <strong >Customer Name: </strong>{selectedAppointment.name}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
                    <strong>Requesting service: </strong>{selectedAppointment.issue}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Date and Time: </strong>{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}<br />
                    <strong>Contact No: </strong>{selectedAppointment.contactNo}<br />
                  </Card.Text>
                </Row >
              </Card.Body>
            </Card>
          </div>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Vehicle No</th>
              <th>Customer Name</th>
              <th>Date and Time</th>
              <th>Contact No</th>
              <th>Issue</th>



            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} >

                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{appointment.appointmentdate ? `${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}` : ''}</td>
                <td>{appointment.contactNo}</td>
                <td>{appointment.issue}</td>

                <td>
                  <Button variant="secondary" style={{ marginLeft: "35%" }} onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button></td>

              </tr>

            ))}
          </tbody>
        </Table>

      </div>
      <Button variant="success" onClick={() => generatePDF()}>Download PDF</Button><br/><br/>

      <Link to='/staff/sm/mechanicalappointment'>
        <Button variant="secondary" >
                    Back
        </Button>
        </Link>
    </main>
  )
}
export default Mechanicalhistory;
