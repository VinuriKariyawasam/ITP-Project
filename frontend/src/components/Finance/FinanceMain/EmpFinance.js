import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Table, Modal, Button, Badge } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

import PageTitle from './PageTitle';

const EmpFinance = ({toggleLoading}) => {
  const [key, setKey] = useState('Salary-Lists');
  const [pendingSalaryListData, setPendingSalaryListData] = useState([]);
  const [allSalaryListData, setAllSalaryListData] = useState([]);
  const [employeeBenefitsData, setEmployeeBenefitsData] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      toggleLoading(true)
      const pendingResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/salarylist/pending`);
      const allResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/salarylist/all`);
      const benefitsResponse = await fetch(`${process.env.React_App_Backend_URL}/api/finance/empbenefits/all`);

      const pendingData = await pendingResponse.json();
      const allData = await allResponse.json();
      const benefitsData = await benefitsResponse.json();

      setPendingSalaryListData(pendingData);
      setAllSalaryListData(allData);
      setEmployeeBenefitsData(benefitsData);

      if (pendingData.length > 0) {
        const firstEntry = pendingData[0];
        setYear(new Date(firstEntry.date).getFullYear());
        setMonth(firstEntry.month);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      toggleLoading(false)
    }
  };

  const handleApprove = async (entry) => {
    const confirmApproval = window.confirm(`Are you sure you want to approve salaries for ${entry.month} ${year}?`);
    if (confirmApproval) {
      try {
        await fetch(`${process.env.React_App_Backend_URL}/api/finance/salarylist/updatestatus/${entry._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'approved' })
        });
        
        fetchData();
        sendSalaryPayments(entry);
        sendEPFPayment(entry);
        sendETFPayment(entry);
        updateBenefitProfiles(entry.salaries);
      } catch (error) {
        console.error('Error while approving:', error);
      }
    }
  };

  const handleReject = async (entry) => {
    const confirmReject = window.confirm(`Are you sure you want to reject salaries for ${entry.month} ${year}?`);
    if (confirmReject) {
      try {
        await fetch(`${process.env.React_App_Backend_URL}/api/finance/salarylist/updatestatus/${entry._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'rejected' })
        });
        alert('Salary List rejected. Please inform HR Manager for modifications.');
        fetchData();
      } catch (error) {
        console.error('Error while rejecting:', error);
      }
    }
  };

  const sendSalaryPayments = async (entry) => {
    try {
      const totalSalary = entry.salaries.reduce((acc, curr) => acc + curr.netSal, 0);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `Salary Payments - ${entry.month} ${year}`,
          amount: totalSalary,
          type: 'Salary payments',
          date: new Date().toISOString().slice(0, 10),
          description: `Salary payments for ${entry.month} ${year}`
        })
      });
  
      if (response.ok) {
        console.log("Salary payment added successfully");
        alert("Salary payment added successfully");
      } else {
        console.error('Failed to add salary payment');
      }
    } catch (error) {
      console.error('Error while adding salary payment:', error);
    }
  };

  const sendEPFPayment = async (entry) => {
    try {
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `EPF Payments - ${entry.month} ${year}`,
          amount: entry.salaries.reduce((acc, curr) => acc + curr.EPFC, 0),
          type: 'EPF payments',
          date: new Date().toISOString().slice(0, 10),
          description: `EPF payments for ${entry.month} ${year}`
        })
      });
      if (response.ok) {
        console.log("EPF payment added successfully");
        alert('EPF Payment added successfully');
      } else {
        console.error('Failed to add EPF payment');
      }
    } catch (error) {
      console.error('Error while adding EPF payment:', error);
    }
  };

  const sendETFPayment = async (entry) => {
    try {
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `ETF Payments - ${entry.month} ${year}`,
          amount: entry.salaries.reduce((acc, curr) => acc + curr.EPFE, 0),
          type: 'ETF payments',
          date: new Date().toISOString().slice(0, 10),
          description: `ETF payments for ${entry.month} ${year}`
        })
      });
      if (response.ok) {
        console.log("ETF payment added successfully");
        alert('ETF Payment successfully');
      } else {
        console.error('Failed to add ETF payment');
      }
    } catch (error) {
      console.error('Error while adding ETF payment:', error);
    }
  };

  const updateBenefitProfiles = async (salaries) => {
    try {
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/empbenefits/updatebenefits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ salarylist: salaries })
      });
      if (response.ok) {
        console.log('Employee benefits updated successfully');
        alert('Employee benefits updated successfully')
      } else {
        console.error('Failed to update employee benefits');
      }
    } catch (error) {
      console.error('Error updating employee benefits:', error);
    }
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
            <br /><br />
            <div>
              <h2>Pending Salary List</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total Salaries(Rs.)</th>
                    <th>EPF Company Contribution(Rs.)</th>
                    <th>ETF Company Contribution(Rs.)</th>
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
                        <button className="btn btn-success mr-2" onClick={() => handleApprove(entry)}>Approve</button>{' '}
                        <button className="btn btn-danger" onClick={() => handleReject(entry)}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <br /><br />
            <div>
              <h2>All Salary Lists</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Total Salaries</th>
                    <th>EPF Company Contribution(Rs.)</th>
                    <th>ETF Company Contribution(Rs.)</th>
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
                      <td>
  {entry.status === "pending" && (
    <Badge bg="warning">Pending</Badge>
  )}
  {entry.status === "approved" && (
    <Badge bg="success">Approved</Badge>
  )}
  {entry.status === "rejected" && (
    <Badge bg="danger">Rejected</Badge>
  )}
</td>
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
                  <th>Total EPF(Rs.)</th>
                  <th>Total ETF(Rs.)</th>
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
                    <td>{employee.updatedDate.slice(0, 10)}</td>
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
