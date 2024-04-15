import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import  MyApPer from './MyApPer'
import MyApMec from './MyApMec'
import MyAppAccid from './MyAppAccid'
import MyApApp from './MyApApp'

const MyAppointment = props => {

  const [activeTab, setActiveTab] = useState("Periodical Appointment");

  return(
    <main id="main" className="main">
     
  <div>
  
  <h1 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' ,marginLeft: '30%'}}>Your Appointments</h1>
  <h2 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Approved Appointments</h2><br/><br/>
<MyApApp/>
  


  <h2 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Appointment Pending for Approval </h2>
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