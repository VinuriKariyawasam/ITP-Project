import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  ControlLabel,
  HelpBlock,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEmp() {
  //for date picker
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Form>
      <h3>Create Employee</h3>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFname">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Sahan" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Siriwardana" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBdate">
          <Row>
            <Form.Label>Birth date</Form.Label>
          </Row>
          <Row>
            <DatePicker
              id="example-datepicker"
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control mx-2"
            />
          </Row>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridNic">
          <Form.Label>NIC</Form.Label>
          <Form.Control placeholder="791161645v" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <div className="mb-3">
            <Form.Check
              inline
              label="Male"
              name="gender"
              type="radio"
              id={`male`}
            />
            <Form.Check
              inline
              label="Female"
              name="gender"
              type="radio"
              id={`female`}
            />
          </div>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridContact">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control type="tel" placeholder="0715897598" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridSdate">
          <Row>
            <Form.Label>Start date</Form.Label>
          </Row>
          <Row>
            <DatePicker
              id="example-datepicker"
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control mx-2"
            />
          </Row>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRole">
          <Form.Label>Position</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Inventory Manager">Inventory Manager</option>
            <option value="Service Manager">Service Manager</option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Technician">Technician</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formImage">
          <Form.Label>Add a photo</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group as={Col} controlId="formFileDocuments">
          <Form.Label>Add other documents</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridExtra">
        <Form.Label>Other Details</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Row className="mb-3">
        <h5 className="text-dark">System Credentials</h5>
        <h6 className="text-danger">*Only need for manager or supervisor</h6>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddEmp;
