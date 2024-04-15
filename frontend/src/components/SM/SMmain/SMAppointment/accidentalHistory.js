import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import jsPDF from 'jspdf';

const AccidentalHistory = props => {

  //create an empty array to store details
  const [accidentalAppointment, setaccidentalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {

    function getaccidentalAppointment() {
      axios.get("http://localhost:5000/appointment/get-acceptedaccidentalAppointment").then((res) => {
        const sortedAppointments = res.data.sort((a, b) => {
          return new Date(a.appointmentdate) - new Date(b.appointmentdate);
        });
        setaccidentalAppointment(sortedAppointments);
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      })
    }
    getaccidentalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };
  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  const filteredAppointments = searchDate ? accidentalAppointment.filter(appointment => {
    const appointmentDate = new Date(appointment.appointmentdate);
    const searchDateObj = new Date(searchDate);
    return searchDateObj.toDateString() === appointmentDate.toDateString();
  }) : accidentalAppointment;
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
      Accident occured on: ${appointment.dateAccidentaOccured}
      Damaged Occured: ${appointment.damagedOccured}
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
    pdf.save('Accidental_history.pdf');
  }

  return (
    <main id="main" className="main">
      <div>
        <h2 className="SMAppheading">History of Accidental Repairs</h2>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />
        {selectedAppointment && (
          <div >
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
                    <strong>Accident occured on: </strong>{selectedAppointment.dateAccidentaOccured}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Damaged Occured: </strong>{selectedAppointment.damagedOccured}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Appointment Date and Time: </strong>{selectedAppointment.appointmentdate ? `${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}` : ''}<br />
                    <strong>Contact No: </strong>{selectedAppointment.contactNo}<br />
                  </Card.Text>
                </Row >
                <Row>
                  <Card.Text>
                    <strong>Image</strong>
                  </Card.Text>
                  <img src={`http://localhost:5000/${selectedAppointment.image}`} />
                </Row >
                <Row style={{ marginTop: "4%", display: "flex" }}>
                </Row>
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
              <th>damaged Occured</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} >

                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{appointment.appointmentdate ? `${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}` : ''}</td>
                <td>{appointment.contactNo}</td>
                <td>{appointment.damagedOccured}</td>
                <td>
                  <Button variant="secondary" style={{ marginLeft: "35%" }} onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="success" onClick={() => generatePDF()}>Download PDF</Button>
    </main>
  )
}
export default AccidentalHistory;