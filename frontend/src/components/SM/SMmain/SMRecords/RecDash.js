import React from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import "./recdash.css";
import Table from "./Table";

import { useNavigate } from "react-router-dom";

function RecDash() {
  const navigate = useNavigate();

  const columns = ["#", "First", "Last", "Handle"];
  const data = [
    [1, "Mark", "Otto", "@mdo"],
    [2, "Jacob", "Thornton", "@fat"],
    [3, "Larry", "Bird", "@twitter"],
  ];

  return (
    <section>
      <Row>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 custom-input"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </div>
          <div className="p-2 ms-auto">
            <Button variant="dark" size="md" onClick={() => navigate("add")}>
              Create record
            </Button>
          </div>
        </Stack>
      </Row>

      <div className="table">
        <Table columns={columns} data={data} />
      </div>
    </section>
  );
}

export default RecDash;
