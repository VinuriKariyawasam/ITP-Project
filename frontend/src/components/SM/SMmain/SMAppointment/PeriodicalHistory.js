import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import jsPDF from 'jspdf';


const PeriodicalHistory = props => {

  //create an empty array to store details
  const [acceptedperiodicalAppointment, setacceptedperiodicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const getAcceptedPeriodicalAppointment = async () => {
      try {
        const res = await axios.get("http://localhost:5000/appointment/get-acceptedperiodicalAppointment");
        const sortedAppointments = res.data.sort((a, b) => new Date(b.appointmentdate) - new Date(a.appointmentdate));
        setacceptedperiodicalAppointment(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      } catch (error) {
        alert(error.message);
      }
    };
    getAcceptedPeriodicalAppointment();

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
    const filteredAppointments = acceptedperiodicalAppointment.filter(appointment => {
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
        Requesting service: ${appointment.sType}
        Last Service Year: ${appointment.lastServiceYear}
        Last Service Month: ${appointment.lastServiceMonth}
        Mileage: ${appointment.mileage}
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
    pdf.save('periodical_history.pdf');
  }


  return (
    <main id="main" className="main">
      <div>
        <h2 className="SMAAppheading">History of Accepted Periodical Services</h2>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        {selectedAppointment && (
          <div className="SmCard">
            <Card style={{ width: "50%" }}>
              <Card.Body>
                <button type="button" class="btn-close" aria-label="Close" onClick={handleCardClose}></button>
                <Card.Title>Selected Appointment Details</Card.Title>
                <Row>
                  <Card.Text style={{ display: "flex" }} >
                    <strong style={{ float: "left" }}>Vehicle No: </strong>{selectedAppointment.vNo}<br />
                    <strong style={{ marginLeft: "40%", float: "right" }}>Customer Name: </strong>{selectedAppointment.name}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
                    <strong>Requesting service: </strong>{selectedAppointment.sType}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Last Srvice Year: </strong>{selectedAppointment.lastServiceYear}<br />
                    <strong>Last Srvice Month: </strong>{selectedAppointment.lastServiceMonth}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>mileage: </strong>{selectedAppointment.mileage}<br />
                    <strong>Description: </strong>{selectedAppointment.msg}<br />
                  </Card.Text>
                </Row>
                <Row>
                  <Card.Text>
                    <strong>Date and Time: </strong>{`${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}`}<br />
                    <strong>Contact No: </strong>{selectedAppointment.phone}<br />
                  </Card.Text>
                </Row >
                <Row style={{ marginTop: "4%", display: "flex" }}>
                </Row>
              </Card.Body>
            </Card>
          </div>
        )}


        <Table>

          <tr>
            <th>Vehicle No</th>
            <th>Customer Name</th>
            <th>Date and Time</th>
            <th>Contact No</th>
            <th>Description</th>
          </tr>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} >
                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{`${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}`}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.sType}</td>
                <td>
                  <Button variant="secondary" style={{ marginLeft: "35%" }} onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button></td>
              </tr>

            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="success" onClick={() => generatePDF()}>Download PDF</Button>
    </main>
  )
}
export default PeriodicalHistory;
