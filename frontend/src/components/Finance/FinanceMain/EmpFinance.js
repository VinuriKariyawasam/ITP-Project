import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';

const EmpFinance = () => {
  const [key, setKey] = useState('salaryLists');

  return (
    <main id="main" className="main">
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="salaryLists" title="Salary Lists">
          {/* Content for Salary Lists tab */}
          <h2>Salary Lists</h2>
          <p>This is where the salary lists will be displayed.</p>
        </Tab>
        <Tab eventKey="employeeBenefits" title="Employee Benefits">
          {/* Content for Employee Benefits tab */}
          <h2>Employee Benefits</h2>
          <p>This is where the employee benefits will be displayed.</p>
        </Tab>
      </Tabs>
    </Container>
    </main>
  );
};

export default EmpFinance;
