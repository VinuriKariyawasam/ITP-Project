import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import PageTitle from './PageTitle';

import DailyReport from './DaillyReport'; // Import the new DailyReport component

function FinancialReport() {
  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Financial Reports" title="Financial Reports" />
    <Tab.Container id="financial-reports-tabs" defaultActiveKey="day-range">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="day-range">Day Range Report</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="daily">Daily Report</Nav.Link> {/* Add the new tab for Daily Report */}
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="day-range">
          <DailyReport />
        </Tab.Pane>
        <Tab.Pane eventKey="daily">
          <DailyReport /> {/* Render the DailyReport component */}
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    </main>
  );
}

export default FinancialReport;
