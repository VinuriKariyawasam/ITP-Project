import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import  MyApPer from './MyAppPer'
import MyApMec from './MyAppMec'
import MyAppAccid from './MyAppAccid'

const MyAppointment = props => {


  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Periodical Appointment");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

   
    
    const handleCloseModal = () => {
      setShowModal(false);
  };
  const handleMoreButtonClick = (appointment) => {
      setSelectedAppointment(appointment);
      setShowModal(true);
  };

  return(
    <main id="main" className="main">
     
  <div>
  <h1 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' ,marginLeft: '30%'}}>Your Appointments</h1>
  <Button variant="secondary" style={{ marginLeft:"35%",marginBottom:"5%",marginTop:5}}>
   Approved Appointments
  </Button><br></br>
  <Button variant="secondary" style={{ marginLeft:"35%"}}>
   Pending Appointments
  </Button>
  <div>
  
        </div>

        <div>
        <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-3"
          >
            <Tab title="Periodical Appointment" eventKey="Periodical Appointment">
        
            <MyApPer/>
  
      </Tab>
      <Tab  title="Mechanical Repairs" eventKey="Mechanical Repairs">
        <MyApMec/>
     
      </Tab>
      <Tab  title="Accidental Repairs" eventKey="Accidental Repairs">
        
    <MyAppAccid/>
      </Tab>
     </Tabs>
        </div>
</div>
</main>
  )
}

export default MyAppointment;