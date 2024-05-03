import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import  MyApPer from './MyApPer'
import MyApMec from './MyApMec'
import MyAppAccid from './MyAppAccid'
import MyApApp from './MyApApp'
import  MyAppCom from './MyAppCom'

const MyAppointment = ({ toggleLoading } )=> {

  const [activeTab, setActiveTab] = useState("Periodical Appointment");

  return(
    <main>
     
  <div>
  
  <h1 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' ,marginLeft: '40%',marginTop:'0%'}}>Your Appointments</h1>
  <h3 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Approved Appointments</h3><br/><br/>
<MyApApp toggleLoading={toggleLoading} /><br></br>
  


  <h3 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Appointment Pending for Approval </h3><br/><br/>
        <div>
        <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-3"
          >
            <Tab title="Periodical Appointment" eventKey="Periodical Appointment">
        
            <MyApPer toggleLoading={toggleLoading} />
  
      </Tab>
      <Tab  title="Mechanical Repairs" eventKey="Mechanical Repairs">
        <MyApMec toggleLoading={toggleLoading} />
     
      </Tab>
      <Tab  title="Accidental Repairs" eventKey="Accidental Repairs">
        
    <MyAppAccid toggleLoading={toggleLoading} />
      </Tab>
     </Tabs>
     <h3 style={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Completed Appointments</h3><br/><br/>
     <MyAppCom toggleLoading={toggleLoading} /><br></br>
        </div>
</div>
</main>
  )
}

export default MyAppointment;