import React, { useRef, useState } from 'react';
import { Tab, Nav, Button } from 'react-bootstrap';
import PageTitle from './PageTitle';
import DailyReport from './DaillyReport';
import YearlyReport from './YearlyReport';
import MonthlyReport from './MonthlyReport';

function FinancialReport({toggleLoading}) {
  const [activeTab, setActiveTab] = useState('day-range'); // State to track the active tab
  const tabContentRef = useRef(null);

  // Function to update the active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main id="main" className="main"   style={{ backgroundColor: 'white' }}>
      <PageTitle path="Finance / Financial Reports" title="Financial Reports" />
     
      <Tab.Container
        id="financial-reports-tabs"
        activeKey={activeTab} // Set the active tab based on the state
        onSelect={handleTabChange} // Update the active tab on tab selection
      >
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="day-range">Day Range Report</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="monthly">Monthly Report</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="yearly">Yearly Report</Nav.Link>
          </Nav.Item>
         
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="day-range">
            <DailyReport toggleLoading={toggleLoading} />
          </Tab.Pane>
          <Tab.Pane eventKey="monthly">
            <MonthlyReport toggleLoading={toggleLoading} />
          </Tab.Pane>
          <Tab.Pane eventKey="yearly">
            <YearlyReport toggleLoading={toggleLoading}/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <div>
        {/* Hidden div to capture the content of the currently active tab */}
        <div ref={tabContentRef}>
          <Tab.Content>
            <Tab.Pane eventKey="day-range">
              {activeTab === 'day-range' && <DailyReport toggleLoading={toggleLoading}/>}
            </Tab.Pane>
            <Tab.Pane eventKey="monthly">
              {activeTab === 'monthly' && <MonthlyReport toggleLoading={toggleLoading}/>}
            </Tab.Pane>
            <Tab.Pane eventKey="yearly">
              {activeTab === 'yearly' && <YearlyReport toggleLoading={toggleLoading}/>}
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
      
    </main>
  );
}

export default FinancialReport;
