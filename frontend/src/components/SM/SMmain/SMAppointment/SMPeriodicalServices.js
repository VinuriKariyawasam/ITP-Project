import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const SMPeriodicalServices = ({ toggleLoading }) => {

  //create an empty array to store details
  const [periodicalAppointment, setperiodicalAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  

  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const[cusType,setcusType]=useState("")
  const [vType, setvType] = useState("");
  const [vNo, setvNo] = useState("");
  const [serviceType, setserviceType] = useState("");
  const [issue,setissue]=useState("");
  const [contactNo, setcontactNo] = useState("");
  const [appointmentdate, setappointmentdate] = useState("");
  const [appointmenttime, setappointmenttime] = useState("");
  const [sType, setsType] = useState("");
  const [lastServiceYear, setlastServiceYear] = useState("");
  const [lastServiceMonth, setlastServiceMonth] = useState("");
  const [mileage, setmileage] = useState("");
  const [phone, setphone] = useState("");
  const [msg, setmsg] = useState("");

  function sendata(e) {

    e.preventDefault();
    const serviceType = "Periodical Services";
    const emailData = {
      to: selectedAppointment.email,
      subject: `Appointment Confirmed`,
      text: `Hi ${selectedAppointment.name},\n Your PeriodicalService Appintment with NeoTech Motors on ${selectedAppointment.appointmentdate.split('T')[0]} at ${selectedAppointment.appointmenttime} has been confirmed.`,
      html: null,
    };

      toggleLoading(true); // Set loading to true before API call
    axios
      .post(
        `${process.env.React_App_Backend_URL}/appointment/sendappointmentmail`,
        emailData
      )
      .then((response) => {
        console.log(response.data);
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

    axios.post(`${process.env.React_App_Backend_URL}/appointment/addacceptedappointment`, newacceptedappointment).then(() => {
      alert("Appointment added to the calender") 
      senddataperiodicalAppointmentHistory(selectedAppointment); // Call sendataperiodicalAppointmentHistory function
      Delete(selectedAppointment._id);

    }).catch((err) => {
      alert(err)
    }).catch((error) => {
      console.error("Error sending email:", error);
    }).finally(()=>{
      toggleLoading(false); 
    })
  })

  }


  function senddataperiodicalAppointmentHistory() {
   
    //create javascript object
    const newacceptedPeriodicalAppointment = {
      userId,
      name,
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
    axios.post(`${process.env.React_App_Backend_URL}/appointment/addaceptedperiodicalAppointment`,newacceptedPeriodicalAppointment).then(() => {
       
      

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
        setcusType(appointment.cusType)
        setvType(appointment.vType);
        setvNo(appointment.vNo);
        setserviceType(appointment.serviceType);
        setissue(appointment.sType);
        setcontactNo(appointment.phone);
        setsType(appointment.sType);
        setappointmentdate(appointment.appointmentdate);
        setappointmenttime(appointment.appointmenttime);
        setlastServiceYear(appointment.lastServiceYear);
        setlastServiceMonth(appointment.lastServiceMonth);
        setmileage(appointment.mileage);
        setphone(appointment.phone)
        setmsg(appointment.msg)
    
      };
    
  useEffect(() => {

    function getPeriodicalAppointment() {
        toggleLoading(true); // Set loading to true before API call
      axios.get(`${process.env.React_App_Backend_URL}/appointment/get-periodicalAppointment`).then((res) => {
        const sortedAppointments = res.data.sort((a, b) => {
          return new Date(a.appointmentdate) - new Date(b.appointmentdate);
        });
        setperiodicalAppointment(sortedAppointments);  
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      }).finally(()=>{
        toggleLoading(false); 
      });
    }
    getPeriodicalAppointment();

  }, [])

  const handleMoreButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCardClose = () => {
    setSelectedAppointment(null);
  };



  const Delete = (id) => {
      toggleLoading(true); // Set loading to true before API call
      axios.delete(`${process.env.React_App_Backend_URL}/appointment/delete-periodicalAppointment/${id}`)
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

  const cancleAppointment = (id,email,name,date,time) => {
    
    const emailData = {
      to:email,
      subject: `Appointment cancelled`,
      text:  `Hi ${name},\n We are sorry to inform you that Your Periodical Service Appintment with NeoTech Motors on ${date.split('T')[0]} at ${time} has been canceled due to unavilability of technicians at given time slots.We are kindly request you to make an new Appointment.`,
      html: null,
    };
      toggleLoading(true); // Set loading to true before API call
    axios
      .post(
        `${process.env.React_App_Backend_URL}/appointment/sendappointmentmail`,
        emailData
      )
      .then((response) => {
        console.log(response.data);
    axios.delete(`${process.env.React_App_Backend_URL}/appointment/delete-periodicalAppointment/${id}`)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
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

        <h2 className="SMAAppheading">Periodical Services</h2>

        {selectedAppointment && (
          <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Selected Appointment Details</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Card >
        <Card.Body>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCardClose}></button>
          <Row>
            <Card.Text >
              <strong >Vehicle No: </strong>{selectedAppointment.vNo}<br />
              <strong >Customer Name: </strong>{selectedAppointment.name}<br />
            </Card.Text>
          </Row>
          <Row>
          <Row>
                <Card.Text>
                    <strong>Customer Type: </strong>{selectedAppointment.cusType}<br />
                  </Card.Text>
                  </Row>
            <Card.Text>
              <strong>Vehicle Type: </strong>{selectedAppointment.vType}<br />
              <strong>Requesting service: </strong>{selectedAppointment.sType}<br />
            </Card.Text>
          </Row>
          <Row>
            <Card.Text>
              <strong>Last Service Year: </strong>{selectedAppointment.lastServiceYear}<br />
              <strong>Last Service Month: </strong>{selectedAppointment.lastServiceMonth}<br />
            </Card.Text>
          </Row>
          <Row>
            <Card.Text>
              <strong>Mileage: </strong>{selectedAppointment.mileage}<br />
              <strong>Description: </strong>{selectedAppointment.msg}<br />
            </Card.Text>
          </Row>
          <Row>
            <Card.Text>
              <strong>Date and Time: </strong>{`${selectedAppointment.appointmentdate.split('T')[0]} ${selectedAppointment.appointmenttime}`}<br />
              <strong>Contact No: </strong>{selectedAppointment.phone}<br />
            </Card.Text>
          </Row>
          <Row style={{ marginTop: '4%', display: 'flex' }}>
            <Button variant="danger" onClick={() => cancleAppointment(selectedAppointment._id,selectedAppointment.email,selectedAppointment.name,selectedAppointment.appointmentdate,selectedAppointment.appointmenttime)} style={{ marginLeft: '20%', width: '100px' }}>Cancel</Button>
            <Button variant="primary" onClick={sendata} style={{ marginLeft: '20%', width: '100px' }}>Approve</Button>
          </Row>
        </Card.Body>
      </Card>
    </Modal.Body>

    

  </Modal.Dialog>
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
            {periodicalAppointment.map((appointment) => (
              <tr key={appointment._id} onClick={() => handleTableRowClick(appointment)}>
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
        <Link to='/staff/sm/periodicalhistory'>
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
export default SMPeriodicalServices;
