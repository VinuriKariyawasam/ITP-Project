import React from "react";
import { Button, Form, Row, Stack, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Leaves() {
  const navigate = useNavigate();
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
                Basic
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Allowance
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Deduction(Nopay)
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                EPF-8%
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                ETF-3%
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Total Salary
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                EPF-12%
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaves;
