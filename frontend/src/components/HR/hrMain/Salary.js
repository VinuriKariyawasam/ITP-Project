import React, { useEffect, useState } from "react";
import { Button, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SalaryDetailsModal from "./SalaryDetailsModal";

function Salary() {
  const navigate = useNavigate();
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    // Fetch salary records from the backend when the component mounts
    const fetchSalaryRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hr/salaries");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);

        setSalaryRecords(data);
      } catch (error) {
        console.error("Error fetching salary records:", error);
      }
    };
    fetchSalaryRecords();
  }, []);

  const handleMoreButtonClick = (id) => {
    setSelectedRecordId(id);
    setShowSalaryModal(true);
  };

  return (
    <section>
      <Row>
        <Stack direction="horizontal">
          <div className="p-2">
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("weekly")}
              style={{ margin: "10px" }}
            >
              Create New Leave
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              Create Report
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={() => navigate("add")}
              style={{ margin: "10px" }}
            >
              Archive Records
            </Button>
          </div>
        </Stack>
      </Row>

      <div className="table">
        <table className="table table-rounded">
          <thead>
            <tr>
              <th style={{ backgroundColor: "black", color: "white" }}>Id</th>
              <th style={{ backgroundColor: "black", color: "white" }}>Name</th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Position
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Basic
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Allowance
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Total Salary
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Deductions
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Net Salary
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}></th>
            </tr>
          </thead>

          <tbody>
            {salaryRecords.map((record) => (
              <tr key={record.id}>
                {/* Render data for each salary record */}
                <td>{record.empId}</td>
                <td>{record.name}</td>
                <td>{record.position}</td>
                <td>Rs.{record.basicSalary}</td>
                <td>Rs.{record.allowance}</td>
                <td>Rs.{record.totalSal}</td>
                <td>
                  Rs.
                  {record.totalSal - record.noPay - record.ETF - record.EPFE}
                </td>
                <td>Rs.{record.netSal}</td>
                <td>
                  {/* More button with onClick handler */}
                  <Button
                    variant="dark"
                    className="d-flex mx-auto"
                    onClick={() => handleMoreButtonClick(record._id)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render the SalaryDetailsModal with appropriate props */}
      <SalaryDetailsModal
        show={showSalaryModal}
        handleClose={() => setShowSalaryModal(false)}
        id={selectedRecordId}
      />
    </section>
  );
}

export default Salary;
