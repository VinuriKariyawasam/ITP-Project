import React from 'react'
import ImPageTitle from "../ImPageTitle";
import { useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table1 from './Sptable1';
import Table2 from './Sptable2';
import Table3 from './Sptable3';
import Table4 from './Sptable4';
function SpareParts({ toggleLoading }) {
    const [key, setKey] = useState('pending');
  return (
    <main id="main" className="main">
     <ImPageTitle title="Spare parts order" url="/staff/im/sp" />
     <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="pending" title="Pending orders">
     <Table1 toggleLoading={toggleLoading}/>
      </Tab>
      <Tab eventKey="approved" title="Approved orders">
      <Table2 toggleLoading={toggleLoading}/>
      </Tab>
      <Tab eventKey="ongoing" title="Ongoing orders" >
      <Table3 toggleLoading={toggleLoading}/>
      </Tab>
      <Tab eventKey="completed" title="Completed orders">
        <Table4 toggleLoading={toggleLoading}/>
      </Tab>
    </Tabs>
    
    </main>
  )
}

export default SpareParts