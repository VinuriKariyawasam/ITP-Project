import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const MyAppointment = props => {

  const [appointments, setAppointments] = useState([]);
const vNo=appointments.vNo;
  useEffect(() => {
    // Function to fetch appointments based on vNo from mechanical repairs
    const getMechanicalAppointmentsByVNo = async () => {
        
        const response = await axios.get(`http://localhost:5000/appointment/get-onemechanicalAppointmentbyVno/${vNo}`).then((res) => {
          setAppointments(res.data);
        console.log(res.data)
      }).catch((err) => {
        alert(err.message);
      })
    }
    
   
    getMechanicalAppointmentsByVNo();
    

  }, [])


  return(
  <div>
  <h1>Approved Appointments</h1>
    <Table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Vehicle No</th>
      <th scope="col"> Appointment Type</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Contact No</th>
    </tr>
  </thead>
  <tbody>
  
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
         
  </tbody>
</Table>
<Button variant="primary" type="submit">
          View Past Appointments
        </Button>
</div>
  )
}

export default MyAppointment;