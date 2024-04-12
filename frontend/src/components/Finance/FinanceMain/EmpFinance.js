import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import PageTitle from './PageTitle';

const EmpFinance = () => {
  const [key, setKey] = useState('pending');
  const [pendingSalaryListData, setPendingSalaryListData] = useState([]);
  const [allSalaryListData, setAllSalaryListData] = useState([]);
  const [employeeBenefitsData, setEmployeeBenefitsData] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [totalPendingSalaryPayments, setTotalPendingSalaryPayments] = useState(0);
  const [totalAllSalaryPayments, setTotalAllSalaryPayments] = useState(0);
  const [totalPendingEPFCompany, setTotalPendingEPFCompany] = useState(0);
  const [totalAllEPFCompany, setTotalAllEPFCompany] = useState(0);
  const [totalPendingETFCompany, setTotalPendingETFCompany] = useState(0);
  const [totalAllETFCompany, setTotalAllETFCompany] = useState(0);

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
          calculatePendingTotals(data);
        }
      })
      .catch(error => console.error('Error fetching pending data:', error));

    // Fetch all salary list data
    fetch('http://localhost:5000/api/finance/salarylist/all')
      .then(response => response.json())
      .then(data => {
        setAllSalaryListData(data);
        calculateAllTotals(data);
      })
      .catch(error => console.error('Error fetching all data:', error));

    // Fetch employee benefits data
    fetch('http://localhost:5000/api/finance/employeebenefits')
      .then(response => response.json())
      .then(data => setEmployeeBenefitsData(data))
      .catch(error => console.error('Error fetching employee benefits data:', error));
  }, []);

  const calculatePendingTotals = (data) => {
    let totalPayments = 0;
    let totalEPF = 0;
    let totalETF = 0;

    data.forEach(entry => {
      entry.salaries.forEach(salary => {
        totalPayments += salary.netSal;
        totalEPF += salary.EPFC;
        totalETF += salary.EPFE;
      });
    });

    setTotalPendingSalaryPayments(totalPayments);
    setTotalPendingEPFCompany(totalEPF);
    setTotalPendingETFCompany(totalETF);
  };

  const calculateAllTotals = (data) => {
    let totalPayments = 0;
    let totalEPF = 0;
    let totalETF = 0;

    data.forEach(entry => {
      entry.salaries.forEach(salary => {
        totalPayments += salary.netSal;
        totalEPF += salary.EPFC;
        totalETF += salary.EPFE;
      });
    });

    setTotalAllSalaryPayments(totalPayments);
    setTotalAllEPFCompany(totalEPF);
    setTotalAllETFCompany(totalETF);
  };

  return (
    <main id="main" className="main">
      <PageTitle path="Finance / Employee-Finance-Management" title="Employee Finance Management" />
      <div></div>
      <br />
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="pending" title="Pending Salary Lists">
            {/* Content for Pending Salary Lists tab */}
            <h2>Pending Salary Lists for {month} {year}</h2>
            <Table striped bordered hover>
              {/* Table for pending salary lists */}
            </Table>
          </Tab>
          <Tab eventKey="all" title="All Salary Lists">
            {/* Content for All Salary Lists tab */}
            <h2>All Salary Lists</h2>
            <Table striped bordered hover>
              {/* Table for all salary lists */}
            </Table>
          </Tab>
          <Tab eventKey="employeeBenefits" title="Employee Benefits">
            {/* Content for Employee Benefits tab */}
            <h2>Employee Benefits</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Total EPF</th>
                  <th>Total ETF</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
          
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>
    </main>
  );
};

export default EmpFinance;
