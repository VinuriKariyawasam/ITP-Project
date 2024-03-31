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
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark Otto</td>
              <td>04/03/2024</td>
              <td>Sick Leave</td>
              <td>Paid</td>
              <td>
                <Badge bg="success">Approved</Badge>
              </td>
              <td>
                <Button variant="outline-success" size="sm">
                  Approve
                </Button>{" "}
                <Button variant="outline-danger" size="sm">
                  Reject
                </Button>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaves;
