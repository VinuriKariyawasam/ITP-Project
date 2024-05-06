import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';


const SMAccidentalRepairs = ({ toggleLoading }) => {
  const [accidentalAppointment, setaccidentalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const[cusType,setcusType]=useState("")
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [serviceType, setserviceType] = useState("");
  const [issue, setissue] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");
  const[dateAccidentaOccured,setdateAccidentaOccured]=useState("");
  const[damagedOccured,setdamagedOccured]=useState("");
  const[image,setimage]=useState("");

  function sendata(e) {
    e.preventDefault();
    const serviceType = "Accidental Repairs";

    //create javascript object
    const newacceptedappointment = {
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

    }
    toggleLoading(true); 
    axios.post(`${process.env.React_App_Backend_URL}/appointment/addacceptedappointment`,newacceptedappointment).then(() => {
      alert("Appointment Added to calendar")
      senddataAccidentalAppointmentHistory(selectedAppointment);
      Delete(selectedAppointment._id);

    }).catch((err) => {
      alert(err)
    }).finally(()=>{
      toggleLoading(false); 
    });
  

  }
  function senddataAccidentalAppointmentHistory() {
   
    //create javascript object
    const newacceptedaccidentalAppointment = {
      userId,
      name,
      cusType,
      vType,
      vNo,
      dateAccidentaOccured,
      damagedOccured,
      contactNo,
      appointmentdate,
      appointmenttime,
      image
    
    }
    toggleLoading(true); 
    axios.post(`${process.env.React_App_Backend_URL}/appointment/addacceptedaccidentalAppointment`,newacceptedaccidentalAppointment).then(() => {
      
    }).catch((err) => {
      alert(err)
    }).finally(()=>{
      toggleLoading(false); 
    });

  }

  //set values to columnns in accepted appointment
  const handleTableRowClick = (appointment) => {
    setuserId(appointment.userId);
    setname(appointment.name);
    setcusType(appointment.cusType);
    setvType(appointment.vType);
    setvNo(appointment.vNo);
    setserviceType(appointment.serviceType);
    setissue(appointment.damagedOccured);
    setcontactNo(appointment.contactNo);
    setappointmentdate(appointment.appointmentdate);
    setappointmenttime(appointment.appointmenttime);
    setdateAccidentaOccured(appointment.dateAccidentaOccured);
    setdamagedOccured(appointment.damagedOccured)
    setimage(appointment.image)
    
  };

  useEffect(() => {
    
    function getaccidentalAppointment() {
      toggleLoading(true); 
      axios.get(`${process.env.React_App_Backend_URL}/appointment/get-accidentalAppointment`).then((res) => {
        const sortedAppointments = res.data.sort((a, b) => {
          return new Date(a.appointmentdate) - new Date(b.appointmentdate);
        });
        setaccidentalAppointment(sortedAppointments);
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      }).finally(()=>{
        toggleLoading(false); 
      });
    }
    getaccidentalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };

  const Delete = (id) => {
    toggleLoading(true);
      axios.delete(`${process.env.React_App_Backend_URL}/appointment/delete-accidentalAppointment/${id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          // Handle errors here
          console.error(error);
        }).finally(()=>{
          toggleLoading(false); 
        });
    
  };
  const cancleAppointment = (id,Image) => {
    const image = Image;
    axios.delete(`${process.env.React_App_Backend_URL}/appointment/delete-allwithimage/${id}`,{data:{image}})
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(error => {
        // Handle errors here
        console.error(error);
      }).finally(()=>{
        toggleLoading(false); 
      });
  
  
};

  return (
    <main id="main" className="main">
      <div>
        <h2 className="SMAppheading">Accidental Repairs</h2>
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
                    <strong>Customer Type: </strong>{selectedAppointment.cusType}<br />
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
                  <img src={`${selectedAppointment.image}`} style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Row >
                <Row style={{ marginTop: "4%", display: "flex" }}>
                </Row>
                <Row style={{ marginTop: "4%", display: "flex" }}>
                  <Button variant="danger" onClick={() => cancleAppointment(selectedAppointment._id,selectedAppointment.image)} style={{ marginLeft: '20%', width: '100px' }}>Cancel</Button>
                  <Button variant="primary" onClick={sendata} style={{ marginLeft: "20%", width: "100px" }}>Approve</Button>
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
            {accidentalAppointment.map((appointment) => (
              <tr key={appointment._id} onClick={() => handleTableRowClick(appointment)}>

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
        <Link to='/staff/sm/accidentalhistory'>
          <Button variant="success" >
            View History of accepted appointments
          </Button><br/><br/>
        </Link>
        <Link to='/staff/sm/appointmentMain'>
        <Button variant="secondary" >
                    Back
        </Button>
        </Link>
      </div>
    </main>
  )
}
export default SMAccidentalRepairs;

