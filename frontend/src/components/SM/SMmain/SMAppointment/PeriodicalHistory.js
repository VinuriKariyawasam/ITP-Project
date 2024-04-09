import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';


const PeriodicalHistory= props => {

  //create an empty array to store details
  const [acceptedperiodicalAppointment, setacceptedperiodicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  

  useEffect(() => {
    const getAcceptedPeriodicalAppointment = async () => {
      try {
        const res = await axios.get("http://localhost:5000/appointment/get-acceptedperiodicalAppointment");
        const sortedAppointments = res.data.sort((a, b) => new Date(b.appointmentdate) - new Date(a.appointmentdate));
        setacceptedperiodicalAppointment(sortedAppointments);
      } catch (error) {
        alert(error.message);
      }
    };
    getAcceptedPeriodicalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };

  return (
    <main id="main" className="main">

      
      <div>

        <h2 className="SMAAppheading">History of Accepted Periodical Services</h2>

        {selectedAppointment && (
          <div className="SmCard">
          <Card style={{width:"50%"}}>
            <Card.Body>
            <button type="button" class="btn-close" aria-label="Close"  onClick={handleCardClose}></button>
              <Card.Title>Selected Appointment Details</Card.Title>
              <Row>
              <Card.Text style={{display:"flex"}} >
                <strong style={{float:"left"}}>Vehicle No: </strong>{selectedAppointment.vNo}<br />
                <strong style={{marginLeft:"40%",float:"right"}}>Customer Name: </strong>{selectedAppointment.name}<br />
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
                <Row style={{marginTop:"4%", display:"flex"}}>
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
            {acceptedperiodicalAppointment.map((appointment) => (
              <tr key={appointment._id} >
                <td>{appointment.vNo}</td>
                <td>{appointment.name}</td>
                <td>{`${appointment.appointmentdate.split('T')[0]} ${appointment.appointmenttime}`}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.sType}</td>
                <td>
                  <Button variant="secondary" style={{marginLeft:"35%"}} onClick={() => handleMoreButtonClick(appointment)}>
                    More
                  </Button></td>
              </tr>

            ))}
          </tbody>
        </Table>
       
       
      </div>

    </main>
  )
}
export default PeriodicalHistory;
