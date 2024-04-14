import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import PageTitle from './PageTitle';

const EmpFinance = () => {
  const [key, setKey] = useState('Salary-Lists');
  const [pendingSalaryListData, setPendingSalaryListData] = useState([]);
  const [allSalaryListData, setAllSalaryListData] = useState([]);
  const [employeeBenefitsData, setEmployeeBenefitsData] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    // Fetch pending salary list data
    fetch('http://localhost:5000/api/finance/salarylist/pending')
      .then(response => response.json())
      .then(data => {
        setPendingSalaryListData(data);
        if (data.length > 0) {
          const firstEntry = data[0];
          setYear(new Date(firstEntry.date).getFullYear());
          setMonth(firstEntry.month);
        }
      })
      .catch(error => console.error('Error fetching pending data:', error));

    // Fetch all salary list data
    fetch('http://localhost:5000/api/finance/salarylist/all')
      .then(response => response.json())
      .then(data => {
        setAllSalaryListData(data);
      })
      .catch(error => console.error('Error fetching all data:', error));

    // Fetch employee benefits data
    fetch('http://localhost:5000/api/finance/empbenefits/all')
      .then(response => response.json())
      .then(data => {
        setEmployeeBenefitsData(data);
      })
      .catch(error => console.error('Error fetching employee benefits data:', error));
  }, []);

  const handleApprove = (entry) => {
    // Implement logic to approve the pending salary list entry
    console.log("Approving entry:", entry);
  };

  const handleReject = (entry) => {
    // Implement logic to reject the pending salary list entry
    console.log("Rejecting entry:", entry);
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Employee-Finance-Management" title="Employee Finance Management" />
      <br />
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="Salary-Lists" title="Salary Lists">
            
            <br></br><br></br>
            <div>
              <h2>Pending Salary List</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total Salaries</th>
                    <th>EPF Company Contribution</th>
                    <th>ETF Company Contribution</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSalaryListData.map((entry, index) => (
                    <tr key={index}>
                      <td>{new Date(entry.date).getFullYear()}</td>
                      <td>{entry.month}</td>
                      <td>{entry.salaries.reduce((acc, curr) => acc + curr.netSal, 0)}</td>
                      <td>{entry.salaries.reduce((acc, curr) => acc + curr.EPFC, 0)}</td>
                      <td>{entry.salaries.reduce((acc, curr) => acc + curr.EPFE, 0)}</td>
                      <td>Pending</td>
                      <td>
                        <button onClick={() => handleApprove(entry)}>Approve</button>
                        <button onClick={() => handleReject(entry)}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <br></br><br></br>
            <div>
              <h2>All Salary Lists</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total Salaries</th>
                    <th>EPF Company Contribution</th>
                    <th>ETF Company Contribution</th>
                    <th>Status</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {allSalaryListData.map((entry, index) => (
                    <tr key={index}>
                      <td>{new Date(entry.date).getFullYear()}</td>
                      <td>{entry.month}</td>
                      <td>{entry.salaries.reduce((acc, curr) => acc + curr.netSal, 0)}</td>
                      <td>{entry.salaries.reduce((acc, curr) => acc + curr.EPFC, 0)}</td>
                      <td>{entry.salaries.reduce((acc, curr) => acc + curr.EPFE, 0)}</td>
                      <td>{entry.status}</td>
      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="employeeBenefits" title="Employee Benefits">
            
            <h2>Employee Benefits</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Total EPF</th>
                  <th>Total ETF</th>
                  <th>Updated Date</th>
                </tr>
              </thead>
              <tbody>
                {employeeBenefitsData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.employeeid}</td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.epftotal}</td>
                    <td>{employee.etftotal}</td>
                    <td>{employee.updatedDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
    </main>
  );
};

export default EmpFinance;
