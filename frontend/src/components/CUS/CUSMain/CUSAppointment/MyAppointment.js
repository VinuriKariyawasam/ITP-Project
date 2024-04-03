import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const MyAppointment = props => {

  return(
  <div>
  <h1>Upcoming Appointments</h1>
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